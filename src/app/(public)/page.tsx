import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SeriesTabs } from "@/components/SeriesTabs";
import { EpisodeCard } from "@/components/EpisodeCard";
import { ButtonLink, Card } from "@/components/ui";
import { getEpisodes, getSeriesList, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ seri?: string }> }) {
  const { seri } = await searchParams;
  const [series, settings] = await Promise.all([getSeriesList(), getSettings()]);
  const activeSeries = series.find((s) => s.slug === seri);
  const episodes = await getEpisodes(activeSeries?.slug);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-0">
        {/* Hero */}
        <section className="py-12 md:py-16">
          <p className="text-label text-text-muted">Fakta unik Bekasi dalam 3D</p>
          <h1 className="mt-3 max-w-3xl text-display">
            Bekasi, ngapa? Banyak <span className="kw">ceritanya</span>.
          </h1>
          <p className="mt-4 max-w-prose text-text-muted">
            Tata kota, jalan, transportasi, sejarah, sampai obrolan netizennya — dibedah dalam video 3D pendek. Pilih seri favorit lu, tonton,
            terus cek sumbernya.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-sm px-3 font-extrabold text-link hover:bg-surface-2">
              Instagram @perbekasian
            </a>
            <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-sm px-3 font-extrabold text-link hover:bg-surface-2">
              TikTok @perbekasian
            </a>
          </div>
        </section>

        {/* Series cards */}
        <section aria-labelledby="seri-title" className="pb-12">
          <h2 id="seri-title" className="sr-only">
            Tiga seri Perbekasian
          </h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {series.map((s, i) => (
              <li key={s.id}>
                <Link
                  href={`/seri/${s.slug}`}
                  className="flex h-full items-start gap-3 rounded-md border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-surface-2"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-extrabold text-primary-text">{i + 1}</span>
                  <span>
                    <span className="block text-lg/6 font-extrabold">{s.title}</span>
                    {s.tagline && <span className="block font-serif text-sm italic text-text-muted">{s.tagline}</span>}
                    <span className="mt-1 block text-xs text-text-muted tabular-nums">{s._count.episodes} episode</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Episode grid */}
        <section id="episode" aria-labelledby="ep-title" className="scroll-mt-4 pb-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 id="ep-title" className="text-h2">
              Episode <span className="kw">terbaru</span>
            </h2>
          </div>
          <SeriesTabs series={series} active={activeSeries?.slug} />
          {episodes.length === 0 ? (
            <Card className="mt-6" title="Belum ada episode di seri ini">
              <p className="text-text-muted">Episode baru lagi dirender. Sambil nunggu, tonton seri lain dulu.</p>
              <ButtonLink href="/#episode" variant="secondary" className="mt-4">
                Lihat semua episode
              </ButtonLink>
            </Card>
          ) : (
            <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-6">
              {episodes.map((ep) => (
                <li key={ep.id} className="flex">
                  <EpisodeCard ep={ep} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Collaboration callout */}
        <section aria-labelledby="collab-title">
          <Card className="md:flex md:items-center md:justify-between md:gap-8">
            <div className="max-w-prose">
              <p className="text-label text-text-muted">Untuk brand & UMKM Bekasi–Cikarang</p>
              <h2 id="collab-title" className="mt-1 text-h2">
                Kenalin brand kamu ke warga <span className="kw">Bekasi</span>.
              </h2>
              <p className="mt-2 text-text-muted">
                Lihat statistik akun, simulasikan paket endorse atau paid promote, lalu kirim brief langsung ke WhatsApp atau email.
              </p>
            </div>
            <ButtonLink href="/rate-card" variant="secondary" size="lg" className="mt-4 shrink-0 md:mt-0">
              Buka media kit
            </ButtonLink>
          </Card>
        </section>
      </main>
    </>
  );
}
