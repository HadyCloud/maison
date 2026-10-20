import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: { root: import.meta.dirname },
  // Inline the (small) Tailwind stylesheet: removes the only render-blocking request.
  experimental: { inlineCss: true },
  // RESERVATION_URL (server-side name from the brief) is exposed to the client bundle as NEXT_PUBLIC_RESERVATION_URL.
  env: {
    NEXT_PUBLIC_RESERVATION_URL: process.env.RESERVATION_URL ?? process.env.NEXT_PUBLIC_RESERVATION_URL ?? "",
  },
  // Images are pre-processed by `pnpm assets` (AVIF/WebP sets + LQIP), so next/image optimisation is not used.
  images: { unoptimized: true },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/(images|video)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default config;
