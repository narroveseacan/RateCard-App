import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { EpisodeCard } from "@/components/EpisodeCard";
import { ButtonLink, Card } from "@/components/ui";
import { prisma } from "@/lib/db";
import { getEpisodes, getSeriesList } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await prisma.contentSeries.findUnique({ where: { slug } });
  return s ? { title: s.title, description: s.description } : {};
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const [series, allSeries] = await Promise.all([prisma.contentSeries.findUnique({ where: { slug } }), getSeriesList()]);
  if (!series) notFound();
  const episodes = await getEpisodes(slug);
  const idx = allSeries.findIndex((s) => s.id === series.id);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-0">
        <nav aria-label="Breadcrumb" className="pt-6 text-sm">
          <Link href="/" className="font-bold text-link">
            Beranda
          </Link>
          <span className="px-2 text-text-muted">/</span>
          <span className="text-text-muted">Seri</span>
        </nav>
        <section className="py-10">
          <p className="text-label text-text-muted">
            <span className="text-link">Seri {String(idx + 1).padStart(2, "0")}</span>
            {series.tagline ? ` · ${series.tagline}` : ""}
          </p>
          <h1 className="mt-2 text-h1">{series.title}</h1>
          <p className="mt-3 max-w-prose text-text-muted">{series.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {allSeries
              .filter((s) => s.id !== series.id)
              .map((s) => (
                <li key={s.id}>
                  <Link href={`/seri/${s.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 font-extrabold text-text-muted hover:border-border-strong hover:bg-surface-2">
                    {s.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>

        {episodes.length === 0 ? (
          <Card title="Belum ada episode di seri ini">
            <p className="text-text-muted">Episode {series.title} berikutnya lagi diproduksi. Cek seri lain dulu, yuk.</p>
            <ButtonLink href="/#episode" variant="secondary" className="mt-4">
              Lihat semua episode
            </ButtonLink>
          </Card>
        ) : (
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-6">
            {episodes.map((ep) => (
              <li key={ep.id} className="flex">
                <EpisodeCard ep={ep} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
