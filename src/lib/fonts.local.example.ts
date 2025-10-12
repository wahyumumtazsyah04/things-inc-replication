import localFont from "next/font/local";

// Self-hosted font scaffold (WOFF2)
// 1) Place your font files under public/fonts/
//    e.g., public/fonts/plus-jakarta-sans-regular.woff2, ...-bold.woff2
// 2) Rename this file to fonts.ts to replace the google-hosted setup.
// 3) Ensure variables match existing CSS expectations: --font-sans, --font-display.

export const fontSans = localFont({
  src: [
    { path: "/fonts/plus-jakarta-sans-regular.woff2", weight: "400", style: "normal" },
    { path: "/fonts/plus-jakarta-sans-medium.woff2", weight: "500", style: "normal" },
    { path: "/fonts/plus-jakarta-sans-semibold.woff2", weight: "600", style: "normal" },
    { path: "/fonts/plus-jakarta-sans-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const fontDisplay = localFont({
  src: [
    { path: "/fonts/space-grotesk-regular.woff2", weight: "400", style: "normal" },
    { path: "/fonts/space-grotesk-medium.woff2", weight: "500", style: "normal" },
    { path: "/fonts/space-grotesk-semibold.woff2", weight: "600", style: "normal" },
    { path: "/fonts/space-grotesk-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});
