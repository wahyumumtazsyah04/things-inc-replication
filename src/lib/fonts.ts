import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

// Centralized font exports. Currently using Google-hosted fonts.
// To self-host, copy src/lib/fonts.local.example.ts to src/lib/fonts.ts
// and place your WOFF2 files under public/fonts/ as described there.

export const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});
