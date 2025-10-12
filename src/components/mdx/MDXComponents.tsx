"use client";
import React from "react";
import Image from "next/image";
import type { MDXComponents as MDXMap } from "mdx/types";

// Anchor that opens external links in a new tab with rel safety and consistent styles
function Anchor(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    const { href = "", className = "", ...rest } = props;
    const isExternal = typeof href === "string" && /^https?:\/\//i.test(href);
    const rel = isExternal ? "noopener noreferrer" : rest.rel;
    const target = isExternal ? "_blank" : rest.target;
    return (
        <a
            href={href}
            target={target}
            rel={rel}
            className={`cursor-hoverable underline-anim link-reset text-[color:var(--link)] hover:text-[color:var(--link-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zenotika-ring)] ${className}`}
            {...rest}
        />
    );
}

// Inline code
function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
    return <code className="rounded bg-gray-100 px-1 py-0.5 text-[0.95em] text-gray-800" {...props} />;
}

// Code block with copy button and language label
function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
    const preRef = React.useRef<HTMLPreElement | null>(null);
    const [copied, setCopied] = React.useState(false);
    // derive language from data-language added by rehype-pretty-code
    const [lang, setLang] = React.useState<string | null>(null);
    React.useEffect(() => {
        const el = preRef.current;
        if (!el) return;
        const l = el.getAttribute("data-language");
        if (l) setLang(l);
    }, []);
    const onCopy = async () => {
        const el = preRef.current;
        if (!el) return;
        const code = el.querySelector("code");
        const text = code?.textContent ?? "";
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch { }
    };
    return (
        <div className="group relative">
            {lang && (
                <span className="pointer-events-none absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">
                    {lang}
                </span>
            )}
            <button
                type="button"
                onClick={onCopy}
                className="absolute right-2 bottom-2 hidden rounded bg-white/10 px-2 py-1 text-xs text-white backdrop-blur hover:bg-white/20 group-hover:block"
                aria-label="Copy code"
            >
                {copied ? "Copied" : "Copy"}
            </button>
            <pre
                ref={preRef}
                className="overflow-x-auto rounded-md bg-[#0a0a0a] p-4 text-[13px] leading-6 text-gray-100 shadow-inner"
                {...props}
            />
        </div>
    );
}

// Image with Next.js optimization when possible
type MdxImgProps = {
    src?: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
};

function Img(props: MdxImgProps) {
    const { src = "", alt = "", width, height, className } = props;
    // If width/height provided, use Image; else fallback to img
    const hasSize = typeof width !== "undefined" && typeof height !== "undefined";
    if (hasSize && typeof src === "string" && src.length > 0) {
        return (
            <Image
                src={src}
                alt={alt}
                width={typeof width === "string" ? parseInt(width, 10) : width}
                height={typeof height === "string" ? parseInt(height, 10) : height}
                className={`rounded ${className ?? ""}`}
            />
        );
    }
    // For MDX content without explicit dimensions, use fill layout to keep Next/Image benefits.
    if (typeof src === "string" && src.length > 0) {
        return (
            <span className={`relative block overflow-hidden rounded ${className ?? ""}`} style={{ aspectRatio: "16/9" }}>
                <Image src={src} alt={alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </span>
        );
    }
    // Final fallback if src invalid
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`rounded ${className ?? ""}`} />;
}

// Callout/Admonition
function Callout({ type = "note", children }: { type?: "note" | "tip" | "warning" | "danger"; children: React.ReactNode }) {
    const styles: Record<string, string> = {
        note: "border-blue-200 bg-blue-50 text-blue-900",
        tip: "border-emerald-200 bg-emerald-50 text-emerald-900",
        warning: "border-amber-200 bg-amber-50 text-amber-900",
        danger: "border-rose-200 bg-rose-50 text-rose-900",
    };
    return (
        <div className={`my-4 rounded-md border px-4 py-3 text-sm ${styles[type]}`}>
            {children}
        </div>
    );
}

function YouTube({ id, title = "YouTube video" }: { id: string; title?: string }) {
    return (
        <div className="relative my-6 aspect-video w-full overflow-hidden rounded-lg">
            <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${id}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
}

function Vimeo({ id, title = "Vimeo video" }: { id: string; title?: string }) {
    return (
        <div className="relative my-6 aspect-video w-full overflow-hidden rounded-lg">
            <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://player.vimeo.com/video/${id}`}
                title={title}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

function Figure({ src, alt = "", caption }: { src: string; alt?: string; caption?: string }) {
    return (
        <figure className="my-6">
            <Img src={src} alt={alt} />
            {caption && <figcaption className="mt-2 text-center text-sm text-gray-500">{caption}</figcaption>}
        </figure>
    );
}

function ImageGrid({ images }: { images: Array<{ src: string; alt?: string; ratio?: string }> }) {
    return (
        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {images.map((img, i) => {
                const ratio = img.ratio ?? "16/9";
                const [w, h] = ratio.split("/").map(Number);
                const padding = `${(h / w) * 100}%`;
                return (
                    <div key={i} className="relative overflow-hidden rounded" style={{ aspectRatio: ratio }}>
                        <div className="absolute inset-0">
                            <Img src={img.src} alt={img.alt ?? ""} />
                        </div>
                        <div style={{ paddingBottom: padding }} />
                    </div>
                );
            })}
        </div>
    );
}

const MDXComponents: MDXMap = {
    a: Anchor,
    code: InlineCode,
    pre: Pre,
    img: Img,
    Callout,
    YouTube,
    Vimeo,
    Figure,
    ImageGrid,
};

export default MDXComponents;
