export const metadata = { title: "Furniture", alternates: { canonical: "/rooms/furniture" }, openGraph: { url: "/rooms/furniture" } };
import RoomSubHero from "@/components/features/rooms/RoomSubHero";
import Reveal from "@/components/ui/Reveal";
import Script from "next/script";
export default function FurniturePage() {
  return (
    <>
      <Script id="jsonld-breadcrumbs-rooms-furniture" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Rooms", item: "/rooms" },
            { "@type": "ListItem", position: 3, name: "Furniture", item: "/rooms/furniture" },
          ],
        })}
      </Script>
      <RoomSubHero
        title="Furniture"
        subtitle="Pieces that complete the scene with character and comfort."
      />
      <section className="relative mx-auto max-w-6xl px-4 pb-12">
        <div className="tunnel-mask-soft -z-10" aria-hidden />
        <Reveal className="max-w-3xl">
          <p className="text-[color:var(--muted)]">Chairs, tables, and accents curated for a playful yet minimal space.</p>
        </Reveal>
      </section>
    </>
  );
}
