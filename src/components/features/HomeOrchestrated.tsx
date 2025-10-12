"use client";
import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useOrchestrator, type SceneConfig } from "@/lib/orchestrator";
import Hero from "@/components/features/Hero";
import ProductShowcase from "@/components/features/ProductShowcase";
import LogBook from "@/components/features/LogBook";
import PricingTable from "@/components/features/PricingTable";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import DecorWrapper from "@/components/decor/DecorWrapper";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function HomeOrchestrated() {
  const sHero = React.useRef<HTMLDivElement>(null);
  const sProducts = React.useRef<HTMLDivElement>(null);
  const sLogbook = React.useRef<HTMLDivElement>(null);
  const sPricing = React.useRef<HTMLDivElement>(null);

  const reduce = usePrefersReducedMotion();
  const [heroP, setHeroP] = React.useState(0);
  const latest = React.useRef({ hero: 0, products: 0, pricing: 0 });
  const raf = React.useRef<number | null>(null);
  const [sweepVisible, setSweepVisible] = React.useState(false);
  const [sweepDelay, setSweepDelay] = React.useState(0);
  const sweepTimeout = React.useRef<number | null>(null);
  const IrisMask = React.useMemo(() => dynamic(() => import("@/components/decor/IrisMask"), { ssr: false }), []);

  useOrchestrator(
    [
      {
        id: "hero",
        el: sHero.current,
        start: 0,
        end: 1 / 4,
        pin: true,
        create: (root) => gsap.timeline({ defaults: { ease: "power3.out" } })
          .fromTo(root.querySelector("h1"), { autoAlpha: 0, y: 26, filter: "blur(1px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9 })
          .fromTo(root.querySelector("p"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.5"),
      },
      {
        id: "products",
        el: sProducts.current,
        start: 1 / 4,
        end: 2 / 4,
        pin: true,
        create: (root) => {
          const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
          const mask = root.querySelector(".scene-mask") as HTMLElement | null;
          if (mask) tl.fromTo(mask, { autoAlpha: 0 }, { autoAlpha: 0.22, duration: 0.24, ease: "power1.out" });
          tl.fromTo(root.querySelector(".section"), { autoAlpha: 0, y: 28, rotate: -1.1 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.78, ease: "power2.out" });
          tl.to(root.querySelector(".section"), { y: -5, duration: 0.36, ease: "sine.out" }, ">-=0.32");
          if (mask) tl.to(mask, { autoAlpha: 0, duration: 0.28, ease: "power1.inOut" }, ">-=0.36");
          return tl;
        },
      },
      {
        id: "logbook",
        el: sLogbook.current,
        start: 2 / 4,
        end: 3 / 4,
        pin: true,
        create: (root) => {
          const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
          const mask = root.querySelector(".scene-mask") as HTMLElement | null;
          if (mask) tl.fromTo(mask, { autoAlpha: 0 }, { autoAlpha: 0.22, duration: 0.24, ease: "power1.out" });
          tl.fromTo(root.querySelector(".section"), { autoAlpha: 0, y: 28, rotate: 1.1 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.78 });
          tl.to(root.querySelector(".section"), { y: -5, duration: 0.36, ease: "sine.out" }, ">-=0.32");
          if (mask) tl.to(mask, { autoAlpha: 0, duration: 0.28, ease: "power1.inOut" }, ">-=0.36");
          return tl;
        },
      },
      {
        id: "pricing",
        el: sPricing.current,
        start: 3 / 4,
        end: 1,
        pin: true,
        create: (root) => gsap.timeline({ defaults: { ease: "power2.out" } })
          .fromTo(root.querySelector(".section"), { autoAlpha: 0, y: 30, rotate: 1.2 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.85 }),
      },
    ] as SceneConfig[],
    {
      onProgress: (id, p) => {
        latest.current = { ...latest.current, [id]: p } as typeof latest.current;
        if (!raf.current) {
          raf.current = requestAnimationFrame(() => {
            setHeroP(latest.current.hero);
            raf.current = null;
          });
        }
      },
      onEnter: (id) => {
        // Trigger sweep overlay on scene boundaries (skip for reduced motion)
        if (reduce) return;
        if (id === "products" || id === "logbook" || id === "pricing") {
          // Subtle delay when entering pricing and tiny delay for others
          const delay = id === "pricing" ? 0.08 : 0.02;
          setSweepDelay(delay);
          setSweepVisible(true);
          if (sweepTimeout.current) window.clearTimeout(sweepTimeout.current);
          sweepTimeout.current = window.setTimeout(() => setSweepVisible(false), 460);
        }
      },
      enableSnap: true,
      extraSnapPoints: [0, 0.25, 0.5, 0.75, 1],
      topOffsetPx: 64,
    }
  );

  React.useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    if (sweepTimeout.current) window.clearTimeout(sweepTimeout.current);
  }, []);

  // Iris mask strategy: show primarily during hero scroll and briefly during scene sweeps
  const irisShow = !reduce && (sweepVisible || (heroP > 0.06 && heroP < 0.94));

  return (
    <>
      {/* Transition overlays */}
      <AnimatePresence>
        {sweepVisible && !reduce ? (
          <motion.div
            aria-hidden
            className="page-sweep-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: sweepDelay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : null}
      </AnimatePresence>
      <IrisMask show={!!irisShow} />
      {/* Scene 1: Hero (pinned) */}
      <div ref={sHero} id="scene-hero">
        <Hero portalProgressOverride={heroP} />
      </div>

      {/* Scene 2 & 3 inside DecorWrapper but without duplicating clouds/mask */}
      <DecorWrapper showClouds={false} showMask={false} showGrid>
        <div ref={sProducts} id="scene-products" className="mt-8 relative">
          {/* Light mask overlay to enrich transition */}
          <div className="scene-mask pointer-events-none absolute inset-0 -z-10" />
          <ProductShowcase />
        </div>
        <div ref={sLogbook} id="scene-logbook" className="mt-16 relative">
          <div className="scene-mask pointer-events-none absolute inset-0 -z-10" />
          <LogBook />
        </div>
        <div ref={sPricing} id="scene-pricing" className="mt-16">
          <PricingTable />
        </div>
      </DecorWrapper>
      {/* Newsletter CTA mirrors live site */}
      <div className="mx-auto mt-16 max-w-4xl px-4">
        <NewsletterSignup />
      </div>
    </>
  );
}
