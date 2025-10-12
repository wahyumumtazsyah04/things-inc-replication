import type { MetadataRoute } from "next";
import { getMDXBySlug, listMDXSlugs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const now = new Date();
  // Pull all MDX posts under /src/content to surface as /log-book/:slug
  const mdxSlugs = listMDXSlugs();

  const urls: Array<MetadataRoute.Sitemap[number]> = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about-us`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/log-book`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  { url: `${base}/products`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  { url: `${base}/company/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    // Extra pages aligned to Things, Inc. analysis
    { url: `${base}/assets`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/worlds`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/rooms`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/rooms/displays`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/rooms/furniture`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/rooms/mirror`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/rooms/portal`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/a-bunch-of-things`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
  // Append MDX post detail pages, using frontmatter date when available
  for (const slug of mdxSlugs) {
    const post = getMDXBySlug(slug);
    const lm = (post?.date ? new Date(post.date) : now);
    urls.push({
      url: `${base}/log-book/${slug}`,
      lastModified: lm,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }
  return urls;
}
