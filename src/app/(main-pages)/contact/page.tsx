export const metadata = {
    title: "Contact",
    description: "Get in touch with Things, Inc.",
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
                    <p className="text-[color:var(--muted)]">Wed love to hear from you. Drop a line and well get back soon.</p>
                </div>
            </Reveal>
        </DecorWrapper>
    );
}
