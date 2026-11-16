// Seed idempoten — data dari Rate Card Perbekasian 2026 (PDF, per 14–15 Nov 2026).
// Episode = CONTOH dari portofolio PDF; ringkasan & sumber wajib dicek ulang lewat /admin/episodes.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type Prisma } from "../src/generated/prisma/client";

function normalizeConnectionString(url: string | undefined): string | undefined {
  if (!url) return url;
  return url.replace(/([?&])sslmode=require(&|$)/, "$1sslmode=verify-full$2");
}

const rawUrl = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
const pool = new Pool({ connectionString: normalizeConnectionString(rawUrl) });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

type ServiceSeed = Omit<Prisma.RateCardServiceCreateInput, "deliverables"> & { deliverables: string[] };

const services: ServiceSeed[] = [
  // ENDORSE — dibuat tim Perbekasian (anchor price di atas)
  {
    code: "END-DEDICATED-3D",
    category: "ENDORSE",
    name: "Reels Dedicated 3D “Jika Bekasi Ada [Brand]”",
    description: "Satu episode penuh bertema brand kamu, dengan naskah, voice over, dan visual 3D yang dibuat khusus.",
    deliverables: ["Durasi 45–70 detik, tayang di IG + TikTok", "Collab post IG: muncul juga di profil brand", "Approval naskah sebelum produksi", "2× revisi · selesai 7–10 hari kerja"],
    basePriceIdr: 1_750_000,
    unitLabel: "per video",
    badge: "Paling dicari",
    sortOrder: 1,
  },
  {
    code: "END-PLACEMENT",
    category: "ENDORSE",
    name: "Reels Product Placement",
    description: "Brand muncul 5–10 detik di episode reguler: di papan reklame, gedung, atau kendaraan 3D, plus disebut di VO dan caption.",
    deliverables: ["IG + TikTok", "1× revisi", "Ikut jadwal episode (5–7 hari kerja)"],
    basePriceIdr: 600_000,
    unitLabel: "per video",
    sortOrder: 2,
  },
  {
    code: "END-CAROUSEL",
    category: "ENDORSE",
    name: "Carousel Infografis",
    description: "5–8 slide gaya “Bedah Bekasi” yang mengaitkan brand dengan fakta atau data kota.",
    deliverables: ["Feed Instagram", "1× revisi", "3–4 hari kerja"],
    basePriceIdr: 450_000,
    unitLabel: "per carousel",
    sortOrder: 3,
  },
  {
    code: "END-STORY",
    category: "ENDORSE",
    name: "Story Endorse (3 frame)",
    description: "3 frame story didesain tim Perbekasian, dengan link sticker ke halaman brand.",
    deliverables: ["3 frame · tayang 24 jam", "1× revisi", "1–2 hari kerja"],
    basePriceIdr: 250_000,
    unitLabel: "per 3 frame",
    sortOrder: 4,
  },
  // PAID PROMOTE — materi dari brand
  {
    code: "PP-REELS-IGTT",
    category: "PAID_PROMOTE",
    name: "Reels IG + TikTok",
    description: "Video dari brand (9:16, maks. 90 detik) diunggah di IG + TikTok, dengan caption & tag.",
    deliverables: ["IG + TikTok", "Caption & tag brand"],
    basePriceIdr: 300_000,
    unitLabel: "per video",
    sortOrder: 1,
  },
  {
    code: "PP-REELS-IG",
    category: "PAID_PROMOTE",
    name: "Reels Instagram saja",
    description: "Video dari brand (9:16, maks. 90 detik) diunggah di Instagram, dengan caption & tag.",
    deliverables: ["Instagram Reels"],
    basePriceIdr: 200_000,
    unitLabel: "per video",
    sortOrder: 2,
  },
  {
    code: "PP-FEED",
    category: "PAID_PROMOTE",
    name: "Feed / Carousel",
    description: "Foto atau carousel dari brand di feed Instagram.",
    deliverables: ["Feed Instagram"],
    basePriceIdr: 150_000,
    unitLabel: "per post",
    sortOrder: 3,
  },
  {
    code: "PP-STORY",
    category: "PAID_PROMOTE",
    name: "Story",
    description: "Materi dari brand di Instagram Story, dengan link sticker.",
    deliverables: ["Instagram Story", "Link sticker"],
    basePriceIdr: 50_000,
    unitLabel: "per frame",
    sortOrder: 4,
  },
  // PAKET HEMAT — harga coret = jumlah item asli
  {
    code: "PKT-KENALAN",
    category: "BUNDLE",
    name: "Paket Kenalan",
    description: "Pilihan paling ringan untuk mulai dikenal warga Bekasi.",
    deliverables: ["Paid promote Reels IG + TikTok", "3 frame story paid promote"],
    basePriceIdr: 400_000,
    compareAtPriceIdr: 450_000,
    unitLabel: "per paket",
    sortOrder: 1,
  },
  {
    code: "PKT-WARGA-BEKASI",
    category: "BUNDLE",
    name: "Paket Warga Bekasi",
    description: "Brand masuk ke episode reguler, plus infografis dan story.",
    deliverables: ["Reels Product Placement", "Carousel Infografis", "Story Endorse 3 frame"],
    basePriceIdr: 1_100_000,
    compareAtPriceIdr: 1_300_000,
    unitLabel: "per paket",
    sortOrder: 2,
  },
  {
    code: "PKT-JIKA-BEKASI-ADA",
    category: "BUNDLE",
    name: "Paket Jika Bekasi Ada…",
    description: "Paling lengkap: satu episode 3D penuh bertema brand kamu.",
    deliverables: ["Reels Dedicated 3D", "Carousel Infografis", "Story Endorse 3 frame", "Pin di profil 30 hari"],
    basePriceIdr: 2_100_000,
    compareAtPriceIdr: 2_550_000,
    unitLabel: "per paket",
    badge: "Paling lengkap",
    sortOrder: 3,
  },
  // ADD-ON — persentase dijumlahkan, dihitung dari harga konten
  { code: "ADD-HAK-IKLAN", category: "ADDON", name: "Hak iklan", description: "Partnership Ads / Spark Ads: brand boleh mengiklankan konten dari akun Perbekasian, 30 hari.", deliverables: [], basePriceIdr: 0, pricingType: "PERCENT", percentOfContent: 50, unitLabel: "+50%", sortOrder: 1 },
  { code: "ADD-MASTER-FILE", category: "ADDON", name: "File master video", description: "Video tanpa watermark untuk diunggah di akun brand sendiri.", deliverables: [], basePriceIdr: 0, pricingType: "PERCENT", percentOfContent: 30, unitLabel: "+30%", sortOrder: 2 },
  { code: "ADD-EKSKLUSIF", category: "ADDON", name: "Eksklusivitas kategori", description: "Tidak menerima kompetitor sejenis selama 30 hari.", deliverables: [], basePriceIdr: 0, pricingType: "PERCENT", percentOfContent: 25, unitLabel: "+25%", sortOrder: 3 },
  { code: "ADD-RUSH", category: "ADDON", name: "Rush order", description: "Pengerjaan setengah dari waktu normal.", deliverables: [], basePriceIdr: 0, pricingType: "PERCENT", percentOfContent: 30, unitLabel: "+30%", sortOrder: 4 },
  { code: "ADD-PIN", category: "ADDON", name: "Pin di profil", description: "Disematkan di 3 teratas profil, 30 hari.", deliverables: [], basePriceIdr: 100_000, unitLabel: "per 30 hari", sortOrder: 5 },
  { code: "ADD-LINK-BIO", category: "ADDON", name: "Link di bio", description: "Link brand di bio Instagram, 7 hari.", deliverables: [], basePriceIdr: 50_000, unitLabel: "per 7 hari", sortOrder: 6 },
  { code: "ADD-REVISI", category: "ADDON", name: "Revisi tambahan", description: "Di luar kuota revisi. Untuk Reels Dedicated 3D pakai item revisi 3D.", deliverables: [], basePriceIdr: 100_000, unitLabel: "per revisi", sortOrder: 7 },
  { code: "ADD-REVISI-3D", category: "ADDON", name: "Revisi tambahan Reels Dedicated 3D", description: "Per revisi di luar kuota, perlu render ulang.", deliverables: [], basePriceIdr: 250_000, unitLabel: "per revisi", sortOrder: 8 },
];

