import { ImageResponse } from "next/og";

export const runtime = "edge";

const TITLES: Record<string, { title: string; subtitle: string }> = {
  "rooms": { title: "Rooms", subtitle: "Create & browse 3D, interactive rooms." },
  "rooms/displays": { title: "Rooms · Displays", subtitle: "Screens and scenes that bring rooms to life." },
  "rooms/furniture": { title: "Rooms · Furniture", subtitle: "Pieces that complete the scene." },
  "rooms/mirror": { title: "Rooms · Mirror", subtitle: "Reflections with personality." },
  "rooms/portal": { title: "Rooms · Portal", subtitle: "Transitions between scenes." },
  "about-us": { title: "About us", subtitle: "Learn more about Things, Inc." },
  "assets": { title: "Media Assets", subtitle: "Brand assets for press and partners." },
  "a-bunch-of-things": { title: "A Bunch of Things", subtitle: "Playful experiments and demos." },
  "worlds": { title: "Worlds", subtitle: "Coming... eventually." },
  "contact": { title: "Contact", subtitle: "Get in touch with Things, Inc." },
  "privacy": { title: "Privacy", subtitle: "How we handle your data." },
  "terms": { title: "Terms", subtitle: "Terms of Service." },
  "log-book": { title: "Log book", subtitle: "Updates and stories from the team." },
  "home": { title: "Things, Inc.", subtitle: "We make software we wish we had as kids." },
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ page: string }> }
) {
  const { page } = await ctx.params;
  const key = page.toLowerCase();
  const cfg = TITLES[key] ?? { title: key.replace(/[-_]/g, " "), subtitle: "Things, Inc." };
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #0b1020 0%, #1a1f36 60%, #22253f 100%)",
          color: "#eaf0ff",
          fontFamily: "system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: 0.9 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#9dd6ff",
              boxShadow: "0 0 24px rgba(157,214,255,0.8)",
            }}
          />
          <div style={{ fontSize: 24, letterSpacing: 1, textTransform: "uppercase" }}>Things, Inc.</div>
        </div>
        <div style={{ height: 28 }} />
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>{cfg.title}</div>
        <div style={{ height: 18 }} />
        <div style={{ fontSize: 28, opacity: 0.85, maxWidth: 980 }}>{cfg.subtitle}</div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 24, opacity: 0.8 }}>things.inc</div>
          <div style={{ fontSize: 20, opacity: 0.7 }}>© Things, Inc.</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
