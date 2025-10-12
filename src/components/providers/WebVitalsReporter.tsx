"use client";
import React from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

function sendMetric(name: string, value: number, detail: Record<string, unknown> = {}) {
  // Gate on explicit consent; undefined or false means do not send
  if (typeof window !== "undefined" && (window as any).__consentGranted !== true) {
    return;
  }
  const params = { category: "web_vitals", name, value: Math.round(value), ...detail };
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params });
    }
  } catch { }
  // Always log once for local verification
  if (process.env.NODE_ENV !== "production") {
    console.info(`[Vitals] ${name}:`, params);
  }
}

function getElementSelector(el: Element | null | undefined): string | undefined {
  if (!el) return undefined;
  const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "";
  const cls = (el as HTMLElement).className ? `.${String((el as HTMLElement).className).trim().split(/\s+/).slice(0, 2).join('.')}` : "";
  return `${el.tagName.toLowerCase()}${id}${cls}`;
}

export default function WebVitalsReporter() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    // Minimal local interfaces to avoid adding lib.webvitals dependency
    interface LCPEntry extends PerformanceEntry { element?: Element; size?: number; url?: string; }
    interface LayoutShiftEntry extends PerformanceEntry { value: number; hadRecentInput: boolean; }
    type FirstInputEntry = PerformanceEventTiming;
    // Largest Contentful Paint
    let lcp: LCPEntry | undefined;
    let lcpPO: PerformanceObserver | null = null;
    if ("PerformanceObserver" in window) {
      try {
        lcpPO = new PerformanceObserver((list) => {
          const entries = list.getEntries() as LCPEntry[];
          const last = entries[entries.length - 1];
          if (last) lcp = last;
        });
        lcpPO.observe({ type: "largest-contentful-paint", buffered: true });
      } catch { }
    }

    // Cumulative Layout Shift
    let cls = 0;
    let clsPO: PerformanceObserver | null = null;
    try {
      clsPO = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as LayoutShiftEntry[]) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
      });
      clsPO.observe({ type: "layout-shift", buffered: true });
    } catch { }

    // First Input Delay
    let fidReported = false;
    let fidPO: PerformanceObserver | null = null;
    try {
      fidPO = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as FirstInputEntry[]) {
          if (fidReported) continue;
          const delay = entry.processingStart - entry.startTime;
          fidReported = true;
          sendMetric("FID", delay, { name: entry.name, target: getElementSelector(entry.target as Element) });
        }
      });
      fidPO.observe({ type: "first-input", buffered: true });
    } catch { }

    const finalize = () => {
      if (lcp) {
        sendMetric("LCP", lcp.startTime, {
          url: lcp.url,
          size: lcp.size,
          element: getElementSelector(lcp.element as Element),
        });
      }
      if (cls > 0) {
        sendMetric("CLS", cls * 1000); // send in ms for consistency with GA custom metrics if needed
      }
      lcpPO?.disconnect();
      clsPO?.disconnect();
      fidPO?.disconnect();
    };

    // Report on page hide (switch tab/close) to get final LCP value
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") finalize();
    });
    window.addEventListener("pagehide", finalize);

    return () => {
      lcpPO?.disconnect();
      clsPO?.disconnect();
      fidPO?.disconnect();
      window.removeEventListener("pagehide", finalize);
    };
  }, []);

  return null;
}
