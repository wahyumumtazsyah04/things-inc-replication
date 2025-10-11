"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

type Props = {
    children: React.ReactNode;
};

export default function PageTransitionProvider({ children }: Props) {
    const pathname = usePathname();
    const reduce = usePrefersReducedMotion();

    // Only show the sweep overlay on actual route changes, not on the first paint
    const firstRef = React.useRef(true);
    const [showSweep, setShowSweep] = React.useState(false);

    React.useEffect(() => {
        if (reduce) return; // respect prefers-reduced-motion
        if (firstRef.current) {
            firstRef.current = false; // skip initial mount
            return;
        }
        // Trigger sweep for this navigation
        setShowSweep(true);
        const id = window.setTimeout(() => setShowSweep(false), 700); // match transition duration below
        return () => window.clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    if (reduce) {
        // Skip transitions for users who prefer less motion
        return <>{children}</>;
    }

    return (
        <AnimatePresence mode="wait" initial={false}>
            {/* Content fade/slide */}
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.33, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
            >
                {children}
            </motion.div>

            {/* Branded sweep overlay: slides in from right and sweeps across on route change only */}
            <AnimatePresence>
                {showSweep && (
                    <motion.div
                        key="page-sweep-overlay"
                        aria-hidden
                        className="page-sweep-overlay"
                        initial={{ x: "100%", opacity: 0.92 }}
                        animate={{ x: "-100%", opacity: 1 }}
                        exit={{ x: "-100%", opacity: 1 }}
                        transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
                    />
                )}
            </AnimatePresence>
        </AnimatePresence>
    );
}
