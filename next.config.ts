import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
          // Map frontend /api/* to backend /*
          {
            source: "/api/:path*",
            destination: "http://localhost:8080/:path*",
          },
        ]
      : [
          {
            source: "/api/:path*",
            destination:
              "https://battery-crud-backend-git-main-ridwan4855s-projects.vercel.app/:path*",
          },
        ];
  },
};

export default nextConfig;
