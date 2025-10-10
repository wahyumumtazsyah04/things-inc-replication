"use client";
import React from "react";

export type CollectibleKey = "key" | "chick" | "book" | "coin" | "gem" | "crab";
export type CollectiblesState = Record<CollectibleKey, number>;

const DEFAULT_STATE: CollectiblesState = {
  key: 0,
  chick: 0,
  book: 0,
  coin: 0,
  gem: 0,
  crab: 0,
};

type Ctx = {
  state: CollectiblesState;
  add: (item: CollectibleKey, qty?: number) => void;
  reset: () => void;
};

const CollectiblesContext = React.createContext<Ctx | null>(null);

export function CollectiblesProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CollectiblesState>(DEFAULT_STATE);

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("collectibles");
      if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw) });
    } catch {}
  }, []);

  // Persist on change
  React.useEffect(() => {
    try {
      localStorage.setItem("collectibles", JSON.stringify(state));
    } catch {}
  }, [state]);

  const add = React.useCallback((item: CollectibleKey, qty = 1) => {
    setState((s) => {
      const next = { ...s, [item]: Math.max(0, (s[item] ?? 0) + qty) } as CollectiblesState;
      // Optional analytics event
      try {
        if (typeof window !== "undefined" && "gtag" in window && typeof (window as Window & { gtag?: (cmd: string, name?: string, params?: Record<string, unknown>) => void }).gtag === "function") {
          (window as Window & { gtag?: (cmd: string, name?: string, params?: Record<string, unknown>) => void }).gtag!("event", "collectible_add", { item, qty, total: next[item] });
        }
      } catch {}
      return next;
    });
  }, []);

  const reset = React.useCallback(() => setState(DEFAULT_STATE), []);

  const value = React.useMemo<Ctx>(() => ({ state, add, reset }), [state, add, reset]);

  return <CollectiblesContext.Provider value={value}>{children}</CollectiblesContext.Provider>;
}

export function useCollectibles() {
  const ctx = React.useContext(CollectiblesContext);
  if (!ctx) throw new Error("useCollectibles must be used within CollectiblesProvider");
  return ctx;
}
