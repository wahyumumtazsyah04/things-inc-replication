"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { RootState } from "@react-three/fiber";
import * as THREE from "three";

function DisplacedPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.15 },
    }),
    []
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
    varying vec2 vUv;
    void main() {
      // soft vignette
      float d = distance(vUv, vec2(0.5));
      float vignette = smoothstep(0.9, 0.2, d);
      vec3 color = mix(vec3(0.35,0.36,0.6), vec3(0.2,0.2,0.35), d);
      gl_FragColor = vec4(color * vignette, 0.65);
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

function ParallaxRig() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ mouse }: { mouse: { x: number; y: number } }) => {
    if (!group.current) return;
    const targetX = mouse.x * 0.15;
    const targetY = mouse.y * 0.1;
    group.current.rotation.y += (targetX - group.current.rotation.y) * 0.08;
    group.current.rotation.x += (targetY - group.current.rotation.x) * 0.08;
  });
  return (
    <group ref={group}>
      <DisplacedPlane />
    </group>
  );
}

export default function PortalScene3D() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(!reduce);
  }, []);
  if (!enabled) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.2], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 2]} intensity={0.7} />
        <ParallaxRig />
      </Canvas>
    </div>
  );
}
