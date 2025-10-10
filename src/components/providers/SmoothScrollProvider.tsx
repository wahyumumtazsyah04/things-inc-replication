"use client";
import React from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
        const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // Register ScrollTrigger once on client
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }
        const lenis = new Lenis({
            duration: reduce ? 1 : 1.1,
            smoothWheel: !reduce,
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
    }, []);

    return <>{children}</>;
}
