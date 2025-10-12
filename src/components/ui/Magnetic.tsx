"use client";
import React, { useEffect, useRef, useState } from "react";
import { isReducedMotion } from "@/lib/reduced-motion";

type Props = {
  strength?: number; // px attraction radius
  intensity?: number; // movement factor
  children: React.ReactNode;
  className?: string;
};

export default function Magnetic({ strength = 60, intensity = 0.25, children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Enable after mount to avoid SSR/CSR DOM shape differences
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const reduce = isReducedMotion();
    if (reduce) return;
    const finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(!reduce && !!finePointer);
  }, []);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < strength) {
      el.style.transform = `translate(${dx * intensity}px, ${dy * intensity}px)`;
    }
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate(0px, 0px)`;
  }

  return (
    <div
      ref={ref}
      className={`inline-block will-change-transform transition-transform duration-200 magnetic ${className}`}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      data-magnetic-enabled={enabled ? "true" : "false"}
    >
      {children}
    </div>
  );
}
