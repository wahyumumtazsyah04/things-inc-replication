import { notFound } from "next/navigation";
import { getMDXBySlug, listMDXSlugs, listMDXPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/mdx/MDXComponents";
import Script from "next/script";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import DecorWrapper from "@/components/decor/DecorWrapper";
import Reveal from "@/components/ui/Reveal";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return listMDXSlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: Params) {
  const post = getMDXBySlug(params.slug);
  const title = post ? post.title : "Log";
  const description = post?.summary ?? undefined;
  const ogUrl = post?.image ? post.image : `/api/og/log-book/${params.slug}`;
  const ogImages = ogUrl ? [{ url: ogUrl }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: `/log-book/${params.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/log-book/${params.slug}`,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages?.map((i) => i.url),
    },
  } as any;
}

export default function LogBookPostPage({ params }: Params) {
  const post = getMDXBySlug(params.slug);
  if (!post) return notFound();
  const all = listMDXPosts();
  const idx = all.findIndex((p) => p.slug === params.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx !== -1 && idx < all.length - 1 ? all[idx + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": `/log-book/${params.slug}` },
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    image: post.image ? [post.image] : undefined,
    wordCount: post.content ? post.content.split(/\s+/).length : undefined,
    author: post.author ? { "@type": "Person", name: post.author, url: "/about-us" } : undefined,
    publisher: {
      "@type": "Organization",
      name: "Things, Inc.",
      logo: { "@type": "ImageObject", url: "/favicon.ico" }
    }
  };
  const serializeOptions = ({
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [
          rehypePrettyCode,
          {
            theme: {
              dark: "one-dark-pro",
              light: "github-light",
            },
            keepBackground: false,
          },
        ],
      ],
    },
  } as unknown) as any;
  return (
    <DecorWrapper>
      <Reveal selector="> *" stagger={0.06} className="mx-auto max-w-3xl">
        <article className="prose prose-zinc">
          <Script id="post-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <Script id="breadcrumbs-logbook-post" type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                { "@type": "ListItem", position: 2, name: "Log book", item: "/log-book" },
                { "@type": "ListItem", position: 3, name: post.title, item: `/log-book/${params.slug}` },
              ],
            })
          }} />
          <h1>{post.title}</h1>
          <p className="mt-1 text-xs text-[color:var(--zenotika-muted)]">
            {post.date && <time dateTime={post.date}>{post.date}</time>}
            {post.author && <> • By {post.author}</>}
          </p>
          <MDXRemote
            source={post.content}
            options={serializeOptions}
            components={MDXComponents}
          />
          <nav className="mt-10 flex items-center justify-between text-sm">
            <span>
              {prev && (
                <a className="underline-anim link-reset" href={`/log-book/${prev.slug}`} rel="prev">← {prev.title}</a>
              )}
            </span>
            <span>
              {next && (
                <a className="underline-anim link-reset" href={`/log-book/${next.slug}`} rel="next">{next.title} →</a>
              )}
            </span>
          </nav>
        </article>
      </Reveal>
    </DecorWrapper>
  );
}
