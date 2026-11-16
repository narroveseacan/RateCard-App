# Brand kit Perbekasian (salinan satu file)

Sumber utama: artifact "Brand kit Perbekasian" (README, tokens.json, logo, font, komponen). File ini gabungan agar bisa dibaca model AI sekaligus.

# Perbekasian

Perbekasian adalah channel fakta unik Bekasi dalam bentuk video animasi 3D vertikal untuk TikTok dan Instagram Reels. Pembaca file ini (manusia atau model AI) memakainya untuk membuat naskah, visual, audio, thumbnail, dan caption yang terasa satu merek.

## Aturan inti (baca ini dulu)

1. Format: 9:16, 1080x1920, 30 fps, 55-70 detik, tanpa VO di file video. VO disediakan pemilik channel; video disinkronkan ke VO itu.
2. Bahasa naskah dan subtitle: Indonesia santai, pakai "lu/gue". Kalimat pertama adalah hook. Penutup berupa pertanyaan halus untuk memancing komentar.
3. Warna: ink `#1E1A3C`, cyan `#59C3C3`, grape `#52489C`, platinum `#EBEBEB`, ash `#CAD2C5`, teal `#84A98C`. Kuning `#F2C96B` hanya aksen hemat. Detail dan alasan: `tokens.json`.
4. Huruf: Plus Jakarta Sans ExtraBold (800) untuk subtitle dan label; kata kunci dalam Spectral Italic berwarna cyan.
5. Logo "perbekasian" putih kecil di kiri atas (left 60px, top 200px, lebar 240px). Label kanan atas berisi judul video saja, bukan nomor episode. Tanpa timecode, tanpa progress bar.
6. Semua teks penting di dalam zona aman (lihat `video-spec.md`): atas 200px, bawah 440px, kanan 150px.
7. Sedikit setting, banyak gerak kamera. Satu setting dipakai beberapa shot.
8. Audio: SFX dan BGM tidak pernah lebih keras dari VO. Topik sensitif: tanpa candaan, tanpa SFX dramatis.
9. Sumber ditaruh di caption, bukan di video.
10. Untuk setiap fakta, siapkan tabel cek fakta (klaim, sumber, catatan). Angka hasil hitungan sendiri ditandai.

## Isi brand kit

| File | Isi | Kapan dibaca |
| --- | --- | --- |
| `README.md` | Aturan inti, suara merek, fondasi visual (halaman ini) | Selalu pertama |
| `tokens.json` | Warna (tema gelap dan terang), huruf, jarak, radius, bayangan, dengan catatan pemakaian | Saat menulis kode, CSS, atau desain |
| `voice.md` | Gaya naskah, struktur, series, aturan ElevenLabs, caption | Saat menulis naskah dan caption |
| `video-spec.md` | Format layar, zona aman, komponen overlay beserta CSS, kamera, render | Saat membuat video atau thumbnail |
| `audio-delivery.md` | Aturan BGM dan SFX, level suara, daftar file yang diserahkan | Saat mixing dan serah terima |
| `web-ui.md` | Web app: prinsip UI/UX, `globals.css` Tailwind v4, Next.js, Vite, aksesibilitas | Saat membuat web app (React, Next.js, Vite) |
| `web-components.md` | Sumber React + Tailwind untuk Button, Chip, Card, Input | Saat membuat komponen UI |
| `assets/Logos/` | Logo wordmark putih | Saat membutuhkan logo |
| `fonts/` | File huruf (Plus Jakarta Sans, Spectral Italic) | Saat membuat render atau halaman web |

## Dua permukaan: video dan web app
Aturan inti di atas dan bagian Fondasi visual berlaku untuk **video**. Untuk **web app** (React, Next.js, Tailwind, Vite) baca `web-ui.md`: palet merek tetap sama, tema gelap adalah bawaan, tema terang dan warna status adalah usulan turunan, dan zona aman video (200/440/150px) tidak berlaku.

## Fondasi visual

**Suasana.** 3D bersih dengan bentuk sederhana dan pencahayaan sinematik, bukan realisme foto. Palet gelap kebiruan: ink dan grape sebagai dasar, cyan sebagai satu-satunya warna yang "berbicara". Kuning hanya untuk cahaya hangat (jendela menyala) atau satu sorotan.

