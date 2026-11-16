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
