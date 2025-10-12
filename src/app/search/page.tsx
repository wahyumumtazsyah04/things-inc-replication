import type { Metadata } from "next";
import Link from "next/link";
import { listMDXSlugs, getMDXBySlug } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Search",
  description: "Search logs and content.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

type Props = { searchParams: { q?: string } };

export default function SearchPage({ searchParams }: Props) {
  const q = (searchParams.q || "").toString().trim();
  const slugs = listMDXSlugs();
  const results = q
    ? slugs
        .map((s) => getMDXBySlug(s))
        .filter((p): p is NonNullable<ReturnType<typeof getMDXBySlug>> => Boolean(p))
        .filter((p) => {
          const needle = q.toLowerCase();
          return (
            p.title.toLowerCase().includes(needle) ||
            (p.summary || "").toLowerCase().includes(needle) ||
            p.content.toLowerCase().includes(needle)
          );
        })
    : [];

  const jsonLd = q
    ? {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        name: `Search results for ${q}`,
        about: q,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: results.map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `/log-book/${r.slug}`,
            name: r.title,
          })),
        },
      }
    : null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      {jsonLd && (
        <script
          id="jsonld-search-results"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <h1 className="text-3xl font-bold">Search</h1>
      <form method="get" action="/search" className="mt-4 flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search log book..."
          className="flex-1 rounded-md border px-3 py-2 bg-transparent"
          aria-label="Search term"
        />
        <button className="rounded-md border px-4 py-2">Search</button>
      </form>
      {q && (
        <div className="mt-8">
          <p className="text-sm text-[color:var(--zenotika-muted)]">
            Found {results.length} result{results.length === 1 ? "" : "s"} for "{q}".
          </p>
          <ul className="mt-4 space-y-4">
            {results.map((r) => (
              <li key={r.slug} className="border-b pb-4">
                <h2 className="text-xl font-semibold">
                  <Link className="hover:underline" href={`/log-book/${r.slug}`}>
                    {r.title}
                  </Link>
                </h2>
                {r.summary && (
                  <p className="mt-1 text-[color:var(--zenotika-muted)]">{r.summary}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
