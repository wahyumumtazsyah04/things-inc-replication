import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Silence workspace root inference warning by pinning this project as root
    root: __dirname,
  },
  async redirects() {
    return [
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
    ];
  },
};

export default nextConfig;
