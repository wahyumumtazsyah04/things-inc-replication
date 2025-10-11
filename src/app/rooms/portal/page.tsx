import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Portal",
    description: "Step into the next space—playful transitions between scenes.",
    openGraph: {
        title: "Portal",
        description: "Step into the next space—playful transitions between scenes.",
        type: "website",
        url: "/rooms/portal",
    },
    twitter: {
        card: "summary_large_image",
        title: "Portal",
        description: "Step into the next space—playful transitions between scenes.",
    },
    alternates: { canonical: "/rooms/portal" },
};
import Image from "next/image";
import PortalHero from "./PortalHero";
import Script from "next/script";

export default function PortalPage() {
    return (
        <>
            <Script id="jsonld-breadcrumbs-rooms-portal" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                        { "@type": "ListItem", position: 2, name: "Rooms", item: "/rooms" },
                        { "@type": "ListItem", position: 3, name: "Portal", item: "/rooms/portal" },
                    ],
                })}
            </Script>
            <PortalHero />
            <section className="mx-auto max-w-6xl px-4 pb-16">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <h2 className="mb-2">Linked spaces</h2>
                        <p className="text-[color:var(--muted)]">Link rooms with smooth motion and a dash of mystery. Transitions can feel like stepping through a veil.</p>
                    </div>
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden border">
                        <Image
                            src="/thingsinc/67297fcb3d8968f4ca826780_hex_room_1.webp"
                            alt="Portal visual"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={false}
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
