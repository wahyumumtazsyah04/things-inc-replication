export const metadata = {
  title: "Home",
  description: "Build modern marketing sites with confidence.",
};
import Hero from "@/components/features/Hero";
import ProductShowcase from "@/components/features/ProductShowcase";
import PricingTable from "@/components/features/PricingTable";
import DecorWrapper from "@/components/decor/DecorWrapper";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Below sections reuse mosaic but avoid duplicating clouds/mask already in Hero */}
      <DecorWrapper showClouds={false} showMask={false} showGrid>
        <div className="mt-8">
          <ProductShowcase />
        </div>
        <div className="mt-16">
          <PricingTable />
        </div>
      </DecorWrapper>
    </>
  );
}
