import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date();
  const urls: Array<MetadataRoute.Sitemap[number]> = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/company/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    // Extra pages aligned to Things, Inc. sitemap analysis
    { url: `${base}/rooms`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/rooms/displays`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/rooms/furniture`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/rooms/mirror`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/rooms/portal`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/a-bunch-of-things`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
  return urls;
}
