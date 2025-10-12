export const metadata = {
    title: "Privacy",
    description: "Privacy policy for Things, Inc.",
    alternates: { canonical: "/privacy" },
    openGraph: { title: "Privacy", description: "Privacy policy for Things, Inc.", url: "/privacy", images: [{ url: "/api/og/static/privacy" }] },
    twitter: { card: "summary_large_image", title: "Privacy", images: ["/api/og/static/privacy"] },
};

import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

export default function PrivacyPage() {
    return (
        <DecorWrapper>
            <SectionHeader title="Privacy Policy" subtitle="This is a placeholder privacy policy page." />
        </DecorWrapper>
    );
}
