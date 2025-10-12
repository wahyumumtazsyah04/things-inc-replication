"use client";
import React from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    React.useEffect(() => {
        // Optional: send to analytics or log service here
        // console.error(error);
    }, [error]);
    return (
        <html>
            <body className="section mx-auto max-w-3xl px-4 py-16">
                <h1 className="mb-3 text-3xl font-bold">Something went wrong</h1>
                <p className="text-[color:var(--muted)]">An unexpected error occurred. You can try again or go back home.</p>
                <div className="mt-6 flex gap-3">
                    <button onClick={() => reset()} className="rounded-md bg-[color:var(--zenotika-accent)] px-4 py-2 text-[color:var(--zenotika-accent-contrast)] shadow">
                        Try again
                    </button>
                    <a href="/" className="rounded-md border px-4 py-2">Back home</a>
                </div>
                {process.env.NODE_ENV !== 'production' && error?.digest && (
                    <p className="mt-4 text-xs opacity-60">Error ID: {error.digest}</p>
                )}
            </body>
        </html>
    );
}
