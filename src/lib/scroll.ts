function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
}

function hasFinePointer(): boolean {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") return false;
    try {
        return window.matchMedia("(pointer: fine)").matches;
    } catch {
        return false;
    }
}

export function getWheelMultiplier(): number {
    if (typeof navigator === "undefined") return 1;
    const ua = navigator.userAgent || "";
    const isWindows = /Windows/i.test(ua);
    const isMac = /Macintosh|Mac OS X/i.test(ua);
    const fine = hasFinePointer();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    // Base per OS
    let base = 1.0;
    if (isWindows) base = 0.85; // dampen a bit on Windows
    if (isMac) base = 1.0; // macOS feels natural at 1.0

    // High precision devices (fine pointer) + high DPR can feel too fast
    if (fine && dpr >= 2) base -= 0.08;

    // Guard against negative or extreme values
    return clamp(base, 0.7, 1.1);
}

export function getTouchMultiplier(): number {
    // Keep touch scroll responsive but not too fast
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    // Slightly reduce on very high DPR devices to avoid fling
    const base = dpr >= 3 ? 1.0 : 1.1;
    return clamp(base, 0.9, 1.2);
}

export function getLenisBaseOptions() {
    return {
        duration: 1.0,
        smoothWheel: true,
        wheelMultiplier: getWheelMultiplier(),
        touchMultiplier: getTouchMultiplier(),
    } as const;
}
