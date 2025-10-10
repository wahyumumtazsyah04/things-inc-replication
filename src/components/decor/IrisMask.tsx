"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * IrisMask
 * Animated circular reveal/conceal overlay to suggest a portal “iris”.
 * Uses clip-path for broad support and respects reduced motion.
 */
export default function IrisMask({ show }: { show: boolean }) {
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[75]"
          initial={{ clipPath: "circle(140% at 50% 50%)", opacity: 1 }}
          animate={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
          exit={{ clipPath: "circle(140% at 50% 50%)", opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: "var(--background)" }}
        />)
      }
    </AnimatePresence>
  );
}
