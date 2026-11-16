### Mode 2: UI/UX Design Brief (Updated — Brand Kit Aligned)

---

### 1. Tiga Prinsip Desain (Design Principles)

1. **Gelap Dulu, Terang Opsional (*Dark-First Brand Continuity*):** Menjadikan palet gelap kebiruan (`ink-deep` `#14122e` dan `ink` `#1e1a3c`) sebagai tampilan bawaan (`data-theme="dark"`) agar pengunjung dari *bio link* TikTok/Instagram merasakan kesinambungan visual langsung dari video 3D `@perbekasian`. Tema terang (`data-theme="light"`) disediakan lewat pengalih tema untuk kenyamanan membaca fakta dan rincian *rate card* panjang.
2. **Cyan untuk Tindakan, Grape untuk Struktur:** Membatasi **satu tombol utama (`bg-primary` / Cyan)** per tampilan agar fokus konversi tetap tajam. *Dusty Grape* (`bg-secondary`) digunakan eksklusif untuk tombol sekunder, *badge*, dan blok ilustrasi—bukan sebagai warna teks atau garis tipis di atas `ink`.
3. **Kejujuran Data & Dual-Intent Clarity:** Memisahkan alur eksplorasi penonton (*lu/gue*, katalog 3 seri, sumber fakta wajib, label `#afiliasi`) dari alur transaksi *brand* (bahasa sopan *kamu*, kalkulator estimasi transparan, validasi kategori terlarang) dengan hierarki sentuh mobile-first (`≥ 44×44px`).

---

### 2. Visual Direction & Anti-Patterns

* **Visual Direction:** *Dark-First Civic Infographic UI.* Kanvas gelap `ink-deep` (`#14122e`) berpadu dengan permukaan kartu `ink` (`#1e1a3c`) yang dipisahkan oleh garis tepi solid (`1px solid var(--color-border)`), sudut membulat lembut (`12px` kontrol, `20px` kartu/chip, *pill* penuh untuk tag), serta penekanan 1–2 kata kunci per judul menggunakan `Spectral` Italic berwarna `link` (`#59c3c3` di gelap / `#1b6f6f` di terang).
* **Anti-Patterns (Wajib Dihindari):**
* **Hard Offset Shadow / Drop Shadow di Tema Gelap:** Sesuai aturan Brand Kit (`web-ui.md`), tema gelap **wajib memakai border, bukan bayangan** (`--shadow-sm: none`). Bayangan hanya diizinkan pada tema terang (`shadow-sm`) serta pada menu, *popover*, dan modal (`shadow-md`).
* **Teks atau Garis Tipis Berwarna Grape di Atas Ink:** Kontras `#52489c` di atas `#1e1a3c` terlalu rendah.
* **Raw Hex di Komponen & Gradien Dekoratif:** Seluruh komponen wajib mengonsumsi token semantik Tailwind v4 (`bg-surface`, `text-text-muted`, `border-border-strong`) tanpa hex mentah dan tanpa gradien dekoratif.
* **Zona Aman Video Diterapkan ke Web:** Margin mati video (`200px` atas, `440px` bawah, `150px` kanan) **tidak berlaku** di antarmuka web.
* **Label Tombol Generik & Kartu Penuh Emoji:** Dilarang memakai label *"OK"* atau *"Submit"* (ganti dengan kata kerja eksplisit seperti *"Simpan"*, *"Lihat sumber"*, *"Kirim Brief"*) serta dilarang memenuhi kartu dengan emoji.



---

### 3. Design Tokens (Tailwind CSS v4 & CSS Variables)

