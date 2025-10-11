"use client";
import React from "react";
import { useFadeInUp } from "@/lib/animations";
import WordReveal from "@/components/ui/WordReveal";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

/**
 * SectionHeader
 * Consistent animated heading + optional subtitle used across pages.
 */
export default function SectionHeader({ title, subtitle, className = "" }: Props) {
  const hRef = useFadeInUp<HTMLHeadingElement>(0);
  const pRef = useFadeInUp<HTMLParagraphElement>(0.05);
  return (
    <div className={`mb-6 ${className}`}>
      <div ref={hRef}>
        <WordReveal as="h1" className="text-3xl font-bold tracking-tight [text-wrap:balance]" stagger={0.05}>{title}</WordReveal>
      </div>
      {subtitle && (
        <p ref={pRef} className="mt-3 max-w-2xl text-[17px] leading-7 text-[color:var(--zenotika-muted)]">{subtitle}</p>
      )}
    </div>
  );
}
