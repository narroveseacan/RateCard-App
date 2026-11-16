# Input

Kolom isian dengan label terlihat, bantuan, dan pesan galat. Tinggi 44px, border `border-strong` (kontras 3:1), radius 12px, teks 16px agar tidak diperbesar otomatis di iOS.

- Label selalu tampil di atas input; placeholder hanya contoh.
- Galat: `aria-invalid`, border `danger`, dan teks yang menjelaskan cara memperbaiki. Jangan hanya mengandalkan warna.
- Hint dan galat dihubungkan lewat `aria-describedby`.
