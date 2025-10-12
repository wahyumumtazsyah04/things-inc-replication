import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
export const metadata = {
    title: "About",
    description: "Learn about Things, Inc.",
    openGraph: { title: "About", description: "Learn about Things, Inc.", url: "/company/about", images: [{ url: "/api/og/static/about-us" }] },
    twitter: { card: "summary_large_image", title: "About", images: ["/api/og/static/about-us"] },
};

export default function AboutPage() {
    return (
        <DecorWrapper showGrid>
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "Things, Inc.",
                        url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
                    }),
                }}
            />
        </DecorWrapper>
    );
}
