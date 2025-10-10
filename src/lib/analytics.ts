"use client";

export type AnalyticsParams = Record<string, unknown>;

declare global {
    interface Window {
        gtag?: (cmd: string, name: string, params?: AnalyticsParams) => void;
        dataLayer?: Array<Record<string, unknown>>;
    }
}

export function emit(event: string, params: AnalyticsParams = {}) {
    try {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("event", event, params);
        } else if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({ event, ...params });
        }
    } catch { }
}

export function useSceneTelemetry() {
    return {
        enter: (id: string) => emit("scene_enter", { id, at: Date.now() }),
        exit: (id: string) => emit("scene_exit", { id, at: Date.now() }),
        progress: (id: string, p: number) => emit("scene_progress", { id, percent: Math.round(p * 100) }),
        complete: () => emit("story_complete", { at: Date.now() }),
    };
}