**Dua tingkat render.**
- Realistis penuh: episode reguler dan "Jika Bekasi Ada..." yang butuh kendaraan, jalan, dan kota.
- Ringan: gaya "Jika Bekasi Ada Gunung" dan "Bedah Bekasi: Rumah D12". Bentuk sederhana, tanpa HDRI berat, render maksimal 2 jam. Dipakai bila topiknya satu objek atau satu lokasi.

**Lapisan di atas scene.** Tiap video memakai tint grape tipis (soft-light), vignette ink-deep di tepi, dan scrim gradien ink-deep di belakang subtitle supaya teks terbaca di scene yang terang.

**Bentuk.** Sudut membulat (12-22px untuk panel, lingkaran penuh untuk chip nomor dan titik label). Tanpa bayangan keras. Tanpa gradien warna-warni; satu-satunya gradien adalah scrim ink-deep.

**Kamera.** Pan, dolly, dan drone pelan. Kunci kamera didefinisikan per shot dalam waktu relatif 0 sampai 1 dengan interpolasi halus. Perpindahan antar-setting memakai blur singkat, bukan potongan keras.

**Teks bergerak mengikuti VO.** Subtitle muncul per frasa; kata yang belum diucapkan redup (opacity 0.4) lalu terang saat diucapkan. Label dan kartu muncul tepat pada kata yang menyebutnya.

## Dilarang

- Memakai nomor episode di label kanan atas.
- Menaruh subtitle di bawah 440px dari dasar atau di kanan 150px dari tepi.
- Gradien dekoratif (selain scrim ink-deep) atau kartu penuh emoji.
- Memasukkan VO ke file video, atau SFX/BGM yang lebih keras dari VO.
- Logo yang diwarnai ulang, dimiringkan, atau diberi bayangan.
- Figur manusia berwajah, senjata, atau korban pada topik sensitif.


---

# Suara dan naskah

## Nada
Santai, jelas, rasa ingin tahu orang Bekasi. Kata ganti "lu/gue". Humor ringan boleh pada topik ringan; tidak pada topik sensitif. Istilah lokal Bekasi dipakai bila memang dipakai warga (contoh: warga menyebut "prapatan", bukan "persimpangan").

## Struktur naskah
1. Hook di kalimat pertama (fakta mengejutkan atau pertanyaan).
2. Isi: 4-6 fakta berurutan, satu ide per kalimat.
3. Penutup: satu pertanyaan halus yang mengundang komentar.
4. Durasi 55-70 detik, sekitar 2,6 kata per detik.

## Series
| Series | Isi |
| --- | --- |
| Episode reguler | Fakta unik Bekasi apa adanya. |
| Jika Bekasi Ada... | Pengandaian dibandingkan dengan kondisi nyata (contoh: Gunung, MRT, Taksi Tanpa Sopir). Pakai istilah yang dikenal masyarakat umum. |
| Bedah Bekasi | Satu kasus atau tempat dibelah lapis demi lapis dengan cutaway 3D. |
| Kata Netizen | Satu meme atau stigma soal Bekasi dicari asal-usulnya, dicek dengan data, lalu diputuskan lewat stempel BENER / SETENGAH BENER / HOAKS di akhir. Visual: diorama 3D dengan tweet atau elemen meme melayang. |

## Format dokumen naskah
Setiap naskah menyertakan: tabel shot (setting dan visual, VO), teks VO utuh, kata kunci subtitle, tabel cek fakta (klaim, sumber, catatan), referensi gambar beserta kata kunci pencarian, rencana BGM, rencana SFX, caption beserta daftar sumber. Tulis tahun lengkap untuk setiap tanggal. Angka hasil hitungan sendiri ditandai di tabel cek fakta.

