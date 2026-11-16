import "server-only";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { attachDatabasePool } from "@vercel/functions";
import { PrismaClient } from "@/generated/prisma/client";

// Neon: pooled DATABASE_URL (-pooler) untuk trafik aplikasi.
// Vercel Fluid compute: attachDatabasePool menutup koneksi idle sebelum instance disuspend.
const globalForDb = globalThis as unknown as { prisma?: PrismaClient; pgPool?: Pool };

function normalizeConnectionString(url: string | undefined): string | undefined {
  if (!url) return url;
  // Node-postgres (pg / pg-connection-string) memunculkan peringatan keamanan jika sslmode=require
  // digunakan tanpa uselibpqcompat=true atau sslmode=verify-full.
  // Neon menggunakan sertifikat publik valid, sehingga sslmode=verify-full aman dan menghilangkan peringatan tersebut.
  return url.replace(/([?&])sslmode=require(&|$)/, "$1sslmode=verify-full$2");
}

function createClient() {
  const connectionString = normalizeConnectionString(process.env.DATABASE_URL);
  const pool =
    globalForDb.pgPool ??
    new Pool({ connectionString, max: 5, idleTimeoutMillis: 10_000 });
  globalForDb.pgPool = pool;
  attachDatabasePool(pool);
  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

export const prisma = globalForDb.prisma ?? createClient();
if (process.env.NODE_ENV !== "production") globalForDb.prisma = prisma;
