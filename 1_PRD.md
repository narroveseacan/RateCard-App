# Product Requirements Document (PRD): Perbekasian Web Platform

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Relational Database, Auth-Protected Admin CMS, TikTok Display API v2.

---

## 1. Problem Statement

Akun edukasi dan hiburan lokal `@perbekasian` (Instagram & TikTok) memproduksi video animasi 3D tentang Bekasi dalam tiga seri utama (*Bedah Bekasi*, *Kata Netizen*, dan *Jika Bekasi Ada...*). Saat ini, komunikasi media kit/rate card kepada calon *brand* masih bergantung pada pengiriman file statis (PDF/gambar), sementara penonton yang datang dari *bio link* TikTok/Instagram belum memiliki pusat eksplorasi episode, sumber fakta, maupun tautan produk *affiliate* yang terkurasi. Selain itu, URL sampul video (`cover_image_url`) dari TikTok memiliki masa kedaluwarsa sehingga memerlukan mekanisme sinkronisasi token dan pembaruan metadata otomatis agar portofolio video tidak rusak.

---

## 2. User Personas & Jobs-to-be-Done (JTBD)

### Persona A: Brand Marketing Manager / UMKM Bekasi–Cikarang (B2B Client)

* **Profil:** Pengambil keputusan pemasaran dari sektor properti Bekasi–Cikarang, kuliner/kafe lokal, otomotif/transportasi, fintech, atau *event* yang mengincar audiens produktif usia 25–44 tahun di Bekasi.


* **JTBD:** *"Ketika saya mengevaluasi akun lokal Bekasi untuk kampanye promosi, saya ingin melihat bukti performa nyata (views, reach, demografi), mencoba simulasi kombinasi paket endorse/paid promote beserta estimasi biayanya, dan mengirim brief awal ke WhatsApp/Email dengan cepat tanpa proses negosiasi manual yang berbelit."*



### Persona B: Penonton Komuter & Warga Bekasi (B2C Audience)

* **Profil:** Pengguna Instagram/TikTok berusia 18–44 tahun yang menonton episode `@perbekasian` dan mengklik tautan di bio profil.


* **JTBD:** *"Ketika saya selesai menonton salah satu episode Perbekasian, saya ingin menelusuri episode lain berdasarkan seri favorit saya, membaca ringkasan/sumber data tiap episode, dan menemukan rekomendasi produk relevan (seperti perlengkapan komuter atau alat pilah sampah) secara praktis."*



---

## 3. Scope & Non-Goals

### In-Scope (MVP)

* **Public Content Hub:** Katalog episode berdasarkan 3 seri (*Bedah Bekasi*, *Kata Netizen*, *Jika Bekasi Ada...*), pemutar video tersemat (*embed*) dari TikTok Display API v2, serta kartu rekomendasi produk *affiliate* per episode dengan label transparansi `#afiliasi`.


* **Interactive Media Kit & Rate Card:** Tampilan statistik akun IG & TikTok terkini, demografi audiens, katalog layanan (*Endorse*, *Paid Promote*, *Bundling*), kalkulator estimasi biaya otomatis (termasuk opsi diskon kontrak 3 bulan 15%), serta formulir pengajuan *brief* dengan validasi kategori terlarang dan penerusan ringkasan ke WhatsApp/Email.


* **Admin CMS & TikTok Integration:** Halaman `/admin` terproteksi autentikasi untuk mengelola metrik performa akun, kurasi video pilihan (*self-selected TikTok videos*) via TikTok Display API v2, manajemen tautan *affiliate*, dan pembaruan harga/promo.



### Non-Goals (Explicitly Excluded from MVP)

* **Integrasi Payment Gateway:** Tidak ada pemrosesan pembayaran DP 50% atau pelunasan langsung di dalam aplikasi web; skema pembayaran hanya ditampilkan sebagai informasi syarat transaksi saat ringkasan pesanan dibuat.


* **Multi-Vendor / Self-Serve Creator Marketplace:** Platform eksklusif hanya untuk satu entitas akun `@perbekasian`.


* **Scraping Data Insight Instagram/TikTok Secara Ilegal:** Metrik agregat seperti *reach* IG dan persentase demografi dikelola secara manual melalui Admin CMS, sementara profil dan daftar video TikTok menggunakan endpoint resmi TikTok Display API v2 (`user.info.basic` & `video.list`).



---

