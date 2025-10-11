"use client";
import React from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

type Props = {
  as?: React.ElementType;
  children: string;
  className?: string;
  stagger?: number; // per-char
  delay?: number;
  wordGap?: number; // extra delay between words
};

export default function CharReveal({
  as,
  children,
  className = "",
  stagger = 0.028,
  delay = 0,
  wordGap = 0.08,
}: Props) {
  const reduce = usePrefersReducedMotion();
  const TagEl: React.ElementType = (as || "h1");
  // Cast to a component type that explicitly accepts children to avoid
  // union-to-never issues from intrinsic elements like <img /> that disallow children.
  const Comp = TagEl as unknown as React.ComponentType<{
    className?: string;
    children?: React.ReactNode;
    'aria-label'?: string;
  }>;

  const words = React.useMemo(() => {
    const text = (children || "").toString();
    return text.split(/(\s+)/); // keep spaces
  }, [children]);

  if (reduce) {
    return <Comp className={className}>{children}</Comp>;
  }

  let idx = 0;
  let wIndex = 0;
  return (
    <Comp className={className} aria-label={children}>
      {words.map((chunk, i) => {
        if (/^\s+$/.test(chunk)) {
          // preserve spaces
          wIndex += 1;
          return <span key={`space-${i}`} style={{ whiteSpace: "pre" }}>{chunk}</span>;
        }
        const chars = Array.from(chunk);
        const baseDelay = delay + wIndex * wordGap;
        const out = (
          <span key={`w-${i}`} style={{ display: "inline-block", whiteSpace: "pre" }}>
            {chars.map((ch, ci) => {
              const d = baseDelay + (idx + ci) * stagger;
              return (
                <motion.span
                  key={`c-${i}-${ci}`}
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0, y: "0.8em", filter: "blur(1px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: d }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        );
        idx += chars.length;
        wIndex += 1;
        return out;
      })}
    </Comp>
  );
}
