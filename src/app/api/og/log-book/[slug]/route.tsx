import { ImageResponse } from "next/og";
import { getMDXBySlug } from "@/lib/mdx";

export const runtime = "nodejs"; // uses fs via getMDXBySlug

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const post = getMDXBySlug(params.slug);
  const title = post?.title ?? params.slug.replace(/[-_]/g, " ");
  const subtitle = post?.summary ?? "Things, Inc. — Log book";

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
          <div style={{ fontSize: 24, letterSpacing: 1, textTransform: "uppercase" }}>Log book</div>
        </div>
        <div style={{ height: 28 }} />
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>{title}</div>
        <div style={{ height: 18 }} />
        <div style={{ fontSize: 28, opacity: 0.85, maxWidth: 980 }}>{subtitle}</div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 24, opacity: 0.8 }}>things.inc</div>
          <div style={{ fontSize: 20, opacity: 0.7 }}>© Things, Inc.</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
 
