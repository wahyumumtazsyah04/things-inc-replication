import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Things, Inc.",
    short_name: "Things",
    description: "Modern replication of Things, Inc. marketing site",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0e16",
    theme_color: "#cbcfff",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/thingsinc/6724406f04b26f75915dd8c2_Home-logo_day.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/thingsinc/6705b9208ebb9e666ec8413b_Home-logo_night.png", sizes: "180x180", type: "image/png", purpose: "maskable" }
    ],
  };
}
