import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { RateCardBuilder, type BuilderService } from "@/components/RateCardBuilder";
import { Badge, ButtonLink, Card, Eyebrow } from "@/components/ui";
import { prisma } from "@/lib/db";
import { getActiveMetrics, getActiveServices, getSettings } from "@/lib/data";
import { compactId, formatDateId, formatNumber, formatPct } from "@/lib/format";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rate Card & Media Kit",
  description: "Statistik IG & TikTok @perbekasian, paket endorse, paid promote, dan bundling, plus kalkulator estimasi biaya untuk brand Bekasi–Cikarang.",
};

type AgeRow = { range: string; pct: number };

const SECTORS = [
  ["Properti", "Perumahan & apartemen Bekasi–Cikarang"],
  ["Kuliner & kafe", "F&B lokal, resto, coffee shop"],
  ["Mobilitas", "Otomotif, dealer, transportasi, aplikasi"],
  ["Keuangan", "Bank, e-wallet, asuransi (terdaftar OJK)"],
  ["Pendidikan", "Kampus, sekolah swasta, kursus"],
  ["Ruang publik", "Mal, event, wisata & program kota"],
];

const FLOW = [
  ["Brief", "Brand kirim produk, tujuan, pesan utama, dan tanggal tayang."],
  ["Booking", "Penawaran & invoice dikirim. Jadwal dikunci setelah DP."],
  ["Naskah", "Konsep dan naskah disetujui brand sebelum produksi."],
  ["Produksi", "Tim membuat konten sesuai naskah yang disetujui."],
  ["Preview", "Brand cek hasil dan minta revisi sesuai kuota."],
  ["Pelunasan", "Dibayar setelah preview final disetujui."],
  ["Tayang", "Diunggah sesuai jadwal, dengan label kerja sama."],
  ["Laporan", "Screenshot insight dikirim 7 hari setelah tayang."],
];

const TERMS = [
  ["Label kerja sama", "Semua konten bersponsor memakai label “Paid partnership” atau #iklan."],
  ["Approval di depan", "Perubahan konsep setelah naskah disetujui dihitung sebagai brief baru. Preview tanpa tanggapan dalam 3 hari kerja dianggap disetujui."],
  ["Hak editorial", "Perbekasian berhak menolak materi yang tidak sesuai karakter akun atau tidak akurat."],
  ["Tidak menerima", "Judi/slot, pinjol & investasi tidak terdaftar OJK, rokok & vape, alkohol, kampanye politik praktis, produk kesehatan tanpa izin edar, dan konten SARA."],
  ["Masa tayang", "Konten tidak dihapus minimal 6 bulan."],
  ["Performa organik", "Jumlah views tidak dijamin; laporan insight dikirim H+7."],
  ["Hak cipta", "Aset 3D dan video milik Perbekasian. Repost organik boleh dengan kredit; iklan berbayar pakai add-on hak iklan."],
  ["Reschedule", "Gratis 1× jika diajukan paling lambat H-2."],
];