## 4. User Stories

* **US-01 (Brand):** *Sebagai Brand Manager, saya ingin melihat metrik gabungan maupun per platform (views, akun terjangkau, engagement rate, demografi usia 25–44 tahun) dan studi kasus video teratas agar yakin dengan jangkauan organik `@perbekasian`.*


* **US-02 (Brand):** *Sebagai calon klien, saya ingin memilih kombinasi layanan Endorse, Paid Promote, atau Paket Bundling serta mencentang opsi kontrak 3 bulan (diskon 15%) agar langsung mengetahui estimasi biaya gross dan ketentuan pembayarannya.*


* **US-03 (Brand):** *Sebagai calon klien, saya ingin mengisi formulir brief kampanye yang memvalidasi bahwa produk saya bukan kategori terlarang (judol, pinjol ilegal, rokok/vape, politik praktis) lalu mengirim ringkasan terformat langsung ke WhatsApp/Email bisnis `@perbekasian`.*


* **US-04 (Audience):** *Sebagai penonton dari bio link, saya ingin memfilter episode berdasarkan seri (Bedah Bekasi, Kata Netizen, Jika Bekasi Ada...), menonton video TikTok langsung di halaman, dan mengklik produk affiliate yang direkomendasikan di episode tersebut.*


* **US-05 (Admin):** *Sebagai pemilik akun, saya ingin menghubungkan akun TikTok via OAuth Login Kit, memilih video mana saja yang ditampilkan di situs, dan menjadwalkan refresh token/metadata otomatis agar gambar cover dan embed link tidak kedaluwarsa.*


* **US-06 (Admin):** *Sebagai pemilik akun, saya ingin memperbarui angka statistik bulanan, tanggal masa berlaku harga perkenalan (31 Januari 2027), dan tautan produk affiliate melalui dashboard admin tanpa harus mengubah kode.*



---

## 5. Feature Roadmap

| Fase | Fitur Utama | Deskripsi Singkat |
| --- | --- | --- |
| **MVP** | **Public Content Hub & Affiliate Shelf** | Direktori 3 seri konten, detail episode dengan TikTok `embed_link`, sumber data episode, dan pelacakan klik produk *affiliate*.

 |
| **MVP** | **Interactive Rate Card & Brief Builder** | Tampilan statistik akun, kalkulator harga *Endorse* / *Paid Promote* / *Bundling* + diskon 15% retainer 3 bulan, filter kategori terlarang, serta generator pesan WhatsApp & `mailto:`.

 |
| **MVP** | **Admin CMS & TikTok Display API v2** | Login admin, OAuth TikTok (`user.info.basic`, `video.list`), pemilih video kurasi (`POST /v2/video/list/`), *background job* refresh token tiap 12 jam & refresh `cover_image_url` (`POST /v2/video/query/`).

 |
| **V2** | **Client Brief Portal & Status Tracker** | Tautan unik bagi klien untuk memantau status *brief*, persetujuan naskah, pratinjau video 3D, dan unduhan laporan performa H+7.

 |
| **Backlog** | **Instagram Graph API Sync & Invoice PDF** | Sinkronisasi otomatis media Instagram Reels dan generator draf *invoice* / surat penawaran resmi dalam format PDF.

 |

---

## 6. Functional Requirements (MVP)

### FR-01: Landing Page & Public Content Hub (`/`, `/seri/[slug]`, `/episode/[slug]`)

1. Menampilkan identitas merek `@perbekasian` dengan palet warna `#EBEBEB`, *Dusty Grape*, dan *Strong Cyan*, serta kombinasi tipografi `Plus Jakarta Sans` dan `Spectral` Italic.


2. Menyediakan tab navigasi filter berdasarkan 3 seri: *Bedah Bekasi*, *Kata Netizen*, dan *Jika Bekasi Ada...*.


3. Setiap kartu episode menampilkan *cover image* yang disegarkan dari TikTok API, judul episode, seri, ringkasan fakta, dan badge jumlah *views*.


4. Halaman/modal detail episode merender video TikTok menggunakan `embed_link` dan menampilkan daftar produk *affiliate* terkait (misal: TWS, *powerbank*, tempat sampah pilah) lengkap dengan penanda `#afiliasi` serta pencatatan jumlah klik keluar (*outbound click counter*).



### FR-02: Interactive Media Kit & Rate Card (`/rate-card`)

