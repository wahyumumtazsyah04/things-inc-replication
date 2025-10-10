import PricingTable from "@/components/features/PricingTable";
import DecorWrapper from "@/components/decor/DecorWrapper";

export const metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for teams of all sizes.",
};

export default function PricingPage() {
  return (
    <DecorWrapper>
      <h1 className="text-3xl font-bold tracking-tight">Pricing</h1>
      <p className="mt-3 max-w-2xl text-[17px] leading-7 text-[color:var(--zenotika-muted)]">
        Flexible plans that scale with you.
      </p>
      <div className="mt-10">
        <PricingTable />
      </div>
    </DecorWrapper>
  );
}
