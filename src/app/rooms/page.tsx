export const metadata = {
  title: "Rooms",
  description: "Explore interactive rooms inspired by Things, Inc.",
  alternates: { canonical: "/rooms" },
  openGraph: {
    title: "Rooms",
    description: "Explore interactive rooms inspired by Things, Inc.",
    type: "website",
    url: "/rooms",
    images: [{ url: "/api/og/static/rooms" }],
  },
  twitter: { card: "summary_large_image", title: "Rooms", images: ["/api/og/static/rooms"] },
};
import RoomsHero from "@/components/features/rooms/RoomsHero";
import Testimonials from "@/components/features/rooms/Testimonials";
import Script from "next/script";

export default function RoomsPage() {
  return (
    <>
      <Script id="jsonld-breadcrumbs-rooms" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Rooms", item: "/rooms" },
          ],
        })}
      </Script>
      <RoomsHero />
      <Testimonials />
    </>
  );
}
