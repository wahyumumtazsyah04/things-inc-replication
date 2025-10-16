"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { RootState } from "@react-three/fiber";
import * as THREE from "three";
import { useAmbience } from "@/components/providers/AmbienceProvider";
import { isReducedMotion } from "@/lib/reduced-motion";

function DisplacedPlane({ amp = 0.15, colorA = new THREE.Color(0.35, 0.36, 0.6), colorB = new THREE.Color(0.2, 0.2, 0.35), alpha = 0.65, reveal = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: amp },
      uReveal: { value: reveal },
      uColA: { value: new THREE.Color(colorA) },
      uColB: { value: new THREE.Color(colorB) },
      uAlpha: { value: alpha },
    }),
    [amp, reveal, colorA, colorB, alpha]
  );
  useFrame((_state: RootState, delta: number) => {
    uniforms.uTime.value += delta;
  });

  const vertex = /* glsl */`
    uniform float uTime;
    uniform float uAmp;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      float n = sin(pos.x * 3.1415 + uTime * 0.6) * cos(pos.y * 3.1415 + uTime * 0.5);
      pos.z += n * uAmp;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;
  const fragment = /* glsl */`
    uniform float uReveal;
    uniform vec3 uColA;
    uniform vec3 uColB;
    uniform float uAlpha;
    varying vec2 vUv;
    float easeInOut(float t){ return t*t*(3.0-2.0*t); }
    void main() {
      // Non-linear reveal curve for closer reference tempo
      float r = clamp(uReveal, 0.0, 1.0);
      r = easeInOut(r);
      float d = distance(vUv, vec2(0.5));
      // tighter inner threshold with a slightly slower mid expansion
      float iris = smoothstep(0.52 * (1.0 - r), 0.18 * (1.0 - r), d);
      float vignette = smoothstep(0.92, 0.22, d);
      vec3 color = mix(uColA, uColB, d);
      gl_FragColor = vec4(color * vignette, uAlpha) * iris;
    }
  `;

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]}>
      <planeGeometry args={[4.5, 3, 80, 80]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
      />
    </mesh>
  );
}

// ParallaxRig removed (layers are directly composed with demand invalidation)

export default function PortalScene3D({ progress = 1 }: { progress?: number }) {
  const [enabled, setEnabled] = useState(false);
  // Dev-only shader intensity multiplier (1 = normal)
  const [intensity, setIntensity] = useState<number>(1);
  const { theme } = useAmbience();
  // Theme-aware palette tuned to day/night brand tones
  const palette = React.useMemo(() => {
    if (theme === 'night') {
      return {
        a: new THREE.Color(0.55, 0.58, 0.95), // lavender-ish highlight
        b: new THREE.Color(0.10, 0.11, 0.22), // deep background
        alpha: 0.75,
      };
    }
    return {
      a: new THREE.Color(0.65, 0.66, 1.0),
      b: new THREE.Color(0.90, 0.92, 1.0),
      alpha: 0.4,
    };
  }, [theme]);

  // Subtle grain overlay for premium feel (low alpha, additive)
  function GrainOverlay() {
    const mat = useMemo(() => ({
      uTime: { value: 0 },
      uAlpha: { value: 0.05 },
    }), []);
    useFrame((_s, d) => { mat.uTime.value += d; });
    const vtx = /* glsl */`
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
    `;
    const frg = /* glsl */`
      varying vec2 vUv; uniform float uTime; uniform float uAlpha;
      // quick hash noise
      float hash(vec2 p){ p = vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3))); return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
      void main(){
        float n = hash(vUv * 800.0 + uTime);
        float g = (n - 0.5) * 0.35; // center and soften
        gl_FragColor = vec4(vec3(g), uAlpha);
      }
    `;
    return (
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[4.6, 3.1, 1, 1]} />
        <shaderMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} uniforms={mat} vertexShader={vtx} fragmentShader={frg} />
      </mesh>
    );
  }

  // Soft vignette overlay (alpha blended), slightly stronger at night
  function VignetteOverlay({ themeMode }: { themeMode: 'day' | 'night' }) {
    const { invalidate } = useThree();
    const uniforms = useMemo(() => ({
      uStrength: { value: themeMode === 'night' ? 0.28 : 0.18 },
    }), [themeMode]);
    useEffect(() => { invalidate(); }, [invalidate]);
    const vtx = /* glsl */`
      varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
    `;
    const frg = /* glsl */`
      varying vec2 vUv; uniform float uStrength;
      void main(){
        float d = distance(vUv, vec2(0.5));
        float v = smoothstep(0.35, 0.9, d);
        gl_FragColor = vec4(0.0, 0.0, 0.0, v * uStrength);
      }
    `;
    return (
      <mesh position={[0, 0, 0.5]}>
        <planeGeometry args={[4.65, 3.2, 1, 1]} />
        <shaderMaterial transparent depthWrite={false} uniforms={uniforms} vertexShader={vtx} fragmentShader={frg} />
      </mesh>
    );
  }
  useEffect(() => {
    // Detect reduced motion
    const reduce = isReducedMotion();
    if (reduce) { setEnabled(false); return; }
    // Detect low power mode if exposed (Safari iOS and some browsers)
    const lowPower = (navigator as any)?.battery?.saving || (navigator as any)?.deviceMemory === 0.25;
    if (lowPower) { setEnabled(false); return; }
    // Detect WebGL support
    let glSupported = false;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      glSupported = !!gl;
    } catch { glSupported = false; }
    setEnabled(glSupported);
  }, []);
  if (!enabled) {
    // Graceful non-WebGL fallback to keep premium feel for reduced-motion users
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 portal-fallback" />
    );
  }
  const showShaderDev = process.env.NEXT_PUBLIC_SHOW_SHADER_DEV === 'on';
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" data-dev-webgl={showShaderDev ? 'on' : undefined} data-canvas-root="portal-hero">
      {showShaderDev && (
        <>
          <div className="dev-webgl-badge">WebGL</div>
          <div className="dev-control dev-shader">
            <label>
              Shader x{intensity.toFixed(1)}
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.1}
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
              />
            </label>
          </div>
        </>
      )}
      <Canvas dpr={[1, 1.5]} frameloop="demand" camera={{ position: [0, 0, 3.2], fov: 55 }}>
        {/* Invalidate when props that affect visuals change (e.g., progress, theme handled inside overlays) */}
        {/** Helper to invalidate on prop changes */}
        {/** We'll piggy-back on VignetteOverlay useEffect for theme; for progress, add invalidator below */}
        {/** eslint-disable-next-line react/jsx-no-useless-fragment */}
        <InvalidateOnChange value={progress} />
        <ProgressEffects progress={progress} />
        <PointerParallax />
        <ambientLight intensity={theme === 'night' ? 0.45 : 0.6} />
        <directionalLight position={[3, 5, 2]} intensity={theme === 'night' ? 0.55 : 0.7} color={theme === 'night' ? new THREE.Color(0.7, 0.75, 1) : new THREE.Color(1, 0.95, 0.9)} />
        {/* Parallax layers with theme-aware palette */}
        <group name="portal-root">
          <group position={[0, -0.08, -0.15]}>
            <DisplacedPlane amp={0.075 * intensity} colorA={palette.a} colorB={palette.b} alpha={palette.alpha * 0.58} />
          </group>
          <DisplacedPlane amp={0.145 * intensity} colorA={palette.a} colorB={palette.b} alpha={palette.alpha * 0.74} />
          <group position={[0, 0.06, 0.12]}>
            <DisplacedPlane amp={0.215 * intensity} colorA={palette.a} colorB={palette.b} alpha={palette.alpha} />
          </group>
        </group>
        {/* Reveal overlay plane synced to progress (slightly above) */}
        <group position={[0, 0, 0.25]}>
          <DisplacedPlane amp={(0.075 * intensity) * (0.9 + 0.4 * progress)} colorA={palette.a} colorB={palette.b} alpha={palette.alpha * 0.72} reveal={progress} />
        </group>
        {/* Subtle grain overlay */}
        <GrainOverlay />
        {/* Soft vignette overlay */}
        <VignetteOverlay themeMode={theme === 'night' ? 'night' : 'day'} />
      </Canvas>
    </div>
  );
}

// Helper to invalidate the Canvas when an external value changes in frameloop="demand" mode
function InvalidateOnChange({ value }: { value: unknown }) {
  const { invalidate } = useThree();
  useEffect(() => { invalidate(); }, [value, invalidate]);
  return null;
}

// Progress-driven camera and group transforms to enrich the scroll feel
function ProgressEffects({ progress }: { progress: number }) {
  const { camera, scene, invalidate } = useThree();
  // Light dolly-in as progress increases
  const z = 3.2 - 0.35 * progress;
  const root = scene.getObjectByName("portal-root") as THREE.Group | null;
  // Slight scale-up and tilt for depth
  const scale = 1 + 0.06 * progress;
  const tilt = (progress - 0.5) * 0.04; // subtle tilt around X
  useEffect(() => {
    camera.position.set(0, 0, z);
    if (root) {
      // Store base tilt; combine with any parallax offset if present
      (root.userData as any).baseTilt = tilt;
      const pitchOffset = (root.userData as any).pitchOffset ?? 0;
      const yawOffset = (root.userData as any).yawOffset ?? 0;
      root.scale.setScalar(scale);
      root.rotation.x = tilt + pitchOffset;
      root.rotation.y = yawOffset;
    }
    invalidate();
  }, [z, scale, tilt, camera, root, invalidate]);
  return null;
}

// Pointer-driven subtle parallax (yaw/pitch) with clamps and smoothing
function PointerParallax() {
  const { scene, invalidate } = useThree();
  const rootRef = useRef<THREE.Group | null>(null);
  const activeRef = useRef(false);
  const current = useRef({ yaw: 0, pitch: 0 });
  const target = useRef({ yaw: 0, pitch: 0 });

  // Resolve root group once
  useEffect(() => {
    const root = scene.getObjectByName("portal-root") as THREE.Group | null;
    rootRef.current = root;
  }, [scene]);

  useEffect(() => {
    // Respect reduced motion and non-precise pointers
    const reduce = isReducedMotion();
    const pointerFine = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (reduce || !pointerFine) return;

    const maxYaw = 0.08; // rad ~ 4.5deg
    const maxPitch = 0.05; // rad ~ 2.8deg
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      const y = (e.clientY / window.innerHeight) * 2 - 1; // -1..1
      target.current.yaw = THREE.MathUtils.clamp(x * maxYaw, -maxYaw, maxYaw);
      target.current.pitch = THREE.MathUtils.clamp(-y * maxPitch, -maxPitch, maxPitch);
      activeRef.current = true;
      invalidate();
    };
    const reset = () => {
      target.current.yaw = 0; target.current.pitch = 0; activeRef.current = true; invalidate();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('blur', reset);
    document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', reset);
    };
  }, [invalidate]);

  // Smooth towards target when active; keep demand loop alive until settled
  useFrame(() => {
    if (!activeRef.current) return;
    const root = rootRef.current;
    if (!root) return;
    const s = 0.12; // smoothing factor per frame
    current.current.yaw += (target.current.yaw - current.current.yaw) * s;
    current.current.pitch += (target.current.pitch - current.current.pitch) * s;
    // Combine with base tilt from progress effects
    const baseTilt = (root.userData as any).baseTilt ?? 0;
    (root.userData as any).yawOffset = current.current.yaw;
    (root.userData as any).pitchOffset = current.current.pitch;
    root.rotation.y = current.current.yaw;
    root.rotation.x = baseTilt + current.current.pitch;
    // If near target, stop animating to save frames
    const dy = Math.abs(target.current.yaw - current.current.yaw);
    const dp = Math.abs(target.current.pitch - current.current.pitch);
    if (dy < 0.0008 && dp < 0.0008) {
      activeRef.current = false;
    } else {
      invalidate();
    }
  });
  return null;
}
