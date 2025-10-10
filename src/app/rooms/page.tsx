export const metadata = { title: "Rooms" };
import RoomsHero from "@/components/features/rooms/RoomsHero";
import RoomsGrid from "@/components/features/rooms/RoomsGrid";

export default function RoomsPage() {
  return (
    <>
      <RoomsHero />
      <RoomsGrid />
    </>
  );
}
