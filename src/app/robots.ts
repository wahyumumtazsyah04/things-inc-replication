import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
  return {
    rules: isProd
      ? [
          { userAgent: "*", allow: "/" },
          { userAgent: "*", disallow: "/search" },
          { userAgent: "*", disallow: "/api" },
        ]
      : [
          // Disallow everything on non-production to avoid accidental indexing
          { userAgent: "*", disallow: "/" },
        ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
