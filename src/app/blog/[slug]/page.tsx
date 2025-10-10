import { notFound } from "next/navigation";
import { getMDXBySlug, listMDXSlugs, mdxOptions } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return listMDXSlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: Params) {
  const post = getMDXBySlug(params.slug);
  return {
    title: post ? post.title : "Post",
    description: post?.summary ?? undefined,
  };
}

export default function BlogPostPage({ params }: Params) {
  const post = getMDXBySlug(params.slug);
  if (!post) return notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 prose prose-zinc">
      <h1>{post.title}</h1>
      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
          },
        }}
      />
    </article>
  );
}
