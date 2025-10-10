"use client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/animations";
import React from "react";

const tiers = [
    { name: "Starter", price: "$0", features: ["Up to 3 projects", "Community support"] },
    { name: "Pro", price: "$29", features: ["Unlimited projects", "Priority support", "Team features"] },
    { name: "Enterprise", price: "Contact us", features: ["Custom SLAs", "SSO/SAML", "Dedicated support"] },
];

export default function PricingTable() {
    const revealRef = useScrollReveal<HTMLDivElement>({ selector: "> *", stagger: 0.12 });
    return (
        <div ref={revealRef} className="grid gap-6 grid-gap-responsive md:grid-cols-3">
            {tiers.map((t) => (
                <Card key={t.name} className="group">
                    <h3 className="text-lg font-semibold">{t.name}</h3>
                    <p className="mt-2 text-3xl font-bold">{t.price}</p>
                    <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
                        {t.features.map((f) => (
                            <li key={f}>• {f}</li>
                        ))}
                    </ul>
                    {t.name === "Pro" ? (
                        <Button variant="primary" className="mt-6 w-full">Choose {t.name}</Button>
                    ) : t.name === "Starter" ? (
                        <Button variant="subtle" className="mt-6 w-full">Choose {t.name}</Button>
                    ) : (
                        <Button variant="ghost" className="mt-6 w-full">Contact sales</Button>
                    )}
                </Card>
            ))}
        </div>
    );
}
