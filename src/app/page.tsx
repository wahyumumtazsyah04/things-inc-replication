export const metadata = {
  title: "Home",
  description: "We make software we wish we had as kids—collaborative, playful, and a little weird.",
  openGraph: {
    title: "Things, Inc.",
    description: "We make software we wish we had as kids—collaborative, playful, and a little weird.",
    type: "website",
    url: "/",
    images: [{ url: "/api/og/static/home" }],
  },
  twitter: { card: "summary_large_image", title: "Things, Inc.", images: ["/api/og/static/home"] },
};
import HomeOrchestrated from "@/components/features/HomeOrchestrated";

export default function Home() {
  return (
    <HomeOrchestrated />
  );
}
