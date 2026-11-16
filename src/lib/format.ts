const idr = new Intl.NumberFormat("id-ID");

export const formatIdr = (n: number) => `Rp ${idr.format(Math.round(n))}`;
export const formatNumber = (n: number) => idr.format(n);

/** 719000 -> "719rb", 1250000 -> "1,3jt" */
export function compactId(n: number) {
  if (n >= 1_000_000) return `${trim(n / 1_000_000)}jt`;
  if (n >= 1_000) return `${trim(n / 1_000)}rb`;
  return idr.format(n);
}
function trim(v: number) {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: v >= 100 ? 0 : 1 }).format(v);
}

export const formatPct = (n: number) =>
  `${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(n)}%`;

const TZ = "Asia/Jakarta";

export const formatDateId = (d: Date | string) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: TZ }).format(new Date(d));

export const formatDateTimeId = (d: Date | string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  }).format(new Date(d));

export function formatDuration(sec?: number | null) {
  if (!sec) return null;
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}

/** "Label | https://url" per baris -> [{label,url}] */
export function parseSources(raw?: string | null) {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [label, url] = l.split("|").map((s) => s.trim());
      return { label: label || url || l, url: url && /^https?:\/\//.test(url) ? url : undefined };
    });
}

export const toDateInput = (d?: Date | null) => (d ? new Date(d).toISOString().slice(0, 10) : "");
