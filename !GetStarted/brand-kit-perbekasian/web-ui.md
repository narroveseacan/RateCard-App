# Web app: Tailwind, React, Next.js, Vite

Bagian ini menerjemahkan merek ke antarmuka web app. Merek aslinya dibuat untuk video 9:16 gelap; tema terang, warna status (success, warning, danger), dan komponen di bawah adalah **usulan turunan** dari palet merek, belum disetujui pemilik channel. Warna merek (ink, cyan, grape, platinum, ash, teal, accent) tidak diubah.

## Prinsip UI
1. **Gelap dulu.** Tema gelap adalah tampilan bawaan, sama seperti video. Tema terang disediakan untuk kenyamanan membaca teks panjang.
2. **Cyan itu tindakan.** Satu tombol utama (cyan) per tampilan. Cyan juga untuk fokus dan tautan; jangan dipakai untuk dekorasi besar.
3. **Grape itu latar, bukan teks.** Grape dipakai untuk tombol sekunder, badge, dan blok ilustrasi. Teks grape di atas ink kontrasnya rendah.
4. **Kata kunci bergaya Spectral Italic.** Satu atau dua kata kunci per judul boleh diset Spectral Italic berwarna `link`, sama seperti subtitle video. Jangan seluruh kalimat.
5. **Tema gelap memakai border, bukan bayangan.** Bayangan hanya untuk tema terang, dan hanya pada menu, popover, modal.
6. **Bentuk membulat.** Radius 12px untuk kontrol (tombol, input), 20px untuk kartu dan chip, penuh untuk chip nomor dan pill.
7. **Kontras.** Teks 4,5:1, kontrol dan ikon 3:1, di kedua tema. Semua pasangan token di `tokens.json` sudah dicek (teks 5,5:1 atau lebih, border kontrol `border-strong` 3,9:1 atau lebih). Jangan memakai warna saja untuk status; tambahkan ikon atau teks.
8. **Mobile dulu.** Merek hidup di ponsel. Rancang untuk 360px, lalu lebarkan. Target sentuh minimal 44x44px.

## Tata letak dan jarak
- Basis jarak 4px (sama dengan Tailwind: `p-4` = 16px). Skala: 4, 8, 12, 16, 24, 32, 48, 64.
- Kartu: padding 24px. Antar bagian halaman: 48px (mobile) dan 64px (desktop).
- Lebar konten: maksimal 1200px; teks panjang maksimal 68 karakter (`max-w-prose`).
- Breakpoint: bawaan Tailwind (`sm` 640, `md` 768, `lg` 1024, `xl` 1280).
- Gerak: 150-250 ms, ease-out; hormati `prefers-reduced-motion` (sudah di `globals.css`).

## Konten dan mikrocopy (usulan)
- Nada sama dengan channel: santai dan jelas. Konten publik boleh "lu/gue"; untuk aksi akun, pembayaran, dan galat serius pakai "kamu" yang sopan. Putuskan satu aturan dan konsisten.
- Tombol berisi kata kerja ("Simpan", "Lihat sumber"), bukan "OK" atau "Submit".
- Pesan galat menyebut apa yang salah dan cara memperbaikinya.
- Sumber fakta selalu bisa dilihat (tautan "Sumber"), mengikuti aturan merek bahwa fakta harus bisa dicek.

## Aksesibilitas
Fokus terlihat di semua kontrol (cincin 2px `focus`, offset 2px). Input punya label yang terlihat dan terhubung (`htmlFor`/`aria-describedby`). Status galat memakai `aria-invalid` dan teks. Ikon yang bermakna punya teks alternatif. Tema mengikuti pilihan pengguna dan disimpan.

## 1. Tailwind CSS v4: `globals.css`
Salin utuh. Tema gelap ada di `@theme`, tema terang menimpa variabel yang sama di `[data-theme="light"]`, sehingga semua utilitas (`bg-bg`, `text-text`, `bg-primary`, `border-border`) otomatis ikut tema.

