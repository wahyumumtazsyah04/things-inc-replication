import PricingTable from "@/components/features/PricingTable";

export const metadata = {
  title: "Pricing",
  description: "Simple pricing for teams of all sizes",
};

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Pricing</h1>
      <p className="mt-3 text-gray-600 max-w-2xl">
        Flexible plans that scale with you.
      </p>
      <div className="mt-10">
        <PricingTable />
      </div>
    </section>
  );
}
