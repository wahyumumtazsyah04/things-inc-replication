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
    type FrontMatter = { title?: string; date?: string; summary?: string };
    const fm = data as FrontMatter;
  return {
    slug,
      title: fm.title ?? slug,
      date: fm.date,
      summary: fm.summary,
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
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
};
