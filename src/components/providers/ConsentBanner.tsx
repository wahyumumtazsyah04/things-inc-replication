"use client";
import React from "react";

function getConsent(): "granted" | "denied" | null {
    try {
        const ls = localStorage.getItem("consent");
        if (ls === "granted" || ls === "denied") return ls;
    } catch { }
    try {
        const match = document.cookie.match(/(?:^|; )consent=([^;]+)/);
        const v = match ? decodeURIComponent(match[1]) : null;
        if (v === "granted" || v === "denied") return v;
    } catch { }
    return null;
}

function setConsent(v: "granted" | "denied") {
    try {
        localStorage.setItem("consent", v);
        const maxAge = 60 * 60 * 24 * 180; // 180 days
        document.cookie = `consent=${v}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
        (window as any).__consentGranted = v === "granted";
        window.dispatchEvent(new CustomEvent("consent:changed", { detail: { granted: v === "granted" } }));
    } catch { }
}

export default function ConsentBanner() {
    const [visible, setVisible] = React.useState(false);
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const current = getConsent();
          // Only explicitly set granted/denied when known; leave undefined if no decision yet
          if (current === "granted") (window as any).__consentGranted = true;
          else if (current === "denied") (window as any).__consentGranted = false;
        // Show banner only when no decision yet
        setVisible(current === null);
    }, []);

    if (!visible) return null;

    return (
        <div role="dialog" aria-modal="true" aria-labelledby="consent-title" className="fixed inset-x-0 bottom-0 z-[70]">
            <div className="mx-auto mb-4 max-w-5xl rounded-lg border bg-[color:var(--background)]/95 p-4 shadow-lg backdrop-blur">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 id="consent-title" className="text-sm font-semibold text-[color:var(--foreground)]">Privacy</h2>
                        <p className="mt-1 max-w-2xl text-sm text-[color:var(--muted)]">
                            We use cookies to measure usage and improve the experience. You can accept or decline analytics.
                            See our <a className="underline" href="/privacy">Privacy Policy</a>.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="rounded-md border px-3 py-2 text-sm"
                            onClick={() => {
                                setConsent("denied");
                                setVisible(false);
                            }}
                        >
                            Decline
                        </button>
                        <button
                            className="rounded-md bg-[color:var(--zenotika-accent)] px-3 py-2 text-sm text-[color:var(--zenotika-accent-contrast)] shadow"
                            onClick={() => {
                                setConsent("granted");
                                setVisible(false);
                            }}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
