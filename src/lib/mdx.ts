/// <reference types="node" />
import 'server-only';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const contentDir = path.join(process.cwd(), "src", "content");

export type MDXPost = {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  image?: string;
  author?: string;
  number?: number;
  published?: boolean;
  content: string;
};

export function listMDXSlugs() {
  return fs
    .readdirSync(contentDir)
    .filter((f: string) => f.endsWith(".mdx"))
    .map((f: string) => f.replace(/\.mdx$/, ""));
}

export function getMDXBySlug(slug: string): MDXPost | null {
  const file = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
  type FrontMatter = { title?: string; date?: string; summary?: string; image?: string; author?: string; number?: number; published?: boolean };
    const fm = data as FrontMatter;
  // Derive a short summary if none is provided in frontmatter (first non-empty line up to 200 chars)
  const derivedSummary = (() => {
    if (fm.summary) return fm.summary;
    const firstLine = content.split(/\r?\n/).map(s => s.trim()).find(Boolean) || "";
    return firstLine ? (firstLine.length > 200 ? firstLine.slice(0, 197) + "..." : firstLine) : undefined;
  })();
  return {
    slug,
      title: fm.title ?? slug,
      date: fm.date,
      summary: derivedSummary,
      image: fm.image,
      author: fm.author,
      number: typeof fm.number === "number" ? fm.number : undefined,
      published: fm.published !== false,
    content,
  };
}

export function listMDXPosts(): Array<Pick<MDXPost, "slug" | "title" | "summary" | "date" | "number">> {
  return listMDXSlugs()
    .map((slug: string) => getMDXBySlug(slug))
    .filter((p: MDXPost | null): p is MDXPost => Boolean(p))
    .filter((p: MDXPost) => p.published !== false)
    .sort((a: MDXPost, b: MDXPost) => {
      // Descending by date; if missing or equal, fall back to slug
      if (a.date && b.date) {
        if (a.date === b.date) return a.slug.localeCompare(b.slug);
        return a.date < b.date ? 1 : -1;
      }
      if (a.date && !b.date) return -1;
      if (!a.date && b.date) return 1;
      return a.slug.localeCompare(b.slug);
    })
  .map(({ slug, title, summary, date, number }: MDXPost) => ({ slug, title, summary, date, number }));
}

export function getMdxOptions() {
  return {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  };
}
