"use client";
import React from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
        const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const lenis = new Lenis({
            duration: reduce ? 1 : 1.1,
            smoothWheel: !reduce,
        });

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
        };
    }, []);

    return <>{children}</>;
}
