import DecorWrapper from "@/components/decor/DecorWrapper";
export const metadata = {
  title: "About",
  description: "Learn about Things, Inc.",
};

export default function AboutPage() {
  return (
    <DecorWrapper>
      <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
      <p className="mt-3 max-w-2xl text-[color:var(--zenotika-muted)]">
        We build delightful tools for modern teams.
      </p>
    </DecorWrapper>
  );
}
