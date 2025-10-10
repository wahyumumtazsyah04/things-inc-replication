import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const title = "Things, Inc.";
  const subtitle = "Modern replication with motion-first design";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(135deg, #0f0e16 0%, #1b1a2a 100%)",
          color: "#cbcfff",
          fontFamily: "Arial, 'Plus Jakarta Sans', sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#cbcfff",
              borderRadius: 12,
            }}
          />
          <span style={{ fontSize: 28, letterSpacing: -0.5 }}>Things, Inc.</span>
        </div>
        <h1 style={{ fontSize: 72, marginTop: 24, marginBottom: 8, letterSpacing: -1.2 }}>{title}</h1>
        <p style={{ fontSize: 28, opacity: 0.9 }}>{subtitle}</p>
      </div>
    ),
    {
      ...size,
    }
  );
}
