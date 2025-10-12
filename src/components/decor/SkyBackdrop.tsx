"use client";
import React from "react";

/**
 * SkyBackdrop
 * Theme-aware gradient sky + subtle starfield. Pure CSS, zero images.
 * Place inside a relatively positioned container; it fills the area behind content.
 */
export default function SkyBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute -z-20 top-0 bottom-0 left-1/2 -translate-x-1/2 w-screen ${className}`} aria-hidden>
      <div className="sky-gradient absolute inset-0" />
      <div className="starfield absolute inset-0" />
      <div className="vignette absolute inset-0" />
    </div>
  );
}
