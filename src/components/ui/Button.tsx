import React from "react";
import Magnetic from "@/components/ui/Magnetic";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "subtle" | "ghost";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
    const base = "cursor-hoverable shimmer hover:shimmer inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-[color,background,transform,box-shadow] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transform-gpu active:scale-[0.985] focus-visible:ring-[color:var(--zenotika-ring)] disabled:opacity-50 disabled:pointer-events-none";
    let styles = "";
    switch (variant) {
        case "primary":
            styles = "bg-[color:var(--zenotika-accent)] text-[color:var(--zenotika-accent-contrast)] hover:bg-[color:var(--zenotika-accent-hover)] shadow-sm hover:shadow";
            break;
        case "secondary":
            styles = "border border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--foreground)] hover:bg-[color:var(--zenotika-surface)] shadow-sm hover:shadow";
            break;
        case "subtle":
            styles = "bg-[color:var(--zenotika-surface)] text-[color:var(--foreground)]/90 hover:shadow-sm hover:bg-[color:var(--zenotika-surface)]/90";
            break;
        case "ghost":
            styles = "bg-transparent text-[color:var(--foreground)] hover:bg-[color:var(--zenotika-surface)]/70";
            break;
    }
    const btn = <button className={`${base} ${styles} ${className}`} {...props} />;
    // Wrap in Magnetic for fine-pointer devices automatically via CSS; keeps DOM minimal
    return <Magnetic>{btn}</Magnetic>;
}
