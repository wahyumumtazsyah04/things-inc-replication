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

export default function ContactPage() {
    return (
        <DecorWrapper showGrid>
            <SectionHeader title="Contact" subtitle="Reach us at contact@example.com" />
            <Reveal className="mt-6 max-w-2xl">
                <div className="rounded-lg border p-4">
                    <p className="text-[color:var(--muted)]">We&#39;d love to hear from you. Drop a line and we&#39;ll get back soon.</p>
                </div>
            </Reveal>
        </DecorWrapper>
    );
}
