import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Migrations need the direct (unpooled) connection on Neon.
    // Menggunakan process.env dengan fallback agar `prisma generate` saat CI/build (postinstall)
    // tidak crash jika DATABASE_URL_UNPOOLED belum diatur.
    url:
      process.env.DATABASE_URL_UNPOOLED ||
      process.env.DATABASE_URL ||
      "",
  },
});