const series = [
  {
    slug: "jika-bekasi-ada",
    title: "Jika Bekasi Ada...",
    tagline: "Pengandaian vs kondisi nyata",
    description: "Gimana kalau Bekasi punya MRT, gunung, atau taksi tanpa sopir? Pengandaian dibandingkan dengan kondisi nyata kota.",
    sortOrder: 1,
  },
  {
    slug: "bedah-bekasi",
    title: "Bedah Bekasi",
    tagline: "Dibelah lapis demi lapis",
    description: "Satu kasus atau tempat di Bekasi dibelah lapis demi lapis dengan cutaway 3D.",
    sortOrder: 2,
  },
  {
    slug: "kata-netizen",
    title: "Kata Netizen",
    tagline: "BENER, SETENGAH BENER, atau HOAKS?",
    description: "Satu meme atau stigma soal Bekasi dicari asal-usulnya, dicek dengan data, lalu diputuskan lewat stempel BENER / SETENGAH BENER / HOAKS.",
    sortOrder: 3,
  },
];

const episodes = [
  {
    series: "bedah-bekasi",
    episodeCode: "EP-01",
    slug: "kota-vs-kabupaten",
    title: "Kota vs Kabupaten",
    summary: "Bekasi itu ada dua: Kota Bekasi dan Kabupaten Bekasi. Beda pemerintahan, beda pusat kota, beda kode wilayah. Ini cara gampang bedainnya.",
    factSources: "BPS Kota Bekasi (perlu dicek) | https://bekasikota.bps.go.id\nBPS Kabupaten Bekasi (perlu dicek) | https://bekasikab.bps.go.id",
    highlightViewsLabel: "344rb views",
    isFeaturedCaseStudy: true,
    daysAgo: 24,
  },
  {
    series: "jika-bekasi-ada",
    episodeCode: "EP-02",
    slug: "jika-bekasi-ada-mrt",
    title: "Gimana kalau Bekasi ada MRT",
    summary: "Kalau MRT nyambung sampai Bekasi, rute komuter harian bisa berubah total. Kita bandingin dengan kondisi transportasi yang ada sekarang.",
    factSources: "PT MRT Jakarta (perlu dicek) | https://jakartamrt.co.id",
    highlightViewsLabel: "105rb views",
    isFeaturedCaseStudy: true,
    daysAgo: 18,
    products: [
      { productName: "Powerbank Slim 10.000 mAh", category: "Perlengkapan komuter", platform: "Shopee", affiliateUrl: "https://shopee.co.id/search?keyword=powerbank%20slim%2010000mah", ctaText: "Lihat Produk" },
      { productName: "TWS untuk perjalanan", category: "Perlengkapan komuter", platform: "Tokopedia", affiliateUrl: "https://www.tokopedia.com/search?q=tws", ctaText: "Lihat Produk" },
    ],
  },
  {
    series: "bedah-bekasi",
    episodeCode: "EP-03",
    slug: "5-jalur-numpuk-ke-atas",
    title: "Di satu titik Bekasi 5 jalur numpuk ke atas",
    summary: "Ada satu titik di Bekasi tempat jalan tol, jalan layang, dan rel bertumpuk. Kita bedah lapis demi lapis.",
    factSources: "Sumber belum dilengkapi — isi lewat admin",
    highlightViewsLabel: "51,2rb views",
    isFeaturedCaseStudy: true,
    daysAgo: 14,
  },
  {
    series: "kata-netizen",
    episodeCode: "EP-04",
    slug: "cikarang-kota",
    title: "Cikarang = Kota?",
    summary: "Banyak yang nyebut Cikarang itu kota. Bener nggak sih secara administratif? Kita cek datanya.",
    factSources: "BPS Kabupaten Bekasi (perlu dicek) | https://bekasikab.bps.go.id",
    highlightViewsLabel: "38rb views",
    daysAgo: 10,
  },
  {
    series: "kata-netizen",
    episodeCode: "EP-05",
    slug: "planet-bekasi",
    title: "Kenapa Bekasi disebut planet lain?",
    summary: "Meme “Bekasi planet lain” udah lama beredar. Dari mana asalnya, dan seberapa bener?",
    factSources: "Sumber belum dilengkapi — isi lewat admin",
    highlightViewsLabel: "5,8rb views",
    daysAgo: 6,
  },
  {
    series: "jika-bekasi-ada",
    episodeCode: "EP-06",
    slug: "jika-bekasi-ada-gunung",
    title: "Gimana kalau Bekasi ada gunung",
    summary: "Bekasi itu dataran rendah. Kalau tiba-tiba ada gunung, apa yang berubah dari cuaca sampai tata kotanya?",
    factSources: "Sumber belum dilengkapi — isi lewat admin",
    highlightViewsLabel: "Episode terbaru",
    daysAgo: 2,
    products: [
      { productName: "Tempat Sampah Pilah 3 Sekat", category: "Rumah tangga", platform: "Shopee", affiliateUrl: "https://shopee.co.id/search?keyword=tempat%20sampah%20pilah", ctaText: "Lihat Produk" },
    ],
  },
];

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (!existing) {
      await prisma.adminUser.create({
        data: { email, name: process.env.ADMIN_NAME ?? "Admin", passwordHash: await bcrypt.hash(password, 12) },
      });
      console.log(`Admin dibuat: ${email}`);
    }
  }

  await prisma.siteSetting.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      businessWa: process.env.NEXT_PUBLIC_BUSINESS_WA ?? null,
      businessEmail: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "perbekasian@gmail.com",
      instagramUrl: "https://www.instagram.com/perbekasian",
      tiktokUrl: "https://www.tiktok.com/@perbekasian",
    },
    update: {},
  });

  if ((await prisma.accountMetricSnapshot.count()) === 0) {
    await prisma.accountMetricSnapshot.create({
      data: {
        periodLabel: "±30 hari terakhir",
        totalViewsLabel: "719rb",
        igViews: 559_400,
        tiktokViews: 159_600,
        igReach: 326_500,
        igInteractions: 41_000,
        igProfileVisits: 1_940,
        igEngagementRate: 7.4,
        tiktokEngagement: 6.6,
        tiktokUniqueViewers: 41_500,
        tiktokLikes: 9_200,
        tiktokShares: 1_100,
        igFollowers: 1_667,
        tiktokFollowers: 507,
        audienceAge25To44: 74,
        audienceIndonesia: 99.3,
        igMalePct: 60,
        tiktokMalePct: 79,
        igAgeJson: [
          { range: "18–24", pct: 8.3 },
          { range: "25–34", pct: 38.6 },
          { range: "35–44", pct: 35.4 },
          { range: "45–54", pct: 13.0 },
          { range: "55+", pct: 3.0 },
        ],
        tiktokAgeJson: [
          { range: "18–24", pct: 21.1 },
          { range: "25–34", pct: 56.1 },
          { range: "35–44", pct: 14.0 },
          { range: "45–54", pct: 7.0 },
          { range: "55+", pct: 1.8 },
        ],
        methodologyNote:
          "Engagement rate = jumlah interaksi ÷ views. Instagram: seluruh interaksi pada Reels; TikTok: like + komentar + share (data simpan tidak tersedia). Sumber: Instagram Insights (15 Okt – 13 Nov 2026) dan TikTok Analytics (16 Okt – 12 Nov 2026). Satu video (344rb) menyumbang sebagian besar views IG; views per konten bervariasi dan tidak dijamin untuk konten bersponsor.",
        introPriceValidTo: new Date("2027-01-31T23:59:59+07:00"),
      },
    });
  }

  for (const s of services) {
    await prisma.rateCardService.upsert({ where: { code: s.code }, create: s, update: {} });
  }

  for (const s of series) {
    await prisma.contentSeries.upsert({ where: { slug: s.slug }, create: s, update: {} });
  }

  for (const e of episodes) {
    const { series: seriesSlug, products, daysAgo, ...data } = e;
    const exists = await prisma.episode.findUnique({ where: { slug: data.slug } });
    if (exists) continue;
    await prisma.episode.create({
      data: {
        ...data,
        publishedAt: new Date(Date.now() - daysAgo * 86_400_000),
        series: { connect: { slug: seriesSlug } },
        affiliateProducts: products ? { create: products } : undefined,
      },
    });
  }

  console.log("Seed selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
