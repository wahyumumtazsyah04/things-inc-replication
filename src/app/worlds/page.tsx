import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Worlds (Coming...)",
  description: "Worlds — Coming... eventually.",
  alternates: { canonical: "/worlds" },
  openGraph: {
    title: "Worlds (Coming...)",
    description: "Worlds — Coming... eventually.",
    type: "website",
    url: "/worlds",
    images: [{ url: "/api/og/static/worlds" }],
  },
  twitter: { card: "summary_large_image", title: "Worlds", images: ["/api/og/static/worlds"] },
};

export default function WorldsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-center">
      <h1 className="text-4xl font-bold">Worlds</h1>
      <p className="mt-3 text-[color:var(--zenotika-muted)]">Coming... eventually</p>
      <div className="mt-8 inline-block rounded-lg border px-4 py-2 text-sm text-[color:var(--zenotika-muted)]">
        Teaser page to mirror the official site.
      </div>
    </section>
  );
}
