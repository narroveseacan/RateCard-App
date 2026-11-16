import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Data halaman publik & admin dibaca langsung dari Neon per request.
  serverExternalPackages: ["pg", "@prisma/adapter-pg"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
