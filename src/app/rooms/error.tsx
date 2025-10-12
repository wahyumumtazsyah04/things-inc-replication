"use client";
import React from "react";

export default function RoomsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {}, [error]);
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Rooms error</h1>
      <p className="mt-1 text-[color:var(--zenotika-muted)]">We couldn't load the rooms page. Please try again.</p>
      <div className="mt-6 flex gap-3">
        <button className="rounded-md border px-4 py-2" onClick={() => reset()}>Retry</button>
        <a className="rounded-md border px-4 py-2" href="/">Home</a>
      </div>
    </section>
  );
}