## Aturan teks untuk ElevenLabs
- Angka ditulis dengan huruf di teks VO ("tujuh Agustus dua ribu sembilan").
- Singkatan Inggris ditulis ejaannya ("Em-Ar-Ti", "Jei-Dabel-yu").
- Singkatan Indonesia ditulis nama lengkapnya di VO; di label visual boleh tetap singkatan.
- Satu paragraf VO = satu segmen; jeda antar paragraf = jeda VO, jumlahnya harus cocok dengan segmen di timing.
- Teks tampilan (subtitle) dan teks ucapan boleh berbeda; catat pasangannya dalam tabel penyesuaian.

## Topik sensitif (korban jiwa, bencana, terorisme)
Tanpa candaan, tanpa SFX dramatis, tanpa suara tembakan atau ledakan. BGM minimal dan gelap, turun hampir hening pada kalimat inti. Warna diredam. Tanpa figur manusia berwajah, senjata, korban, atau jenazah. Nama orang tidak dipasang di video (cukup di caption bila perlu). Pakai "menurut polisi" atau "disebut" untuk klaim yang belum terbukti. Tutup caption dengan ucapan duka atau hormat.

## Caption
Urutan: hook satu kalimat, fakta inti, pertanyaan penutup, hashtag, daftar sumber. Singkat. Hashtag selalu `#Perbekasian` ditambah hashtag series (`#BedahBekasi`, `#JikaBekasiAda`) dan `#Bekasi`. Sumber ditulis sebagai media, judul, dan tanggal.


---

# Spesifikasi video dan overlay

Kanvas 1080x1920, 30 fps. Render dengan Three.js di Chromium headless; overlay berupa elemen DOM di atas kanvas dan ikut tertangkap screenshot. Semua nilai di bawah dalam piksel kanvas.

## Zona aman (UI TikTok/Reels menutupi atas, bawah, dan kolom kanan)
| Elemen | Posisi |
| --- | --- |
| Logo | left 60, top 200, lebar 240 |
| Judul video (kanan atas) | right 60, top 214, rata kanan |
| Subtitle bawah | left 64, right 150, bottom 440 |
| Subtitle atas (bila dipakai) | left 64, right 150, top 330 |
| Chip, kartu angka | left 64, top 330 (kartu: top 480) |
| Label 3D | di luar area subtitle: bila subtitle bawah, y label <= 1250; bila subtitle atas, y >= 640 |
| Margin kanan semua teks | minimal 150 |

Setelah render uji, buat lembar frame (contact sheet) dan periksa bahwa tidak ada teks yang masuk zona tertutup.

## Subtitle
- Plus Jakarta Sans 800, 116px, line-height 0.93, letter-spacing -0.045em, platinum.
- Maksimal 5 kata per potongan; potong di koma atau akhir frasa.
- Kata belum diucapkan: opacity 0.4, lalu 1 saat diucapkan.
- Kata kunci: Spectral Italic 400, cyan, letter-spacing -0.025em.
- Kicker (opsional) di atas subtitle: PJS 700 34px, opacity 0.88.

```css
#sub{position:absolute;left:64px;right:150px;color:#EBEBEB;font-family:'Plus Jakarta Sans'}
#big{font-weight:800;font-size:116px;line-height:.93;letter-spacing:-.045em;text-wrap:balance}
#big .k{font-family:Spectral;font-style:italic;font-weight:400;letter-spacing:-.025em;color:#59C3C3}
```

## Judul video, kanan atas
PJS 700, 22px, huruf besar, letter-spacing 0.16em, platinum opacity 0.9. Isi: judul video saja (contoh: "BEDAH BEKASI / RUMAH D12"). Tidak ada "EP." dan nomor.

## Chip lapis atau bab
Panel `panel-78`, radius 20, padding 14/28/14/16. Lingkaran nomor 64px cyan dengan angka ink (PJS 800 36px). Judul chip PJS 800 40px; keterangan Spectral Italic 30px ash.

```css
#chip{position:absolute;left:64px;top:330px;display:flex;gap:18px;align-items:center;background:rgba(20,18,46,.78);border-radius:20px;padding:14px 28px 14px 16px;color:#EBEBEB}
#chip .n{width:64px;height:64px;border-radius:50%;background:#59C3C3;color:#1E1A3C;font:800 36px/64px 'Plus Jakarta Sans';text-align:center}
```

