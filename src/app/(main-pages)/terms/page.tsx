export const metadata = {
    title: "Terms",
    description: "Terms of Service for Things, Inc.",
    alternates: { canonical: "/terms" },
    openGraph: { title: "Terms", description: "Terms of Service for Things, Inc.", url: "/terms", images: [{ url: "/api/og/static/terms" }] },
    twitter: { card: "summary_large_image", title: "Terms", images: ["/api/og/static/terms"] },
};

import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

export default function TermsPage() {
    return (
        <DecorWrapper>
            <SectionHeader title="Terms of Service" subtitle="This is a placeholder terms page." />
        </DecorWrapper>
    );
}
