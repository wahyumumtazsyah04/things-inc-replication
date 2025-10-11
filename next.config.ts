import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Silence workspace root inference warning by pinning this project as root
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remotePatterns here if we ever serve images from an external domain via next/image
    // Example:
    // remotePatterns: [
    //   { protocol: "https", hostname: "images.ctfassets.net" },
    //   { protocol: "https", hostname: "res.cloudinary.com" },
    // ],
  },
  async redirects() {
    return [
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
    ];
  },
};

export default nextConfig;
