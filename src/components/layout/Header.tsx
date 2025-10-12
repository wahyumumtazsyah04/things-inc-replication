"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Image from "next/image";
import Magnetic from "@/components/ui/Magnetic";
import MotionToggle from "@/components/ui/MotionToggle";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [thingsOpen, setThingsOpen] = React.useState(false);
  const pathname = usePathname();
  const isInner = pathname && pathname !== "/";
  const menuButtonDesktopRef = React.useRef<HTMLButtonElement | null>(null);
  const menuButtonMobileRef = React.useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const logoContainerRef = React.useRef<HTMLAnchorElement | null>(null);
  const menuPanelRef = React.useRef<HTMLDivElement | null>(null);
  const thingsMenuRef = React.useRef<HTMLDivElement | null>(null);
  const thingsItemsRef = React.useRef<HTMLAnchorElement[]>([]);
  const reduced = usePrefersReducedMotion();

  // Roving focus helpers for desktop dropdown
  const moveRoving = (dir: 1 | -1) => {
    const items = thingsItemsRef.current.filter(Boolean);
    if (!items.length) return;
    const idx = items.findIndex((el) => el === document.activeElement);
    const next = idx === -1 ? (dir > 0 ? 0 : items.length - 1) : (idx + dir + items.length) % items.length;
    items[next]?.focus();
  };
  const focusRoving = (index: number) => {
    const items = thingsItemsRef.current.filter(Boolean);
    if (!items.length) return;
    const i = Math.max(0, Math.min(index, items.length - 1));
    items[i]?.focus();
  };

  type GtagFn = (command: "event", eventName: string, params?: Record<string, unknown>) => void;
  type AnalyticsWindow = {
    gtag?: GtagFn;
    dataLayer?: Array<Record<string, unknown>>;
  };

  // Lock scroll when menu is open and handle Escape to close
  React.useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.classList.add("overflow-hidden");
      // move focus to close button when menu opens
      closeButtonRef.current?.focus();
    } else {
      root.classList.remove("overflow-hidden");
      // return focus to the last-used menu button (desktop or mobile)
      (document.activeElement as HTMLElement | null)?.blur?.();
      (menuButtonMobileRef.current || menuButtonDesktopRef.current)?.focus();
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && open) {
        const panel = menuPanelRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Subtle logo intro on homepage only
  React.useEffect(() => {
    if (pathname !== "/" || reduced) return;
    const el = logoContainerRef.current;
    if (!el) return;
    el.classList.add("logo-intro-anim", "logo-intro-start");
    const id = requestAnimationFrame(() => {
      el.classList.remove("logo-intro-start");
    });
    return () => {
      cancelAnimationFrame(id);
      el.classList.remove("logo-intro-anim", "logo-intro-start");
    };
  }, [pathname, reduced]);

  const emit = (event: string, params: Record<string, unknown> = {}) => {
    try {
      if (typeof window !== "undefined") {
        const w = window as unknown as AnalyticsWindow;
        if (typeof w.gtag === "function") {
          w.gtag("event", event, params);
        } else if (Array.isArray(w.dataLayer)) {
          w.dataLayer.push({ event, ...params });
        }
      }
    } catch { }
  };

  const closeAnd = (cb?: () => void) => () => {
    setOpen(false);
    emit("menu_close");
    cb?.();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[color:var(--header-bg)] backdrop-blur supports-[backdrop-filter]:bg-[color:var(--header-bg-blur)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[72px]">
        <Link ref={logoContainerRef} href="/" className="flex items-center gap-3" aria-label="Things, Inc. Home">
          <Image
            src={isInner ? "/thingsinc/672beb4a0c7dad2a9e3a4eaa_inner-logo_day.png" : "/thingsinc/6724406f04b26f75915dd8c2_Home-logo_day.webp"}
            alt="Things, Inc. logo (day)"
            width={132}
            height={36}
            className="logo-day h-7 w-auto"
            priority={false}
            decoding="async"
          />
          <Image
            src={isInner ? "/thingsinc/672bea61ffcc89b629e760fe_inner-logo_night.png" : "/thingsinc/6705b9208ebb9e666ec8413b_Home-logo_night.webp"}
            alt="Things, Inc. logo (night)"
            width={132}
            height={36}
            className="logo-night h-7 w-auto"
            priority={false}
            decoding="async"
          />
        </Link>
        {/* Desktop: place Menu at the left with logo for a minimal, reference-like header */}
        <div className="hidden items-center gap-3 sm:flex">
          <div
            className="relative"
            role="menubar"
            onMouseEnter={() => setThingsOpen(true)}
            onMouseLeave={() => setThingsOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={thingsOpen}
              aria-controls="desktop-our-things-menu"
              className="inline-flex h-9 items-center rounded-md px-3 text-[color:var(--foreground)]/85 hover:bg-[color:var(--zenotika-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zenotika-ring)]"
              onClick={() => setThingsOpen((v) => !v)}
              onKeyDown={(e) => {
                const menu = document.getElementById('desktop-our-things-menu');
                if (!menu) return;
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setThingsOpen(true);
                  (thingsItemsRef.current[0] || menu.querySelector('a,button'))?.focus?.();
                } else if (e.key === 'Escape') {
                  setThingsOpen(false);
                  (e.currentTarget as HTMLButtonElement).focus();
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setThingsOpen(true);
                  const items = thingsItemsRef.current;
                  (items[items.length - 1] as HTMLElement | undefined)?.focus?.();
                } else if (e.key === 'Home') {
                  e.preventDefault();
                  if (thingsOpen) (thingsItemsRef.current[0] as HTMLElement | undefined)?.focus?.();
                } else if (e.key === 'End') {
                  e.preventDefault();
                  if (thingsOpen) (thingsItemsRef.current[thingsItemsRef.current.length - 1] as HTMLElement | undefined)?.focus?.();
                }
              }}
            >
              Our Things
            </button>
            <div
              id="desktop-our-things-menu"
              role="menu"
              ref={thingsMenuRef}
              className={`absolute left-0 mt-1 w-52 rounded-md border bg-[color:var(--background)] p-1 shadow-lg transition-all ${thingsOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setThingsOpen(false);
                  menuButtonDesktopRef.current?.focus();
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  moveRoving(1);
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  moveRoving(-1);
                } else if (e.key === 'Home') {
                  e.preventDefault();
                  focusRoving(0);
                } else if (e.key === 'End') {
                  e.preventDefault();
                  focusRoving(thingsItemsRef.current.length - 1);
                }
              }}
              onBlur={(e) => {
                const next = e.relatedTarget as Node | null;
                const current = e.currentTarget as HTMLElement;
                if (!current.contains(next)) setThingsOpen(false);
              }}
            >
              <Link ref={(el) => { if (el) thingsItemsRef.current[0] = el; }} href="/rooms" className="block rounded px-3 py-2 hover:bg-[color:var(--zenotika-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zenotika-ring)]">Rooms</Link>
              <Link ref={(el) => { if (el) thingsItemsRef.current[1] = el; }} href="/a-bunch-of-things" className="block rounded px-3 py-2 hover:bg-[color:var(--zenotika-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zenotika-ring)]">A Bunch of Things</Link>
            </div>
          </div>
          <Magnetic>
            <button
              ref={menuButtonDesktopRef}
              type="button"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-9 items-center rounded-md px-3 text-[color:var(--foreground)]/85 hover:bg-[color:var(--zenotika-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zenotika-ring)]"
              onClick={() => { setOpen(true); emit("menu_open", { surface: "desktop" }); }}
            >
              Menu
            </button>
          </Magnetic>
        </div>

        {/* Right-side utility toggles */}
        <div className="hidden items-center gap-2 sm:flex">
          <ThemeToggle className="mr-1" />
          <MotionToggle className="mr-1" />
        </div>

        {/* Mobile menu button */}
        <button
          ref={menuButtonMobileRef}
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--foreground)]/80 hover:bg-[color:var(--zenotika-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zenotika-ring)] sm:hidden"
          onClick={() => { setOpen(true); emit("menu_open", { surface: "mobile" }); }}
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
          <div ref={menuPanelRef} className="relative mx-auto flex h-full max-w-6xl flex-col px-4 py-6">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-15" style={{ backgroundImage: 'url(/thingsinc/66fdff627bcf2cef89fa0abd_menu-panel-brand.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'left top' }} />
            <div className="flex items-center justify-between">
              <h2 id="mobile-menu-title" className="text-base font-semibold text-[color:var(--foreground)]">Menu</h2>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <MotionToggle />
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
            <div className="mt-8 grid gap-2 text-lg text-[color:var(--foreground)]">
              <Link
                href="/about-us"
                onClick={closeAnd()}
                className="cursor-hoverable rounded px-2 py-2 hover:bg-[color:var(--zenotika-surface)] underline-anim link-reset"
                aria-current={pathname === "/about-us" ? "page" : undefined}
                data-active={pathname === "/about-us" ? "true" : undefined}
              >
                About us
              </Link>
              <Link
                href="/log-book"
                onClick={closeAnd()}
                className="cursor-hoverable rounded px-2 py-2 hover:bg-[color:var(--zenotika-surface)] underline-anim link-reset"
                aria-current={pathname?.startsWith("/log-book") ? "page" : undefined}
                data-active={pathname?.startsWith("/log-book") ? "true" : undefined}
              >
                Log book
              </Link>
              <Link
                href="/contact"
                onClick={closeAnd()}
                className="cursor-hoverable rounded px-2 py-2 hover:bg-[color:var(--zenotika-surface)] underline-anim link-reset"
                aria-current={pathname === "/contact" ? "page" : undefined}
                data-active={pathname === "/contact" ? "true" : undefined}
              >
                Contact
              </Link>
              <div className="mt-4 text-sm font-medium text-[color:var(--foreground)]/70">Our Things</div>
              <Link
                href="/rooms"
                onClick={closeAnd()}
                className="cursor-hoverable rounded px-2 py-2 hover:bg-[color:var(--zenotika-surface)] underline-anim link-reset"
                aria-current={pathname?.startsWith("/rooms") ? "page" : undefined}
                data-active={pathname?.startsWith("/rooms") ? "true" : undefined}
              >
                Rooms
              </Link>
              <Link
                href="/a-bunch-of-things"
                onClick={closeAnd()}
                className="cursor-hoverable rounded px-2 py-2 hover:bg-[color:var(--zenotika-surface)] underline-anim link-reset"
                aria-current={pathname === "/a-bunch-of-things" ? "page" : undefined}
                data-active={pathname === "/a-bunch-of-things" ? "true" : undefined}
              >
                A Bunch of Things
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
