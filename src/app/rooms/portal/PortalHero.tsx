"use client";
import RoomSubHero from "@/components/features/rooms/RoomSubHero";
import dynamic from "next/dynamic";
import { useParallax } from "@/lib/animations";
import React from "react";
import IrisMask from "@/components/decor/IrisMask";
import MountOnVisible from "@/components/ui/MountOnVisible";

const PortalScene3D = dynamic(() => import("@/components/decor/PortalScene3D"), { ssr: false });

export default function PortalHero() {
  const maskRef = useParallax<HTMLDivElement>(30, { start: "top bottom", end: "bottom top", scrub: true });
  const [iris, setIris] = React.useState(true);
  React.useEffect(() => {
    const id = setTimeout(() => setIris(false), 500); // brief iris on enter
    return () => clearTimeout(id);
  }, []);
  return (
    <div className="relative">
      <RoomSubHero
        title="Portal"
        subtitle="Step into the next space—playful transitions between scenes."
      />
      <MountOnVisible rootMargin="0px 0px -10% 0px">
        <PortalScene3D />
      </MountOnVisible>
      <div ref={maskRef} className="tunnel-mask-soft" aria-hidden="true" />
      <IrisMask show={iris} />
    </div>
  );
}
