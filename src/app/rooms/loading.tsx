"use client";
import React from "react";

export default function RoomsLoading() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            <div className="h-9 w-32 rounded bg-[color:var(--zenotika-surface)]/60 animate-pulse" />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-xl border p-4">
                        <div className="h-40 w-full rounded bg-[color:var(--zenotika-surface)]/60 animate-pulse" />
                        <div className="mt-3 h-4 w-1/2 rounded bg-[color:var(--zenotika-surface)]/50 animate-pulse" />
                    </div>
                ))}
            </div>
        </section>
    );
}
