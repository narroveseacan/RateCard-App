// Validasi kategori terlarang (Rate Card 2026, Ketentuan no. 4). Dipakai di UI dan di API.

const BLOCKED: { category: string; patterns: RegExp[] }[] = [
  {
    category: "judi online",
    patterns: [/\bjudol\b/, /\bjudi\b/, /\bslot\b/, /\bgacor\b/, /\btogel\b/, /\bcasino\b/, /\bkasino\b/, /\bbetting\b/, /\bmaxwin\b/],
  },
  { category: "pinjol ilegal", patterns: [/\bpinjol\b/, /pinjaman online ilegal/, /investasi bodong/, /\brobot trading\b/] },
  { category: "rokok/vape", patterns: [/\brokok\b/, /\bvape\b/, /\bvaping\b/, /\bkretek\b/, /\btembakau\b/, /\bcukai rokok\b/] },
  { category: "alkohol", patterns: [/\balkohol\b/, /\bmiras\b/, /\bminuman keras\b/, /\bvodka\b/, /\bwhiske?y\b/] },
  {
    category: "politik praktis",
    patterns: [/\bcaleg\b/, /\bpartai\b/, /\bpilkada\b/, /\bpemilu\b/, /\bcapres\b/, /\bcawapres\b/, /kampanye politik/, /\bpaslon\b/],
  },
];

export const BLOCKED_INDUSTRY_OPTIONS = [
  "Judi online / slot",
  "Pinjol / investasi tidak terdaftar OJK",
  "Rokok / vape",
  "Alkohol",
  "Kampanye politik praktis",
];

export const BLOCKED_MESSAGE =
  "Maaf, @perbekasian tidak menerima kerja sama untuk kategori judi online, pinjol ilegal, rokok/vape, alkohol, maupun politik praktis. Silakan sesuaikan brief kamu.";

export function findBlockedCategories(...texts: (string | null | undefined)[]): string[] {
  const hay = texts.filter(Boolean).join(" \n ").toLowerCase();
  const hits = new Set<string>();
  for (const opt of BLOCKED_INDUSTRY_OPTIONS) if (hay.includes(opt.toLowerCase())) hits.add(opt);
  for (const b of BLOCKED) if (b.patterns.some((p) => p.test(hay))) hits.add(b.category);
  return [...hits];
}

export const INDUSTRY_OPTIONS = [
  "Properti (perumahan & apartemen)",
  "Kuliner & kafe",
  "Mobilitas (otomotif, dealer, transportasi)",
  "Keuangan (bank, e-wallet, asuransi terdaftar OJK)",
  "Pendidikan",
  "Ruang publik (mal, event, wisata)",
  "Lainnya",
];
