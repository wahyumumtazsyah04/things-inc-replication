import type { Metadata } from "next";
import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About us",
  description: "Learn more about Things, Inc.",
  alternates: { canonical: "/about-us" },
  openGraph: { title: "About us", description: "Learn more about Things, Inc.", url: "/about-us", images: [{ url: "/api/og/static/about-us" }] },
  twitter: { card: "summary_large_image", title: "About us", images: ["/api/og/static/about-us"] },
};

export default function AboutUsPage() {
  return (
    <DecorWrapper showGrid>
      <script
        id="jsonld-breadcrumbs-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "About us", item: "/about-us" },
            ],
          }),
        }}
      />
      <SectionHeader title="About Us" subtitle="We build delightful tools for modern teams." />
      <Reveal className="prose mt-6 max-w-3xl">
        <p>
          We are a small team exploring playful interfaces and emergent motion. We believe software can feel warm,
          approachable, and a little weird—in the best way. This replica tracks the spirit of Things, Inc. while
          staying accessible and performant.
        </p>
        <p className="mt-4">
          Under the hood: Next.js App Router, GSAP + ScrollTrigger synced with Lenis, framer-motion for transitions,
          and a touch of R3F for subtle WebGL depth.
        </p>
      </Reveal>
    </DecorWrapper>
  );
}
