"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * RouteChangeEffects
 * - Resets scroll to top on route change (helps with Lenis)
 * - Refreshes ScrollTrigger so scroll-based animations re-calc after page transition
 * - No-op when prefers-reduced-motion to avoid surprising jumps
 */
export default function RouteChangeEffects() {
  const pathname = usePathname();
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Use rAF to run after next paint to avoid fighting with transition mount
    const id = requestAnimationFrame(() => {
      try {
        // Reset scroll to top for new pages (Lenis will intercept smoothly if enabled)
        if (!reduce) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        // Refresh ScrollTrigger to recalc positions after layout changes
        ScrollTrigger.refresh();
        // Dispatch a custom event for any listeners that want to hook into route changes
        window.dispatchEvent(new CustomEvent("route:changed", { detail: { pathname } }));
      } catch {}
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}