Mengacu langsung pada `tokens.json` dan `globals.css` resmi Brand Kit Perbekasian (dengan catatan bahwa tema terang serta warna status `success`, `warning`, dan `danger` merupakan turunan semantik dari palet merek):

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme static {
  /* Brand Core Tokens (Fixed across themes) */
  --color-ink: #1e1a3c;
  --color-ink-deep: #14122e;
  --color-cyan: #59c3c3;
  --color-grape: #52489c;
  --color-platinum: #ebebeb;
  --color-ash: #cad2c5;
  --color-teal: #84a98c;
  --color-accent: #f2c96b;

  /* Semantic UI Tokens — Default: Dark Theme */
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

  /* Typography */
  --font-sans: var(--font-pjs, "Plus Jakarta Sans"), system-ui, sans-serif;
  --font-serif: var(--font-spectral, Spectral), Georgia, serif;

  /* Radii */
  --radius-xs: 8px;
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-xl: 44px;

  /* Elevation */
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

```

#### Typography Pairing & Scale (`tokens.json`)

* **Primary Sans (`--font-sans`):** `Plus Jakarta Sans` (`500`, `700`, `800`). Seluruh nominal Rupiah dan metrik statistik memakai `tabular-nums`.
* **Editorial Keyword Highlight (`--font-serif`):** `Spectral` Italic (`400`, `500`), diterapkan pada **maksimal 1–2 kata kunci per judul** dengan warna `text-link` (`#59c3c3` gelap / `#1b6f6f` terang).

| Utilitas | Ukuran (Desktop / Mobile) | Line Height | Weight | Tracking | Penggunaan |
| --- | --- | --- | --- | --- | --- |
| `text-display` | `48px` / `36px` (`<640px`) | `52px` / `40px` | `800` | `-0.03em` | Hero headline halaman utama & Rate Card |
| `text-h1` | `36px` | `42px` | `800` | `-0.025em` | Judul halaman seri & judul episode |
| `text-h2` | `28px` | `34px` | `800` | `-0.02em` | Judul bagian (*Section Header*) |
| `text-h3` | `22px` | `30px` | `700` | `-0.01em` | Judul kartu dan subbagian |
| `body` (base) | `16px` | `26px` | `500` | `0em` | Isi teks utama (min `16px` cegah auto-zoom iOS) |
| `body-sm` | `14px` | `22px` | `500` | `0em` | Teks pendukung, bantuan input, metadata |
| `text-label` | `12px` | `16px` | `700` | `0.12em` | *Eyebrow* dan label huruf besar (`uppercase`) |
| `text-quote` | `22px` | `32px` | `400` | `0em` | `Spectral` Italic warna `text-link` untuk kata kunci & kutipan |

#### Spacing Scale (`tokens.json`)

* Basis `4px`: `s-1` (`4px`), `s-2` (`8px`), `s-3` (`12px`), `s-4` (`16px`), `s-6` (`24px`, padding standar `Card`), `s-8` (`32px`), `s-12` (`48px`, jarak antar bagian mobile), `s-16` (`64px`, jarak antar bagian desktop & margin halaman).

---

### 4. Screen Inventory & Objectives

| Route | Nama Layar | Tujuan Utama |
| --- | --- | --- |
| `/` | **Public Content Hub & Home** | Pintu masuk utama dari *bio link*; menampilkan identitas `@perbekasian`, filter 3 seri konten (*Bedah Bekasi*, *Kata Netizen*, *Jika Bekasi Ada...*), katalog episode terbaru, dan kartu ajakan kolaborasi *brand*. |
| `/seri/[slug]` | **Series Archive** | Menampilkan seluruh episode dalam satu seri beserta deskripsi konsep dan daftar fakta terverifikasi. |
| `/episode/[slug]` | **Episode Detail & Affiliate Shelf** | Memutar video TikTok lewat `embed_link`, menampilkan ringkasan fakta beserta tautan *"Sumber"* wajib, dan menyajikan produk rekomendasi `#afiliasi`. |
| `/rate-card` | **Interactive Media Kit & Brief Builder** | Menampilkan bukti performa IG & TikTok, profil audiens, kalkulator paket *Endorse* / *Paid Promote* / *Bundling* + diskon retainer 3 bulan 15%, dan form pengajuan *brief* ke WhatsApp/Email. |
| `/admin/login` | **Admin Authentication** | Halaman masuk tunggal terproteksi Auth.js Credentials (`email` + `password`). |
| `/admin` | **Admin Command Center** | Status koneksi TikTok OAuth, log *Vercel Cron* 12 jam terakhir, metrik klik produk *affiliate*, dan daftar *booking inquiry* klien. |
| `/admin/tiktok` | **TikTok Display API Studio** | Otorisasi TikTok Login Kit (`user.info.basic`, `video.list`), pemilih video kurasi (`POST /v2/video/list/`), dan tombol sinkronisasi manual `cover_image_url` (`POST /v2/video/query/`). |
| `/admin/episodes` | **Episode & Affiliate Manager** | CRUD episode, penugasan seri, input tautan sumber fakta, dan manajemen produk *affiliate*. |
| `/admin/rate-card` | **Metrics, Pricing & Inquiry Manager** | CRUD metrik performa IG/TikTok, daftar harga layanan, masa berlaku promo (`31 Jan 2027`), kontak tujuan WA/Email, dan status *inquiry*. |

---

### 5. Step-by-Step User Flow

#### Flow A: Penonton Bio Link -> Menonton Episode & Klik Produk Affiliate (Nada: *lu/gue*)

1. Penonton mengetuk tautan di bio Instagram/TikTok `@perbekasian` dan mendarat di `/` dalam tema gelap bawaan.
2. Penonton mengetuk tab seri di bilah filter (misal: *Jika Bekasi Ada...*).
3. Penonton memilih kartu episode (misal: *"Jika Bekasi Ada MRT"* atau *"Jika Bekasi Ada Gunung"*) menuju `/episode/[slug]`.
4. Sistem merender pemutar video tersemat menggunakan `tiktokEmbedLink`, menampilkan ringkasan fakta dengan tautan *"Sumber"*, serta kartu rekomendasi produk (misal: *Powerbank Slim* atau *Tempat Sampah Pilah*) berlabel `#afiliasi`.
5. Penonton mengetuk tombol utama *"Lihat Produk"* (`bg-primary`), memicu `POST /api/affiliate/[id]/click` di latar belakang dan membuka halaman *marketplace*.

#### Flow B: Brand / UMKM -> Simulasi Harga & Kirim Brief (Nada: *kamu* sopan)

1. Calon klien mengetuk tautan *"Rate Card"* di navigasi atas menuju `/rate-card`.
2. Klien meninjau 4 kartu statistik utama (`719rb` views, `326rb` akun terjangkau, `7,4%` engagement, `74%` usia 25–44), rincian per platform (IG vs TikTok), dan 3 studi kasus video teratas.
3. Pada **Kalkulator Estimasi**, klien menambah kuantitas layanan dari kategori *Endorse*, *Paid Promote*, atau *Paket Bundling* (*Kenalan*, *Warga Bekasi*, *Jika Bekasi Ada…*).
4. Klien mengaktifkan sakelar **"Kontrak 3 Bulan (Hemat 15%)"**; panel ringkasan menghitung subtotal, potongan 15%, total *gross*, serta menampilkan ketentuan pembayaran secara otomatis (`Pelunasan 100% di depan` jika `< Rp 500.000`, atau `DP 50% + Pelunasan 50% sebelum tayang` jika `≥ Rp 500.000`).
5. Klien mengisi formulir *brief* (Nama Brand, Industri, Kontak PIC, Tanggal Tayang, Ringkasan Brief) dan mencentang persetujuan kebijakan.
6. Sistem memvalidasi bahwa seluruh kolom bebas dari kata kunci kategori terlarang (*judol, pinjol ilegal, rokok/vape, politik praktis*), menyimpan data ke NeonDB dengan kode referensi (misal `PBK-2026-0042`), dan menampilkan tombol utama **"Kirim Brief via WhatsApp"** (serta opsi sekunder *"Kirim via Email"*).

#### Flow C: Admin -> Koneksi TikTok Display API & Kurasi Video

1. Admin masuk lewat `/admin/login` menggunakan kredensial tunggal (`email` + `password`).
2. Di `/admin/tiktok`, admin mengetuk **"Hubungkan Akun TikTok"** (`scope=user.info.basic,video.list`).
3. Setelah *callback* menyimpan token terenkripsi di NeonDB, sistem memanggil `GET /v2/user/info/` (menampilkan avatar & `display_name`) dan `POST /v2/video/list/` (`max_count: 20`).
4. Admin memilih video untuk ditautkan ke entitas `Episode`, melengkapi sumber fakta, dan menyimpan perubahan.
5. *Vercel Cron* menjalankan `/api/cron/tiktok-sync` setiap 12 jam untuk menyegarkan `access_token` via `refresh_token` dan memperbarui `cover_image_url` via `POST /v2/video/query/`.

---

### 6. Layout Hierarchy per Screen

#### A. Home (`/`)

1. **Top Header (`border-b border-border bg-bg`):** Wordmark putih `perbekasian` (`assets/Logos/logo.png`) di kiri; tautan *"Episode"* (`text-link`), tombol *"Ganti tema"* (`variant="ghost"`), dan **Primary CTA:** *"Lihat Rate Card"* (`variant="primary"`, `bg-primary text-primary-text`) di kanan.
2. **Hero Brand Strip:** Eyebrow `text-label` (`FAKTA UNIK BEKASI DALAM 3D`), headline `text-display` dengan kata kunci `Spectral` Italic (*"Bekasi, ngapa? Banyak **ceritanya**."*), dan tautan profil resmi IG/TikTok `@perbekasian`.
3. **Series Filter Bar:** Tab horizontal *Semua*, *Bedah Bekasi*, *Kata Netizen*, dan *Jika Bekasi Ada...* memakai gaya pill/chip bertoken.
4. **Episode Grid:** Kisi kartu episode (`rounded-md border border-border bg-surface`) menampilkan *cover* `9:16`, chip nomor/kode seri, judul `text-h3`, dan label *views*.
5. **Collaboration Callout Card:** `Card` bertepi `border-border` di bagian bawah halaman mengajak *brand* lokal berkolaborasi dengan tautan ke `/rate-card`.

#### B. Episode Detail (`/episode/[slug]`)

1. **Breadcrumb & Episode Header:** Tautan kembali ke seri, `Chip` kode episode (`n="07"`, `title="Bedah Bekasi"`, `sub="Bekasi Bertingkat"`), dan judul `text-h1`.
2. **Video & Fact Split Layout:**
* Kolom Kiri: Bingkai `9:16` (`max-w-[360px] mx-auto rounded-md border border-border overflow-hidden`) yang memuat `tiktokEmbedLink`.
* Kolom Kanan: Kartu ringkasan fakta dengan tautan eksplisit **"Lihat sumber"** (`text-link`) di bawah setiap klaim data.


3. **Affiliate Product Shelf:** Bagian *"Perlengkapan di Episode Ini"* berisi 1–2 `Card` produk dengan penanda `#afiliasi` dan **Primary CTA:** *"Lihat Produk"* (`variant="primary"`).

#### C. Interactive Rate Card (`/rate-card`)

1. **Hero Positioning & Promo Pill:** Badge `bg-secondary text-secondary-text` (*"Harga perkenalan s.d. 31 Jan 2027"*), headline `text-display` (*"Kenalin brand kamu ke warga **Bekasi**"*), dan **Primary CTA:** *"Hitung Estimasi"*.
2. **Key Metrics Bento (4 Kartu):** Grid kartu `bg-surface border border-border rounded-md p-6` berisi angka `tabular-nums` (`719rb`, `326rb`, `7,4%`, `74%`) dan sub-keterangan `Spectral` Italic (`text-text-muted`).
3. **Platform Breakdown & Target Industri:** Perbandingan kartu statistik IG vs TikTok beserta catatan metodologi dan daftar 5 sektor prioritas (Properti, Kuliner, Otomotif, Fintech, Event).
4. **Interactive Calculator & Brief Form (2 Kolom Desktop):**
* Kolom Kiri: Daftar layanan *Endorse*, *Paid Promote*, dan *Paket Bundling* dengan kontrol kuantitas (`min-h-11`).
* Kolom Kanan (Sticky): Kartu ringkasan estimasi biaya *gross*, sakelar Retainer 3 Bulan (`-15%`), badge skema pembayaran otomatis (`Lunas 100%` vs `DP 50%`), formulir *brief* dengan komponen `Input` bertoken, dan **Primary CTA:** *"Kirim Brief via WhatsApp"*.



#### D. Admin Workspace (`/admin/*`)

1. **Sidebar (Desktop) / Top Drawer (Mobile):** Navigasi *Ringkasan*, *TikTok Sync*, *Episode & Affiliate*, *Rate Card & Inquiry*, `ThemeToggle`, dan tombol *Keluar*.
2. **TikTok Connection Banner:** Status token aktif beserta waktu sinkronisasi terakhir *Vercel Cron*.
3. **Workspace Panel:** Tabel data dan formulir CRUD dengan **Primary CTA:** *"Simpan"* (`variant="primary"`).

---

### 7. Component Library & Variants

Seluruh komponen mengacu pada `web-components.md` (`Button`, `Chip`, `Card`, `Input`) tanpa hex mentah:

| Komponen | Default | Hover | Active / Focus | Disabled |
| --- | --- | --- | --- | --- |
| **`Button` (`primary`)** | `bg-primary text-primary-text rounded-sm font-extrabold min-h-11` | `bg-primary-hover` (`#7fd4d4` gelap / `#47b0b0` terang) | `focus-visible`: cincin `2px solid var(--color-focus)` offset `2px` | `opacity-50 pointer-events-none` |
| **`Button` (`secondary`)** | `bg-secondary text-secondary-text rounded-sm font-extrabold min-h-11` | `brightness-110` | `focus-visible`: cincin `2px` `focus` offset `2px` | `opacity-50 pointer-events-none` |
| **`Button` (`ghost`)** | `bg-transparent text-link rounded-sm font-extrabold min-h-11` | `bg-surface-2` | `focus-visible`: cincin `2px` `focus` offset `2px` | `opacity-50 pointer-events-none` |
| **`Chip` (Series / Bab)** | `rounded-md border border-border bg-surface py-2 pl-2 pr-4`; nomor `size-10 rounded-full bg-primary text-primary-text` | `border-border-strong bg-surface-2` (bila interaktif) | Aktif tab: `border-primary bg-surface-2` | `opacity-50` |
| **`Card`** | `rounded-md border border-border bg-surface p-6 shadow-sm` (`shadow-sm` = `none` di tema gelap) | `border-border-strong` (khusus kartu episode yang dapat diklik) | `focus-within`: `border-primary` | — |
| **`Input`** | `min-h-11 rounded-sm border border-border-strong bg-surface px-3 text-text` | `border-text` | `focus-visible`: cincin `2px` `focus` offset `2px` | `opacity-50 bg-surface-2 cursor-not-allowed` |

---

### 8. Screen States

* **Empty State:**
* *Arsip Seri Kosong:* `Card` dengan judul *"Belum ada episode di seri ini"*, deskripsi singkat, dan tombol *"Lihat semua episode"* (`variant="secondary"`).
* *Kalkulator Rate Card (`Rp 0`):* Panel ringkasan menampilkan teks *"Pilih minimal satu layanan atau paket untuk menghitung estimasi biaya dan melihat ketentuan pembayaran."*, tombol *"Kirim Brief via WhatsApp"* dalam keadaan `disabled`.
* *Admin TikTok Belum Terhubung:* Kartu panduan otorisasi Login Kit (`user.info.basic`, `video.list`) dengan tombol utama *"Hubungkan Akun TikTok"*.


* **Loading Skeleton:**
* Kartu `bg-surface border border-border rounded-md` dengan blok animasi `animate-pulse bg-surface-2 rounded-xs` (mematuhi `@media (prefers-reduced-motion: reduce)` dari `globals.css` agar animasi berhenti bagi pengguna sensitif gerak).


* **Error State:**
* *TikTok `cover_image_url` Kedaluwarsa:* `onError` mengganti gambar secara senyap ke aset cadangan statis Perbekasian dan memanggil endpoint penyegaran `POST /v2/video/query/` di latar belakang.
* *Validasi Kategori Terlarang (Brief Form):* Banner peringatan dengan ikon peringatan + border `border-danger` dan teks `text-danger`: *"Maaf, @perbekasian tidak menerima kerja sama untuk kategori judi online, pinjol ilegal, rokok/vape, maupun politik praktis. Silakan sesuaikan brief kamu."* (menyebut apa yang salah dan cara memperbaikinya sesuai `web-ui.md`).
* *TikTok Refresh Token Kedaluwarsa (`/admin`):* Banner `border-warning text-warning` dengan ikon di bagian atas dashboard admin tanpa memengaruhi tampilan publik.


* **Success State:**
* Setelah *inquiry* tersimpan, panel formulir berganti menjadi kartu konfirmasi berikon centang (`text-success`) menampilkan **Kode Referensi** (misal `PBK-2026-0042`), ringkasan paket & ketentuan pembayaran, tombol utama **"Buka WhatsApp"** (`variant="primary"`), dan tombol sekunder **"Kirim via Email"** (`variant="secondary"`).


* **Offline State:**
* Bilah pemberitahuan di bagian atas layar (`bg-surface-2 border-b border-warning text-warning`): *"Koneksi internet terputus. Video sematan dan pengiriman formulir sementara tidak dapat digunakan."*



---

### 9. Responsive Rules

| Breakpoint | Lebar Layar | Aturan Tata Letak & Navigasi |
| --- | --- | --- |
| **Mobile** *(Primary — Bio Link)* | `360px – 480px` | Margin horizontal `16px` (`p-4`), jarak antar bagian `48px` (`gap-12`). Kisi episode `2 kolom` (`gap-3`). Seluruh kontrol tombol dan stepper minimal `44×44px` (`min-h-11`, dilarang memakai `size="sm"` di mobile). Kalkulator Rate Card memiliki bilah ringkasan bawah (*sticky bottom bar*) berisi total estimasi dan tombol lompat ke form *brief*. |
| **Tablet** | `768px – 1024px` (`md` – `lg`) | Margin horizontal `24px`. Kisi episode `3 kolom` (`gap-4`). Kartu metrik Rate Card `4 kolom`. Kalkulator dan ringkasan biaya berdampingan `2 kolom` (`60%` / `40%`). |
| **Desktop** | `> 1280px` (`xl`) | Kontainer utama dibatasi `max-w-[1200px]` dengan margin halaman `64px` (`s-16`). Teks narasi panjang dibatasi `max-w-prose` (`68ch`). Kisi episode `4 kolom` (`gap-6`). Pemutar video di `/episode/[slug]` dikunci selebar `360px` (`9:16`) di sisi kiri berdampingan dengan panel fakta & produk `#afiliasi` di sisi kanan. |

---

### 10. Accessibility (WCAG AA)

1. **Kontras Warna Terverifikasi (`tokens.json` & `web-ui.md`):**
* Teks utama dan teks sekunder di kedua tema memiliki rasio kontras **`≥ 5.5:1`** (melampaui batas minimum WCAG AA `4.5:1`).
* Garis batas kontrol interaktif (`border-strong`: `#7a73b8` di gelap, `#7a759c` di terang) memiliki rasio kontras **`≥ 3.9:1`** terhadap latar (melampaui batas minimum `3:1` untuk komponen antarmuka).
* Tautan dan kata kunci `Spectral` Italic di tema terang memakai token `--color-link` (`#1b6f6f`), bukan `#59c3c3` yang terlalu pucat di atas putih.


2. **Focus Management & Reduced Motion (`globals.css`):**
* Aturan global `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }` wajib aktif di seluruh tombol, tab, tautan, dan input.
* Blok `@media (prefers-reduced-motion: reduce)` menonaktifkan transisi dan animasi bagi pengguna dengan preferensi pengurangan gerak.


3. **Semantik Formulir & Non-Color Indicators:**
* Setiap `Input` terhubung dengan `<label htmlFor={fid}>`, `aria-invalid`, dan `aria-describedby`.
* Seluruh pesan galat (`text-danger`), peringatan (`text-warning`), dan status berhasil (`text-success`) **wajib diawali ikon atau teks eksplisit** agar tidak bergantung pada warna saja.
* Ringkasan harga kalkulator dibungkus `aria-live="polite"` agar perubahan subtotal, diskon 15%, dan aturan DP terbaca otomatis oleh pembaca layar.