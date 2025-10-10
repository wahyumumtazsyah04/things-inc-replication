import React from "react";

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-lg border bg-white p-6 shadow-sm ${className}`}>{children}</div>;
}
