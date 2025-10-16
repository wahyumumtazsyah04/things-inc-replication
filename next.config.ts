import type { NextConfig } from "next";
// Typed dynamic import for bundle analyzer (optional dependency)
type WithBundleAnalyzer = (opts?: { enabled?: boolean }) => (config: NextConfig) => NextConfig;
const loadBundleAnalyzer = async (): Promise<WithBundleAnalyzer> => {
  try {
    const mod: unknown = await import("@next/bundle-analyzer");
    if (
      typeof mod === "object" &&
      mod !== null &&
      "default" in (mod as Record<string, unknown>) &&
      typeof (mod as { default: unknown }).default === "function"
    ) {
      return (mod as { default: WithBundleAnalyzer }).default;
    }
    if (typeof mod === "function") {
      return mod as WithBundleAnalyzer;
    }
  } catch {
    // ignore if analyzer is not installed
  }
  return (_opts?: { enabled?: boolean }) => (config: NextConfig) => config;
};

const baseConfig: NextConfig = {
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
      // Removed sections → closest equivalents
      { source: "/blog", destination: "/log-book", permanent: false },
      { source: "/blog/:slug", destination: "/log-book/:slug", permanent: false },
      { source: "/search", destination: "/", permanent: false },
      { source: "/story", destination: "/", permanent: false },
      { source: "/rooms/displays", destination: "/rooms", permanent: false },
      { source: "/rooms/furniture", destination: "/rooms", permanent: false },
      { source: "/rooms/mirror", destination: "/rooms", permanent: false },
      { source: "/rooms/portal", destination: "/rooms", permanent: false },
      { source: "/pricing", destination: "/", permanent: false },
      { source: "/products", destination: "/", permanent: false },
    ];
  },
};
// If ANALYZE is enabled at runtime, wrap config with analyzer; otherwise export baseConfig
const configOrPromise = (async () => {
  if (process.env.ANALYZE === "true") {
    const withBundleAnalyzer = await loadBundleAnalyzer();
    return withBundleAnalyzer({ enabled: true })(baseConfig);
  }
  return baseConfig;
})();

export default (configOrPromise as unknown as NextConfig);