1. **Statistik & Demografi:** Menampilkan ringkasan metrik 30 hari (total *views*, akun terjangkau, *engagement rate* per *views*, dan demografi usia 25–44 tahun serta lokasi Indonesia) dengan catatan metodologi perhitungan dan *disclaimer* bahwa *views* tidak dijamin.


2. **Katalog Layanan & Kalkulator Estimasi:**
* *Endorse (IG + TikTok):* Reels Dedicated 3D *"Jika Bekasi Ada [Brand]"* (`Rp 1.750.000`), Reels Product Placement 5–10 detik (`Rp 600.000`), Carousel Infografis (`Rp 450.000`), Story Endorse 3 frame (`Rp 150.000`).


* *Paid Promote:* Reels IG + TikTok (`Rp 300.000`), Reels IG saja (`Rp 200.000`), Feed (`Rp 150.000`), Story (`Rp 50.000`/frame).


* *Paket Bundling:* Paket *Kenalan* (`Rp 400.000`), Paket *Warga Bekasi* (`Rp 1.000.000`), Paket *Jika Bekasi Ada…* (`Rp 2.000.000`).


* *Diskon Retainer:* Opsi kontrak 3 bulan otomatis menerapkan potongan **15%** pada subtotal.


* Menampilkan lencana masa berlaku harga perkenalan (default hingga `31 Jan 2027`) dan keterangan harga *gross*.




3. **Aturan Ketentuan Pembayaran Otomatis:**
* Jika total estimasi `< Rp 500.000`, sistem menampilkan syarat **Pelunasan 100% di depan**.


* Jika total estimasi `≥ Rp 500.000`, sistem menampilkan syarat **DP 50% di awal & pelunasan 50% setelah pratinjau disetujui sebelum tayang**.




4. **Form Brief & Validasi Kebijakan:**
* Input wajib: Nama Brand, Industri, Kontak PIC (WhatsApp/Email), Pilihan Layanan/Paket, Ringkasan Brief, Target Tanggal Tayang, dan *checkbox* pernyataan kepatuhan.
* Sistem memblokir pengiriman apabila pengguna memilih atau memasukkan indikasi kategori terlarang (**judol, pinjol ilegal, rokok/vape, politik praktis**).


* Submit form menyimpan log *inquiry* ke database dan membuka *deep link* WhatsApp (`wa.me`) atau klien Email dengan templat pesan berisi rincian paket, estimasi biaya, dan kode referensi *booking*.



### FR-03: Auth-Protected Admin Dashboard (`/admin`)

1. **Autentikasi:** Proteksi seluruh rute `/admin/*` dan endpoint mutasi API menggunakan sesi terautentikasi.
2. **Manajemen Statistik & Rate Card:** Form CRUD untuk memperbarui angka metrik IG/TikTok, daftar harga layanan, status aktif paket, dan batas tanggal harga perkenalan.


3. **Manajemen Episode & Affiliate:** Form untuk mengaitkan `tiktok_video_id` dengan seri konten, sumber fakta episode, serta daftar tautan produk *affiliate*.



### FR-04: TikTok Display API v2 Integration & Token Lifecycle

1. **OAuth Login Kit Flow:**
* Endpoint `/api/auth/tiktok/authorize` mengarahkan admin ke TikTok OAuth dengan `scope=user.info.basic,video.list`.


* Endpoint `/api/auth/tiktok/callback` menukar `authorization_code` menjadi `access_token`, `refresh_token`, dan `open_id`, lalu menyimpannya secara terenkripsi di database.




2. **Profil & Video Picker:**
* Memanggil `GET [https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name](https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name)` untuk menampilkan profil `@perbekasian`.


* Memanggil `POST [https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link](https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link)` (`max_count: 20`) di halaman kurasi admin agar admin dapat memilih video mana saja yang ditautkan ke episode.




3. **Scheduled Background Jobs:**
* *Token Refresh Job (tiap 12 jam):* Menggunakan `refresh_token` untuk memperbarui `access_token` sebelum masa berlaku 24 jam (`86400` detik) habis.


* *Cover & Embed Metadata Sync:* Memanggil `POST [https://open.tiktokapis.com/v2/video/query/?fields=id,cover_image_url,embed_link](https://open.tiktokapis.com/v2/video/query/?fields=id,cover_image_url,embed_link)` dengan filter `video_ids` yang tersimpan di database untuk memperbarui `cover_image_url` yang kedaluwarsa.





