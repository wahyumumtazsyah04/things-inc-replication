"use client";
import React from "react";

export default function PixelAuditOverlay({
    src,
    initiallyVisible = false,
}: {
    src: string;
    initiallyVisible?: boolean;
}) {
    const [show, setShow] = React.useState(initiallyVisible);
    const [opacity, setOpacity] = React.useState(0.5);

    return (
        <div className="fixed bottom-4 left-4 z-[100] flex flex-col gap-2 text-xs">
            <div className="inline-flex items-center gap-2 rounded bg-[color:var(--overlay-bg)]/70 px-2 py-1 backdrop-blur">
                <label className="flex items-center gap-1">
                    <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
                    Overlay
                </label>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(opacity * 100)}
                    onChange={(e) => setOpacity(Number(e.target.value) / 100)}
                />
                <span>{Math.round(opacity * 100)}%</span>
            </div>
            {show && (
                <div className="pointer-events-none fixed inset-0 z-[99]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="pixel overlay" style={{ opacity, width: "100%", height: "auto", mixBlendMode: "normal" }} />
                </div>
            )}
        </div>
    );
}
