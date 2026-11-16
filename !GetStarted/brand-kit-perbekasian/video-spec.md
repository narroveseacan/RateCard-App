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
