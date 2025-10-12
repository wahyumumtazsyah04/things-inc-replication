export default function Loading() {
  return (
    <section className="section mx-auto max-w-5xl px-4">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-56 rounded-md bg-[color:var(--zenotika-surface)]" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="h-40 rounded-lg bg-[color:var(--zenotika-surface)]" />
          <div className="h-40 rounded-lg bg-[color:var(--zenotika-surface)]" />
        </div>
      </div>
    </section>
  );
}
