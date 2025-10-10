"use client";
import React from "react";
import { useScrollReveal } from "@/lib/animations";

type Props = {
  children: React.ReactNode;
  selector?: string;
  stagger?: number;
  className?: string;
};

export default function Reveal({ children, selector = "> *", stagger = 0.1, className = "" }: Props) {
  const ref = useScrollReveal<HTMLDivElement>({ selector, stagger });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
