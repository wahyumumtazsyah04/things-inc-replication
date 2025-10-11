"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { RootState } from "@react-three/fiber";
import * as THREE from "three";
import { useAmbience } from "@/components/providers/AmbienceProvider";

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
    void main() {
      // radial mask based on uReveal (0 closed -> 1 open)
      float d = distance(vUv, vec2(0.5));
      float iris = smoothstep(0.5 * (1.0 - uReveal), 0.2 * (1.0 - uReveal), d);
      float vignette = smoothstep(0.9, 0.2, d);
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
      <mesh position={[0,0,0.51]}>
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
      <mesh position={[0,0,0.5]}>
        <planeGeometry args={[4.65, 3.2, 1, 1]} />
        <shaderMaterial transparent depthWrite={false} uniforms={uniforms} vertexShader={vtx} fragmentShader={frg} />
      </mesh>
    );
  }
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(!reduce);
  }, []);
  if (!enabled) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Canvas dpr={[1, 1.5]} frameloop="demand" camera={{ position: [0, 0, 3.2], fov: 55 }} onPointerMove={() => { /* kick demand loop */ }}>
        {/* Invalidate when props that affect visuals change (e.g., progress, theme handled inside overlays) */}
        {/** Helper to invalidate on prop changes */}
        {/** We'll piggy-back on VignetteOverlay useEffect for theme; for progress, add invalidator below */}
        {/** eslint-disable-next-line react/jsx-no-useless-fragment */}
        <InvalidateOnChange value={progress} />
        <ambientLight intensity={theme === 'night' ? 0.45 : 0.6} />
        <directionalLight position={[3, 5, 2]} intensity={theme === 'night' ? 0.55 : 0.7} color={theme === 'night' ? new THREE.Color(0.7,0.75,1) : new THREE.Color(1,0.95,0.9)} />
        {/* Parallax layers with theme-aware palette */}
        <group>
          <group position={[0, -0.08, -0.15]}>
            <DisplacedPlane amp={0.08} colorA={palette.a} colorB={palette.b} alpha={palette.alpha * 0.6} />
          </group>
          <DisplacedPlane amp={0.15} colorA={palette.a} colorB={palette.b} alpha={palette.alpha * 0.75} />
          <group position={[0, 0.06, 0.12]}>
            <DisplacedPlane amp={0.22} colorA={palette.a} colorB={palette.b} alpha={palette.alpha} />
          </group>
        </group>
        {/* Reveal overlay plane synced to progress (slightly above) */}
        <group position={[0,0,0.25]}>
          <DisplacedPlane amp={0.08} colorA={palette.a} colorB={palette.b} alpha={palette.alpha * 0.7} reveal={progress} />
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
