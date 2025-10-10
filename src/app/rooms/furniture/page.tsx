export const metadata = { title: "Furniture" };
import RoomSubHero from "@/components/features/rooms/RoomSubHero";
import Reveal from "@/components/ui/Reveal";
export default function FurniturePage() {
  return (
    <>
      <RoomSubHero
        title="Furniture"
        subtitle="Pieces that complete the scene with character and comfort."
      />
      <section className="relative mx-auto max-w-6xl px-4 pb-12">
        <div className="tunnel-mask-soft -z-10" aria-hidden />
        <Reveal className="max-w-3xl">
          <p className="text-[color:var(--muted)]">Chairs, tables, and accents curated for a playful yet minimal space.</p>
        </Reveal>
      </section>
    </>
  );
}
