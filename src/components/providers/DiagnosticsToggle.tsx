"use client";
import React from "react";

export default function DiagnosticsToggle() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    // Restore hero debug overlay from previous session
    try {
      const prev = localStorage.getItem("debug:hero");
      if (prev === "on") document.documentElement.setAttribute("data-debug", "hero");
    } catch {}
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key.toLowerCase() === "d")) {
        const html = document.documentElement;
        if (html.getAttribute("data-diagnostics") === "on") {
          html.removeAttribute("data-diagnostics");
        } else {
          html.setAttribute("data-diagnostics", "on");
        }
      }
      // Alt+H: toggle hero overlay debug labels/outlines
      if (e.altKey && (e.key.toLowerCase() === "h")) {
        const html = document.documentElement;
        const active = html.getAttribute("data-debug") === "hero";
        if (active) {
          html.removeAttribute("data-debug");
          try { localStorage.setItem("debug:hero", "off"); } catch {}
        } else {
          html.setAttribute("data-debug", "hero");
          try { localStorage.setItem("debug:hero", "on"); } catch {}
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
