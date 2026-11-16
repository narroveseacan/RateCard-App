import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Dipanggil di setiap server action / route mutasi admin (lapisan kedua setelah proxy). */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session;
}
