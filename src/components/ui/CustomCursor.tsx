"use client";
import React from "react";

/**
 * CustomCursor
 * - Desktop-only visual cursor dot/ring that trails the pointer slightly
 * - Hidden on touch devices via global .cursor-custom rule in globals.css
 * - Respects prefers-reduced-motion (does not mount)
 * - Grows subtly when hovering interactive elements (links, buttons, [role="button"], .cursor-hoverable)
 */
export default function CustomCursor() {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const rafRef = React.useRef<number | null>(null);
    const target = React.useRef({ x: 0, y: 0 });
    const pos = React.useRef({ x: 0, y: 0 });
    const mounted = React.useRef(false);

    React.useEffect(() => {
        // Skip on SSR, reduced motion, or no fine pointer
        if (typeof window === "undefined") return;
        const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (reduce || !finePointer) return;

        mounted.current = true;

        const el = ref.current!;

        const onMove = (e: MouseEvent) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
            if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
        };

        const tick = () => {
            const speed = 0.22; // smoothing factor
            pos.current.x += (target.current.x - pos.current.x) * speed;
            pos.current.y += (target.current.y - pos.current.y) * speed;
            el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            // Continue animating while significant delta remains
            if (Math.abs(target.current.x - pos.current.x) > 0.1 || Math.abs(target.current.y - pos.current.y) > 0.1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                rafRef.current = null;
            }
        };

        const isInteractive = (node: EventTarget | null) => {
            if (!(node instanceof Element)) return false;
            return (
                node.closest("a, button, [role=button], .cursor-hoverable, .magnetic") != null
            );
        };

        const onOver = (e: MouseEvent) => {
            if (isInteractive(e.target)) {
                el.dataset.active = "true";
            }
        };
        const onOut = (e: MouseEvent) => {
            if (isInteractive(e.target)) {
                el.dataset.active = "false";
            }
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });
        window.addEventListener("mouseout", onOut, { passive: true });

        return () => {
            mounted.current = false;
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            window.removeEventListener("mouseout", onOut);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Don't render anything on server to avoid hydration mismatch
    if (typeof window === "undefined") return null;
    const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !finePointer) return null;

    return (
        <div
            ref={ref}
            className="cursor-custom pointer-events-none fixed left-0 top-0 z-[70]"
            aria-hidden
            style={{
                width: 18,
                height: 18,
                marginLeft: -9,
                marginTop: -9,
                borderRadius: 9999,
                background: "transparent",
                border: "1.5px solid currentColor",
                color: "var(--foreground)",
                transition: "transform 140ms ease, opacity 200ms ease, border-color 200ms ease",
                mixBlendMode: "normal",
                opacity: 0.8,
                transform: "translate3d(-100px, -100px, 0)",
                willChange: "transform",
            }}
            data-active="false"
        >
            <style>{`
        .cursor-custom[data-active="true"] { transform: translate3d(-100px,-100px,0) scale(1.6); opacity: 0.9; }
        [data-theme="night"] .cursor-custom { color: #cbcfff; }
      `}</style>
        </div>
    );
}
