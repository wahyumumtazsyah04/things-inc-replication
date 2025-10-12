"use client";
import React from "react";

type StarParticlesProps = {
  count?: number;
  className?: string;
};

// Deterministic LCG so SSR/CSR match
function lcg(seed = 1234567) {
  let s = seed >>> 0;
  return () => (s = (1664525 * s + 1013904223) >>> 0) / 0xffffffff;
}

export default function StarParticles({ count = 48, className = "" }: StarParticlesProps) {
  const rand = React.useMemo(() => lcg(0xC0FFEE), []);
  const stars = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const x = Math.round(rand() * 10000) / 100; // 0..100
      const y = Math.round(rand() * 10000) / 100; // 0..100
      const size = 1 + Math.round(rand() * 2); // 1..3 px
      const delay = Math.round(rand() * 800) / 100; // 0..8s
      const dur = 4 + Math.round(rand() * 600) / 100; // 4..10s
      const opacity = 0.35 + rand() * 0.5; // 0.35..0.85
      return { id: i, x, y, size, delay, dur, opacity };
    });
  }, [rand, count]);

  return (
    <div className={`absolute inset-0 pointer-events-none -z-10 ${className}`} aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="star-particle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
