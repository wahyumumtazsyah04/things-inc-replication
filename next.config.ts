import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Silence workspace root inference warning by pinning this project as root
    root: __dirname,
  },
};

export default nextConfig;
