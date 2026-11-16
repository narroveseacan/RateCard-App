import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { after } from "next/server";
import { SiteHeader } from "@/components/SiteHeader";
import { AffiliateButton } from "@/components/AffiliateButton";
import { CoverImage, EpisodeCard } from "@/components/EpisodeCard";
import { Badge, Card, Chip } from "@/components/ui";
import { prisma } from "@/lib/db";
import { episodeCardSelect } from "@/lib/data";
import { formatDateId, formatDuration, parseSources } from "@/lib/format";
import { embedSrc } from "@/lib/tiktok";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  return prisma.episode.findFirst({
    where: { slug, isPublished: true },
    include: { series: true, affiliateProducts: { where: { isActive: true }, orderBy: { createdAt: "asc" } } },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ep = await load(slug);
  if (!ep) return {};
  return {
    title: ep.title,
    description: ep.summary,
    openGraph: { title: ep.title, description: ep.summary, images: ep.tiktokCoverUrl ? [ep.tiktokCoverUrl] : undefined },
  };
}

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params;
  const ep = await load(slug);
  if (!ep) notFound();

  // Hitung kunjungan halaman setelah respons terkirim (untuk metrik Affiliate Outbound CTR).
  after(() => prisma.episode.update({ where: { id: ep.id }, data: { pageViews: { increment: 1 } } }).catch(() => {}));

  const src = embedSrc(ep.tiktokEmbedLink, ep.tiktokVideoId);
  const sources = parseSources(ep.factSources);
  const related = await prisma.episode.findMany({
    where: { seriesId: ep.seriesId, isPublished: true, id: { not: ep.id } },
    orderBy: { publishedAt: "desc" },
    take: 4,
    select: episodeCardSelect,
  });
  const epNum = ep.episodeCode.replace(/\D/g, "") || ep.episodeCode;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-0">
        <nav aria-label="Breadcrumb" className="pt-6 text-sm">
          <Link href="/" className="font-bold text-link">
            Beranda
          </Link>
          <span className="px-2 text-text-muted">/</span>
          <Link href={`/seri/${ep.series.slug}`} className="font-bold text-link">
            {ep.series.title}
          </Link>
        </nav>

        <header className="py-6">
          <Chip n={epNum} title={ep.series.title} sub={ep.series.tagline ?? undefined} />
          <h1 className="mt-4 max-w-3xl text-h1">{ep.title}</h1>
          <p className="mt-2 text-sm text-text-muted">
            {formatDateId(ep.publishedAt)}
            {ep.tiktokDurationSec ? ` · ${formatDuration(ep.tiktokDurationSec)}` : ""}
            {ep.highlightViewsLabel ? ` · ${ep.highlightViewsLabel}` : ""}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          {/* Video 9:16 */}
          <div className="mx-auto w-full max-w-[360px]">
            <div className="aspect-[9/16] overflow-hidden rounded-md border border-border bg-surface-2">
              {src ? (
                <iframe
                  src={src}
                  title={`Video TikTok: ${ep.title}`}
                  className="size-full"
                  allow="encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <CoverImage src={ep.tiktokCoverUrl} videoId={null} alt={`Cover ${ep.title}`} className="size-full object-cover" />
              )}
            </div>
            {!src && <p className="mt-2 text-center text-sm text-text-muted">Video TikTok belum ditautkan ke episode ini.</p>}
            {ep.igReelsUrl && (
              <a href={ep.igReelsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 w-full items-center justify-center font-extrabold text-link">
                Tonton juga di Instagram Reels
              </a>
            )}
          </div>

          {/* Fakta + affiliate */}
          <div className="grid content-start gap-6">
            <Card eyebrow="Ringkasan fakta" as="article">
              <p className="max-w-prose text-text">{ep.summary}</p>
              <div className="mt-5 border-t border-border pt-4">
                <h2 className="text-label text-text-muted">Sumber</h2>
                {sources.length ? (
                  <ul className="mt-2 grid gap-1">
                    {sources.map((s, i) => (
                      <li key={i} className="text-sm">
                        {s.url ? (
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-link underline-offset-4 hover:underline">
                            Lihat sumber: {s.label}
                          </a>
                        ) : (
                          <span className="text-text-muted">{s.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-text-muted">Sumber lengkap ada di caption video.</p>
                )}
              </div>
            </Card>

            {ep.affiliateProducts.length > 0 && (
              <section aria-labelledby="aff-title">
                <h2 id="aff-title" className="text-h3">
                  Perlengkapan di <span className="kw">episode ini</span>
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  Tautan bertanda #afiliasi: kalau lu beli lewat sini, Perbekasian dapat komisi kecil tanpa biaya tambahan buat lu.
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {ep.affiliateProducts.map((p) => (
                    <li key={p.id}>
                      <Card as="article" className="flex h-full flex-col">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone="secondary">#afiliasi</Badge>
                          <span className="text-xs font-bold text-text-muted">{p.platform}</span>
                        </div>
                        <h3 className="mt-3 text-lg/6 font-extrabold">{p.productName}</h3>
                        {p.category && <p className="mt-1 font-serif text-sm italic text-text-muted">{p.category}</p>}
                        <div className="mt-4 pt-1 sm:mt-auto">
                          <AffiliateButton id={p.id} href={p.affiliateUrl}>
                            {p.ctaText || "Lihat Produk"}
                          </AffiliateButton>
                        </div>
                      </Card>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="rel-title" className="mt-16">
            <h2 id="rel-title" className="text-h2">
              Episode lain di <span className="kw">{ep.series.title}</span>
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-6">
              {related.map((r) => (
                <li key={r.id} className="flex">
                  <EpisodeCard ep={r} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
