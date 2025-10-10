"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Theme = "day" | "night";

function getInitialTheme(): Theme {
    if (typeof window === "undefined") return "day";
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "day" || saved === "night") return saved;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "night" : "day";
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        try {
            // Persist to cookie so SSR can use it on next navigate/refresh
            document.cookie = `theme=${theme}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
        } catch { }
    }, [theme]);

    return (
        <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme((t) => (t === "day" ? "night" : "day"))}
            className={`inline-flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 ${className}`}
        >
            <Image src="/thingsinc/670f164b41e6cdbc1f70141b_switch.png" alt="theme switch" width={24} height={24} className="opacity-90" />
        </button>
    );
}
