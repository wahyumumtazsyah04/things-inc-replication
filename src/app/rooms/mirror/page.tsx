export const metadata = { title: "Mirror" };
import RoomSubHero from "@/components/features/rooms/RoomSubHero";
import Reveal from "@/components/ui/Reveal";
export default function MirrorPage() {
  return (
    <>
      <RoomSubHero
        title="Mirror"
        subtitle="Reflections with personality—playful, responsive, and alive."
      />
      <section className="relative mx-auto max-w-6xl px-4 pb-12">
        <div className="tunnel-mask-soft -z-10" aria-hidden />
        <Reveal className="max-w-3xl">
          <p className="text-[color:var(--muted)]">Try interactions that react to presence and motion for a fun twist.</p>
        </Reveal>
      </section>
    </>
  );
}
