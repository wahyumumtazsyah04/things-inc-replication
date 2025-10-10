export const metadata = { title: "Furniture" };
import RoomSubHero from "@/components/features/rooms/RoomSubHero";
export default function FurniturePage() {
  return (
    <>
      <RoomSubHero
        title="Furniture"
        subtitle="Pieces that complete the scene with character and comfort."
      />
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <p className="text-[color:var(--muted)]">Chairs, tables, and accents curated for a playful yet minimal space.</p>
      </section>
    </>
  );
}
