"use client";
import React from "react";
import { getMotionOverride, setMotionOverride, usePrefersReducedMotion } from "@/lib/reduced-motion";

export default function MotionToggle({ className = "" }: { className?: string }) {
    const osReduced = usePrefersReducedMotion();
    const [pref, setPref] = React.useState(getMotionOverride());
    const effectiveReduced = pref === "auto" ? osReduced : pref === "reduced";

    const cycle = () => {
        const next = pref === "auto" ? "reduced" : pref === "reduced" ? "full" : "auto";
        setPref(next);
        setMotionOverride(next);
    };

    const label = `Motion: ${pref}${pref === "auto" ? osReduced ? " (reduced)" : " (full)" : ""}`;

    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={cycle}
            className={`inline-flex h-8 items-center gap-2 rounded px-2 text-xs text-[color:var(--foreground)]/80 hover:bg-[color:var(--zenotika-surface)] ${className}`}
        >
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: effectiveReduced ? "#f59e0b" : "#10b981" }} />
            {label}
        </button>
    );
}
