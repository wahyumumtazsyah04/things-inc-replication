export const metadata = {
  title: "About",
  description: "Learn about Things, Inc.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
      <p className="mt-3 text-gray-600 max-w-2xl">
        We build delightful tools for modern teams.
      </p>
    </section>
  );
}
