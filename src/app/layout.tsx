import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { fontDisplay, fontSans } from "@/lib/fonts";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageTransitionProvider from "@/components/providers/PageTransitionProvider";
import ClientSideInjections from "@/components/providers/ClientSideInjections";
import DiagnosticsToggle from "@/components/providers/DiagnosticsToggle";
import { CollectiblesProvider } from "@/components/providers/CollectiblesProvider";
import { AmbienceProvider } from "@/components/providers/AmbienceProvider";
import RouteChangeEffects from "@/components/providers/RouteChangeEffects";
import CollectiblesHUD from "@/components/ui/CollectiblesHUD";
import ConsentBanner from "@/components/providers/ConsentBanner";

// fonts are centralized in src/lib/fonts (swap to local by replacing that module)

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Things, Inc.",
    template: "%s | Things, Inc.",
  },
  description: "Modern replication of Things, Inc. marketing site",
  icons: {
    // base favicon for wide compatibility
    icon: [
      { url: "/favicon.ico" },
      // light and dark favicon variants using day/night logos
      { url: "/thingsinc/6724406f04b26f75915dd8c2_Home-logo_day.png", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/thingsinc/6705b9208ebb9e666ec8413b_Home-logo_night.png", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      // Use day logo as Apple touch icon (iOS often ignores dark variants)
      { url: "/thingsinc/6724406f04b26f75915dd8c2_Home-logo_day.png", sizes: "180x180" },
    ],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Things, Inc.",
    title: "Things, Inc.",
    description: "Modern replication of Things, Inc. marketing site",
  },
  twitter: {
    card: "summary_large_image",
    site: "@thingsinc",
    creator: "@thingsinc",
    title: "Things, Inc.",
    description: "Modern replication of Things, Inc. marketing site",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-derived initial theme: cookie > client hint > day
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value as "day" | "night" | undefined;
  const hdrs = await headers();
  const prefersCH = hdrs.get("Sec-CH-Prefers-Color-Scheme")?.toLowerCase();
  let initialTheme: "day" | "night" = "night";
  if (themeCookie === "day" || themeCookie === "night") {
    initialTheme = themeCookie;
  } else if (prefersCH === "dark") {
    initialTheme = "night";
  } else if (prefersCH === "light") {
    initialTheme = "day";
  }
  return (
    <html lang="en" data-theme={initialTheme} suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontDisplay.variable} antialiased`}>
        <a href="#main" className="skip-link">Skip to content</a>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              var t = localStorage.getItem('theme');
              // If user has a stored preference, honor it by overriding SSR value; otherwise keep SSR theme
              if (t === 'day' || t === 'night') {
                document.documentElement.setAttribute('data-theme', t);
              } else {
                // Fallback: default to night to match Things Inc atmosphere
                document.documentElement.setAttribute('data-theme', 'night');
              }
            } catch (e) {}
          `}
        </Script>
        {/* Client-only utilities and analytics */}
        <ClientSideInjections />
        {/* Basic JSON-LD for Organization */}
        <Script id="jsonld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Things, Inc.",
            url: siteUrl,
            sameAs: [
              "https://www.youtube.com/@things-inc",
              "https://x.com/things",
              "https://www.threads.net/@things_incorporated?hl=en",
              "https://www.tiktok.com/@things",
              "https://discord.gg/rooms",
              "https://www.instagram.com/things_incorporated/"
            ],
            logo: `${siteUrl}/favicon.ico`
          })}
        </Script>
        {/* WebSite JSON-LD with potentialSearchAction (placeholder) */}
        <Script id="jsonld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Things, Inc.",
            url: siteUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </Script>
        <AmbienceProvider initialTheme={initialTheme}>
          <CollectiblesProvider>
            <SmoothScrollProvider>
              <Header />
              <PageTransitionProvider>
                <main id="main" className="min-h-[70vh]">
                  {children}
                </main>
              </PageTransitionProvider>
              {/* Ensure ScrollTrigger and scroll-based scenes refresh correctly on navigation */}
              <RouteChangeEffects />
              <Footer />
            </SmoothScrollProvider>
            {/* Optional HUD for development; enable via NEXT_PUBLIC_SHOW_HUD=true */}
            {process.env.NEXT_PUBLIC_SHOW_HUD === "true" && <CollectiblesHUD />}
          </CollectiblesProvider>
        </AmbienceProvider>
        {/* Consent banner (appears until accepted/declined) */}
        <ConsentBanner />
        {/* (moved to client only) */}
        {/* Dev diagnostics toggle: Alt+D to outline LCP and Canvas regions */}
        {process.env.NODE_ENV !== "production" && <DiagnosticsToggle />}
      </body>
    </html>
  );
}
