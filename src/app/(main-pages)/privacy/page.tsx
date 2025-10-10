export const metadata = {
  title: "Privacy",
  description: "Privacy policy for Things, Inc.",
};

import DecorWrapper from "@/components/decor/DecorWrapper";

export default function PrivacyPage() {
  return (
    <DecorWrapper>
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-[color:var(--zenotika-muted)]">This is a placeholder privacy policy page.</p>
    </DecorWrapper>
  );
}
