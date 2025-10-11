"use client";
import React from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

type Props = {
  as?: React.ElementType;
  children: string;
  className?: string;
  stagger?: number;
  delay?: number;
};

export default function WordReveal({
  as, children, className = "", stagger = 0.06, delay = 0,
}: Props) {
  const reduce = usePrefersReducedMotion();
  const TagEl: React.ElementType = (as || "h1");
  const Comp = TagEl as unknown as React.ComponentType<{
    className?: string;
    children?: React.ReactNode;
    'aria-label'?: string;
  }>;
  const words = React.useMemo(() => (children || "").split(/\s+/).filter(Boolean), [children]);

  if (reduce) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <Comp className={className} aria-label={children}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          initial={{ opacity: 0, y: "0.6em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
        >
          {w + (i < words.length - 1 ? " " : "")}
        </motion.span>
      ))}
    </Comp>
  );
}
