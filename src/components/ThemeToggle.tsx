"use client";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("pb-theme", next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ganti tema terang/gelap"
      className={cn("inline-flex min-h-11 items-center rounded-sm px-3 font-extrabold text-link hover:bg-surface-2", className)}
    >
      Ganti tema
    </button>
  );
}
