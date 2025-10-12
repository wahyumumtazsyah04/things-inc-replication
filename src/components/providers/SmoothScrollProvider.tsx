"use client";
import React from "react";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

// Defer heavy/SSR-unsafe imports until we are on the client
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const reduce = usePrefersReducedMotion();

    React.useEffect(() => {
        let cleanup: (() => void) | undefined;
        let rafId: number | null = null;
        let lenisInstance: any = null;

        const setup = async () => {
            if (typeof window === "undefined") return;
            // Import gsap and ScrollTrigger only on client
            const [{ gsap }, { ScrollTrigger }] = await Promise.all([
                import("gsap"),
                import("gsap/ScrollTrigger"),
            ]);
            try { gsap.registerPlugin(ScrollTrigger); } catch { }

            if (reduce) {
                try { ScrollTrigger.refresh(); } catch { }
                return;
            }

            // Import Lenis only on client
            const { default: Lenis } = await import("lenis");
            const lenis = new Lenis({
                duration: 1.1,
                smoothWheel: true,
            });
            lenisInstance = lenis;

            // Bridge Lenis with ScrollTrigger so scroll-driven animations stay in sync
            const onLenisScroll = () => {
                try { (ScrollTrigger as any).update(); } catch { }
            };
            lenis.on("scroll", onLenisScroll);

            const raf = (time: number) => {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);

            cleanup = () => {
                if (rafId) cancelAnimationFrame(rafId);
                try {
                    // Attempt to stop/cleanup if available
                    (lenis as any).stop?.();
                    (lenis as any).destroy?.();
                    (ScrollTrigger as any).killAll?.(false);
                } catch { }
            };
        };

        setup();

        return () => {
            cleanup?.();
            cleanup = undefined;
            lenisInstance = null;
        };
        // include reduce so when user toggles OS setting, we re-evaluate
    }, [reduce]);

    return <>{children}</>;
}
