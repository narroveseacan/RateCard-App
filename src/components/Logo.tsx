/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/cn";

/** Wordmark: versi putih di tema gelap, versi berwarna di tema terang (aturan brand kit). */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-block", className)}>
      <img src="/brand/logo-white.png" alt="perbekasian" width={640} height={105} className="logo-dark h-auto w-full" />
      <img src="/brand/logo-color.png" alt="perbekasian" width={640} height={105} className="logo-light h-auto w-full" />
    </span>
  );
}