```css
@import "tailwindcss";

/* Tema gelap = bawaan merek. Tema terang = [data-theme="light"] pada <html>. */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme static {
  /* Merek (sama di kedua tema) */
  --color-ink: #1e1a3c;
  --color-ink-deep: #14122e;
  --color-cyan: #59c3c3;
  --color-grape: #52489c;
  --color-platinum: #ebebeb;
  --color-ash: #cad2c5;
  --color-teal: #84a98c;
  --color-accent: #f2c96b;

  /* Semantik UI (tema gelap; tema terang menimpa di bawah) */
  --color-bg: #14122e;
  --color-surface: #1e1a3c;
  --color-surface-2: #2a2552;
  --color-border: #3a3470;
  --color-border-strong: #7a73b8;
  --color-text: #ebebeb;
  --color-text-muted: #cad2c5;
  --color-primary: #59c3c3;
  --color-primary-hover: #7fd4d4;
  --color-primary-text: #1e1a3c;
  --color-link: #59c3c3;
  --color-secondary: #52489c;
  --color-secondary-text: #ebebeb;
  --color-focus: #59c3c3;
  --color-success: #84a98c;
  --color-warning: #f2c96b;
  --color-danger: #f28b82;

  --font-sans: var(--font-pjs, "Plus Jakarta Sans"), system-ui, sans-serif;
  --font-serif: var(--font-spectral, Spectral), Georgia, serif;

  --radius-xs: 8px;
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-xl: 44px;

  --shadow-sm: none;
  --shadow-md: 0 8px 24px #00000066;
}

[data-theme="light"] {
  --color-bg: #f6f6fa;
  --color-surface: #ffffff;
  --color-surface-2: #eceaf5;
  --color-border: #d9d6e8;
  --color-border-strong: #7a759c;
  --color-text: #1e1a3c;
  --color-text-muted: #5b5680;
  --color-primary: #59c3c3;
  --color-primary-hover: #47b0b0;
  --color-primary-text: #1e1a3c;
  --color-link: #1b6f6f;
  --color-secondary: #52489c;
  --color-secondary-text: #ffffff;
  --color-focus: #1b6f6f;
  --color-success: #2f6b4a;
  --color-warning: #8a5d00;
  --color-danger: #b3261e;
  --shadow-sm: 0 1px 2px #1e1a3c14;
  --shadow-md: 0 8px 24px #1e1a3c1f;
}

/* Gaya huruf web (pakai: class="text-display", "text-h1", ...) */
@utility text-display { font-size: 48px; line-height: 52px; font-weight: 800; letter-spacing: -0.03em; }
@utility text-h1 { font-size: 36px; line-height: 42px; font-weight: 800; letter-spacing: -0.025em; }
@utility text-h2 { font-size: 28px; line-height: 34px; font-weight: 800; letter-spacing: -0.02em; }
@utility text-h3 { font-size: 22px; line-height: 30px; font-weight: 700; letter-spacing: -0.01em; }
@utility text-label { font-size: 12px; line-height: 16px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
@utility text-quote { font-family: var(--font-serif); font-style: italic; font-size: 22px; line-height: 32px; font-weight: 400; }

@layer base {
  html { background: var(--color-bg); color: var(--color-text); font-family: var(--font-sans); font-weight: 500; }
  body { font-size: 16px; line-height: 26px; -webkit-font-smoothing: antialiased; }
  :focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; } }
}
```

Utilitas yang tersedia setelah ini: `bg-bg bg-surface bg-surface-2 border-border border-border-strong text-text text-text-muted bg-primary hover:bg-primary-hover text-primary-text text-link bg-secondary text-secondary-text outline-focus text-success text-warning text-danger font-sans font-serif rounded-xs rounded-sm rounded-md rounded-xl shadow-sm shadow-md text-display text-h1 text-h2 text-h3 text-label text-quote`.

Tailwind v3: pakai `theme.extend.colors` dengan `var(--color-...)` (isi variabel tetap dari blok `:root` dan `[data-theme="light"]` di atas, tanpa `@theme`), dan `fontFamily: { sans: ["var(--font-pjs)", "system-ui"], serif: ["var(--font-spectral)", "Georgia"] }`.

## 2. Next.js (App Router)

`app/layout.tsx`: huruf lewat `next/font` (tanpa permintaan ke Google saat runtime) dan tema yang diterapkan sebelum cat pertama supaya tidak berkedip.

```tsx
import "./globals.css";
import { Plus_Jakarta_Sans, Spectral } from "next/font/google";

const pjs = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-pjs", display: "swap" });
const spectral = Spectral({ subsets: ["latin"], weight: ["400", "500"], style: ["italic"], variable: "--font-spectral", display: "swap" });

const themeScript = `try{var t=localStorage.getItem("pb-theme")||"dark";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-theme="dark" suppressHydrationWarning className={`${pjs.variable} ${spectral.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="bg-bg text-text font-sans antialiased">{children}</body>
    </html>
  );
}
```

Tailwind v4 di Next.js: `npm i tailwindcss @tailwindcss/postcss postcss`, lalu `postcss.config.mjs`:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

Pengalih tema (komponen klien):

```tsx
"use client";
export function ThemeToggle() {
  const set = (t: "dark" | "light") => { document.documentElement.dataset.theme = t; try { localStorage.setItem("pb-theme", t); } catch {} };
  return (
    <button className="inline-flex min-h-11 items-center rounded-sm px-4 font-extrabold text-link hover:bg-surface-2"
      onClick={() => set(document.documentElement.dataset.theme === "light" ? "dark" : "light")}>
      Ganti tema
    </button>
  );
}
```

## 3. Vite + React

```bash
npm i tailwindcss @tailwindcss/vite @fontsource/plus-jakarta-sans @fontsource/spectral
```

`vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [react(), tailwindcss()] });
```

`src/main.tsx` (huruf lokal, bukan CDN):

```tsx
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/spectral/400-italic.css";
import "@fontsource/spectral/500-italic.css";
import "./globals.css";
```

Di `index.html`: `<html lang="id" data-theme="dark">` dan skrip tema yang sama dengan `themeScript` di atas, ditaruh di `<head>` sebelum bundel.

Tanpa framework: file huruf ada di `fonts/` brand kit ini; deklarasikan dengan `@font-face` dan `font-display: swap`.

## 4. Komponen React

Empat komponen dasar (Button, Chip, Card, Input) ada di bagian Components beserta pratinjau hidup. Sumber TypeScript berbasis Tailwind-nya ada di `web-components.md`. Komponen baru: ikuti pola yang sama (token lewat utilitas, bukan hex), cek di kedua tema, dan sertakan keadaan hover, fokus, nonaktif, dan galat.

## Daftar periksa sebelum rilis
- Tidak ada hex mentah di komponen; hanya utilitas bertoken.
- Kedua tema dicek: teks 4,5:1, kontrol 3:1.
- Fokus keyboard terlihat; urutan tab masuk akal.
- Target sentuh minimal 44px di mobile.
- Satu tombol utama per tampilan.
- Teks Indonesia, tanpa kata Inggris yang tidak perlu.
