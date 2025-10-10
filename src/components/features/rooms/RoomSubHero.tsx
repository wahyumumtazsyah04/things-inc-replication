"use client";
import React from "react";
import Image from "next/image";
import { useFadeInUp, useParallax } from "@/lib/animations";

type Props = {
  title: string;
  subtitle?: string;
  dayImageSrc?: string; // optional foreground image day
  nightImageSrc?: string; // optional foreground image night
};

export default function RoomSubHero({ title, subtitle, dayImageSrc, nightImageSrc }: Props) {
  const h1Ref = useFadeInUp<HTMLHeadingElement>(0);
  const pRef = useFadeInUp<HTMLParagraphElement>(0.05);
  const cloudLeftDay = useParallax<HTMLImageElement>(20, { scrub: 0.5, mobileAmount: 10 });
  const cloudLeftNight = useParallax<HTMLImageElement>(20, { scrub: 0.5, mobileAmount: 10 });
  const cloudRightDay = useParallax<HTMLImageElement>(28, { scrub: 0.6, mobileAmount: 12 });
  const cloudRightNight = useParallax<HTMLImageElement>(28, { scrub: 0.6, mobileAmount: 12 });

  return (
    <section className="section relative mx-auto max-w-6xl px-4 pt-14 pb-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]">
        <div className="absolute -left-16 top-10 hidden h-52 w-52 rotate-3 sm:block" style={{ backgroundImage: 'url(/thingsinc/67297fcb79d42fdd90bf5e93_hex_room_2.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
        <div className="absolute right-0 top-24 hidden h-52 w-52 -rotate-3 sm:block" style={{ backgroundImage: 'url(/thingsinc/67297fcb7f6587d3dc450334_hex_room_6.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
      </div>
      <div className="tunnel-mask-soft -z-10" />

      {/* Clouds */}
      <Image ref={cloudLeftDay} src="/thingsinc/66f367a8274968c5aa82329f_footer-clouds-left_day.png" alt="" aria-hidden width={320} height={160} className="theme-day-only pointer-events-none hero-cloud-left opacity-70 sm:opacity-80" />
      <Image ref={cloudLeftNight} src="/thingsinc/66f367a85cb2687ca4e30838_footer-clouds-left_night.png" alt="" aria-hidden width={320} height={160} className="theme-night-only pointer-events-none hero-cloud-left opacity-70" />
      <Image ref={cloudRightDay} src="/thingsinc/66f367a804f8c9cd92a372ce_footer-cloud-right_day.png" alt="" aria-hidden width={360} height={180} className="theme-day-only pointer-events-none hero-cloud-right opacity-70 sm:opacity-80" />
      <Image ref={cloudRightNight} src="/thingsinc/66f367536d9cdf539095c9eb_footer-cloud-right_night.png" alt="" aria-hidden width={360} height={180} className="theme-night-only pointer-events-none hero-cloud-right opacity-70" />

      <div className="relative max-w-2xl">
        <h1 ref={h1Ref}>{title}</h1>
        {subtitle && <p ref={pRef} className="mt-3 text-[color:var(--muted)]">{subtitle}</p>}
      </div>

      {/* Optional foreground themed art */}
      {dayImageSrc && (
        <Image src={dayImageSrc} alt="" width={120} height={120} className="theme-day-only pointer-events-none absolute right-4 top-6 hidden sm:block" aria-hidden />
      )}
      {nightImageSrc && (
        <Image src={nightImageSrc} alt="" width={120} height={120} className="theme-night-only pointer-events-none absolute right-4 top-6 hidden sm:block" aria-hidden />
      )}
    </section>
  );
}
