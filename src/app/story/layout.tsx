import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story",
  description: "A stitched, pinned scrollytelling demo inspired by Things, Inc.",
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
