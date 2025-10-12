"use client";
import React from "react";

export default function StoryLoading() {
    return (
        <section className="mx-auto max-w-5xl px-4 py-12">
            <div className="h-8 w-24 rounded bg-[color:var(--zenotika-surface)]/60 animate-pulse" />
            <div className="mt-8 space-y-10">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-[60vh] rounded-xl border p-4">
                        <div className="h-full w-full rounded bg-[color:var(--zenotika-surface)]/50 animate-pulse" />
                    </div>
                ))}
            </div>
        </section>
    );
}
