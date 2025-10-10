"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Image from "next/image";
import Magnetic from "@/components/ui/Magnetic";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const isInner = pathname && pathname !== "/";
  const menuButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const logoContainerRef = React.useRef<HTMLAnchorElement | null>(null);

  // Lock scroll when menu is open and handle Escape to close
  React.useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.classList.add("overflow-hidden");
      // move focus to close button when menu opens
      closeButtonRef.current?.focus();
    } else {
      root.classList.remove("overflow-hidden");
      // return focus to the menu button
      menuButtonRef.current?.focus();
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Subtle logo intro on homepage only
  React.useEffect(() => {
    if (pathname !== "/") return;
    const el = logoContainerRef.current;
    if (!el) return;
    let mounted = true;
    import("gsap").then(({ gsap }) => {
      if (!mounted) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: -6 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.05 }
      );
    });
    return () => { mounted = false; };
  }, [pathname]);

  const closeAnd = (cb?: () => void) => () => {
    setOpen(false);
    cb?.();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[color:var(--header-bg)] backdrop-blur supports-[backdrop-filter]:bg-[color:var(--header-bg-blur)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[72px]">
        <Link ref={logoContainerRef} href="/" className="flex items-center gap-3" aria-label="Things, Inc. Home">
          <Image
            src={isInner ? "/thingsinc/672beb4a0c7dad2a9e3a4eaa_inner-logo_day.png" : "/thingsinc/6724406f04b26f75915dd8c2_Home-logo_day.png"}
            alt="Things, Inc. logo (day)"
            width={132}
            height={36}
            className="logo-day h-7 w-auto"
            priority
          />
          <Image
            src={isInner ? "/thingsinc/672bea61ffcc89b629e760fe_inner-logo_night.png" : "/thingsinc/6705b9208ebb9e666ec8413b_Home-logo_night.png"}
            alt="Things, Inc. logo (night)"
            width={132}
            height={36}
            className="logo-night h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-[15px] text-[color:var(--foreground)]/80 sm:flex [text-decoration:none]">
          <Link href="/products" className="underline-anim hover:text-[color:var(--link-hover)]">Products</Link>
          <Link href="/pricing" className="underline-anim hover:text-[color:var(--link-hover)]">Pricing</Link>
          <Link href="/blog" className="underline-anim hover:text-[color:var(--link-hover)]">Blog</Link>
          <Link href="/company/about" className="underline-anim hover:text-[color:var(--link-hover)]">About</Link>
          <Magnetic>
            <Link href="#" className="rounded border px-3.5 py-1.5 hover:bg-[color:var(--zenotika-surface)] text-[color:var(--foreground)]/90 link-reset">Login</Link>
          </Magnetic>
          {/* Optional CTA icon/button */}
          <Magnetic>
            <Link href="/contact" className="rounded px-3.5 py-1.5 bg-[color:var(--zenotika-accent)] text-[color:var(--zenotika-accent-contrast)] hover:bg-[color:var(--zenotika-accent-hover)] link-reset">Contact</Link>
          </Magnetic>
          <ThemeToggle className="ml-2" />
        </nav>

        {/* Mobile menu button */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--foreground)]/80 hover:bg-[color:var(--zenotika-surface)] sm:hidden"
          onClick={() => setOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm.75 5.25a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          className="fixed inset-0 z-[60] bg-[color:var(--overlay-bg)] backdrop-blur">
          <div className="relative mx-auto flex h-full max-w-6xl flex-col px-4 py-6">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-15" style={{ backgroundImage: 'url(/thingsinc/66fdff627bcf2cef89fa0abd_menu-panel-brand.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'left top' }} />
            <div className="flex items-center justify-between">
              <h2 id="mobile-menu-title" className="text-base font-semibold text-[color:var(--foreground)]">Menu</h2>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex items-center justify-center rounded-md p-2 text-[color:var(--foreground)]/80 hover:bg-[color:var(--zenotika-surface)]"
                  onClick={() => setOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 0 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-8 grid gap-4 text-lg text-[color:var(--foreground)]">
              <Link href="/products" onClick={closeAnd()} className="rounded px-2 py-2 hover:bg-[color:var(--zenotika-surface)]">Products</Link>
              <Link href="/pricing" onClick={closeAnd()} className="rounded px-2 py-2 hover:bg-[color:var(--zenotika-surface)]">Pricing</Link>
              <Link href="/blog" onClick={closeAnd()} className="rounded px-2 py-2 hover:bg-[color:var(--zenotika-surface)]">Blog</Link>
              <Link href="/company/about" onClick={closeAnd()} className="rounded px-2 py-2 hover:bg-[color:var(--zenotika-surface)]">About</Link>
              <Link href="#" onClick={closeAnd()} className="rounded px-2 py-2 hover:bg-[color:var(--zenotika-surface)]">Login</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
