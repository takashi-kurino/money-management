import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopack: false,  // ← Turbopack エラー修正: Next.js 16.0.10 での performance.measure() バグ対応
  },
};

export default nextConfig;
