import ProductShowcase from "@/components/features/ProductShowcase";

export const metadata = {
  title: "Products",
  description: "Explore our product lineup",
};

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Products</h1>
      <p className="mt-3 text-gray-600 max-w-2xl">
        Discover our suite of tools designed to help teams ship faster and more reliably.
      </p>
      <div className="mt-10">
        <ProductShowcase />
      </div>
    </section>
  );
}
