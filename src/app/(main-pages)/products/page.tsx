import ProductShowcase from "@/components/features/ProductShowcase";
import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Products",
  description: "Explore our product lineup designed for modern teams.",
  openGraph: { title: "Products", description: "Explore our product lineup designed for modern teams.", type: "website" },
  twitter: { card: "summary", title: "Products" },
};

export default function ProductsPage() {
  return (
    <DecorWrapper>
      <SectionHeader title="Products" subtitle="Discover our suite of tools designed to help teams ship faster and more reliably." />
      <div className="mt-10">
        <ProductShowcase />
      </div>
    </DecorWrapper>
  );
}
