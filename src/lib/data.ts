import "server-only";
import { prisma } from "@/lib/db";
import type { PricedService } from "@/lib/pricing";

export async function getSettings() {
  const s = await prisma.siteSetting.findUnique({ where: { id: "singleton" } });
  return {
    businessWa: s?.businessWa || process.env.NEXT_PUBLIC_BUSINESS_WA || "",
    businessEmail: s?.businessEmail || process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "perbekasian@gmail.com",
    instagramUrl: s?.instagramUrl || "https://www.instagram.com/perbekasian",
    tiktokUrl: s?.tiktokUrl || "https://www.tiktok.com/@perbekasian",
  };
}

export async function getActiveMetrics() {
  return prisma.accountMetricSnapshot.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" } });
}

export async function getSeriesList() {
  return prisma.contentSeries.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { episodes: { where: { isPublished: true } } } } },
  });
}

export const episodeCardSelect = {
  id: true,
  slug: true,
  title: true,
  episodeCode: true,
  summary: true,
  tiktokCoverUrl: true,
  tiktokVideoId: true,
  highlightViewsLabel: true,
  tiktokDurationSec: true,
  series: { select: { slug: true, title: true } },
} as const;

export async function getEpisodes(seriesSlug?: string) {
  return prisma.episode.findMany({
    where: { isPublished: true, ...(seriesSlug ? { series: { slug: seriesSlug } } : {}) },
    orderBy: { publishedAt: "desc" },
    select: episodeCardSelect,
  });
}

export async function getActiveServices() {
  return prisma.rateCardService.findMany({ where: { isActive: true }, orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
}

export function toPriced(s: Awaited<ReturnType<typeof getActiveServices>>[number]): PricedService {
  return {
    id: s.id,
    code: s.code,
    name: s.name,
    category: s.category,
    pricingType: s.pricingType,
    basePriceIdr: s.basePriceIdr,
    percentOfContent: s.percentOfContent,
  };
}
