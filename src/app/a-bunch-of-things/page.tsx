export const metadata = {
  title: "A Bunch of Things",
  description: "Place things in your space and view Rooms creations on Apple Vision Pro.",
  alternates: { canonical: "/a-bunch-of-things" },
  openGraph: {
    title: "A Bunch of Things",
    description: "Place things in your space and view Rooms creations on Apple Vision Pro.",
    type: "website",
    url: "/a-bunch-of-things",
    images: [{ url: "/api/og/static/a-bunch-of-things" }]
  },
  twitter: { card: "summary_large_image", title: "A Bunch of Things", images: ["/api/og/static/a-bunch-of-things"] },
};
export default function ABunchOfThingsPage() {
  return (
    <section className="section mx-auto max-w-6xl px-4">
      <h1 className="text-3xl font-semibold">A Bunch of Things</h1>
      <p className="mt-3 text-[color:var(--muted)]">Place things in your space from our library of nearly 10,000 things. Bring in the things you've made in Rooms and view them on Apple Vision Pro.</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-medium text-[color:var(--foreground)]">Place things in your space</h2>
          <p className="mt-1 text-[color:var(--foreground)]/85">Place things in your room from our library of nearly 10,000 things.</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-medium text-[color:var(--foreground)]">Bring in Rooms creations</h2>
          <p className="mt-1 text-[color:var(--foreground)]/85">Make things in Rooms, view them in the Vision Pro.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href="https://apps.apple.com/us/app/a-bunch-of-things/id6477489901"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--foreground)] px-5 py-2 text-sm font-medium text-[color:var(--background)] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zenotika-ring)]"
          aria-label="Download on the App Store (opens in new tab)"
        >
          Download on the App Store
        </a>
        <span className="inline-flex items-center gap-2 rounded-full border bg-[color:var(--background)]/70 px-3 py-1 text-xs text-[color:var(--foreground)]/80" aria-label="Available on Apple Vision Pro">
          <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--foreground)]/50" aria-hidden />
          Available on Vision Pro
        </span>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "A Bunch of Things",
            applicationCategory: "EntertainmentApplication",
            operatingSystem: "visionOS",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              url: "https://apps.apple.com/us/app/a-bunch-of-things/id6477489901"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "1000"
            }
          }),
        }}
      />
    </section>
  );
}
