import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ButtonLink } from "@/components/ui";

export function SiteHeader({ cta = "rate-card" }: { cta?: "rate-card" | "episode" }) {
  return (
    <header className="border-b border-border bg-bg">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-2 px-4 py-3 md:px-6 xl:px-0">
        <Link href="/" aria-label="Beranda Perbekasian" className="shrink-0 rounded-xs">
          <Logo className="w-32 sm:w-40" />
        </Link>
        <nav aria-label="Navigasi utama" className="flex items-center gap-1">
          <Link href="/#episode" className="hidden min-h-11 items-center rounded-sm px-3 font-extrabold text-link hover:bg-surface-2 sm:inline-flex">
            Episode
          </Link>
          <ThemeToggle className="hidden sm:inline-flex" />
          {cta === "rate-card" ? (
            <ButtonLink href="/rate-card">Lihat Rate Card</ButtonLink>
          ) : (
            <ButtonLink href="/#episode" variant="secondary">
              Lihat Episode
            </ButtonLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ instagramUrl, tiktokUrl, email }: { instagramUrl: string; tiktokUrl: string; email: string }) {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto grid max-w-[1200px] gap-6 px-4 py-10 md:grid-cols-[1fr_auto] md:px-6 xl:px-0">
        <div className="max-w-prose">
          <Logo className="w-36" />
          <p className="mt-3 text-sm text-text-muted">
            Fakta unik Bekasi dalam video 3D. Konten bersponsor selalu diberi label kerja sama; tautan produk bertanda{" "}
            <span className="font-bold text-text">#afiliasi</span> dapat memberi kami komisi tanpa biaya tambahan untuk kamu.
          </p>
        </div>
        <ul className="flex flex-wrap items-start gap-1 text-sm md:flex-col md:items-end">
          <li>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center px-2 font-bold text-link">
              Instagram @perbekasian
            </a>
          </li>
          <li>
            <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center px-2 font-bold text-link">
              TikTok @perbekasian
            </a>
          </li>
          <li>
            <a href={`mailto:${email}`} className="inline-flex min-h-11 items-center px-2 font-bold text-link">
              {email}
            </a>
          </li>
          <li className="sm:hidden">
            <span className="inline-flex px-2">
              <ThemeToggleInline />
            </span>
          </li>
        </ul>
      </div>
    </footer>
  );
}

function ThemeToggleInline() {
  return <ThemeToggle className="px-0" />;
}
