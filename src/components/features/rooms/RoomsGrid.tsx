"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const items = [
  {
    href: "/rooms/displays",
    title: "Displays",
    copy: "Screens, scenes, and playful motion.",
    image: "/thingsinc/67297fcb78530d52931eec60_hex_room_9.webp",
  },
  {
    href: "/rooms/furniture",
    title: "Furniture",
    copy: "Pieces that complete the room.",
    image: "/thingsinc/67297fcb4eae3b907001bc57_hex_room_21.webp",
  },
  {
    href: "/rooms/mirror",
    title: "Mirror",
    copy: "Reflections with personality.",
    image: "/thingsinc/67297fcbe54722aaeb6349bb_hex_room_12.webp",
  },
  {
    href: "/rooms/portal",
    title: "Portal",
    copy: "Step into the next space.",
    image: "/thingsinc/67297fcc704e62c8fd08e130_hex_room_22.webp",
  },
];

export default function RoomsGrid() {
  return (
    <section id="rooms-grid" className="section mx-auto max-w-6xl px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Explore</h2>
      </div>
      <Reveal selector="> *" stagger={0.1} className="grid gap-6 grid-gap-responsive sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <Card key={it.href} className="group overflow-hidden p-0 tilt-3d hover:tilt-sm shimmer hover:shimmer">
            <Link href={it.href} className="block">
              <div className="relative h-40 w-full overflow-hidden">
                <Image src={it.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold">{it.title}</h3>
                <p className="mt-1 text-sm text-[color:var(--muted)]">{it.copy}</p>
                <Button variant="subtle" className="mt-3">Open</Button>
              </div>
            </Link>
          </Card>
        ))}
      </Reveal>
    </section>
  );
}
