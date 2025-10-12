import { type Metadata } from "next";
import NotFoundContent from "@/components/ui/NotFoundContent";

export const metadata: Metadata = { title: "404", robots: { index: false, follow: true } };

export default function NotFound() {
  return <NotFoundContent />;
}
