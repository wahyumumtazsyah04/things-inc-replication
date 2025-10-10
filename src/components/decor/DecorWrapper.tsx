"use client";
import React from "react";
import Image from "next/image";
import { useParallax } from "@/lib/animations";

/**
 * DecorWrapper
 * Adds Things, Inc.-style decorative background: subtle hex mosaic, tunnel mask, clouds day/night.
 * Wrap page content with this to keep visual parity across pages.
 */
export default function DecorWrapper({ children, showClouds = true, showMask = true, showGrid = false }: { children: React.ReactNode; showClouds?: boolean; showMask?: boolean; showGrid?: boolean }) {
    const cloudLeftDay = useParallax<HTMLImageElement>(24, { scrub: 0.5, mobileAmount: 12 });
    const cloudLeftNight = useParallax<HTMLImageElement>(24, { scrub: 0.5, mobileAmount: 12 });
    const cloudRightDay = useParallax<HTMLImageElement>(32, { scrub: 0.6, mobileAmount: 16 });
    const cloudRightNight = useParallax<HTMLImageElement>(32, { scrub: 0.6, mobileAmount: 16 });

    return (
        <section className="section relative mx-auto max-w-6xl px-4">
            {/* Subtle background mosaic */}
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]">
                <div className="absolute -left-20 top-10 hidden h-64 w-64 rotate-6 sm:block" style={{ backgroundImage: 'url(/thingsinc/67297fcb3d8968f4ca826780_hex_room_1.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                <div className="absolute right-0 top-28 hidden h-52 w-52 -rotate-3 sm:block" style={{ backgroundImage: 'url(/thingsinc/67297fcb7f6587d3dc450334_hex_room_6.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
            </div>

            {/* Optional subtle grid background overlay */}
            {showGrid && (
                <div className="grid-bg -z-10" aria-hidden />
            )}

            {/* Tunnel mask overlay */}
            {showMask && <div className="tunnel-mask-soft -z-10" />}

            {/* Decorative clouds (optional) */}
            {showClouds && (
                <>
                    <Image
                        ref={cloudLeftDay}
                        src="/thingsinc/66f367a8274968c5aa82329f_footer-clouds-left_day.png"
                        alt=""
                        aria-hidden="true"
                        width={320}
                        height={160}
                        className="theme-day-only pointer-events-none absolute -left-24 top-8 opacity-70 sm:opacity-80"
                    />
                    <Image
                        ref={cloudLeftNight}
                        src="/thingsinc/66f367a85cb2687ca4e30838_footer-clouds-left_night.png"
                        alt=""
                        aria-hidden="true"
                        width={320}
                        height={160}
                        className="theme-night-only pointer-events-none absolute -left-24 top-8 opacity-70"
                    />
                    <Image
                        ref={cloudRightDay}
                        src="/thingsinc/66f367a804f8c9cd92a372ce_footer-cloud-right_day.png"
                        alt=""
                        aria-hidden="true"
                        width={360}
                        height={180}
                        className="theme-day-only pointer-events-none absolute -right-28 top-24 opacity-70 sm:opacity-80"
                    />
                    <Image
                        ref={cloudRightNight}
                        src="/thingsinc/66f367536d9cdf539095c9eb_footer-cloud-right_night.png"
                        alt=""
                        aria-hidden="true"
                        width={360}
                        height={180}
                        className="theme-night-only pointer-events-none absolute -right-28 top-24 opacity-70"
                    />
                </>
            )}

            <div className="relative">{children}</div>
        </section>
    );
}
