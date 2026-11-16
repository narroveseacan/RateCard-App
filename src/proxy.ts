import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Next.js 16: "proxy" menggantikan middleware. Semua /admin/* dan OAuth TikTok wajib sesi JWT (HTTP-only cookie).
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*", "/api/auth/tiktok/:path*"],
};
