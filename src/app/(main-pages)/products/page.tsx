import ProductShowcase from "@/components/features/ProductShowcase";
import DecorWrapper from "@/components/decor/DecorWrapper";

export const metadata = {
  title: "Products",
  description: "Explore our product lineup designed for modern teams.",
};

export default function ProductsPage() {
  return (
    <DecorWrapper>
      <h1 className="text-3xl font-bold tracking-tight">Products</h1>
      <p className="mt-3 max-w-2xl text-[17px] leading-7 text-[color:var(--zenotika-muted)]">
        Discover our suite of tools designed to help teams ship faster and more reliably.
      </p>
      <div className="mt-10">
        <ProductShowcase />
      </div>
    </DecorWrapper>
  );
}
