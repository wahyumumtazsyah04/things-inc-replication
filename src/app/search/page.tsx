import type { Metadata } from "next";
import Link from "next/link";
import { listMDXSlugs, getMDXBySlug } from "@/lib/mdx";
import Fuse from "fuse.js";
import type { FuseResult } from "fuse.js";

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
    const posts = slugs
        .map((s) => getMDXBySlug(s))
        .filter((p): p is NonNullable<ReturnType<typeof getMDXBySlug>> => Boolean(p));

    const fuse = new Fuse<typeof posts[number]>(posts, {
        includeScore: true,
        threshold: 0.38,
        ignoreLocation: true,
        keys: [
            { name: "title", weight: 0.6 },
            { name: "summary", weight: 0.25 },
            { name: "content", weight: 0.15 },
        ],
    });

    const results: typeof posts = q
        ? fuse.search(q).map((r: FuseResult<typeof posts[number]>) => r.item)
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
            <form method="get" action="/search" className="mt-4 flex gap-2" role="search" aria-label="Site search">
                <input
                    type="search"
                    name="q"
                    defaultValue={q}
                    placeholder="Search log book..."
                    className="flex-1 rounded-md border px-3 py-2 bg-transparent"
                    aria-label="Search term"
                />
                <button className="rounded-md border px-4 py-2" aria-label="Submit search">Search</button>
            </form>
            {q && (
                <div className="mt-8" aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-[color:var(--zenotika-muted)]">
                        Found {results.length} result{results.length === 1 ? "" : "s"} for "{q}".
                    </p>
                    <ul className="mt-4 space-y-4" role="list">
                        {results.length === 0 && (
                            <li className="text-[color:var(--zenotika-muted)]" role="note">
                                No results. Try different keywords or fewer terms.
                            </li>
                        )}
                        {results.map((r: typeof posts[number]) => (
                            <li key={r.slug} className="border-b pb-4" role="listitem">
                                <h2 className="text-xl font-semibold">
                                    <Link className="hover:underline focus:outline-none focus-visible:ring" href={`/log-book/${r.slug}`}>
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
