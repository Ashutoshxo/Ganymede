import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/auth/login",
        destination: `${process.env.NEXT_PUBLIC_DJANGO_URL || "http://127.0.0.1:8000"}/api/auth/login/`
      },
      {
        source: "/api/auth/register",
        destination: `${process.env.NEXT_PUBLIC_DJANGO_URL || "http://127.0.0.1:8000"}/api/auth/register/`
      }
    ];
  }
};

export default nextConfig;
