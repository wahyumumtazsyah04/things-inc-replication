export const metadata = { title: "Displays" };
import RoomSubHero from "@/components/features/rooms/RoomSubHero";
export default function DisplaysPage() {
  return (
    <>
      <RoomSubHero
        title="Displays"
        subtitle="Screens, scenes, and playful motion that bring rooms to life."
        dayImageSrc="/thingsinc/670f18f95e251b5a9c8be968_Retro_TV_On2.png"
        nightImageSrc="/thingsinc/670f189c9bf07daf7a3e0e0e_Retro_TV_Off2.png"
      />
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <p className="text-[color:var(--muted)]">Explore layouts and display compositions inspired by Things, Inc.</p>
      </section>
    </>
  );
}
