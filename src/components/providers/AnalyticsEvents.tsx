"use client";
import React from "react";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * AnalyticsEvents
 * - Sends GA4 page_view on mount and on custom `route:changed` events
 * - Tracks scroll depth milestones (25/50/75/90)
 * - No-ops when NEXT_PUBLIC_GA_ID is not set
 */
export default function AnalyticsEvents() {
  const enabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);

  React.useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const gtagSafe = (event: string, params: Record<string, any> = {}) => {
      try {
        if (typeof window.gtag === "function") {
          window.gtag("event", event, params);
        } else if (Array.isArray(window.dataLayer)) {
          window.dataLayer.push({ event, ...params });
        }
      } catch {}
    };

    const sendPageView = () => {
      const path = window.location.pathname + window.location.search;
      gtagSafe("page_view", { page_path: path });
    };

    // Initial page_view after hydration
    const id = requestAnimationFrame(sendPageView);

    // Listen for our custom route change bridge
    const onRouteChange = () => sendPageView();
    window.addEventListener("route:changed", onRouteChange as EventListener);

    // Scroll depth tracking (once per threshold)
    const thresholds = [0.25, 0.5, 0.75, 0.9];
    const fired = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      if (height <= 0) return;
      const progress = scrollTop / height;
      thresholds.forEach((t) => {
        if (progress >= t && !fired.has(t)) {
          fired.add(t);
          gtagSafe("scroll_depth", { percent: Math.round(t * 100) });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("route:changed", onRouteChange as EventListener);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  return null;
}
