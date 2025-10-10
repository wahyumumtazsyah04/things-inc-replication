import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const tiers = [
  { name: "Starter", price: "$0", features: ["Up to 3 projects", "Community support"] },
  { name: "Pro", price: "$29", features: ["Unlimited projects", "Priority support", "Team features"] },
  { name: "Enterprise", price: "Contact us", features: ["Custom SLAs", "SSO/SAML", "Dedicated support"] },
];

export default function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((t) => (
        <Card key={t.name}>
          <h3 className="text-lg font-semibold">{t.name}</h3>
          <p className="mt-2 text-3xl font-bold">{t.price}</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {t.features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
          <Button className="mt-6 w-full">Choose {t.name}</Button>
        </Card>
      ))}
    </div>
  );
}
