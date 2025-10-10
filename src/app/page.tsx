export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Build modern marketing sites with confidence
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          A clean Next.js foundation with Tailwind, ready for animations, content, and growth.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/products" className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-black">Explore products</a>
          <a href="/pricing" className="rounded border px-4 py-2 hover:bg-gray-50">See pricing</a>
        </div>
      </div>
    </section>
  );
}
