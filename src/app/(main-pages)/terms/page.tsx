import type { Metadata } from "next";
import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
    title: "Terms",
    description: "Terms of Service for Things, Inc.",
    alternates: { canonical: "/terms" },
    openGraph: { title: "Terms", description: "Terms of Service for Things, Inc.", url: "/terms", images: [{ url: "/api/og/static/terms" }] },
    twitter: { card: "summary_large_image", title: "Terms", images: ["/api/og/static/terms"] },
};

export default function TermsPage() {
    const lastUpdated = "2025-10-17";
    return (
        <DecorWrapper showGrid>
            <script
                id="jsonld-breadcrumbs-terms"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                            { "@type": "ListItem", position: 2, name: "Terms", item: "/terms" },
                        ],
                    }),
                }}
            />

            <SectionHeader title="Terms of Service" subtitle={`Last updated ${lastUpdated}`} />

            <Reveal className="prose mt-6 max-w-3xl">
                <p>
                    By using this site, you agree to the following terms. These terms may change from time to time; if they do,
                    we&rsquo;ll update the date above.
                </p>

                <h2 id="use">Acceptable use</h2>
                <p>
                    Don&rsquo;t misuse or attempt to disrupt the service. You may not reverse engineer, exploit, or attempt to
                    access private areas without authorization.
                </p>

                <h2 id="content">Content</h2>
                <p>
                    Content on this site is provided &quot;as is&quot; for informational purposes. We retain ownership over assets and
                    original work unless otherwise stated.
                </p>

                <h2 id="privacy">Privacy</h2>
                <p>
                    Our <a href="/privacy">Privacy Policy</a> explains how we collect and use data. By using the site, you also
                    agree to that policy.
                </p>

                <h2 id="liability">Limitation of liability</h2>
                <p>
                    To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages
                    arising from your use of the site.
                </p>

                <h2 id="contact">Contact</h2>
                <p>
                    Questions? Visit the <a href="/contact">contact</a> page.
                </p>
            </Reveal>
        </DecorWrapper>
    );
}
