import Link from "next/link";
import { cn } from "@/lib/cn";

type S = { slug: string; title: string; _count?: { episodes: number } };

/** Tab filter seri (pill bertoken). Link biasa agar jalan tanpa JS di in-app browser. */
export function SeriesTabs({ series, active, basePath = "/" }: { series: S[]; active?: string; basePath?: string }) {
  const tabs = [{ slug: "", title: "Semua" }, ...series];
  return (
    <nav aria-label="Filter seri" className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
      <ul className="flex w-max gap-2">
        {tabs.map((t) => {
          const isActive = (active ?? "") === t.slug;
          return (
            <li key={t.slug || "all"}>
              <Link
                href={t.slug ? `${basePath}?seri=${t.slug}#episode` : `${basePath}#episode`}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-extrabold transition-colors",
                  isActive ? "border-primary bg-surface-2 text-text" : "border-border bg-surface text-text-muted hover:border-border-strong hover:bg-surface-2",
                )}
              >
                {t.title}
                {"_count" in t && t._count ? <span className="text-xs tabular-nums text-text-muted">{t._count.episodes}</span> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
