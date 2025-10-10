import Link from "next/link";
import { listMDXPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog",
  description: "Articles and updates",
};

export default function BlogIndexPage() {
  const posts = listMDXPosts();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <ul className="mt-8 space-y-6">
  {posts.map((p: { slug: string; title: string; summary?: string; date?: string }) => (
          <li key={p.slug} className="border-b pb-6">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            {p.summary && <p className="mt-1 text-gray-600">{p.summary}</p>}
            {p.date && <p className="mt-1 text-xs text-gray-500">{p.date}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
