export const metadata = { title: "Mirror" };
import RoomSubHero from "@/components/features/rooms/RoomSubHero";
export default function MirrorPage() {
  return (
    <>
      <RoomSubHero
        title="Mirror"
        subtitle="Reflections with personality—playful, responsive, and alive."
      />
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <p className="text-[color:var(--muted)]">Try interactions that react to presence and motion for a fun twist.</p>
      </section>
    </>
  );
}
