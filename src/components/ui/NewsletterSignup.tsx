"use client";
import React from "react";

type Props = {
  className?: string;
  heading?: string;
  subheading?: string;
};

export default function NewsletterSignup({ className = "", heading, subheading }: Props) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={`rounded-xl border p-5 sm:p-6 bg-[color:var(--zenotika-surface)]/60 ${className}`} aria-labelledby="newsletter-heading">
      <h3 id="newsletter-heading" className="text-xl font-semibold text-[color:var(--foreground)]">
        {heading ?? "Stay up to date with all things Things"}
      </h3>
      <p className="mt-1 text-sm text-[color:var(--zenotika-muted)]">
        {subheading ?? "Join our mailing list to be the first to know about new features and releases."}
      </p>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 flex-1 rounded-md border bg-[color:var(--background)] px-3 text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--link-hover)]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-10 shrink-0 rounded-md bg-[color:var(--foreground)] px-4 text-[color:var(--background)] hover:opacity-90 disabled:opacity-70"
        >
          {status === "loading" ? "Signing up..." : status === "success" ? "Signed up!" : "Sign up"}
        </button>
      </form>
      {status === "error" && (
        <p role="alert" className="mt-2 text-sm text-red-500">Something went wrong. Please try again.</p>
      )}
    </section>
  );
}
