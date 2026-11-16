import type { NextAuthConfig } from "next-auth";

// Konfigurasi ringan (tanpa DB) — dipakai proxy.ts untuk memblokir /admin/*.
export const authConfig = {
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 12 },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLogin = nextUrl.pathname === "/admin/login";
      const loggedIn = !!auth?.user;
      if (isLogin) return loggedIn ? Response.redirect(new URL("/admin", nextUrl)) : true;
      return loggedIn;
    },
  },
} satisfies NextAuthConfig;
