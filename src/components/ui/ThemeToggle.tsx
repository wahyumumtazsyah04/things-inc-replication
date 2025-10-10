"use client";
import Image from "next/image";
import { useAmbience } from "@/components/providers/AmbienceProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
    const { mode, theme, setMode } = useAmbience();

    // Cycle: auto -> day -> night -> auto
    const onClick = () => {
        if (mode === "auto") setMode("day");
        else if (mode === "day") setMode("night");
        else setMode("auto");
    };

    const label = mode === "auto" ? `Theme: Auto (${theme})` : `Theme: ${mode}`;

    return (
        <button type="button" aria-label={label} title={label} onClick={onClick} className={`inline-flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 ${className}`}>
            <Image src="/thingsinc/670f164b41e6cdbc1f70141b_switch.png" alt="theme switch" width={24} height={24} className="opacity-90" />
        </button>
    );
}
