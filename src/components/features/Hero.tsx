"use client";
import React from "react";
import { useFadeInUp, useParallax, useParallaxScale } from "@/lib/animations";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Magnetic from "@/components/ui/Magnetic";

const PortalScene3D = dynamic(() => import("@/components/decor/PortalScene3D"), { ssr: false });

export default function Hero() {
    const h1Ref = useFadeInUp<HTMLHeadingElement>(0);
    const pRef = useFadeInUp<HTMLParagraphElement>(0.05);
    const cta1Ref = useFadeInUp<HTMLAnchorElement>(0.1);
    const cta2Ref = useFadeInUp<HTMLAnchorElement>(0.15);
    const cloudLeftDay = useParallax<HTMLImageElement>(28, { scrub: 0.55, mobileAmount: 14 });
    const cloudLeftNight = useParallax<HTMLImageElement>(28, { scrub: 0.55, mobileAmount: 14 });
    const cloudRightDay = useParallax<HTMLImageElement>(38, { scrub: 0.65, mobileAmount: 18 });
    const cloudRightNight = useParallax<HTMLImageElement>(38, { scrub: 0.65, mobileAmount: 18 });
    const fgScaleRef = useParallaxScale<HTMLDivElement>(10, 0.99, 1.03, { scrub: 0.6, mobileAmount: 6, mobileScaleFrom: 0.995, mobileScaleTo: 1.01 });
    // Extra decorative parallax layers
    const decoHexSlow = useParallax<HTMLDivElement>(20, { scrub: 0.4, mobileAmount: 10 });
    const decoHexFast = useParallax<HTMLDivElement>(60, { scrub: 0.8, mobileAmount: 24 });
    const tvRef = useParallax<HTMLImageElement>(24, { scrub: 0.6, mobileAmount: 12 });
    const kidRef = useParallax<HTMLImageElement>(18, { scrub: 0.5, mobileAmount: 10 });
    const slingRef = useParallax<HTMLImageElement>(32, { scrub: 0.7, mobileAmount: 16 });
    const qPurpleRef = useParallax<HTMLImageElement>(26, { scrub: 0.6, mobileAmount: 12 });
    const qBlueRef = useParallax<HTMLImageElement>(34, { scrub: 0.7, mobileAmount: 16 });

    // Decorative elements enter timeline: clouds slide/fade in on first view only
    React.useEffect(() => {
        let mounted = true;
        // Respect prefers-reduced-motion: skip entrance animation
        const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
        if (mql && mql.matches) return () => { mounted = false; };
        import("gsap").then(({ gsap }) => {
            if (!mounted) return;
            const clouds = [cloudLeftDay.current, cloudLeftNight.current, cloudRightDay.current, cloudRightNight.current].filter(
                (n): n is HTMLImageElement => Boolean(n)
            );
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            if (clouds.length) {
                tl.fromTo(clouds, { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: 0.85, ease: "expo.out", stagger: 0.1 });
            }
            if (h1Ref.current) {
                tl.fromTo(h1Ref.current, { autoAlpha: 0, y: 18, filter: "blur(1px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power4.out" }, "-=0.3");
            }
            if (pRef.current) {
                tl.fromTo(pRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
            }
            const ctas = [cta1Ref.current, cta2Ref.current].filter(Boolean) as HTMLElement[];
            if (ctas.length) {
                tl.fromTo(ctas, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "back.out(1.6)" }, "-=0.45");
            }
            // Bring in TV/Kid/Slingshot subtly
            const deco = [tvRef.current, kidRef.current, slingRef.current, qPurpleRef.current, qBlueRef.current].filter(Boolean) as HTMLElement[];
            if (deco.length) {
                tl.fromTo(deco, { autoAlpha: 0, y: 12, rotate: -2 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "-=0.5");
            }
        });
        return () => {
            mounted = false;
        };
    }, [cloudLeftDay, cloudLeftNight, cloudRightDay, cloudRightNight, h1Ref, pRef, cta1Ref, cta2Ref, tvRef, kidRef, slingRef, qPurpleRef, qBlueRef]);

    return (
        <section className="section relative mx-auto max-w-6xl px-4 pt-16 sm:pt-20 md:pt-24 pb-14 sm:pb-16 md:pb-20">
            {/* Lightweight 3D canvas (gated by prefers-reduced-motion) */}
            <PortalScene3D />
            {/* Background mosaic (subtle) */}
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]">
                <div className="absolute -left-20 top-10 hidden h-64 w-64 rotate-6 sm:block" style={{ backgroundImage: 'url(/thingsinc/67297fcb3d8968f4ca826780_hex_room_1.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                <div className="absolute right-0 top-28 hidden h-52 w-52 -rotate-3 sm:block" style={{ backgroundImage: 'url(/thingsinc/67297fcb7f6587d3dc450334_hex_room_6.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                {/* Extra layers with varied parallax speeds */}
                <div ref={decoHexSlow} className="absolute left-1/3 -top-6 hidden h-40 w-40 rotate-2 sm:block" style={{ backgroundImage: 'url(/thingsinc/67297fcb474d3e3e081fa065_hex_room_7.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                <div ref={decoHexFast} className="absolute -right-16 bottom-10 hidden h-48 w-48 -rotate-6 sm:block" style={{ backgroundImage: 'url(/thingsinc/67297fcb79d42fdd90bf5e93_hex_room_2.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
            </div>

            {/* Tunnel mask overlay */}
            <div className="tunnel-mask-soft -z-10" />
            {/* Decorative clouds */}
            <Image
                ref={cloudLeftDay}
                src="/thingsinc/66f367a8274968c5aa82329f_footer-clouds-left_day.png"
                alt=""
                aria-hidden="true"
                width={360}
                height={180}
                className="theme-day-only pointer-events-none hero-cloud-left opacity-70 sm:opacity-80"
                priority
                sizes="(max-width: 768px) 60vw, 360px"
            />
            <Image
                ref={cloudLeftNight}
                src="/thingsinc/66f367a85cb2687ca4e30838_footer-clouds-left_night.png"
                alt=""
                aria-hidden="true"
                width={360}
                height={180}
                className="theme-night-only pointer-events-none hero-cloud-left opacity-70"
                priority
                sizes="(max-width: 768px) 60vw, 360px"
            />
            <Image
                ref={cloudRightDay}
                src="/thingsinc/66f367a804f8c9cd92a372ce_footer-cloud-right_day.png"
                alt=""
                aria-hidden="true"
                width={400}
                height={200}
                className="theme-day-only pointer-events-none hero-cloud-right opacity-70 sm:opacity-80"
                priority
                sizes="(max-width: 768px) 60vw, 400px"
            />
            <Image
                ref={cloudRightNight}
                src="/thingsinc/66f367536d9cdf539095c9eb_footer-cloud-right_night.png"
                alt=""
                aria-hidden="true"
                width={400}
                height={200}
                className="theme-night-only pointer-events-none hero-cloud-right opacity-70"
                priority
                sizes="(max-width: 768px) 60vw, 400px"
            />

            <div ref={fgScaleRef} className="relative max-w-2xl">
                <h1 ref={h1Ref} className="font-[family:var(--font-sans)]">
                    Build modern marketing sites with confidence
                </h1>
                <p ref={pRef} className="mt-4 text-[color:var(--muted)] font-[family:var(--font-sans)]">
                    A clean Next.js foundation with Tailwind, wired for Things, Inc.-style animations, content, and growth.
                </p>
                <div className="mt-7 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
                    <Magnetic>
                        <Link
                            ref={cta1Ref}
                            href="/products"
                            className="inline-flex items-center justify-center rounded px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-[color:var(--zenotika-accent)] text-[color:var(--zenotika-accent-contrast)] hover:bg-[color:var(--zenotika-accent-hover)] focus-visible:ring-[color:var(--zenotika-ring)]"
                        >
                            Explore products
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <Link
                            ref={cta2Ref}
                            href="/pricing"
                            className="inline-flex items-center justify-center rounded px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border border-[color:var(--border)] hover:bg-[color:var(--zenotika-surface)] text-[color:var(--foreground)] focus-visible:ring-[color:var(--zenotika-ring)]"
                        >
                            See pricing
                        </Link>
                    </Magnetic>
                </div>
            </div>

            {/* Hero decorative elements for stronger 1:1 parity */}
            <Image
                ref={tvRef}
                src="/thingsinc/670f18f95e251b5a9c8be968_Retro_TV_On2.png"
                alt="Retro TV"
                width={128}
                height={128}
                className="pointer-events-none hero-tv hidden opacity-90 sm:block"
                aria-hidden="true"
                priority={false}
                sizes="(max-width: 768px) 20vw, 128px"
            />
            <Image
                ref={kidRef}
                src="/thingsinc/670f164bb78deb5be6f4476f_Kid.png"
                alt="Kid"
                width={112}
                height={112}
                className="pointer-events-none hero-kid hidden sm:block"
                aria-hidden="true"
                priority={false}
                sizes="(max-width: 768px) 20vw, 112px"
            />
            <Image
                ref={slingRef}
                src="/thingsinc/670f164bf0d787f2a4cae332_slingshot.png"
                alt="Slingshot"
                width={86}
                height={86}
                className="pointer-events-none hero-sling hidden sm:block"
                aria-hidden="true"
                priority={false}
                sizes="(max-width: 768px) 20vw, 86px"
            />

            {/* Question mark decor */}
            <Image
                ref={qPurpleRef}
                src="/thingsinc/670336a784858cd4b8e6b008_question mark purple 1.png"
                alt="Decorative question mark purple"
                width={56}
                height={56}
                className="pointer-events-none hero-q-purple hidden sm:block"
                aria-hidden="true"
                priority={false}
                sizes="(max-width: 768px) 20vw, 56px"
            />
            <Image
                ref={qBlueRef}
                src="/thingsinc/673e3f91a57cfea22147b7da_question mark blue.png"
                alt="Decorative question mark blue"
                width={52}
                height={52}
                className="pointer-events-none hero-q-blue hidden sm:block"
                aria-hidden="true"
                priority={false}
                sizes="(max-width: 768px) 20vw, 52px"
            />

            {/* Scroll cue */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-1 sm:-bottom-2 flex justify-center">
                <div className="flex items-center gap-2 text-xs text-[color:var(--foreground)]/60">
                    <span className="hidden sm:inline">Scroll</span>
                    <svg className="h-4 w-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
