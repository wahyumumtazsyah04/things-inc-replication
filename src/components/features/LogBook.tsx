"use client";
import Image from "next/image";
import Link from "next/link";
import SquircleCard from "@/components/ui/SquircleCard";
import { useScrollReveal } from "@/lib/animations";

export default function LogBook() {
  const revealRef = useScrollReveal<HTMLDivElement>({ selector: ".reveal", stagger: 0.12 });

  return (
    <section aria-labelledby="logbook-heading" className="section">
      <div className="flex items-end justify-between mb-6">
        <h2 id="logbook-heading" className="text-3xl font-bold">Log Book</h2>
        <Link href="/log-book" className="underline-anim text-sm">View all logs</Link>
      </div>
      <div ref={revealRef} className="collage-grid logbook-grid">
        {/* Featured big card (left, spans 2 rows) */}
        <a className="reveal group" href="#log-007" aria-label="Featured Log: Making Rooms 3.0">
          <SquircleCard className="relative h-full p-3 collage-float">
            <Image src="/thingsinc/67297fcb7f6587d3dc450334_hex_room_6.webp" alt="Making Rooms 3.0" fill sizes="(max-width: 1024px) 90vw, 800px" className="card-bg object-cover" />
            <div className="corner-dot tl" /><div className="corner-dot tr" />
            <div className="badge">Featured Log</div>
            <div className="caption-bubble">
              <div className="title">Making Rooms 3.0</div>
              <div className="sub">Log 007  /  2024.11.29</div>
            </div>
          </SquircleCard>
        </a>

        {/* Smaller cards */}
        <a className="reveal group" href="#log-006" aria-label="From Creator to Team Member: My Journey with Rooms">
          <SquircleCard className="relative h-full p-3 collage-float">
            <Image src="/thingsinc/67297fcb29a9d8b9fe2d90f7_hex_room_15.webp" alt="Journey with Rooms" fill sizes="(max-width: 1024px) 45vw, 520px" className="card-bg object-cover" />
            <div className="corner-dot tr" />
            <div className="caption-bubble small">
              <div className="title">From Creator to Team Member: My Journey with Rooms</div>
              <div className="sub">Log 006  /  2024.11.19</div>
            </div>
          </SquircleCard>
        </a>

        <a className="reveal group" href="#log-004" aria-label="From BASIC to Rooms.xyz">
          <SquircleCard className="relative h-full p-3 collage-float">
            <Image src="/thingsinc/67297fcbbce0b1362a45c672_hex_room_5.webp" alt="From BASIC to Rooms.xyz" fill sizes="(max-width: 1024px) 45vw, 520px" className="card-bg object-cover" />
            <div className="corner-dot tr" />
            <div className="caption-bubble small">
              <div className="title">From BASIC to Rooms.xyz</div>
              <div className="sub">Log 004  /  2023.05.22</div>
            </div>
          </SquircleCard>
        </a>
      </div>
    </section>
  );
}
