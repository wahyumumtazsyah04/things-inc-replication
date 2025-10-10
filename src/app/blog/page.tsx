import Link from "next/link";
import { listMDXPosts } from "@/lib/mdx";
import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and updates from Things, Inc.",
  openGraph: {
    title: "Blog",
    description: "Articles and updates from Things, Inc.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Articles and updates from Things, Inc.",
  },
};

export default function BlogIndexPage() {
  const posts = listMDXPosts();
  return (
    <DecorWrapper>
      <SectionHeader title="Blog" subtitle="Articles and updates from Things, Inc." />
      <Reveal className="mt-4" selector="> li" stagger={0.08}>
        <ul className="mt-4 space-y-6">
          {posts.map((p: { slug: string; title: string; summary?: string; date?: string }) => (
          <li key={p.slug} className="border-b pb-6">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            {p.summary && <p className="mt-1 text-[color:var(--zenotika-muted)]">{p.summary}</p>}
            {p.date && <p className="mt-1 text-xs text-gray-500">{p.date}</p>}
          </li>
          ))}
        </ul>
      </Reveal>
    </DecorWrapper>
  );
}
