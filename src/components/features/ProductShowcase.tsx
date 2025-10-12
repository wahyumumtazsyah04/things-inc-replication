"use client";
import Image from "next/image";
import Link from "next/link";
import SquircleCard from "@/components/ui/SquircleCard";
import { useScrollReveal } from "@/lib/animations";

export default function ProductShowcase() {
    const revealRef = useScrollReveal<HTMLDivElement>({ selector: ".reveal", stagger: 0.12 });

    return (
        <section aria-labelledby="our-things-heading" className="section">
            <h2 id="our-things-heading" className="mb-6 text-3xl font-bold">Our Things</h2>
            <div ref={revealRef} className="collage-grid">
                {/* Left: Big Rooms card spanning 2 rows */}
                <Link className="reveal group link-reset" href="/rooms" aria-label="Explore Rooms">
                    <SquircleCard className="relative h-full p-3 collage-float">
                        <div className="absolute left-3 top-3 z-10 rounded-full bg-[color:var(--foreground)]/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--background)] shadow">
                            2024 Apple Design Award
                        </div>
                        <Image src="/thingsinc/67297fcb3d8968f4ca826780_hex_room_1.webp" alt="Rooms mosaic" fill sizes="(max-width: 1024px) 90vw, 800px" className="card-bg object-cover" />
                        <div className="corner-dot tl" /><div className="corner-dot tr" />
                        <div className="caption-bubble" role="group" aria-label="Rooms">
                            <h3 className="title">Rooms</h3>
                            <p className="sub">Create & browse 3D, interactive rooms.</p>
                        </div>
                    </SquircleCard>
                </Link>

                {/* Right top: A Bunch of Things */}
                <Link className="reveal group link-reset" href="/a-bunch-of-things" aria-label="A Bunch of Things">
                    <SquircleCard className="relative h-full p-3 collage-float">
                        <Image src="/thingsinc/67297fcc8458fe142f15388a_hex_room_14.webp" alt="A Bunch of Things preview" fill sizes="(max-width: 1024px) 45vw, 520px" className="card-bg object-cover" />
                        <div className="corner-dot tr" />
                        <div className="caption-bubble small" role="group" aria-label="A Bunch of Things">
                            <h3 className="title">A Bunch of Things</h3>
                            <p className="sub">An immersive app for Apple Vision Pro that lets you plop things into space around you.</p>
                        </div>
                    </SquircleCard>
                </Link>

                {/* Right bottom: Worlds */}
                <Link className="reveal group link-reset" href="/worlds" aria-label="Worlds">
                    <SquircleCard className="relative h-full p-3 collage-float">
                        <Image src="/thingsinc/67297fcbec4cf962ce6be4a6_hex_room_19.webp" alt="Worlds preview" fill sizes="(max-width: 1024px) 45vw, 520px" className="card-bg object-cover" />
                        <div className="corner-dot tr" />
                        <div className="caption-bubble small" role="group" aria-label="Worlds">
                            <h3 className="title">Worlds</h3>
                            <p className="sub">Coming... eventually</p>
                        </div>
                    </SquircleCard>
                </Link>
            </div>
        </section>
    );
}
