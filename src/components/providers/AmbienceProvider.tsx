"use client";
import React from "react";

export type ThemeMode = "auto" | "day" | "night";
export type ThemeValue = "day" | "night";

type AmbienceContextValue = {
  mode: ThemeMode;
  theme: ThemeValue; // resolved value considering mode
  setMode: (mode: ThemeMode) => void;
};

const AmbienceContext = React.createContext<AmbienceContextValue | null>(null);

function computeAutoThemeByHour(d = new Date()): ThemeValue {
  const h = d.getHours();
  // Daytime 6:00 - 17:59
  return h >= 6 && h < 18 ? "day" : "night";
}

export function AmbienceProvider({ children, initialTheme }: { children: React.ReactNode; initialTheme?: ThemeValue }) {
  // mode persisted as 'themeMode' (auto|day|night). Backwards compatibility: if only 'theme' is stored, infer mode as fixed day/night
  const [mode, setModeState] = React.useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "auto";
    try {
      const savedMode = localStorage.getItem("themeMode") as ThemeMode | null;
      if (savedMode === "auto" || savedMode === "day" || savedMode === "night") return savedMode;
      const legacy = localStorage.getItem("theme");
      if (legacy === "day" || legacy === "night") return legacy as ThemeMode;
    } catch {}
    return "auto";
  });

  const [theme, setTheme] = React.useState<ThemeValue>(() => {
    if (typeof window === "undefined") return initialTheme ?? "day";
    if (mode === "auto") return computeAutoThemeByHour();
    return (mode as ThemeValue) ?? (initialTheme ?? "day");
  });

  // Apply and persist changes
  React.useEffect(() => {
    const resolved: ThemeValue = mode === "auto" ? computeAutoThemeByHour() : (mode as ThemeValue);
    setTheme(resolved);
    try {
      localStorage.setItem("themeMode", mode);
      // Keep legacy key for compatibility with existing code and SSR cookie approach
      localStorage.setItem("theme", resolved);
      document.cookie = `theme=${resolved}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      document.documentElement.setAttribute("data-theme", resolved);
      window.dispatchEvent(new CustomEvent("ambient:changed", { detail: { mode, theme: resolved } }));
    } catch {}
  }, [mode]);

  // When in auto mode, update on hour changes without tight intervals (check every 5 minutes)
  React.useEffect(() => {
    if (mode !== "auto") return;
    const tick = () => {
      const next = computeAutoThemeByHour();
      setTheme((prev) => (prev !== next ? next : prev));
      try {
        localStorage.setItem("theme", next);
        document.cookie = `theme=${next}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
        document.documentElement.setAttribute("data-theme", next);
      } catch {}
    };
    const id = window.setInterval(tick, 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [mode]);

  const setMode = React.useCallback((m: ThemeMode) => {
    setModeState(m);
  }, []);

  const value = React.useMemo<AmbienceContextValue>(() => ({ mode, theme, setMode }), [mode, theme, setMode]);
  return <AmbienceContext.Provider value={value}>{children}</AmbienceContext.Provider>;
}

export function useAmbience() {
  const ctx = React.useContext(AmbienceContext);
  if (!ctx) throw new Error("useAmbience must be used within AmbienceProvider");
  return ctx;
}
