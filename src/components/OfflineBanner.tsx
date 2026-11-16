"use client";
import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
};

export function OfflineBanner() {
  const online = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
  if (online) return null;
  return (
    <div role="status" className="sticky top-0 z-50 border-b border-warning bg-surface-2 px-4 py-2 text-center text-sm text-warning">
      <span aria-hidden>⚠ </span>Koneksi internet terputus. Video sematan dan pengiriman formulir sementara tidak dapat digunakan.
    </div>
  );
}
