"use client";
import React from "react";
import { getMotionOverride, setMotionOverride, usePrefersReducedMotion } from "@/lib/reduced-motion";

export default function MotionToggle({ className = "" }: { className?: string }) {
    type MotionPref = "auto" | "reduced" | "full";
    const osReduced = usePrefersReducedMotion();
    // SSR-safe initial state: do not read localStorage until mounted
    const [pref, setPref] = React.useState<MotionPref>("auto");
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        // After mount, hydrate with stored preference (if any)
        const stored = getMotionOverride();
        setPref(stored);
        // Reflect current motion pref on <html> for CSS hooks
        try { document.documentElement.setAttribute("data-motion", stored); } catch {}
    }, []);

    const effectiveReduced = mounted
        ? (pref === "auto" ? osReduced : pref === "reduced")
        : false; // keep stable on SSR/first paint

    const cycle = () => {
        const next: MotionPref = pref === "auto" ? "reduced" : pref === "reduced" ? "full" : "auto";
        setPref(next);
        setMotionOverride(next);
    };

    // Until mounted, avoid adding OS-derived suffix to keep SSR/CSR consistent
    const label = `Motion: ${pref}` + (mounted && pref === "auto" ? (osReduced ? " (reduced)" : " (full)") : "");

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
