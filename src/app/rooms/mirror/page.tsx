export const metadata = {
  title: "Mirror",
  description: "Reflections with personalityplayful, responsive, and alive.",
  alternates: { canonical: "/rooms/mirror" },
  openGraph: {
    title: "Mirror",
    description: "Reflections with personalityplayful, responsive, and alive.",
    url: "/rooms/mirror",
    images: [{ url: "/api/og/static/rooms/mirror" }],
  },
  twitter: { card: "summary_large_image", title: "Mirror", images: ["/api/og/static/rooms/mirror"] },
};
import RoomSubHero from "@/components/features/rooms/RoomSubHero";
import Reveal from "@/components/ui/Reveal";
import Script from "next/script";
export default function MirrorPage() {
  return (
    <>
      <Script id="jsonld-breadcrumbs-rooms-mirror" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Rooms", item: "/rooms" },
            { "@type": "ListItem", position: 3, name: "Mirror", item: "/rooms/mirror" },
          ],
        })}
      </Script>
      <RoomSubHero
        title="Mirror"
        subtitle="Reflections with personality—playful, responsive, and alive."
      />
      <section className="relative mx-auto max-w-6xl px-4 pb-12">
        <div className="tunnel-mask-soft -z-10" aria-hidden />
        <Reveal className="max-w-3xl">
          <p className="text-[color:var(--muted)]">Try interactions that react to presence and motion for a fun twist.</p>
        </Reveal>
      </section>
    </>
  );
}
