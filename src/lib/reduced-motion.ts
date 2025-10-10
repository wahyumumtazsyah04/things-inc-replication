"use client";
import { useEffect, useState } from "react";

/**
 * usePrefersReducedMotion
 * React hook that returns true when the user has enabled reduced motion at OS/browser level.
 * It listens for changes so components can react dynamically without a refresh.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState<boolean>(() => getReducedMotionEffective());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(getReducedMotionEffective());
    // Listen to OS pref
    if (mql) {
      if ("addEventListener" in mql) mql.addEventListener("change", onChange);
      // @ts-expect-error legacy
      else mql.addListener?.(onChange);
    }
    // Listen to site override changes
    window.addEventListener("storage", onChange);
    window.addEventListener("motion:changed", onChange as EventListener);
    return () => {
      if (mql) {
        if ("removeEventListener" in mql) mql.removeEventListener("change", onChange);
        // @ts-expect-error legacy
        else mql.removeListener?.(onChange);
      }
      window.removeEventListener("storage", onChange);
      window.removeEventListener("motion:changed", onChange as EventListener);
    };
  }, []);

  return reduced;
}

/**
 * isReducedMotion
 * Non-react helper for one-off checks in event handlers or setup functions.
 */
export function isReducedMotion() {
  return getReducedMotionEffective();
}

type MotionOverride = "auto" | "reduced" | "full";

function getReducedMotionEffective(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const override = (localStorage.getItem("motionPref") as MotionOverride | null) ?? "auto";
    if (override === "reduced") return true;
    if (override === "full") return false;
  } catch {}
  return !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function setMotionOverride(pref: MotionOverride) {
  try {
    localStorage.setItem("motionPref", pref);
    document.documentElement.setAttribute("data-motion", pref);
    window.dispatchEvent(new CustomEvent("motion:changed", { detail: { pref } }));
  } catch {}
}

export function getMotionOverride(): MotionOverride {
  try {
    const value = localStorage.getItem("motionPref") as MotionOverride | null;
    if (value === "auto" || value === "reduced" || value === "full") return value;
  } catch {}
  return "auto";
}
