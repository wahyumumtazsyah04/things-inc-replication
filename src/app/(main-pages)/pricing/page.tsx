import PricingTable from "@/components/features/PricingTable";
import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for teams of all sizes.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <DecorWrapper>
      <SectionHeader title="Pricing" subtitle="Flexible plans that scale with you." />
      <Reveal className="mt-10">
        <PricingTable />
      </Reveal>
    </DecorWrapper>
  );
}
