"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

/**
 * IrisMask
 * Animated circular reveal/conceal overlay to suggest a portal “iris”.
 * Uses clip-path for broad support and respects reduced motion.
 */
export default function IrisMask({ show }: { show: boolean }) {
  const reduce = usePrefersReducedMotion();
  if (reduce) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[75]"
          initial={{ clipPath: "circle(140% at 50% 50%)", opacity: 0.95 }}
          animate={{ clipPath: "circle(12% at 50% 50%)", opacity: 0 }}
          exit={{ clipPath: "circle(140% at 50% 50%)", opacity: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: "var(--background)" }}
        />)
      }
    </AnimatePresence>
  );
}
