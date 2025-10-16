import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DecorWrapper from "@/components/decor/DecorWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About us",
  description: "Things, Inc. — who we are, what we build, and the folks behind it.",
  alternates: { canonical: "/about-us" },
  openGraph: { title: "About us", description: "Things, Inc. — who we are, what we build, and the folks behind it.", url: "/about-us", images: [{ url: "/api/og/static/about-us" }] },
  twitter: { card: "summary_large_image", title: "About us", images: ["/api/og/static/about-us"] },
};

export default function AboutUsPage() {
  const year = new Date().getFullYear();
  return (
    <DecorWrapper showGrid>
      {/* Breadcrumbs */}
      <script
        id="jsonld-breadcrumbs-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "About us", item: "/about-us" },
            ],
          }),
        }}
      />
      {/* Organization JSON-LD */}
      <script
        id="jsonld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Things, Inc.",
            url: "/",
            sameAs: [
              "https://discord.gg/rooms",
              "https://www.tiktok.com/@things",
              "https://www.instagram.com/things_incorporated/",
              "https://x.com/things",
              "https://www.youtube.com/@things-inc",
              "https://www.threads.net/@things_incorporated?hl=en",
            ],
          }),
        }}
      />

      <SectionHeader title="About Us" subtitle="We make playful software for curious humans." />

      {/* Team */}
      <section className="mx-auto mt-10 max-w-6xl px-4">
        <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Team</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { name: "Jason Toff", role: "CEO" },
            { name: "Nick Kruge", role: "Co-founder" },
            { name: "Bruno Oliveira", role: "Co-founder" },
          ].map((p) => (
            <div key={p.name} className="rounded-lg border p-4">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-[color:var(--zenotika-surface)]" />
              <div className="mt-3">
                <div className="font-medium text-[color:var(--foreground)]">{p.name}</div>
                <div className="text-sm text-[color:var(--zenotika-muted)]">{p.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { name: "Matt Fogarty", role: "Content Lead" },
            { name: "Camy Decembly", role: "Content & Community" },
            { name: "Melissa Burd", role: "Content & Community" },
          ].map((p) => (
            <div key={p.name} className="rounded-lg border p-4">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-[color:var(--zenotika-surface)]" />
              <div className="mt-3">
                <div className="font-medium text-[color:var(--foreground)]">{p.name}</div>
                <div className="text-sm text-[color:var(--zenotika-muted)]">{p.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto mt-12 max-w-6xl px-4">
        <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Our Story</h2>
        <ul className="mt-4 space-y-3 text-[color:var(--foreground)]/85">
          <li>
            <span className="font-mono text-sm text-[color:var(--zenotika-muted)]">Aug 2021</span>
            <span className="ml-3">Things, Inc. is founded to explore delightful 3D creation tools.</span>
          </li>
          <li>
            <span className="font-mono text-sm text-[color:var(--zenotika-muted)]">2024</span>
            <span className="ml-3">Major updates to Rooms and growing community momentum.</span>
          </li>
          <li>
            <span className="font-mono text-sm text-[color:var(--zenotika-muted)]">{year}</span>
            <span className="ml-3">Continuing to build at the intersection of play, collaboration, and creativity.</span>
          </li>
        </ul>
      </section>

      {/* Press mentions */}
      <section className="mx-auto mt-12 max-w-6xl px-4">
        <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Press Mentions</h2>
        <ul className="mt-4 grid list-disc grid-cols-1 gap-3 pl-5 sm:grid-cols-2">
          {[
            { title: "Apple Developer: ADA-winning team on building Rooms", href: "https://developer.apple.com/news/?id=sqd5xv4n" },
            { title: "TechCrunch: Google invests $1M in Rooms", href: "https://techcrunch.com/2025/01/07/google-puts-1m-into-3d-design-app-rooms-after-more-than-1-million-rooms-created/" },
            { title: "Apple: App of the Day in 100+ countries", href: "https://apps.apple.com/us/story/id1748199514" },
            { title: "The Verge: Rooms is a delightful escape", href: "https://www.theverge.com/24121394/rooms-app-ios-ipad-design-organization" },
            { title: "TechCrunch: Major update as users jump to 250K", href: "https://techcrunch.com/2024/04/04/rooms-the-fun-3d-design-app-gets-a-major-update-as-users-jump-to-250k/" },
            { title: "Fast Company: Addictive app of the year just got better", href: "https://www.fastcompany.com/91072657/one-of-the-most-addictive-apps-of-the-year-just-got-better" },
          ].map((p) => (
            <li key={p.href} className="text-[color:var(--foreground)]/85">
              <Link href={p.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[color:var(--link-hover)]">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Investors (selected) */}
      <section className="mx-auto mt-12 max-w-6xl px-4">
        <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Investors & Advisors (selected)</h2>
        <p className="mt-3 text-[color:var(--foreground)]/85">
          Backed by a network of builders, designers, and investors who support our vision.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[color:var(--zenotika-muted)] sm:grid-cols-3 md:grid-cols-4">
          {[
            "Andreessen Horowitz",
            "Sequoia Capital",
            "Scott Belsky",
            "Gunderson Dettmer",
            "Third Kind VC",
            "Nat Friedman",
            "Mike Krieger",
            "Bradley Horowitz",
          ].map((name) => (
            <div key={name} className="rounded border bg-[color:var(--background)] px-3 py-2">{name}</div>
          ))}
        </div>
      </section>
    </DecorWrapper>
  );
}