## Label 3D
Menempel ke titik di dunia 3D. Teks PJS 800 30px dengan latar `panel-72`, radius 12, padding 12/18. Kata kunci di dalam label: Spectral Italic 500 cyan. Titik penanda: 16px cyan dengan lingkar `cyan-halo` 6px. Muncul pada kata yang menyebutnya.

## Kartu angka
Latar `panel-72`, radius 22, padding 16/26/18. Angka PJS 800 96px (letter-spacing -0.04em); satuan Spectral Italic cyan 64px. Keterangan PJS 700 26px huruf besar, letter-spacing 0.12em, opacity 0.8. Posisi top 330, kanan minimal 150.

## Stempel vonis (Kata Netizen)
Kotak berputar -9 derajat, border 10px cyan, radius 22, teks cyan PJS 800 70px (maksimal 70px supaya tidak keluar layar), keterangan Spectral Italic 38px platinum, di sekitar y 1010-1230. Isi: BENER, SETENGAH BENER, atau HOAKS.

## Lapisan scene
- Tint grape: gradien vertikal `rgba(82,72,156,.16)` ke transparan di 35%, blend soft-light.
- Vignette: radial transparan sampai 55%, ink-deep 42% di tepi.
- Scrim bawah (di belakang subtitle bawah): transparan sampai 45%, ink-deep 55% di 62%, 80% di 80%.
- Scrim atas (bila subtitle atas): cermin dari scrim bawah.

## Preset cahaya (gaya ringan)
Tiga preset yang bisa dicampur dengan interpolasi: malam (langit ink-deep, bulan, cahaya jendela hangat), maket (cahaya netral lembut untuk cutaway), subuh (langit grape ke ash, hangat di cakrawala).

## Kamera
Kunci kamera per shot: waktu relatif 0..1, posisi, target, fov. Interpolasi halus (hermite). Tiap shot dipetakan ke satu segmen VO; kejadian visual mengacu ke waktu kata (`wt(segmen,'kata')`), sehingga bila VO berubah cukup menjalankan ulang penyelarasan.

## Mencegah glitch
- Objek yang belum muncul diskalakan 1e-4 dan disembunyikan (bukan hanya opacity 0).
- Bidang potong lokal untuk cutaway, dengan tutup (cap) agar dinding tidak tampak berlubang.
- Urutan titik segitiga atap harus benar (atap terbalik terlihat sebagai atap bolong).
- Satu antrean render untuk mesin 2 CPU; antrean paralel tidak lebih cepat.
- Setelah render, jalankan pemeriksa flicker pada tiap bagian dan lihat frame yang ditandai.

## Pipeline singkat
1. Ambil VO, BGM, SFX, referensi dari folder episode.
2. Transkripsi VO, deteksi jeda, bagi waktu kata per suku kata (atau penyelarasan MFCC+DTW), tulis `timing.json`.
3. Bangun scene dan shot; render uji per shot; periksa zona aman.
4. Render per bagian (potong di batas shot), gabung dengan concat.
5. Mix stem, buat thumbnail, kirim.

## Thumbnail
9:16. Fokus utama di area tengah 3:4. Eyebrow nama series PJS 800 44px letter-spacing 0.2em; judul PJS 800 sekitar 200px (kata kunci Spectral Italic cyan); lokasi dan tahun Spectral Italic 56px ash. Seluruh teks di dalam zona aman.


---

# Audio dan serah terima

## Aturan emas
SFX dan BGM tidak pernah lebih keras dari VO. Ukur loudness momentary (jendela 400 ms) dan bandingkan dengan VO saat VO bicara; periksa juga bagian jeda.

## Stem terpisah (tanpa VO)
| Stem | Target | Catatan |
| --- | --- | --- |
| VO | patokan, dikirim pemilik channel (contoh: -21 LUFS) | Tidak dimasukkan ke video |
| SFX | -22,5 LUFS integrated, TP -2 | Pada topik sensitif turunkan sampai sekitar -29 LUFS |
| BGM | -28,5 LUFS integrated, TP -3 | Turun 5-6 dB di bawah VO (ducking: attack 60 ms, release 350 ms); pada topik sensitif sekitar -32 LUFS dan turun lagi di kalimat inti |