---

## 7. Data Model Schema

```prisma
model AdminUser {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model TikTokIntegration {
  id                    String   @id @default(cuid())
  openId                String   @unique
  unionId               String?
  displayName           String
  avatarUrl             String?
  accessTokenEncrypted  String
  refreshTokenEncrypted String
  scopes                String   // "user.info.basic,video.list"
  accessTokenExpiresAt  DateTime
  refreshTokenExpiresAt DateTime
  lastSyncedAt          DateTime @default(now())
  updatedAt             DateTime @updatedAt
}

model AccountMetricSnapshot {
  id                 String   @id @default(cuid())
  periodLabel        String   // e.g., "30 Hari Terakhir"
  totalViewsLabel    String   // e.g., "719rb"
  igViews            Int
  tiktokViews        Int
  igReach            Int
  igEngagementRate   Float    // e.g., 7.4
  tiktokEngagement   Float    // e.g., 6.6
  igFollowers        Int
  tiktokFollowers    Int
  audienceAge25To44  Float    // e.g., 74.0
  audienceIndonesia  Float    // e.g., 99.3
  introPriceValidTo  DateTime // e.g., 2027-01-31
  isActive           Boolean  @default(true)
  updatedAt          DateTime @updatedAt
}

model ContentSeries {
  id          String    @id @default(cuid())
  slug        String    @unique // "bedah-bekasi", "kata-netizen", "jika-bekasi-ada"
  title       String
  tagline     String?
  description String
  sortOrder   Int       @default(0)
  episodes    Episode[]
}

model Episode {
  id                  String             @id @default(cuid())
  seriesId            String
  series              ContentSeries      @relation(fields: [seriesId], references: [id])
  episodeCode         String             // e.g., "EP-07"
  title               String
  slug                String             @unique
  summary             String
  factSources         String?            // Referensi sumber data episode
  tiktokVideoId       String?            @unique
  tiktokCoverUrl      String?
  tiktokEmbedLink     String?
  tiktokDurationSec   Int?
  coverLastRefreshed  DateTime?
  igReelsUrl          String?
  highlightViewsLabel String?            // e.g., "344rb views"
  isFeaturedCaseStudy Boolean            @default(false)
  publishedAt         DateTime           @default(now())
  affiliateProducts   AffiliateProduct[]
}

model AffiliateProduct {
  id           String   @id @default(cuid())
  episodeId    String
  episode      Episode  @relation(fields: [episodeId], references: [id], onDelete: Cascade)
  productName  String
  category     String?
  platform     String   // "Shopee", "Tokopedia", "TikTok Shop"
  affiliateUrl String
  ctaText      String
  clickCount   Int      @default(0)
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
}

enum ServiceCategory {
  ENDORSE
  PAID_PROMOTE
  BUNDLE
}

model RateCardService {
  id            String          @id @default(cuid())
  code          String          @unique
  category      ServiceCategory
  name          String
  description   String
  deliverables  String[]
  basePriceIdr  Int
  unitLabel     String          // e.g., "per video", "per 3 frame"
  sortOrder     Int             @default(0)
  isActive      Boolean         @default(true)
}

enum PaymentScheme {
  FULL_UPFRONT // < Rp 500.000
  DP_50_SPLIT  // >= Rp 500.000
}

enum InquiryStatus {
  SUBMITTED
  IN_DISCUSSION
  APPROVED
  REJECTED
}

model BookingInquiry {
  id                    String        @id @default(cuid())
  referenceCode         String        @unique
  brandName             String
  brandIndustry         String
  picName               String
  picContact            String
  selectedItemsJson     Json          // Array of { serviceId, code, name, qty, unitPrice }
  isRetainer3Months     Boolean       @default(false)
  subtotalIdr           Int
  discountIdr           Int
  totalEstimateIdr      Int
  paymentScheme         PaymentScheme
  briefSummary          String
  targetPublishDate     DateTime?
  policyAccepted        Boolean
  status                InquiryStatus @default(SUBMITTED)
  createdAt             DateTime      @default(now())
}

```

---

## 8. Edge Cases & Failure States

