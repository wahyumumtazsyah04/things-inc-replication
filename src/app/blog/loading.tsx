"use client";
import React from "react";

export default function BlogLoading() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="h-8 w-28 rounded bg-[color:var(--zenotika-surface)]/60 animate-pulse" />
      <div className="mt-6 space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="h-5 w-2/3 rounded bg-[color:var(--zenotika-surface)]/60 animate-pulse" />
            <div className="mt-3 h-4 w-1/2 rounded bg-[color:var(--zenotika-surface)]/50 animate-pulse" />
            <div className="mt-2 h-3 w-1/3 rounded bg-[color:var(--zenotika-surface)]/40 animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}
