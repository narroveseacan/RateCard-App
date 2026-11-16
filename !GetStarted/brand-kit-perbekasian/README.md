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
