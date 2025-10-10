"use client";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin on client
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function useFadeInUp<T extends HTMLElement>(delay = 0) {
    const ref = useRef<T | null>(null);
    useEffect(() => {
        if (!ref.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ref.current,
                { autoAlpha: 0, y: 16 },
                { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out", delay }
            );
        }, ref);
        return () => ctx.revert();
    }, [delay]);
    return ref;
}

export function useScrollReveal<T extends HTMLElement>(
    options: { selector?: string; once?: boolean; stagger?: number } = {}
) {
    const { selector = "> *", once = true, stagger = 0.08 } = options;
    const ref = useRef<T | null>(null);
    useEffect(() => {
        if (!ref.current) return;
        const ctx = gsap.context(() => {
            // Prefer :scope selector for direct children; fallback to '*' if unsupported
            let effectiveSelector = selector;
            if (selector === "> *") {
                effectiveSelector = ":scope > *";
            }
            let targets: NodeListOf<Element>;
            try {
                targets = (ref.current as HTMLElement).querySelectorAll(effectiveSelector);
            } catch {
                // If the provided selector is invalid, fallback to all children to avoid runtime errors
                targets = (ref.current as HTMLElement).children as unknown as NodeListOf<Element>;
            }
            gsap.fromTo(
                targets,
                { autoAlpha: 0, y: 18 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger,
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                        once,
                    },
                }
            );
        }, ref);
        return () => ctx.revert();
    }, [selector, once, stagger]);
    return ref;
}

export function useParallax<T extends HTMLElement>(
    amount = 50,
    config: { start?: string; end?: string; scrub?: boolean | number; mobileAmount?: number } = {}
) {
    const { start = "top bottom", end = "bottom top", scrub = true, mobileAmount } = config;
    const ref = useRef<T | null>(null);
    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        if (mobileAmount != null) {
            const mm = gsap.matchMedia();
            mm.add("(max-width: 639px)", () => {
                gsap.fromTo(
                    el,
                    { y: -mobileAmount },
                    {
                        y: mobileAmount,
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start,
                            end,
                            scrub,
                        },
                    }
                );
            });
            mm.add("(min-width: 640px)", () => {
                gsap.fromTo(
                    el,
                    { y: -amount },
                    {
                        y: amount,
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start,
                            end,
                            scrub,
                        },
                    }
                );
            });
            return () => mm.revert();
        } else {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    el,
                    { y: -amount },
                    {
                        y: amount,
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start,
                            end,
                            scrub,
                        },
                    }
                );
            }, ref);
            return () => ctx.revert();
        }
    }, [amount, start, end, scrub, mobileAmount]);
    return ref;
}

export function useParallaxScale<T extends HTMLElement>(
    amount = 20,
    scaleFrom = 0.98,
    scaleTo = 1.04,
    config: { start?: string; end?: string; scrub?: boolean | number; mobileAmount?: number; mobileScaleFrom?: number; mobileScaleTo?: number } = {}
) {
    const { start = "top bottom", end = "bottom top", scrub = true, mobileAmount, mobileScaleFrom, mobileScaleTo } = config;
    const ref = useRef<T | null>(null);
    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        if (mobileAmount != null || mobileScaleFrom != null || mobileScaleTo != null) {
            const aMobile = mobileAmount ?? amount;
            const sFromMobile = mobileScaleFrom ?? scaleFrom;
            const sToMobile = mobileScaleTo ?? scaleTo;
            const mm = gsap.matchMedia();
            mm.add("(max-width: 639px)", () => {
                gsap.fromTo(
                    el,
                    { y: -aMobile, scale: sFromMobile },
                    {
                        y: aMobile,
                        scale: sToMobile,
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start,
                            end,
                            scrub,
                        },
                    }
                );
            });
            mm.add("(min-width: 640px)", () => {
                gsap.fromTo(
                    el,
                    { y: -amount, scale: scaleFrom },
                    {
                        y: amount,
                        scale: scaleTo,
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start,
                            end,
                            scrub,
                        },
                    }
                );
            });
            return () => mm.revert();
        } else {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    el,
                    { y: -amount, scale: scaleFrom },
                    {
                        y: amount,
                        scale: scaleTo,
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start,
                            end,
                            scrub,
                        },
                    }
                );
            }, ref);
            return () => ctx.revert();
        }
    }, [amount, scaleFrom, scaleTo, start, end, scrub, mobileAmount, mobileScaleFrom, mobileScaleTo]);
    return ref;
}

export function useIntroTimeline(targets: Array<RefObject<HTMLElement | null>> = []) {
    useEffect(() => {
        const elements = targets.map((r) => r.current).filter(Boolean) as HTMLElement[];
        if (!elements.length) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.fromTo(elements[0], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.85 })
                .fromTo(elements[1], { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.35")
                .fromTo(elements[2], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.75 }, "-=0.35")
                .fromTo(elements[3], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.45");
        });
        return () => ctx.revert();
    }, [targets]);
}
