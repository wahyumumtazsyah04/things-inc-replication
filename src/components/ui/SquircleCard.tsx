"use client";
import React from "react";

type SquircleCardProps = React.PropsWithChildren<{
    className?: string;
    as?: React.ElementType;
    variant?: "solid" | "glass" | "outline";
    href?: string;
    onClick?: React.MouseEventHandler;
    title?: string;
}>;

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

/**
 * SquircleCard
 * Clips its content to a superellipse using an SVG mask. Supports glass/outline variants.
 */
export function SquircleCard({ className, children, as = "div", variant = "glass", ...rest }: SquircleCardProps) {
        const Comp: any = as ?? "div";
    return (
        <Comp
            {...rest}
                className={cx(
                "squircle relative overflow-hidden",
                variant === "glass" && "bg-[color:var(--header-bg)]/70 supports-[backdrop-filter]:bg-[color:var(--header-bg-blur)] backdrop-blur",
                variant === "solid" && "bg-[color:var(--zenotika-surface)]",
                variant === "outline" && "border border-[color:var(--border)]",
                "shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_8px_30px_rgba(0,0,0,0.25)]",
                className
            )}
        >
            {/* mask applied via CSS class .squircle */}
            {children}
        </Comp>
    );
}

export default SquircleCard;
