import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageTransitionProvider from "@/components/providers/PageTransitionProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import RouteChangeEffects from "@/components/providers/RouteChangeEffects";
import AnalyticsEvents from "@/components/providers/AnalyticsEvents";
import { CollectiblesProvider } from "@/components/providers/CollectiblesProvider";
import { AmbienceProvider } from "@/components/providers/AmbienceProvider";
import CollectiblesHUD from "@/components/ui/CollectiblesHUD";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

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
  let initialTheme: "day" | "night" = "day";
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
                // Fallback: use local time-of-day if no stored preference (day: 6-18h, night: otherwise)
                var h = new Date().getHours();
                var auto = (h >= 6 && h < 18) ? 'day' : 'night';
                document.documentElement.setAttribute('data-theme', auto);
              }
            } catch (e) {}
          `}
        </Script>
        {/* Analytics: GA4 and/or GTM, loaded only if env vars are present */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <Script id="gtm-init" strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        {/* Basic JSON-LD for Organization */}
        <Script id="jsonld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Things, Inc.",
            url: siteUrl,
            sameAs: [
              "https://www.youtube.com/@thingsinc",
              "https://x.com/thingsinc",
              "https://www.threads.net/@thingsinc",
              "https://www.tiktok.com/@thingsinc",
              "https://discord.gg/thingsinc",
              "https://www.instagram.com/thingsinc/"
            ],
            logo: `${siteUrl}/favicon.ico`
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
              <Footer />
            </SmoothScrollProvider>
            {/* Optional HUD for development; enable via NEXT_PUBLIC_SHOW_HUD=true */}
            {process.env.NEXT_PUBLIC_SHOW_HUD === "true" && <CollectiblesHUD />}
          </CollectiblesProvider>
        </AmbienceProvider>
        {/* Handle scroll + ScrollTrigger refresh on navigation */}
        <RouteChangeEffects />
        {/* Custom cursor for desktop pointers (hidden on touch automatically) */}
        <CustomCursor />
        {/* Analytics event wiring (pageviews + scroll depth) */}
        <AnalyticsEvents />
      </body>
    </html>
  );
}
