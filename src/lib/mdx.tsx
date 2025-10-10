// deprecated file intentionally left blank
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
  return {
    slug,
    title: data.title ?? slug,
    date: data.date,
    summary: data.summary,
    image: data.image,
    content,
  };
}

export function listMDXPosts(): Array<Pick<MDXPost, "slug" | "title" | "summary" | "date">> {
  return listMDXSlugs()
    .map((slug: string) => getMDXBySlug(slug))
    .filter((p: MDXPost | null): p is MDXPost => Boolean(p))
    .sort((a: MDXPost, b: MDXPost) => (a.date && b.date ? (a.date < b.date ? 1 : -1) : 0))
    .map(({ slug, title, summary, date }: MDXPost) => ({ slug, title, summary, date }));
}

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
};


