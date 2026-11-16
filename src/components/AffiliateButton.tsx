"use client";
import { buttonClass } from "@/components/ui";

/** Buka marketplace di tab baru, catat klik keluar di latar (sendBeacon tahan navigasi in-app browser). */
export function AffiliateButton({ id, href, children }: { id: string; href: string; children: React.ReactNode }) {
  const track = () => {
    const url = `/api/affiliate/${id}/click`;
    try {
      if (!navigator.sendBeacon?.(url)) fetch(url, { method: "POST", keepalive: true }).catch(() => {});
    } catch {
      fetch(url, { method: "POST", keepalive: true }).catch(() => {});
    }
  };
  return (
    <a href={href} target="_blank" rel="sponsored noopener noreferrer" onClick={track} className={buttonClass("primary", "md", "w-full sm:w-auto")}>
      {children}
    </a>
  );
}
