"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NotFoundContent() {
  const pathname = usePathname();
  const router = useRouter();

  // Keyboard shortcuts: h,a,l,c to navigate quickly from the 404 "terminal".
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (["h", "a", "l", "c"].includes(key)) {
        e.preventDefault();
        if (key === "h") router.push("/");
        if (key === "a") router.push("/about-us");
        if (key === "l") router.push("/log-book");
        if (key === "c") router.push("/contact");
      }
      if (key === "enter") router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <section className="px-4 py-20" aria-labelledby="nf-title">
      <h1 id="nf-title" className="sr-only">
        404 Not Found
      </h1>

      <div
        className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg border bg-black font-mono text-[13px] leading-relaxed text-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
        role="region"
        aria-label="Terminal output"
      >
        {/* Scanlines overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20 mix-blend-plus-lighter [background:repeating-linear-gradient(180deg,rgba(0,0,0,0)_0px,rgba(0,0,0,0)_2px,rgba(255,255,255,0.06)_3px,rgba(0,0,0,0)_4px)]" />

        <div className="relative p-5">
          <p className="select-none text-xs uppercase tracking-[0.2em] text-emerald-400/70">
            Rooms BIOS v3.0 — 404 NOT FOUND
          </p>
          <div className="mt-3 h-px w-full bg-emerald-500/30" />

          <div className="mt-4 space-y-1">
            <p>$ system.check()</p>
            <p>› status: ok</p>
            <p>› route: {pathname || "/"}</p>
            <p>› error: resource missing</p>
          </div>

          <div className="mt-6 space-y-1">
            <p>$ help</p>
            <p>
              [H] Home <span className="text-emerald-500/50">·</span> [A] About
              <span className="text-emerald-500/50"> · </span>[L] Log book
              <span className="text-emerald-500/50"> · </span>[C] Contact
            </p>
          </div>

          <nav className="mt-4 flex flex-wrap gap-2" aria-label="404 navigation suggestions">
            <Link
              href="/"
              className="underline underline-offset-2 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
              aria-label="Go back to Home"
            >
              Home
            </Link>
            <span className="text-emerald-500/50">•</span>
            <Link
              href="/about-us"
              className="underline underline-offset-2 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
              aria-label="Read about us"
            >
              About us
            </Link>
            <span className="text-emerald-500/50">•</span>
            <Link
              href="/log-book"
              className="underline underline-offset-2 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
              aria-label="View the Log book"
            >
              Log book
            </Link>
            <span className="text-emerald-500/50">•</span>
            <Link
              href="/contact"
              className="underline underline-offset-2 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
              aria-label="Contact us"
            >
              Contact
            </Link>
          </nav>

          <div className="mt-6 flex items-center">
            <span className="pr-2">$</span>
            <span aria-hidden className="blink-cursor inline-block h-4 w-2 translate-y-[1px] bg-emerald-300" />
            <span className="sr-only">Blinking cursor</span>
          </div>
        </div>

        {/* Local keyframes for blinking cursor */}
        <style jsx>{`
          @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
          .blink-cursor { animation: blink 1.2s steps(2) infinite; }
          @media (prefers-reduced-motion: reduce) {
            .blink-cursor { animation: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
