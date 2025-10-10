import { Card } from "@/components/ui/Card";

export default function ProductShowcase() {
  const items = [
    { title: "Automation", copy: "Reduce toil with powerful workflow automation." },
    { title: "Observability", copy: "See issues early with integrated analytics." },
    { title: "Collaboration", copy: "Move faster with shared context and comments." },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((it) => (
        <Card key={it.title}>
          <h3 className="text-lg font-semibold">{it.title}</h3>
          <p className="mt-2 text-gray-600">{it.copy}</p>
        </Card>
      ))}
    </div>
  );
}
