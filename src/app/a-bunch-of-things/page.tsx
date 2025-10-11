export const metadata = {
  title: "A Bunch of Things",
  description: "A collection of demos and playful experiments.",
  openGraph: { title: "A Bunch of Things", description: "A collection of demos and playful experiments.", type: "website" },
  twitter: { card: "summary", title: "A Bunch of Things" },
};
export default function ABunchOfThingsPage() {
  return (
    <section className="section mx-auto max-w-6xl px-4">
      <h1>A Bunch of Things</h1>
      <p className="mt-3 text-[color:var(--muted)]">A collection page placeholder aligning with the Things, Inc. sitemap.</p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "A Bunch of Things",
            itemListElement: [],
          }),
        }}
      />
    </section>
  );
}