Dua stem diperiksa terhadap VO; bila stem hampir menyamai VO di ekor kata yang pelan, turunkan stem, jangan naikkan VO. Beri tahu pemilik channel bila VO sebaiknya dinaikkan.

## BGM
Satu lagu untuk seluruh video, fade in 2 detik dan fade out 3 detik. Tidak ada bagian yang ceria pada topik sensitif.

## SFX
Seminimal mungkin: ambience latar, pop kecil saat label muncul, satu swish pada transisi besar. Tidak dipakai di topik sensitif: tembakan, ledakan, record scratch, bel, palu, SFX meme.

## File yang diserahkan
Disimpan di folder episode (`Perbekasian/<judul>`) dan dikirim juga di percakapan:
- Video tanpa suara (mp4, H.264, 30 fps, 1080x1920).
- `SFX_<judul>.wav` dan `BGM_<judul>.wav`.
- Thumbnail PNG 9:16, fokus utama di area tengah 3:4, judul di dalam zona aman.
- Pratinjau dengan VO digabung (opsional) untuk pemeriksaan.
- Caption dan daftar sumber.
Bila ada keterbatasan (posisi perkiraan, detail kecil yang bergetar, timing kata yang dibagi per suku kata), sebutkan terus terang.


---

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


---

# Komponen web (React + Tailwind v4)

Sumber siap salin. Butuh `globals.css` dari `web-ui.md` dan helper kecil:

```ts
// lib/cn.ts
export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
```

## Button

```tsx
import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary: "bg-primary text-primary-text hover:bg-primary-hover",
  secondary: "bg-secondary text-secondary-text hover:brightness-110",
  ghost: "text-link hover:bg-surface-2",
};
const sizes = { sm: "min-h-9 px-3 text-sm", md: "min-h-11 px-4 text-base", lg: "min-h-12 px-6 text-lg" };

export function Button({ variant = "primary", size = "md", className, ...p }: Props) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-extrabold transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant], sizes[size], className,
      )}
      {...p}
    />
  );
}
```

`sm` hanya untuk antarmuka padat di desktop; di mobile pakai `md` ke atas (target sentuh 44px).

## Chip

```tsx
export function Chip({ n, title, sub }: { n?: number | string; title: string; sub?: string }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-md border border-border bg-surface py-2 pl-2 pr-4">
      {n !== undefined && (
        <span className="grid size-10 place-items-center rounded-full bg-primary font-extrabold text-primary-text">{n}</span>
      )}
      <span>
        <span className="block text-lg/5 font-extrabold">{title}</span>
        {sub && <span className="block font-serif text-sm italic text-text-muted">{sub}</span>}
      </span>
    </div>
  );
}
```

## Card

```tsx
export function Card({ eyebrow, title, children }: { eyebrow?: string; title?: string; children?: React.ReactNode }) {
  return (
    <section className="rounded-md border border-border bg-surface p-6 shadow-sm">
      {eyebrow && <p className="text-label text-text-muted">{eyebrow}</p>}
      {title && <h3 className="mt-1 text-h3">{title}</h3>}
      <div className="mt-3 text-text-muted">{children}</div>
    </section>
  );
}
```

## Input

```tsx
import { useId } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string };

export function Input({ label, hint, error, id, ...p }: Props) {
  const uid = useId();
  const fid = id ?? uid;
  const describedBy = error ? `${fid}-err` : hint ? `${fid}-hint` : undefined;
  return (
    <div className="grid gap-1">
      <label htmlFor={fid} className="text-sm font-bold">{label}</label>
      <input
        id={fid}
        aria-invalid={!!error || undefined}
        aria-describedby={describedBy}
        className="min-h-11 w-full rounded-sm border border-border-strong bg-surface px-3 text-text placeholder:text-text-muted aria-invalid:border-danger"
        {...p}
      />
      {error ? <p id={`${fid}-err`} className="text-sm text-danger">{error}</p>
        : hint ? <p id={`${fid}-hint`} className="text-sm text-text-muted">{hint}</p> : null}
    </div>
  );
}
```

Cincin fokus datang dari aturan `:focus-visible` di `globals.css`. Pesan galat sebaiknya diawali ikon agar tidak bergantung pada warna.


