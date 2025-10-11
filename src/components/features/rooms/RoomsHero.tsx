"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFadeInUp, useParallax, useParallaxScale } from "@/lib/animations";
import Magnetic from "@/components/ui/Magnetic";
import WordReveal from "@/components/ui/WordReveal";

export default function RoomsHero() {
  const h1Ref = useFadeInUp<HTMLHeadingElement>(0);
  const pRef = useFadeInUp<HTMLParagraphElement>(0.05);
  const ctaRef = useFadeInUp<HTMLAnchorElement>(0.1);

  const cloudLeftDay = useParallax<HTMLImageElement>(24, { scrub: 0.55, mobileAmount: 12 });
  const cloudLeftNight = useParallax<HTMLImageElement>(24, { scrub: 0.55, mobileAmount: 12 });
  const cloudRightDay = useParallax<HTMLImageElement>(34, { scrub: 0.65, mobileAmount: 16 });
  const cloudRightNight = useParallax<HTMLImageElement>(34, { scrub: 0.65, mobileAmount: 16 });
  const fgScaleRef = useParallaxScale<HTMLDivElement>(8, 0.995, 1.01, { scrub: 0.6 });
  const qPurpleRef = useParallax<HTMLImageElement>(22, { scrub: 0.55, mobileAmount: 10 });
  const qBlueRef = useParallax<HTMLImageElement>(30, { scrub: 0.7, mobileAmount: 14 });

  return (
    <section className="section relative mx-auto max-w-6xl px-4 pt-16 sm:pt-20 md:pt-24 pb-12">
      {/* Mosaic bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]">
        <div className="absolute -left-16 top-10 hidden h-56 w-56 rotate-3 sm:block" style={{ backgroundImage: 'url(/thingsinc/67297fcb3d8968f4ca826780_hex_room_1.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
        <div className="absolute right-0 top-16 hidden h-56 w-56 -rotate-3 sm:block" style={{ backgroundImage: 'url(/thingsinc/67297fcb7f6587d3dc450334_hex_room_6.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
      </div>

      {/* Tunnel mask */}
      <div className="tunnel-mask-soft -z-10" />

      {/* Clouds */}
      <Image ref={cloudLeftDay} src="/thingsinc/66f367a8274968c5aa82329f_footer-clouds-left_day.png" alt="" aria-hidden width={340} height={180} className="theme-day-only pointer-events-none hero-cloud-left opacity-70 sm:opacity-80" />
      <Image ref={cloudLeftNight} src="/thingsinc/66f367a85cb2687ca4e30838_footer-clouds-left_night.png" alt="" aria-hidden width={340} height={180} className="theme-night-only pointer-events-none hero-cloud-left opacity-70" />
      <Image ref={cloudRightDay} src="/thingsinc/66f367a804f8c9cd92a372ce_footer-cloud-right_day.png" alt="" aria-hidden width={380} height={200} className="theme-day-only pointer-events-none hero-cloud-right opacity-70 sm:opacity-80" />
      <Image ref={cloudRightNight} src="/thingsinc/66f367536d9cdf539095c9eb_footer-cloud-right_night.png" alt="" aria-hidden width={380} height={200} className="theme-night-only pointer-events-none hero-cloud-right opacity-70" />

      <div ref={fgScaleRef} className="relative max-w-2xl">
        <div ref={h1Ref}>
          <WordReveal as="h1" stagger={0.05} className="tracking-tight">Rooms</WordReveal>
        </div>
        <p ref={pRef} className="mt-3 text-[color:var(--muted)]">A playful collection of interactive spaces inspired by Things, Inc.—from displays and furniture to mirrors and portals.</p>
        <div className="mt-6">
              <Magnetic>
                <Link ref={ctaRef} href="#rooms-grid" className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-[color:var(--zenotika-accent)] text-[color:var(--zenotika-accent-contrast)] hover:bg-[color:var(--zenotika-accent-hover)] focus-visible:ring-[color:var(--zenotika-ring)] link-reset">
                  Browse rooms
                </Link>
              </Magnetic>
        </div>
      </div>

      {/* Themed question marks */}
      <Image
        ref={qPurpleRef}
        src="/thingsinc/670336a784858cd4b8e6b008_question mark purple 1.png"
        alt=""
        aria-hidden
        width={52}
        height={52}
        className="pointer-events-none rooms-q-purple hidden sm:block"
      />
      <Image
        ref={qBlueRef}
        src="/thingsinc/673e3f91a57cfea22147b7da_question mark blue.png"
        alt=""
        aria-hidden
        width={50}
        height={50}
        className="pointer-events-none rooms-q-blue hidden sm:block"
      />
    </section>
  );
}
