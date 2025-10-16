export const metadata = {
    title: "Contact",
    description: "Get in touch with Things, Inc.",
    alternates: { canonical: "/contact" },
    openGraph: { title: "Contact", description: "Get in touch with Things, Inc.", url: "/contact", images: [{ url: "/api/og/static/contact" }] },
    twitter: { card: "summary_large_image", title: "Contact", images: ["/api/og/static/contact"] },
};

import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Script from "next/script";

export default function ContactPage() {
    return (
        <DecorWrapper showGrid>
            <Script id="jsonld-breadcrumbs-contact" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                        { "@type": "ListItem", position: 2, name: "Contact", item: "/contact" },
                    ],
                })}
            </Script>
            <SectionHeader title="Contact" subtitle="We read every email. Really." />
            <Reveal className="mt-6 max-w-2xl">
                <div className="rounded-lg border p-4">
                    <p className="text-[color:var(--muted)]">
                        Email us at
                        {" "}
                        <a className="font-medium underline" href="mailto:hi@things.inc?subject=Website%20Contact">hi@things.inc</a>.
                    </p>
                </div>
            </Reveal>
        </DecorWrapper>
    );
}
