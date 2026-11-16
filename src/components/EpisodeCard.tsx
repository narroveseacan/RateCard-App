"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";

export type EpisodeCardData = {
  slug: string;
  title: string;
  episodeCode: string;
  summary: string;
  tiktokCoverUrl: string | null;
  tiktokVideoId: string | null;
  highlightViewsLabel: string | null;
  series: { slug: string; title: string };
};

const refreshed = new Set<string>();

/** Cover TikTok punya tanda tangan berbatas waktu (x-expires). Bila gagal: fallback lokal + revalidasi di latar. */
export function CoverImage({ src, videoId, alt, className }: { src: string | null; videoId: string | null; alt: string; className?: string }) {
  const [failed, setFailed] = useState(!src);
  const onError = () => {
    setFailed(true);
    if (videoId && !refreshed.has(videoId)) {
      refreshed.add(videoId);
      fetch("/api/tiktok/refresh-cover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
        keepalive: true,
      }).catch(() => {});
    }
  };
  if (failed || !src) {
    return <img src="/brand/cover-fallback.svg" alt={alt} className={className} />;
  }
  return <img src={src} alt={alt} onError={onError} loading="lazy" decoding="async" referrerPolicy="no-referrer" className={className} />;
}

export function EpisodeCard({ ep }: { ep: EpisodeCardData }) {
  return (
    <Link
      href={`/episode/${ep.slug}`}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-surface shadow-sm transition-colors hover:border-border-strong"
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-surface-2">
        <CoverImage src={ep.tiktokCoverUrl} videoId={ep.tiktokVideoId} alt={`Cover episode ${ep.title}`} className="size-full object-cover" />
        {ep.highlightViewsLabel && (
          <span className="absolute bottom-2 left-2 rounded-full bg-ink-deep/80 px-2.5 py-1 text-xs font-extrabold text-platinum tabular-nums">
            {ep.highlightViewsLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <p className="text-label text-text-muted">
          <span className="text-link">{ep.episodeCode}</span> · {ep.series.title}
        </p>
        <h3 className="text-base/6 font-extrabold sm:text-lg/6">{ep.title}</h3>
        <p className="line-clamp-2 hidden text-sm text-text-muted sm:block">{ep.summary}</p>
      </div>
    </Link>
  );
}
