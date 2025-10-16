"use client";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/reduced-motion";

// Ensure plugin registered on client
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export type SceneConfig = {
    id: string; // scene id for analytics
    el: HTMLElement | null; // scene container element
    start: number; // global progress start (0..1)
    end: number;   // global progress end (0..1)
    pin?: boolean;
    snap?: boolean;
    create: (root: HTMLElement) => gsap.core.Timeline; // return a paused timeline (we'll drive its progress)
};

export type OrchestratorOptions = {
    onProgress?: (sceneId: string, progress: number) => void;
    onEnter?: (sceneId: string) => void;
    onExit?: (sceneId: string) => void;
    enableSnap?: boolean; // snap to scene boundaries
    topOffsetPx?: number; // sticky header height offset
    extraSnapPoints?: number[]; // additional global progress snap points 0..1
    snapConfig?: {
        duration?: number; // seconds
        delay?: number;    // seconds
        ease?: string;     // gsap ease name
    };
};

function clamp01(n: number) { return Math.max(0, Math.min(1, n)); }

export function useOrchestrator(scenes: SceneConfig[], opts: OrchestratorOptions = {}) {
    const { onProgress, onEnter, onExit, enableSnap = true, topOffsetPx = 64 } = opts;
    const timelinesRef = useRef(new Map<string, gsap.core.Timeline>());
    const activeRef = useRef<string | null>(null);

    const scenesKey = useMemo(
        () => JSON.stringify(scenes.map((s) => ({ id: s.id, start: s.start, end: s.end, pin: s.pin }))),
        [scenes]
    );

    // derive a stable key for extra snap points to satisfy exhaustive-deps without causing churn
    const extraSnapKey = useMemo(() => {
        const arr = (opts.extraSnapPoints || []).slice().filter((p) => p >= 0 && p <= 1).sort((a, b) => a - b);
        return JSON.stringify(arr);
    }, [opts.extraSnapPoints]);

    // Stable, filtered extra snap points array value derived from key
    const extraSnapPoints = useMemo<number[]>(() => {
        try { return JSON.parse(extraSnapKey) as number[]; } catch { return []; }
    }, [extraSnapKey]);

    useEffect(() => {
        // Reduced motion guard
        const reduce = isReducedMotion();
        if (reduce) return;

        // Build timelines per scene
        const timelines = new Map<string, gsap.core.Timeline>();
        const pins: ScrollTrigger[] = [];

        scenes.forEach((s) => {
            if (!s.el) return;
            const tl = s.create(s.el);
            tl.pause(0);
            timelines.set(s.id, tl);

            if (s.pin) {
                const st = ScrollTrigger.create({
                    trigger: s.el,
                    start: `top top+=${topOffsetPx}px`,
                    end: `bottom top+=${topOffsetPx}px`,
                    pin: true,
                    pinSpacing: false,
                    scrub: false,
                });
                pins.push(st);
            }
        });

        timelinesRef.current = timelines;

        // Build root scroll trigger to drive progress across 0..1
        const extra = extraSnapPoints;
        const snapPoints = enableSnap ? Array.from(new Set([
            0,
            ...scenes.map((s) => s.start),
            ...scenes.map((s) => s.end),
            ...extra,
            1
        ])).sort((a, b) => a - b) : null;

        const root = ScrollTrigger.create({
            trigger: document.documentElement,
            start: 0,
            end: () => document.documentElement.scrollHeight - document.documentElement.clientHeight,
            scrub: true,
            snap: snapPoints ? {
                snapTo: (value: number) => {
                    // map pixel value to 0..1 global progress
                    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    if (h <= 0) return value;
                    const gp = clamp01(value / h);
                    // find nearest snap point
                    let nearest = snapPoints[0];
                    let minDist = Math.abs(gp - nearest);
                    for (let i = 1; i < snapPoints.length; i++) {
                        const d = Math.abs(gp - snapPoints[i]);
                        if (d < minDist) { minDist = d; nearest = snapPoints[i]; }
                    }
                    return nearest * h; // return pixel position
                },
                duration: opts.snapConfig?.duration ?? 0.58,
                delay: opts.snapConfig?.delay ?? 0.02,
                ease: opts.snapConfig?.ease ?? "power3.out",
            } : undefined,
            onUpdate: (self) => {
                const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const gp = h > 0 ? clamp01(self.scroll() / h) : 0;
                // drive each timeline by local progress
                scenes.forEach((s) => {
                    const tl = timelines.get(s.id);
                    if (!tl) return;
                    const local = clamp01((gp - s.start) / (s.end - s.start));
                    tl.progress(local).pause();
                    onProgress?.(s.id, local);
                    // enter/exit events
                    const wasActive = activeRef.current === s.id;
                    const isActive = gp >= s.start && gp < s.end;
                    if (!wasActive && isActive) { activeRef.current = s.id; onEnter?.(s.id); }
                    if (wasActive && !isActive) { activeRef.current = null; onExit?.(s.id); }
                });
            },
        });

        return () => {
            root.kill();
            pins.forEach((p) => p.kill());
            timelines.forEach((tl) => tl.kill());
        };
    }, [scenesKey, scenes, enableSnap, topOffsetPx, onProgress, onEnter, onExit, extraSnapKey, extraSnapPoints]);
}
