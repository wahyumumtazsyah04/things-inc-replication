export const metadata = {
  title: "Contact",
  description: "Get in touch with Things, Inc.",
};

import DecorWrapper from "@/components/decor/DecorWrapper";

export default function ContactPage() {
  return (
    <DecorWrapper>
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mt-3 text-[color:var(--zenotika-muted)]">Reach us at contact@example.com</p>
    </DecorWrapper>
  );
}
