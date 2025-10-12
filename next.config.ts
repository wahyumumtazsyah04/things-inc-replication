import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Silence workspace root inference warning by pinning this project as root
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Permit external images if we migrate assets from /public to CDNs
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Webflow-like CDN that hosts official site assets
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
    ],
  },
  async headers() {
    const headers: { source: string; headers: Array<{ key: string; value: string }> }[] = [];
    // Security headers (prod only hints are fine; Next will still set them locally)
    headers.push({
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        // Basic CSP placeholder (adjust routes/origins as you wire analytics/CDNs)
        { key: "Content-Security-Policy", value: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https:; frame-src https://www.googletagmanager.com;" },
      ],
    });
    // HSTS (only meaningful on HTTPS/production)
    headers.push({
      source: "/(.*)",
      headers: [
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      ],
    });
    // Long-term caching for immutable assets under /_next/static and /public/thingsinc
    headers.push({
      source: "/_next/static/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    });
    headers.push({
      source: "/thingsinc/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    });
    return headers;
  },
  async redirects() {
    return [
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/company/about", destination: "/about-us", permanent: true },
      { source: "/blog", destination: "/log-book", permanent: false },
      { source: "/blog/:slug", destination: "/log-book/:slug", permanent: false },
    ];
  },
};

export default nextConfig;
