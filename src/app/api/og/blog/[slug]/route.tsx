import { ImageResponse } from "next/og";
import { getMDXBySlug } from "@/lib/mdx";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const post = getMDXBySlug(slug);
  const title = post?.title ?? "Things, Inc. Blog";
  const author = post?.author ?? null;
  const date = post?.date ?? null;
  // Choose day/night based on server time (optional)
  const url = new URL(req.url);
  const themeParam = url.searchParams.get("theme");
  const hour = new Date().getUTCHours();
  const timeNight = hour >= 18 || hour < 6;
  const isNight = themeParam === "night" ? true : themeParam === "day" ? false : timeNight;
  const logo = isNight
    ? "/thingsinc/6705b9208ebb9e666ec8413b_Home-logo_night.png"
    : "/thingsinc/6724406f04b26f75915dd8c2_Home-logo_day.png";
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#fff",
          fontSize: 56,
          fontWeight: 700,
          padding: 64,
        }}
      >
        {/* Background decorative brand marks + hex rooms */}
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06), rgba(0,0,0,0) 60%)" }} />
          <div style={{ position: "absolute", left: 36, top: 36, width: 220, height: 60, opacity: 0.12, backgroundImage: `url(${logo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
          <div style={{ position: "absolute", right: 36, bottom: 36, width: 220, height: 60, opacity: 0.12, backgroundImage: `url(${logo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)' }} />
          {/* hex rooms */}
          <div style={{ position: "absolute", left: 80, top: 120, width: 160, height: 160, opacity: 0.08, backgroundImage: 'url("/thingsinc/67297fcb3d8968f4ca826780_hex_room_1.webp")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', transform: 'rotate(6deg)' }} />
          <div style={{ position: "absolute", right: 120, top: 80, width: 140, height: 140, opacity: 0.08, backgroundImage: 'url("/thingsinc/67297fcb7f6587d3dc450334_hex_room_6.webp")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', transform: 'rotate(-4deg)' }} />
          <div style={{ position: "absolute", left: 300, bottom: 100, width: 180, height: 180, opacity: 0.07, backgroundImage: 'url("/thingsinc/67297fcb79d42fdd90bf5e93_hex_room_2.webp")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', transform: 'rotate(2deg)' }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1000 }}>
          <span style={{ fontSize: 28, opacity: 0.7 }}>Things, Inc.</span>
          <span style={{ lineHeight: 1.05, letterSpacing: -0.8 }}>{title}</span>
          {(author || date) && (
            <div style={{ display: "flex", gap: 24, fontSize: 28, opacity: 0.85, fontWeight: 500 }}>
              {author && <span>By {author}</span>}
              {date && <span>{date}</span>}
            </div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
