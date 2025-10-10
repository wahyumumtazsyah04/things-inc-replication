"use client";
import React from "react";
import Image from "next/image";
import { useParallax } from "@/lib/animations";

/**
 * AmbientClouds
 * Centralized cloud layers that respect theme (.theme-day-only/night-only) and reuse parallax config.
 * Use in scrollytelling sections to keep ambient cohesion.
 */
export default function AmbientClouds({ leftAmt = 24, rightAmt = 32, mobileScale = 0.5, className = "" }: { leftAmt?: number; rightAmt?: number; mobileScale?: number; className?: string }) {
    const cloudLeftDay = useParallax<HTMLImageElement>(leftAmt, { scrub: 0.55, mobileAmount: leftAmt * mobileScale });
    const cloudLeftNight = useParallax<HTMLImageElement>(leftAmt, { scrub: 0.55, mobileAmount: leftAmt * mobileScale });
    const cloudRightDay = useParallax<HTMLImageElement>(rightAmt, { scrub: 0.65, mobileAmount: rightAmt * mobileScale });
    const cloudRightNight = useParallax<HTMLImageElement>(rightAmt, { scrub: 0.65, mobileAmount: rightAmt * mobileScale });

    return (
        <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
            <Image ref={cloudLeftDay} src="/thingsinc/66f367a8274968c5aa82329f_footer-clouds-left_day.png" alt="" width={360} height={180} className="theme-day-only hero-cloud-left opacity-70 sm:opacity-80" />
            <Image ref={cloudLeftNight} src="/thingsinc/66f367a85cb2687ca4e30838_footer-clouds-left_night.png" alt="" width={360} height={180} className="theme-night-only hero-cloud-left opacity-70" />
            <Image ref={cloudRightDay} src="/thingsinc/66f367a804f8c9cd92a372ce_footer-cloud-right_day.png" alt="" width={400} height={200} className="theme-day-only hero-cloud-right opacity-70 sm:opacity-80" />
            <Image ref={cloudRightNight} src="/thingsinc/66f367536d9cdf539095c9eb_footer-cloud-right_night.png" alt="" width={400} height={200} className="theme-night-only hero-cloud-right opacity-70" />
        </div>
    );
}