export default async function RateCardPage() {
  const [m, services, settings, cases] = await Promise.all([
    getActiveMetrics(),
    getActiveServices(),
    getSettings(),
    prisma.episode.findMany({
      where: { isFeaturedCaseStudy: true, isPublished: true },
      orderBy: { publishedAt: "asc" },
      take: 4,
      select: { id: true, slug: true, title: true, highlightViewsLabel: true, series: { select: { title: true } } },
    }),
  ]);

  const validTo = m?.introPriceValidTo ?? new Date("2027-01-31");
  const builderServices: BuilderService[] = services.map((s) => ({
    id: s.id,
    code: s.code,
    name: s.name,
    description: s.description,
    deliverables: s.deliverables,
    category: s.category,
    pricingType: s.pricingType,
    basePriceIdr: s.basePriceIdr,
    compareAtPriceIdr: s.compareAtPriceIdr,
    percentOfContent: s.percentOfContent,
    unitLabel: s.unitLabel,
    badge: s.badge,
  }));

  const igAge = (m?.igAgeJson as AgeRow[] | null) ?? [];
  const ttAge = (m?.tiktokAgeJson as AgeRow[] | null) ?? [];

  return (
    <>
      <SiteHeader cta="episode" />
      <main className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-0">
        {/* Hero */}
        <section className="py-12 md:py-16">
          <Badge tone="secondary">Harga perkenalan s.d. {formatDateId(validTo)}</Badge>
          <h1 className="mt-4 max-w-3xl text-display">
            Kenalin brand kamu ke warga <span className="kw">Bekasi</span>.
          </h1>
          <p className="mt-4 max-w-prose text-text-muted">
            Fakta unik Bekasi dalam video 3D realistis, di Instagram dan TikTok. Videonya pendek dan visualnya beda dari akun info lokal
            kebanyakan, jadi orang nonton sampai habis lalu membagikannya.
          </p>
          <ButtonLink href="#kalkulator" size="lg" className="mt-6">
            Hitung Estimasi
          </ButtonLink>
        </section>

        {/* Key metrics bento */}
        {m && (
          <section aria-labelledby="metrik-title" className="pb-12 md:pb-16">
            <h2 id="metrik-title" className="sr-only">
              Metrik utama
            </h2>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {[
                [m.totalViewsLabel, `views IG + TikTok dalam ${m.periodLabel}`],
                [compactId(m.igReach), "akun Instagram terjangkau"],
                [formatPct(m.igEngagementRate), "engagement rate Reels (per views)"],
                [formatPct(m.audienceAge25To44), "audiens IG usia 25–44 tahun"],
              ].map(([v, l]) => (
                <li key={l} className="rounded-md border border-border bg-surface p-4 shadow-sm md:p-6">
                  <p className="text-h2 tabular-nums md:text-h1">{v}</p>
                  <p className="mt-1 font-serif text-sm italic text-text-muted md:text-base">{l}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Platform breakdown */}
        {m && (
          <section aria-labelledby="platform-title" className="pb-12 md:pb-16">
            <Eyebrow n="01">Tentang Perbekasian</Eyebrow>
            <h2 id="platform-title" className="mt-2 text-h2">
              Bekasi, dibedah dalam <span className="kw">video 3D</span>.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <PlatformCard
                name="Instagram"
                period="30 hari terakhir"
                stats={[
                  [compactId(m.igViews), "Views"],
                  [compactId(m.igReach), "Akun terjangkau"],
                  [compactId(m.igInteractions), "Interaksi di Reels"],
                  [formatPct(m.igEngagementRate), "Engagement Reels"],
                  [formatNumber(m.igProfileVisits), "Kunjungan profil"],
                  [formatNumber(m.igFollowers), "Followers"],
                ]}
              />
              <PlatformCard
                name="TikTok"
                period="28 hari terakhir"
                stats={[
                  [compactId(m.tiktokViews), "Views"],
                  [compactId(m.tiktokUniqueViewers), "Penonton unik"],
                  [compactId(m.tiktokLikes), "Likes"],
                  [formatPct(m.tiktokEngagement), "Engagement rate"],
                  [compactId(m.tiktokShares), "Shares"],
                  [formatNumber(m.tiktokFollowers), "Followers"],
                ]}
              />
            </div>
            {m.methodologyNote && <p className="mt-4 max-w-prose text-sm text-text-muted">{m.methodologyNote}</p>}
          </section>
        )}

        {/* Case studies */}
        {cases.length > 0 && (
          <section aria-labelledby="case-title" className="pb-12 md:pb-16">
            <Eyebrow n="02">Konten teratas</Eyebrow>
            <h2 id="case-title" className="mt-2 text-h2">
              Konten yang <span className="kw">dibicarakan</span>.
            </h2>
            <ol className="mt-6 grid gap-3">
              {cases.map((c, i) => (
                <li key={c.id}>
                  <a href={`/episode/${c.slug}`} className="flex items-center gap-4 rounded-md border border-border bg-surface p-4 hover:border-border-strong md:p-5">
                    <span className="w-6 text-h3 text-link tabular-nums">{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-extrabold">{c.title}</span>
                      <span className="block font-serif text-sm italic text-text-muted">{c.series.title}</span>
                    </span>
                    {c.highlightViewsLabel && <span className="shrink-0 text-lg font-extrabold tabular-nums">{c.highlightViewsLabel}</span>}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm text-text-muted">Data Instagram, 30 hari terakhir. Views per konten bervariasi; angka ini bukan jaminan untuk konten bersponsor.</p>
          </section>
        )}

        {/* Audience */}
        {m && (
          <section aria-labelledby="aud-title" className="pb-12 md:pb-16">
            <Eyebrow n="03">Siapa yang nonton</Eyebrow>
            <h2 id="aud-title" className="mt-2 text-h2">
              Usia produktif, <span className="kw">orang Bekasi</span>.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <AgeCard title="Instagram · audiens" male={m.igMalePct} rows={igAge} note={`${formatPct(m.audienceIndonesia)} dari Indonesia`} />
              <AgeCard title="TikTok · followers" male={m.tiktokMalePct} rows={ttAge} note="Demografi dari data followers" />
            </div>
            <div className="mt-4 rounded-md bg-secondary p-6 text-secondary-text md:flex md:items-center md:gap-6">
              <p className="text-display tabular-nums">{formatPct(m.audienceAge25To44)}</p>
              <p className="mt-2 max-w-prose md:mt-0">
                audiens Instagram berusia <strong>25–44 tahun</strong>: usia kerja dan berkeluarga, yang sedang memutuskan tempat tinggal,
                kendaraan, sekolah anak, dan tempat makan akhir pekan.
              </p>
            </div>
            <h3 className="mt-8 text-h3">Cocok untuk sektor</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
              {SECTORS.map(([t, d]) => (
                <li key={t} className="rounded-md border border-border bg-surface p-4">
                  <p className="font-extrabold">{t}</p>
                  <p className="mt-1 text-sm text-text-muted">{d}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Calculator + brief */}
        <section id="kalkulator" aria-labelledby="calc-title" className="scroll-mt-4 pb-12 md:pb-16">
          <Eyebrow n="04">Layanan & estimasi</Eyebrow>
          <h2 id="calc-title" className="mt-2 text-h2">
            Pilih paket, lihat <span className="kw">estimasinya</span>.
          </h2>
          <p className="mt-2 max-w-prose text-text-muted">
            Semua harga adalah harga final (gross), sudah termasuk produksi, tanpa PPN. Pilih layanan, aktifkan kontrak 3 bulan bila perlu,
            lalu kirim brief — tim kami membalas lewat WhatsApp atau email.
          </p>
          <RateCardBuilder services={builderServices} businessWa={settings.businessWa} businessEmail={settings.businessEmail} validTo={validTo.toISOString()} />
        </section>

        {/* Flow & terms */}
        <section aria-labelledby="terms-title" className="pb-4">
          <Eyebrow n="05">Alur kerja & ketentuan</Eyebrow>
          <h2 id="terms-title" className="mt-2 text-h2">
            Biar sama-sama <span className="kw">enak</span>.
          </h2>
          <ol className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {FLOW.map(([t, d], i) => (
              <li key={t} className="rounded-md border border-border bg-surface p-4">
                <p className="flex items-center gap-2 font-extrabold">
                  <span className={cn("grid size-7 place-items-center rounded-full text-sm", i === 6 ? "bg-primary text-primary-text" : "bg-secondary text-secondary-text")}>{i + 1}</span>
                  {t}
                </p>
                <p className="mt-2 text-sm text-text-muted">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card eyebrow="Pembayaran">
              <ul className="grid gap-2 text-sm">
                <li><strong>Di bawah Rp 500.000:</strong> lunas saat booking.</li>
                <li><strong>Rp 500.000 ke atas:</strong> DP 50% saat booking, pelunasan 50% setelah preview final disetujui (sebelum tayang).</li>
                <li><strong>Perusahaan dengan PO:</strong> DP 50%, pelunasan maks. 14 hari setelah tayang.</li>
                <li><strong>Pembatalan:</strong> sebelum produksi dimulai, 50% dari DP dikembalikan; setelah produksi dimulai, DP tidak dikembalikan.</li>
              </ul>
            </Card>
            <Card eyebrow="Harga & pajak">
              <ul className="grid gap-2 text-sm">
                <li>Semua harga adalah <strong>harga final (gross)</strong> yang dibayar brand, sudah termasuk produksi. Tidak dikenakan PPN.</li>
                <li>Jika brand wajib memotong PPh 21, potongan diambil dari harga ini dan bukti potong dikirim ke Perbekasian.</li>
                <li>Pembayaran via transfer bank / e-wallet. Invoice dan kuitansi disediakan.</li>
              </ul>
            </Card>
          </div>
          <dl className="mt-6 grid gap-3 md:grid-cols-2">
            {TERMS.map(([t, d], i) => (
              <div key={t} className="flex gap-3 rounded-md border border-border bg-surface p-4">
                <dt className="w-5 shrink-0 font-extrabold text-link tabular-nums">{i + 1}</dt>
                <dd className="text-sm">
                  <span className="font-extrabold">{t}.</span> <span className="text-text-muted">{d}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </>
  );
}

function PlatformCard({ name, period, stats }: { name: string; period: string; stats: [string, string][] }) {
  return (
    <Card>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-h3">{name}</h3>
        <span className="text-sm text-text-muted">{period}</span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5">
        {stats.map(([v, l]) => (
          <div key={l}>
            <dd className="text-h2 tabular-nums">{v}</dd>
            <dt className="text-sm text-text-muted">{l}</dt>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function AgeCard({ title, male, rows, note }: { title: string; male: number; rows: AgeRow[]; note: string }) {
  const max = Math.max(1, ...rows.map((r) => r.pct));
  return (
    <Card eyebrow={title}>
      <div className="flex h-10 overflow-hidden rounded-sm text-sm font-extrabold">
        <div className="flex items-center bg-secondary px-3 text-secondary-text" style={{ width: `${male}%` }}>
          Pria {formatPct(male)}
        </div>
        <div className="flex flex-1 items-center bg-primary px-3 text-primary-text">Wanita {formatPct(100 - male)}</div>
      </div>
      <p className="mt-2 text-sm text-text-muted">{note}</p>
      <ul className="mt-4 grid gap-2">
        {rows.map((r) => (
          <li key={r.range} className="grid grid-cols-[3.5rem_1fr_3.5rem] items-center gap-3 text-sm">
            <span className="font-bold tabular-nums">{r.range}</span>
            <span className="h-3 rounded-full bg-surface-2" aria-hidden>
              <span
                className={cn("block h-3 rounded-full", r.range === "25–34" || r.range === "35–44" ? "bg-primary" : "bg-border-strong")}
                style={{ width: `${(r.pct / max) * 100}%` }}
              />
            </span>
            <span className="text-right font-extrabold tabular-nums">{formatPct(r.pct)}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
