"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AmbientClouds from "@/components/decor/AmbientClouds";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { useCollectibles } from "@/components/providers/CollectiblesProvider";
import type { CollectibleKey } from "@/components/providers/CollectiblesProvider";
import MotionToggle from "@/components/ui/MotionToggle";
import Image from "next/image";
import { useOrchestrator, type SceneConfig } from "@/lib/orchestrator";
import { useSceneTelemetry } from "@/lib/analytics";
import dynamic from "next/dynamic";
const PortalScene3D = dynamic(() => import("@/components/decor/PortalScene3D"), { ssr: false });
const IrisMask = dynamic(() => import("@/components/decor/IrisMask"), { ssr: false });
const PixelAuditOverlay = dynamic(() => import("@/components/ui/PixelAuditOverlay"), { ssr: false });

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
    const telemetry = useSceneTelemetry();

    const s1 = useRef<HTMLDivElement>(null);
    const s2 = useRef<HTMLDivElement>(null);
    const s3 = useRef<HTMLDivElement>(null);

    // Orchestrator: 3 scenes stitched via global progress 0..1
    // Track portal progress (scene 2 as example)
    const portalProgressRef = useRef(0);

    useOrchestrator(
        [
            {
                id: "room1",
                el: s1.current,
                start: 0,
                end: 1 / 3,
                pin: true,
                create: (root) => gsap.timeline({ defaults: { ease: "power2.out" } })
                    .fromTo(root.querySelector(".card"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }),
            },
            {
                id: "room2",
                el: s2.current,
                start: 1 / 3,
                end: 2 / 3,
                pin: true,
                create: (root) => gsap.timeline({ defaults: { ease: "power2.out" } })
                    .fromTo(root.querySelector(".card"), { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.8 })
                    .to(root.querySelector(".card"), { rotate: -1.5, y: -6, duration: 0.5 }, ">-=0.3"),
            },
            {
                id: "room3",
                el: s3.current,
                start: 2 / 3,
                end: 1,
                pin: true,
                create: (root) => gsap.timeline({ defaults: { ease: "power2.out" } })
                    .fromTo(root.querySelector(".card"), { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.8 }),
            },
        ] as SceneConfig[],
        {
            onProgress: (id, p) => {
                telemetry.progress(id, p);
                if (id === "room2") portalProgressRef.current = p;
            },
            onEnter: telemetry.enter,
            onExit: telemetry.exit,
            enableSnap: true,
            extraSnapPoints: [0.16, 0.33, 0.5, 0.66, 0.83],
            topOffsetPx: 64,
        }
    );

    // Collectibles interactions (tap/click)
    const pick = (id: CollectibleKey) => () => {
        add(id, 1);
        try {
            if (typeof window !== "undefined" && "gtag" in window && typeof (window as Window & { gtag?: (cmd: string, name?: string, params?: Record<string, unknown>) => void }).gtag === "function") {
                (window as Window & { gtag?: (cmd: string, name?: string, params?: Record<string, unknown>) => void }).gtag!("event", "collectible_pick", { id });
            }
        } catch { }
    };

    // IrisMask sync: tampil saat transisi antar scene (contoh: menjelang masuk scene 2)
    const irisShow = !reduce && portalProgressRef.current > 0.05 && portalProgressRef.current < 0.95;
    const auditSrc = process.env.NEXT_PUBLIC_PIXEL_AUDIT_SRC;

    return (
        <div className="relative">
            {/* Portal reveal synced to second scene progress */}
            {!reduce && <PortalScene3D progress={portalProgressRef.current} />}
            <IrisMask show={irisShow} />
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
            {auditSrc ? <PixelAuditOverlay src={auditSrc} initiallyVisible={false} /> : null}
        </div>
    );
}
