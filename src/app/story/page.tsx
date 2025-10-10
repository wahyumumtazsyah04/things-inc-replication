"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AmbientClouds from "@/components/decor/AmbientClouds";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { useCollectibles } from "@/components/providers/CollectiblesProvider";
import MotionToggle from "@/components/ui/MotionToggle";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function Section({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) {
    return (
        <section id={id} className="relative h-[140vh] sm:h-[180vh]">
            <div className="sticky top-[64px] sm:top-[72px] h-[calc(100vh-64px)] sm:h-[calc(100vh-72px)]">
                <div className="relative h-full w-full">
                    <AmbientClouds />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="max-w-2xl px-4 text-center">
                            <h2 className="mb-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function StoryPage() {
    const reduce = usePrefersReducedMotion();
    const { add } = useCollectibles();

    const s1 = useRef<HTMLDivElement>(null);
    const s2 = useRef<HTMLDivElement>(null);
    const s3 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (reduce) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
            tl.addLabel("intro")
                .fromTo("#s1 .card", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 })
                .addLabel("bridge")
                .to("#s1 .card", { scale: 0.98, duration: 0.5, autoAlpha: 0.9 })
                .addLabel("room2")
                .fromTo("#s2 .card", { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.8 })
                .to("#s2 .card", { rotate: -1.5, y: -6, duration: 0.5 }, ">-=0.3")
                .addLabel("room3")
                .fromTo("#s3 .card", { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.8 });

            // Pin each section and scrub timeline through them
            [
                { el: s1.current, start: 0, end: 1 / 3 },
                { el: s2.current, start: 1 / 3, end: 2 / 3 },
                { el: s3.current, start: 2 / 3, end: 1 },
            ].forEach(({ el, start, end }) => {
                if (!el) return;
                ScrollTrigger.create({
                    trigger: el,
                    start: "top top+=64px",
                    end: "bottom top+=64px",
                    pin: true,
                    pinSpacing: false,
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress; // 0..1 of current section
                        const global = start + (end - start) * progress;
                        tl.progress(global).pause();
                    },
                });
            });
        });
        return () => ctx.revert();
    }, [reduce]);

    // Collectibles interactions (tap/click)
    const pick = (id: string) => () => {
        add(id as any, 1);
        try { (window as any)?.gtag?.("event", "collectible_pick", { id }); } catch { }
    };

    return (
        <div className="relative">
            <div className="sticky top-16 z-10 flex items-center justify-center gap-3 bg-[color:var(--header-bg)] px-3 py-2 text-xs backdrop-blur supports-[backdrop-filter]:bg-[color:var(--header-bg-blur)] sm:top-[72px]">
                <span className="text-[color:var(--foreground)]/70">Demo scrollytelling: pinned sections + ambient clouds</span>
                <MotionToggle />
            </div>

            <div ref={s1} id="s1">
                <Section id="s1" title="Room One">
                    <p className="text-[color:var(--muted)]">Pinned hero-like introduction with gentle parallax and sweep-inspired transitions.</p>
                    <div className="card mt-6 mx-auto max-w-md rounded-xl border bg-[color:var(--zenotika-surface)] p-4 text-left shadow-sm">
                        <div className="flex items-center gap-3">
                            <Image src="/thingsinc/67196a3f16f9a7f3ef8f914d_collected-item_coin.png" width={36} height={36} alt="coin" />
                            <div>
                                <div className="font-medium">Collectible: Coin</div>
                                <button className="mt-1 rounded border px-2 py-1 text-xs hover:bg-[color:var(--zenotika-surface)]" onClick={pick("coin")}>Pick up</button>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>

            <div ref={s2} id="s2">
                <Section id="s2" title="Room Two">
                    <p className="text-[color:var(--muted)]">Bridge section—translate/rotate elements for playful motion cues.</p>
                    <div className="card mt-6 mx-auto max-w-md rounded-xl border bg-[color:var(--zenotika-surface)] p-4 text-left shadow-sm">
                        <div className="flex items-center gap-3">
                            <Image src="/thingsinc/67196a4610d52610d24fa6ff_collected-item_gem.png" width={36} height={36} alt="gem" />
                            <div>
                                <div className="font-medium">Collectible: Gem</div>
                                <button className="mt-1 rounded border px-2 py-1 text-xs hover:bg-[color:var(--zenotika-surface)]" onClick={pick("gem")}>Pick up</button>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>

            <div ref={s3} id="s3">
                <Section id="s3" title="Room Three">
                    <p className="text-[color:var(--muted)]">Final scene—fade out to indicate the end of the stitched story.</p>
                    <div className="card mt-6 mx-auto max-w-md rounded-xl border bg-[color:var(--zenotika-surface)] p-4 text-left shadow-sm">
                        <div className="flex items-center gap-3">
                            <Image src="/thingsinc/67196a4fb7f123a37c8a82ae_collected-item_crab.png" width={36} height={36} alt="crab" />
                            <div>
                                <div className="font-medium">Collectible: Crab</div>
                                <button className="mt-1 rounded border px-2 py-1 text-xs hover:bg-[color:var(--zenotika-surface)]" onClick={pick("crab")}>Pick up</button>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
}
