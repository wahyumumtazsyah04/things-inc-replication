import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Media Assets",
    description: "Brand assets for press and partners.",
    alternates: { canonical: "/assets" },
    openGraph: { title: "Media Assets", description: "Brand assets for press and partners.", url: "/assets", images: [{ url: "/api/og/static/assets" }] },
    twitter: { card: "summary_large_image", title: "Media Assets", images: ["/api/og/static/assets"] },
};

function Asset({ src, alt, filename }: { src: string; alt: string; filename: string }) {
    return (
        <div className="rounded-lg border p-4">
            <Image src={src} alt={alt} width={480} height={240} className="h-auto w-full" />
            <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-[color:var(--zenotika-muted)]">{filename}</span>
                <a download href={src} className="underline" rel="noopener">Download</a>
            </div>
        </div>
    );
}

export default function MediaAssetsPage() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            <Script id="jsonld-assets-itemlist" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    name: "Media Assets",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, name: "Home-logo_day.png", url: "/thingsinc/6724406f04b26f75915dd8c2_Home-logo_day.png" },
                        { "@type": "ListItem", position: 2, name: "Home-logo_night.png", url: "/thingsinc/6705b9208ebb9e666ec8413b_Home-logo_night.png" },
                        { "@type": "ListItem", position: 3, name: "hex_room_1.webp", url: "/thingsinc/67297fcb3d8968f4ca826780_hex_room_1.webp" },
                    ],
                })}
            </Script>
            <h1 className="text-3xl font-bold">Media Assets</h1>
            <p className="mt-4 text-[color:var(--zenotika-muted)]">
                Download logo marks and imagery.
            </p>
            <h2 className="mt-8 text-xl font-semibold">Logos</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Asset src="/thingsinc/6724406f04b26f75915dd8c2_Home-logo_day.png" alt="Logo Day" filename="Home-logo_day.png" />
                <Asset src="/thingsinc/6705b9208ebb9e666ec8413b_Home-logo_night.png" alt="Logo Night" filename="Home-logo_night.png" />
                <Asset src="/thingsinc/6724406f04b26f75915dd8c2_Home-logo_day.webp" alt="Logo Day WebP" filename="Home-logo_day.webp" />
            </div>
            <h2 className="mt-10 text-xl font-semibold">Hex Rooms</h2>
            <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                <Asset src="/thingsinc/67297fcb3d8968f4ca826780_hex_room_1.webp" alt="hex room 1" filename="hex_room_1.webp" />
                <Asset src="/thingsinc/67297fcb79d42fdd90bf5e93_hex_room_2.webp" alt="hex room 2" filename="hex_room_2.webp" />
                <Asset src="/thingsinc/67297fcb7f6587d3dc450334_hex_room_6.webp" alt="hex room 6" filename="hex_room_6.webp" />
                <Asset src="/thingsinc/67297fcbc32f2abc0494d557_hex_room_4.webp" alt="hex room 4" filename="hex_room_4.webp" />
            </div>
        </section>
    );
}
