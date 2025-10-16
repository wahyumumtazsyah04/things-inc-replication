"use client";
import React from "react";

type Props = {
    className?: string;
};

export default function ContactForm({ className = "" }: Props) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
    const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        setFieldErrors({});
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });
            if (res.ok) {
                setStatus("success");
                setName("");
                setEmail("");
                setMessage("");
            } else {
                const data = await res.json().catch(() => ({}));
                if (data?.errors) setFieldErrors(data.errors);
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <form onSubmit={onSubmit} className={`rounded-lg border p-4 bg-[color:var(--zenotika-surface)]/60 ${className}`} noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-[color:var(--foreground)]">Name</label>
                    <input
                        id="contact-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 h-10 w-full rounded-md border bg-[color:var(--background)] px-3 text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--link-hover)]"
                        placeholder="Your name"
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                    />
                    {fieldErrors.name && <p id="contact-name-error" className="mt-1 text-sm text-red-500">{fieldErrors.name}</p>}
                </div>
                <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-[color:var(--foreground)]">Email</label>
                    <input
                        id="contact-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 h-10 w-full rounded-md border bg-[color:var(--background)] px-3 text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--link-hover)]"
                        placeholder="you@example.com"
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                    />
                    {fieldErrors.email && <p id="contact-email-error" className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="block text-sm font-medium text-[color:var(--foreground)]">Message</label>
                    <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 w-full rounded-md border bg-[color:var(--background)] px-3 py-2 text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--link-hover)]"
                        placeholder="How can we help?"
                        aria-invalid={!!fieldErrors.message}
                        aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                    />
                    {fieldErrors.message && <p id="contact-message-error" className="mt-1 text-sm text-red-500">{fieldErrors.message}</p>}
                </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-10 rounded-md bg-[color:var(--foreground)] px-4 text-[color:var(--background)] hover:opacity-90 disabled:opacity-70"
                >
                    {status === "loading" ? "Sending…" : status === "success" ? "Sent!" : "Send message"}
                </button>
                {status === "error" && <p role="alert" className="text-sm text-red-500">Something went wrong. Please try again.</p>}
                {status === "success" && <p className="text-sm text-green-600">Thanks! We’ll get back to you shortly.</p>}
            </div>

            <p className="mt-3 text-sm text-[color:var(--zenotika-muted)]">
                Prefer chat? Reach us on Discord: <a className="underline" href="https://discord.gg/rooms" target="_blank" rel="noopener noreferrer">discord.gg/rooms</a>
            </p>
        </form>
    );
}