---

## Token warna

| Token | Gelap | Terang | Pemakaian |
|---|---|---|---|
| ink | #1e1a3c | sama | Warna dasar merek: latar kartu, teks di atas cyan, warna judul pada blok terang. Teks platinum di atasnya kontras tinggi. |
| ink-deep | #14122e | sama | Latar terdalam: body halaman render, scrim, vignette, panel semi-transparan (lihat panel-78). Bukan untuk teks. |
| cyan | #59c3c3 | sama | Strong Cyan. Warna aksen utama: kata kunci Spectral Italic, chip nomor, titik label 3D, garis dan cincin peta, stempel. Teks cyan hanya di atas ink atau ink-deep. |
| grape | #52489c | sama | Dusty Grape. Warna merek sekunder: tint langit/scene, blok besar, ilustrasi. Jangan dipakai sebagai teks atau garis tipis di atas ink (kontras rendah). |
| platinum | #ebebeb | sama | Teks utama (subtitle, label, judul) di atas ink, ink-deep dan scene gelap. |
| ash | #cad2c5 | sama | Ash Grey. Teks sekunder: sub-judul chip, tagline, baris pendukung judul thumbnail. |
| teal | #84a98c | sama | Muted Teal. Warna pendukung scene dan ilustrasi (vegetasi, area hijau). Bukan warna teks. |
| accent | #f2c96b | sama | Aksen hangat, dipakai HEMAT: satu sorotan per video (cahaya jendela, satu angka). Tidak untuk teks panjang. |
| panel-78 | #14122ec7 | sama | Panel di belakang chip lapis dan kartu kecil (ink-deep 78%). Teks platinum di atasnya. |
| panel-72 | #14122eb8 | sama | Panel label 3D dan kartu angka (ink-deep 72%). |
| scrim-bottom | #14122ecc | sama | Ujung gradien scrim di belakang subtitle bawah (ink-deep 80%). |
| cyan-halo | #59c3c34d | sama | Lingkar tipis (30%) di sekitar titik label 3D. |
| bg | #14122e | #f6f6fa | UI: latar halaman. Dark = ink-deep. |
| surface | #1e1a3c | #ffffff | UI: kartu, panel, input. Dark = ink. |
| surface-2 | #2a2552 | #eceaf5 | UI: permukaan bertingkat (hover baris, panel di dalam kartu, kode). |
| border | #3a3470 | #d9d6e8 | UI: garis pemisah, border input dan kartu. Dark pakai border, bukan bayangan. |
| border-strong | #7a73b8 | #7a759c | UI: border input, checkbox, dan kontrol (kontras 3:1 ke latar). Border biasa (border) hanya dekoratif. |
| text | {platinum} | {ink} | UI: teks utama di atas bg dan surface. |
| text-muted | {ash} | #5b5680 | UI: teks sekunder, label, bantuan di bawah input. |
| primary | {cyan} | {cyan} | UI: latar tombol utama dan elemen aktif. Teks di atasnya selalu primary-text (ink). |
| primary-hover | #7fd4d4 | #47b0b0 | UI: hover/pressed tombol utama. |
| primary-text | {ink} | {ink} | UI: teks dan ikon di atas primary. |
| link | {cyan} | #1b6f6f | UI: teks tautan dan aksen teks. Di tema terang cyan terlalu pucat sebagai teks, pakai nilai ini. |
| secondary | {grape} | {grape} | UI: latar tombol sekunder dan badge. Teks di atasnya secondary-text. |
| secondary-text | {platinum} | #ffffff | UI: teks di atas secondary. |
| focus | {cyan} | #1b6f6f | UI: cincin fokus 2px dengan offset 2px; wajib terlihat di semua kontrol. |
| success | {teal} | #2f6b4a | UI: status berhasil (usulan, bukan dari merek). Selalu disertai ikon atau teks. |
| warning | {accent} | #8a5d00 | UI: peringatan (usulan, kuning dari merek). |
| danger | #f28b82 | #b3261e | UI: galat dan aksi merusak (usulan, merek tidak punya merah). Selalu disertai ikon atau teks. |