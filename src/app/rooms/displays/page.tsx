export const metadata = { title: "Displays", alternates: { canonical: "/rooms/displays" }, openGraph: { url: "/rooms/displays" } };
import RoomSubHero from "@/components/features/rooms/RoomSubHero";
import Reveal from "@/components/ui/Reveal";
import Script from "next/script";
export default function DisplaysPage() {
    return (
        <>
            <Script id="jsonld-breadcrumbs-rooms-displays" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                        { "@type": "ListItem", position: 2, name: "Rooms", item: "/rooms" },
                        { "@type": "ListItem", position: 3, name: "Displays", item: "/rooms/displays" },
                    ],
                })}
            </Script>
            <RoomSubHero
                title="Displays"
                subtitle="Screens, scenes, and playful motion that bring rooms to life."
                dayImageSrc="/thingsinc/670f18f95e251b5a9c8be968_Retro_TV_On2.png"
                nightImageSrc="/thingsinc/670f189c9bf07daf7a3e0e0e_Retro_TV_Off2.png"
            />
            <section className="relative mx-auto max-w-6xl px-4 pb-12">
                <div className="tunnel-mask-soft -z-10" aria-hidden />
                <Reveal className="max-w-3xl">
                    <p className="text-[color:var(--muted)]">Explore layouts and display compositions inspired by Things, Inc.</p>
                </Reveal>
            </section>
        </>
    );
}