* **Kedaluwarsa `cover_image_url` TikTok:** Tautan gambar sampul dari TikTok CDN memiliki tanda tangan berbatas waktu (`x-expires`). Jika *background job* gagal berjalan atau pengguna membuka halaman saat URL kedaluwarsa, komponen kartu episode wajib memiliki `onError` *fallback* (memicu endpoint revalidasi `POST /v2/video/query/` di latar belakang atau menampilkan *fallback thumbnail* lokal ber-branding Perbekasian).


* **TikTok OAuth `refresh_token` Kedaluwarsa / Dicabut:** Jika masa berlaku `refresh_token` (365 hari) habis atau akses aplikasi dicabut dari pengaturan TikTok, dashboard admin harus menampilkan banner peringatan status *"Koneksi TikTok Terputus — Hubungkan Ulang"* tanpa merusak tampilan halaman publik (halaman publik tetap menampilkan *embed link* dan data tersimpan terakhir).


* **Rate Limit TikTok API (`POST /v2/video/query/`):** Mengelompokkan seluruh `video_ids` yang aktif dalam satu batch permintaan *query* saat sinkronisasi berjalan, bukan memanggil API per video secara individual.


* **Perhitungan Ambang Batas DP vs Lunas (`Rp 500.000`):** Jika klien memilih item satuan senilai `Rp 500.000` lalu mengaktifkan diskon retainer 3 bulan (15%) sehingga total bersih menjadi `Rp 425.000` per bulan, sistem harus mengevaluasi aturan DP berdasarkan nilai kontrak/tagihan yang disepakati serta menampilkan rincian perhitungannya secara eksplisit agar tidak membingungkan klien.


* **Percobaan Bypass Kategori Terlarang:** Validasi daftar hitam kata kunci (*judol*, *slot*, *gacor*, *pinjol*, *vape*, *rokok*, *caleg*, *partai*) dilakukan baik di sisi klien (UI) maupun di API Route (`POST /api/inquiries`) sebelum menyimpan data.



---

## 9. Success Metrics

* **Media Kit Conversion Rate:** Persentase pengunjung halaman `/rate-card` yang menyelesaikan kalkulasi paket dan menekan tombol kirim *brief* ke WhatsApp/Email.
* **Affiliate Outbound CTR:** Rasio jumlah klik tautan produk *affiliate* dibagi total kunjungan halaman episode (mengatasi masalah *bio link taps* nol pada insight sebelumnya).


* **TikTok Sync Reliability:** `≥ 99%` tingkat keberhasilan *cron job* pembaruan `access_token` setiap 12 jam tanpa kegagalan gambar sampul rusak di halaman publik.


* **Mobile Performance (Core Web Vitals):** LCP `< 2.5 detik` pada perangkat *mobile* untuk trafik yang masuk langsung dari peramban in-app Instagram dan TikTok.



---


### 10. Finalisasi Arsitektur & Konfigurasi Teknis (PRD Locked)

1. **Database & Penjadwalan Latar Belakang:**
* **Database:** PostgreSQL melalui **NeonDB** (terkoneksi via Prisma ORM dengan *connection pooling* untuk lingkungan *serverless* Vercel).
* **Cron Job:** **Vercel Cron Jobs** (`vercel.json`) dijadwalkan setiap **12 jam** (`0 */12 * * *`) untuk memanggil *endpoint* terproteksi (`CRON_SECRET`) `/api/cron/tiktok-sync`, yang bertugas memperbarui `access_token` menggunakan `refresh_token` serta menyegarkan `cover_image_url` melalui `POST /v2/video/query/`.




2. **Autentikasi Dashboard Admin (`/admin`):**
* Menggunakan **Auth.js (NextAuth)** dengan *Credentials Provider* (email + password tunggal yang disimpan dalam bentuk *hash* `bcrypt` pada tabel `AdminUser` atau *environment variable* terverifikasi).
* Menggunakan strategi sesi JWT *HTTP-only cookie* dengan `middleware.ts` untuk memblokir akses tidak sah ke seluruh rute `/admin/*` serta *endpoint* mutasi (`POST`, `PATCH`, `DELETE`).


3. **Konfigurasi Kontak Tujuan Pemesanan:**
* Menggunakan variabel lingkungan (`NEXT_PUBLIC_BUSINESS_WA` dan `NEXT_PUBLIC_BUSINESS_EMAIL`) sebagai nilai *default* tujuan *redirect* formulir pemesanan, disertai dukungan pembaruan dinamis melalui pengaturan Admin CMS agar nomor/email tujuan dapat diubah tanpa perlu *redeploy* aplikasi.

