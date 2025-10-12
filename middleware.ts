import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Request client hints for color scheme so we can SSR a better initial theme
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // Hint the browser to send Sec-CH-Prefers-Color-Scheme
  res.headers.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
  // Some browsers require delegation of client hints in permissions policy
  const existing = res.headers.get("Permissions-Policy");
  const policy = [
    existing || undefined,
    "ch-prefers-color-scheme=(self)",
    "geolocation=()",
    "microphone=()",
    "camera=()",
    "payment=()",
    "usb=()",
    "bluetooth=()",
    "magnetometer=()",
    "accelerometer=()",
    "gyroscope=()",
    "interest-cohort=()"
  ].filter(Boolean).join(", ");
  res.headers.set("Permissions-Policy", policy);
  // Baseline security headers
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-XSS-Protection", "0");
  // Cross origin isolation & agent clustering
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  res.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  res.headers.set("Origin-Agent-Cluster", "?1");
  // DNS prefetch control
  res.headers.set("X-DNS-Prefetch-Control", "on");
  // HSTS only in production and on HTTPS
  const isProd = process.env.NODE_ENV === "production";
  const proto = req.headers.get("x-forwarded-proto") || req.nextUrl.protocol;
  if (isProd && String(proto).startsWith("https")) {
    res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
  // Basic CSP (relaxed img and style for inline styles used in OG/animations)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://www.google-analytics.com",
    "font-src 'self' data:",
    "frame-src https://www.googletagmanager.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
  res.headers.set("Content-Security-Policy", csp);
  // Route-specific headers
  const { pathname } = req.nextUrl;
  // Noindex protect for search and API routes
  if (pathname.startsWith("/search") || pathname.startsWith("/api")) {
    res.headers.set("X-Robots-Tag", "noindex, follow");
  }
  // Cache headers for static assets under /thingsinc and generated OG images
  if (pathname.startsWith("/thingsinc/")) {
    res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }
  if (pathname.startsWith("/api/og/")) {
    res.headers.set("Cache-Control", "public, max-age=3600");
  }
  return res;
}

export const config = {
  matcher: ["/:path*"],
};
