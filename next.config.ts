import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Ensure Turbopack resolves the project root correctly when multiple lockfiles exist
    root: "./",
  },
};

export default nextConfig;
