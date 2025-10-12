"use client";
import React from "react";
import { useCollectibles } from "@/components/providers/CollectiblesProvider";

export default function CollectiblesHUD() {
  const { state, reset } = useCollectibles();
  const entries = Object.entries(state);
  return (
    <section
      className="fixed bottom-4 right-4 z-[65] rounded-md border bg-[color:var(--background)]/85 px-3 py-2 text-xs backdrop-blur supports-[backdrop-filter]:bg-[color:var(--overlay-bg)]"
      aria-label="Collectibles heads-up display"
    >
      <h2 className="mb-1 font-medium text-[color:var(--foreground)]/80 text-sm">Collectibles</h2>
      <ul className="grid grid-cols-3 gap-2 text-[color:var(--foreground)]/75" aria-live="polite" aria-atomic="true">
        {entries.map(([k, v]) => (
          <li key={k} className="flex items-center gap-1">
            <span className="uppercase" aria-hidden>
              {k}
            </span>
            <span
              className="rounded bg-[color:var(--zenotika-surface)] px-1 text-[color:var(--foreground)]/90"
              aria-label={`${k} collected: ${v}`}
            >
              {v}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-2 text-right">
        <button
          className="rounded px-2 py-1 text-[color:var(--foreground)]/70 hover:bg-[color:var(--zenotika-surface)] focus-visible:outline-none focus-visible:ring"
          onClick={reset}
          aria-label="Reset collectibles"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
