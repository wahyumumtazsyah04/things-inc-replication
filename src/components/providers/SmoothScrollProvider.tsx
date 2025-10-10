"use client";
import React from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const reduce = usePrefersReducedMotion();

    React.useEffect(() => {
        // Register ScrollTrigger once on client
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }
        if (reduce) {
            // When reduced motion is on, don't initialize Lenis; ensure ScrollTrigger is refreshed
            try { ScrollTrigger.refresh(); } catch { }
            return;
        }

        const lenis = new Lenis({
            duration: 1.1,
            smoothWheel: true,
        });

        // Bridge Lenis with ScrollTrigger so scroll-driven animations stay in sync
        const onLenisScroll = () => {
            try { ScrollTrigger.update(); } catch { }
        };
        lenis.on("scroll", onLenisScroll);

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        const id = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(id);
            // Attempt to stop/cleanup if available without suppressing types
            const cleaner = lenis as unknown as { stop?: () => void; destroy?: () => void };
            cleaner.stop?.();
            cleaner.destroy?.();
            try { ScrollTrigger.killAll(false); } catch { }
        };
        // include reduce so when user toggles OS setting, we re-evaluate
    }, [reduce]);

    return <>{children}</>;
}
