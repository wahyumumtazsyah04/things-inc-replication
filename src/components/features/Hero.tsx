"use client";
import React from "react";
import { useFadeInUp, useParallax, useParallaxScale } from "@/lib/animations";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Magnetic from "@/components/ui/Magnetic";
import MountOnVisible from "@/components/ui/MountOnVisible";
import WordReveal from "@/components/ui/WordReveal";
import CharReveal from "@/components/ui/CharReveal";
import SkyBackdrop from "@/components/decor/SkyBackdrop";
import StarParticles from "@/components/decor/StarParticles";

const PortalScene3D = dynamic(() => import("@/components/decor/PortalScene3D"), { ssr: false });

type HeroProps = {
    portalProgressOverride?: number;
};

export default function Hero({ portalProgressOverride }: HeroProps) {
    // Scroll-driven progress for the 3D scene (0..1 across hero section)
    const sectionRef = React.useRef<HTMLElement | null>(null);
    const [portalProgress, setPortalProgress] = React.useState(0);
    const latestRef = React.useRef(0);
    const rafRef = React.useRef<number | null>(null);

    // Bind ScrollTrigger to hero section to drive portalProgress
    React.useEffect(() => {
        if (portalProgressOverride != null) return; // external control active
        if (!sectionRef.current) return;
        const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return; // respect reduced motion
        let st: import("gsap/ScrollTrigger").ScrollTrigger | null = null;
        let killed = false;
        // Dynamic import to avoid SSR issues and ensure plugin is registered
        (async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);
            if (killed) return;
            st = ScrollTrigger.create({
                trigger: sectionRef.current!,
                start: "top top+=64px",
                end: "bottom top+=64px",
                scrub: true,
                onUpdate: (self) => {
                    // self.progress is already clamped 0..1 within start/end
                    latestRef.current = self.progress;
                    if (!rafRef.current) {
                        rafRef.current = requestAnimationFrame(() => {
                            setPortalProgress(latestRef.current);
                            rafRef.current = null;
                        });
                    }
                },
            });
        })();
        return () => {
            killed = true;
            if (st) st.kill();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [portalProgressOverride]);
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
    // Declutter: remove extra decorative elements from the initial hero

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
            // CTAs & extra decor removed for a cleaner, reference-accurate canvas
        });
        return () => {
            mounted = false;
        };
    }, [cloudLeftDay, cloudLeftNight, cloudRightDay, cloudRightNight, h1Ref, pRef, cta1Ref, cta2Ref]);

    return (
    <section ref={sectionRef} className="section relative mx-auto max-w-6xl px-4 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 overflow-visible">
            {/* Theme-aware sky backdrop and subtle starfield */}
            <SkyBackdrop />
            {/* Extra twinkling particles for a more magical sky */}
            <StarParticles count={64} />
            {/* Lightweight 3D canvas (gated by prefers-reduced-motion) and only mounted when visible */}
            <MountOnVisible rootMargin="0px 0px -10% 0px">
                <PortalScene3D progress={portalProgressOverride ?? portalProgress} />
            </MountOnVisible>
            {/* Background mosaic removed for a cleaner first screen */}

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
                decoding="async"
                fetchPriority="low"
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
                decoding="async"
                fetchPriority="low"
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
                decoding="async"
                fetchPriority="low"
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
                decoding="async"
                fetchPriority="low"
                sizes="(max-width: 768px) 60vw, 400px"
            />

            <div ref={fgScaleRef} className="relative md:mx-auto md:text-center">
                {/* Small intro above logo */}
                <p ref={pRef} className="text-sm tracking-wide uppercase text-[color:var(--foreground)]/75">Hello! We are</p>
                {/* Prominent logo as hero title (day/night variants) */}
                <div ref={h1Ref} data-lcp="target" className="mt-1 flex items-center justify-center">
                    {/* Accessible H1 for screen readers; logo images are decorative */}
                    <h1 className="sr-only">Things, Inc.</h1>
                    {/* Day logo */}
                    <Image
                        src="/thingsinc/6724406f04b26f75915dd8c2_Home-logo_day.webp"
                        alt=""
                        aria-hidden
                        width={820}
                        height={220}
                        priority
                        decoding="async"
                        className="logo-day h-auto w-[72vw] max-w-[820px]"
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 70vw, 820px"
                    />
                    {/* Night logo */}
                    <Image
                        src="/thingsinc/6705b9208ebb9e666ec8413b_Home-logo_night.webp"
                        alt=""
                        aria-hidden
                        width={820}
                        height={220}
                        priority
                        decoding="async"
                        className="logo-night h-auto w-[72vw] max-w-[820px]"
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 70vw, 820px"
                    />
                </div>
                {/* Intro paragraph like original site */}
                <p className="mx-auto mt-5 max-w-2xl text-center text-[color:var(--muted)]">
                    Welcome to Things, Inc. We are a team of evolved monkeys who believe in the power of collaborative
                    creation and emergent play. We believe that technology can be a source of good, and that weird &gt; normal.
                </p>
                {/* Optional: hide marketing CTAs to keep canvas clean */}
            </div>

            {/* Extra character/prop decor removed for reference parity */}

            {/* Scroll cue: bottom-right squircle button linking to next scene */}
            <a href="#scene-products" className="scroll-cue-squircle group cursor-hoverable link-reset absolute right-3 sm:right-5 bottom-3 sm:bottom-5">
                <span className="sr-only">Scroll to our things</span>
                <span className="label">Scroll</span>
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </a>
        </section>
    );
}
