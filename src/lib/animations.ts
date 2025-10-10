"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useFadeInUp<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", delay }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return ref;
}
