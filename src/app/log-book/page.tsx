import type { Metadata } from "next";
import { listMDXPosts } from "@/lib/mdx";
import Link from "next/link";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

export const metadata: Metadata = {
  title: "Log book",
  description: "Logs and updates from Things, Inc.",
  alternates: { canonical: "/log-book" },
};

export default function LogBookIndex() {
  const posts = listMDXPosts();
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <script
        id="jsonld-logbook-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Log book",
            itemListElement: posts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              url: `/log-book/${p.slug}`,
            })),
          }),
        }}
      />
      <script
        id="jsonld-breadcrumbs-logbook"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Log book", item: "/log-book" },
            ],
          }),
        }}
      />
      <h1 className="text-3xl font-bold">Log book</h1>
      <ul className="mt-6 space-y-4">
        {posts.map((p: { slug: string; title: string; summary?: string; date?: string }) => (
          <li key={p.slug} className="border-b pb-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/log-book/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            {p.summary && <p className="mt-1 text-[color:var(--zenotika-muted)]">{p.summary}</p>}
            {p.date && <p className="mt-1 text-xs text-gray-500">{p.date}</p>}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <NewsletterSignup />
      </div>
    </section>
  );
}
