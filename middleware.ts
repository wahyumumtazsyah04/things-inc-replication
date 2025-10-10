import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Request client hints for color scheme so we can SSR a better initial theme
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // Hint the browser to send Sec-CH-Prefers-Color-Scheme
  res.headers.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
  // Some browsers require delegation of client hints in permissions policy
  const existing = res.headers.get("Permissions-Policy");
  const policy = `${existing ? existing + ", " : ""}ch-prefers-color-scheme=(self)`;
  res.headers.set("Permissions-Policy", policy);
  return res;
}

export const config = {
  matcher: ["/:path*"],
};
