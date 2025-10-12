import ProductShowcase from "@/components/features/ProductShowcase";
import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
    title: "Products",
    description: "Explore our product lineup designed for modern teams.",
    robots: { index: false, follow: true },
    alternates: { canonical: "/products" },
    openGraph: { title: "Products", description: "Explore our product lineup designed for modern teams.", type: "website" },
    twitter: { card: "summary", title: "Products" },
};

export default function ProductsPage() {
    return (
        <DecorWrapper>
            <SectionHeader title="Products" subtitle="Discover our suite of tools designed to help teams ship faster and more reliably." />
            <Reveal className="mt-10">
                <ProductShowcase />
            </Reveal>
        </DecorWrapper>
    );
}
