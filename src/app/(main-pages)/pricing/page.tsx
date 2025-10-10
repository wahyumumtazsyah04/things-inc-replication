import PricingTable from "@/components/features/PricingTable";
import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for teams of all sizes.",
};

export default function PricingPage() {
  return (
    <DecorWrapper>
      <SectionHeader title="Pricing" subtitle="Flexible plans that scale with you." />
      <div className="mt-10">
        <PricingTable />
      </div>
    </DecorWrapper>
  );
}
