"use client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/animations";
import Image from "next/image";

export default function ProductShowcase() {
    const items = [
        { title: "Automation", copy: "Reduce toil with powerful workflow automation.", icon: "/thingsinc/670f164bb78deb5be6f4476f_Kid.png" },
        { title: "Observability", copy: "See issues early with integrated analytics.", icon: "/thingsinc/670f18f95e251b5a9c8be968_Retro_TV_On2.png" },
        { title: "Collaboration", copy: "Move faster with shared context and comments.", icon: "/thingsinc/670f164bf0d787f2a4cae332_slingshot.png" },
    ];
    const revealRef = useScrollReveal<HTMLDivElement>({ selector: "> *", stagger: 0.12 });
    return (
        <div ref={revealRef} className="grid gap-6 grid-gap-responsive md:grid-cols-3">
            {items.map((it) => (
                <Card key={it.title} className="group transform-gpu transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-md [perspective:800px]">
                    {it.icon && (
                        <div className="mb-3 [transform-style:preserve-3d] group-hover:[transform:rotateX(6deg)_rotateY(-4deg)] transition-transform duration-300 ease-out">
                            <Image src={it.icon} alt="" width={48} height={48} className="drop-shadow-sm" />
                        </div>
                    )}
                    <h3 className="text-lg font-semibold">{it.title}</h3>
                    <p className="mt-2 text-[color:var(--muted)]">{it.copy}</p>
                    <Button variant="subtle" className="mt-4">Learn more</Button>
                </Card>
            ))}
        </div>
    );
}
