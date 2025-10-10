"use client";
import RoomSubHero from "@/components/features/rooms/RoomSubHero";
import dynamic from "next/dynamic";
import { useParallax } from "@/lib/animations";

const PortalScene3D = dynamic(() => import("@/components/decor/PortalScene3D"), { ssr: false });

export default function PortalHero() {
  const maskRef = useParallax<HTMLDivElement>(30, { start: "top bottom", end: "bottom top", scrub: true });
  return (
    <div className="relative">
      <RoomSubHero
        title="Portal"
        subtitle="Step into the next space—playful transitions between scenes."
      />
      <PortalScene3D />
      <div ref={maskRef} className="tunnel-mask-soft" aria-hidden="true" />
    </div>
  );
}
