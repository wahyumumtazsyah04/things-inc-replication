export const metadata = {
  title: "Terms",
  description: "Terms of Service for Things, Inc.",
};

import DecorWrapper from "@/components/decor/DecorWrapper";

export default function TermsPage() {
  return (
    <DecorWrapper>
      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-3 text-[color:var(--zenotika-muted)]">This is a placeholder terms page.</p>
    </DecorWrapper>
  );
}
