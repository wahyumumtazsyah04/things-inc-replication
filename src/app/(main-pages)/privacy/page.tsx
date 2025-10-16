import type { Metadata } from "next";
import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
    title: "Privacy",
    description: "Privacy policy for Things, Inc.",
    alternates: { canonical: "/privacy" },
    openGraph: { title: "Privacy", description: "Privacy policy for Things, Inc.", url: "/privacy", images: [{ url: "/api/og/static/privacy" }] },
    twitter: { card: "summary_large_image", title: "Privacy", images: ["/api/og/static/privacy"] },
};

export default function PrivacyPage() {
    const lastUpdated = "2025-10-17";
    return (
        <DecorWrapper showGrid>
            <script
                id="jsonld-breadcrumbs-privacy"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                            { "@type": "ListItem", position: 2, name: "Privacy", item: "/privacy" },
                        ],
                    }),
                }}
            />

            <SectionHeader title="Privacy Policy" subtitle={`Last updated ${lastUpdated}`} />

            <Reveal className="prose mt-6 max-w-3xl">
                <p>
                    Your privacy matters. This page describes what data we collect, how we use it, and the choices you have.
                </p>

                <h2 id="what-we-collect">Information we collect</h2>
                <ul>
                    <li>
                        Email address you provide for the newsletter or contact requests.
                    </li>
                    <li>
                        Basic device and usage data (e.g., pages viewed) to improve the site. Analytics are consent-gated and
                        respect your preferences.
                    </li>
                </ul>

                <h2 id="how-we-use">How we use information</h2>
                <ul>
                    <li>To deliver the site and its features reliably and securely.</li>
                    <li>To send occasional updates you explicitly signed up for (you can unsubscribe at any time).</li>
                      <li>To understand what&rsquo;s working and improve the experience.</li>
                </ul>

                <h2 id="cookies">Cookies and similar technologies</h2>
                <p>
                    We use essential cookies for things like session continuity and non-essential cookies (e.g., analytics) only
                    with your consent. You can update your choices anytime via the consent banner.
                </p>

                <h2 id="sharing">Sharing</h2>
                <p>
                      We don&rsquo;t sell your personal information. We may use trusted service providers (e.g., hosting, email) who
                    process data on our behalf under appropriate agreements.
                </p>

                <h2 id="your-rights">Your rights</h2>
                <p>
                    Depending on your location, you may have rights to access, correct, or delete your data. To exercise these
                    rights, contact us.
                </p>

                <h2 id="contact">Contact</h2>
                <p>
                      Questions about privacy? Email us via the contact page. We&rsquo;ll get back to you.
                </p>
            </Reveal>
        </DecorWrapper>
    );
}
