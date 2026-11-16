# Framework Pembuatan Video Akun "Perbekasian"

Versi 3. Dibuat dari proses episode 1 sampai 4 plus standar format baru (terang, infografis, kartu) di bagian 2A. **Bagian 2A menggantikan semua pengaturan tata letak sebelumnya (latar gelap, logo tengah atas, ruang subtitle kosong).**

## CARA PAKAI (untuk pemilik akun)

Lampirkan 3 hal ke chat baru, lalu ketik **Mulai**:
1. File framework ini (.md)
2. Naskah fix (teks yang sama persis dengan yang dibacakan di VO)
3. File VO (.mp3)

Claude akan mengerjakan semuanya tanpa bertanya, kecuali ada hal yang benar-benar tidak bisa diputuskan sendiri.

---

## INSTRUKSI UNTUK CLAUDE (WAJIB DIIKUTI)

Pemicu "Mulai" dengan lampiran di atas = perintah membuat video penuh. Jangan menawarkan rencana atau meminta konfirmasi. Mulai dengan satu kalimat pembuka, buat daftar tugas (TaskCreate), lalu kerjakan.

### 1. Hasil akhir yang harus dikirim (SendUserFile)
- `perbekasian_epN.mp4`: 1080x1920 (9:16), **60 fps**, H.264, durasi sama dengan VO. Berisi **suara VO (narasi) tanpa musik latar**, subtitle karaoke yang sudah menyatu, kartu judul, kartu ilustrasi, progress bar, dan logo Perbekasian (semua di bagian 2A).
- `sfx.wav`: SFX terpisah (supaya bisa diatur ulang di aplikasi edit video).
- Logo yang dipakai hanya logo Perbekasian (Lampiran B, `logo.b64`). Tidak ada logo perusahaan/pemerintah/merek lain.
- Setelah selesai: ringkasan singkat (2-3 kalimat) plus daftar hal yang perlu dicek pemilik (timing per kata hanya perkiraan, data yang tahunnya berbeda, dan sebagainya). Jangan mengulang langkah kerja.

### 2. Aturan visual (keras)
- Gaya: animasi 2D vektor dengan **garis tepi tegas di setiap objek** (warna garis `#1E1A3C`). Pendekatan utama: ilustrasi isometrik detail (blok kota, bangunan berjendela, pohon, sungai, peta) dan piktogram modern. **Jangan seperti gambar anak-anak**: tanpa wajah senyum bulat, tanpa bentuk terlalu sederhana. Beri detail (jendela, bayangan sisi, highlight, tekstur ubin).
- **Ramai di setiap adegan**: latar berlapis, awan/burung/kilau bergerak, elemen utama, label, dan angka. Jangan ada layar polos.
- Palet branding (wajib): Strong Cyan `#59C3C3`, Dusty Grape `#52489C`, Platinum `#EBEBEB`, Ash Grey `#CAD2C5`, Muted Teal `#84A98C`. Turunan yang diperbolehkan: gelap/terang dari warna itu (`#2F2866`, `#3E3580`, `#A9E3E3`, `#5F8468`, `#B5CDB9`) dan satu aksen hangat `#F2C96B` (dipakai hemat untuk sorotan). Warna lain hanya bila tetap selaras.
- Font semua tulisan: **Plus Jakarta Sans** (paket npm `@fontsource/plus-jakarta-sans`, bobot 700 dan 800).
- **Setiap data wajib punya sumber** dalam tulisan kecil (28 px) tepat di atas zona subtitle (y = -492 dan -526, lihat 2A). Teks sumber tidak boleh lebih lebar dari layar: pecah jadi dua baris.
- Teks di layar singkat (label, angka, kata kunci), bukan salinan narasi. Tidak ada subtitle.
- Tidak ada logo perusahaan/pemerintah/merek lain selain logo Perbekasian.
- Tata letak mengikuti bagian 2A (zona logo, zona konten, zona subtitle).
- Setiap adegan: elemen muncul (pop/drop) tepat saat kata terkait diucapkan; transisi antar adegan berupa gelombang warna (cyan dan grape).

### 2A. STANDAR VIDEO v3 (berlaku untuk semua video berikutnya; menggantikan pengaturan Episode 4)
Standar ini ditetapkan pemilik akun berdasarkan video referensi (video edukasi "apa yang terjadi kalau berhenti mandi"). **Pakai tanpa diminta lagi.**
1. **Konten**: naskah dan topik mengikuti yang sudah dibahas bersama; berubah hanya bila pemilik meminta penyegaran atau pembaruan pembahasan. Naskah fix dianggap final.
2. **Durasi**: sesuai VO / permintaan pemilik.
3. **Format**: 1080x1920 (9:16), **60 fps**.
4. **Audio**: seperti video referensi, yaitu **narasi VO yang dimasukkan ke video**, dinormalkan sekitar -14 LUFS, **tanpa musik latar**. Efek suara tidak dipakai kecuali diminta.
5. **Warna**: palet branding Perbekasian. **Latar `#EBEBEB`** (Platinum). Garis tepi hitam-ungu `#1E1A3C`, teks utama `#1E1A3C`. Aksen utama (pengganti merah di referensi): Dusty Grape `#52489C` untuk penekanan/bahaya; Strong Cyan `#59C3C3` untuk sorotan positif/penanda; aksen hangat `#F2C96B` hemat. Isi ilustrasi memakai Ash Grey `#CAD2C5`, Muted Teal `#84A98C`, dan turunan terang/gelap palet. Font: Plus Jakarta Sans.
6. **Ilustrasi**: seperti referensi. Garis tepi hitam tegas, dua jenis gambar: (a) balok/objek **isometrik 3D** untuk gambaran besar, (b) **penampang samping 2D** untuk bagian dalam/proses, plus ikon sederhana (ikon, kaca pembesar, perisai, stopwatch, dan sejenisnya). **Label** berupa kotak kecil bersudut bulat dengan garis penunjuk bertitik, muncul satu per satu tepat saat kata terkait diucapkan. Anggapan yang salah dicoret, penekanan bahaya memakai garis/judul Dusty Grape. Latar kartu ilustrasi: putih krem lembut dengan titik-titik halus. Tetap ramai tapi rapi, bukan polos.
7. **Header**: **tanpa chip merah dan tanpa penghitung scene.** Posisi chip diganti **logo Perbekasian** (versi untuk latar terang: `logo_light.png`), rata kiri sejajar tepi kartu, lebar sekitar 430 px (tinggi proporsional sekitar 70 px, rasio asli logo), pusat vertikal di y = 285 px dari atas. Garis pemisah tipis hitam di bawahnya, selebar kartu.
8. **Kartu** (sudut membulat, garis tepi hitam 4 px, bayangan keras di sisi bawah-kanan): (a) **kartu judul adegan** (judul tebal huruf besar + subjudul kecil huruf besar; judul berubah ke gaya penekanan Dusty Grape dengan bilah di kiri saat adegan masuk bagian "bahaya/kejutan"), (b) **kartu ilustrasi besar** (utama), (c) **kartu subtitle**.
9. **Footer**: **progress bar** (isi Dusty Grape), **bar suara animasi** (mengikuti volume VO), dan **timecode** "00:20 / 01:09" (waktu berjalan / total). Tanpa nama akun di footer (logo sudah di header).
10. **Subtitle dan animasi** seperti referensi: subtitle **dibakar ke kartu subtitle** dengan gaya karaoke (kata yang sedang diucapkan diberi sorotan abu-abu muda, kata kunci diwarnai Dusty Grape, tebal, dan digarisbawahi; maksimal 2 baris, huruf 40-44 px). Kartu judul, label, dan elemen ilustrasi muncul tepat saat kata terkait; transisi adegan berupa pergantian kartu (judul dan ilustrasi diganti, kartu subtitle dan footer tetap).
- **Tata letak (1080x1920, koordinat dari tepi atas kiri; skala 1,5x dari referensi 720x1280)**: margin kiri-kanan 87 px. Header (logo + garis) y 255-325; kartu judul y 337-443; kartu ilustrasi y 453-1245; kartu subtitle y 1260-1478; footer y 1531 (tengah). Seluruh blok konten berada di y 255-1560. **Bagian atas (0-255) dan bawah (1560-1920) dibiarkan kosong** agar aman dari tampilan antarmuka TikTok/Reels.
- **Sumber data**: tetap wajib untuk setiap data. Tulis kecil (sekitar 26 px, warna abu tua) di dalam kartu ilustrasi, tepi bawah rata kiri, maksimal dua baris.
- **Subtitle karaoke**: timing per kata diperkirakan proporsional terhadap panjang huruf di dalam tiap kalimat, dibatasi oleh `s`/`e` kalimat dari analisis jeda VO (gunakan ASR bila tersedia di sesi dan terbukti akurat). Kalimat yang lebih dari 2 baris dipecah jadi beberapa layar teks.
- **Logo**: file `logo_light.png` (hasil ekstrak `logo_light.b64`, Lampiran B) harus diletakkan di atas semua elemen. `logo.png` (versi putih) hanya untuk latar gelap.
- Engine render (three.js + Chromium + ffmpeg, 60 fps) tetap dipakai; kartu, label, progress bar, dan subtitle digambar sebagai sprite kanvas. Setelah template kartu ini dibangun pertama kali, simpan kodenya ke Lampiran supaya video berikutnya tinggal memakainya.

### 3. Aturan audio
- Audio video = **VO dari pemilik**, dimasukkan ke video (`-c:a aac -b:a 192k`), dinormalkan sekitar -14 LUFS (`loudnorm=I=-14:TP=-1.5:LRA=7`). **Tanpa musik latar.** Tanpa SFX kecuali diminta (generator `sfx.py` di Lampiran B tetap tersedia untuk video lama).
- Bar suara animasi di footer mengikuti volume VO (hitung level per frame dari VO, misalnya dengan `ffmpeg astats`/numpy, simpan ke `cues.json`).
- Semua animasi dijadwalkan dari `cues.json` (sumber waktu yang sama).

### 4. Alur kerja
1. **Pecah naskah** jadi kalimat, lalu jadi 5-8 adegan (satu adegan = 1-3 kalimat). Bila pemilik menyebut naskah berubah dari versi sebelumnya, bandingkan dan ubah adegan yang terdampak (teks layar juga).
2. **Analisis audio**: `ffprobe` untuk durasi, `ffmpeg silencedetect=noise=-32dB:d=0.09` untuk daftar jeda. **Petakan jeda ke kalimat secara manual**: jeda akhir kalimat biasanya 0,4-0,6 detik, jeda koma 0,1-0,3 detik. Pemetaan otomatis pernah salah, jadi cek urutan dan panjang kalimat dulu. Hasilnya `cues.json` (`d`, `B` batas adegan di tengah jeda, `s`/`e` awal/akhir tiap kalimat, `t` cue bernama).
3. **Siapkan proyek** (lihat Lampiran A), ekstrak engine (Lampiran B), tulis file adegan baru (`scenes*.js`) memakai pola di Lampiran C.
4. **Tes**: render 12-16 frame kunci (`node render.js test t1,t2,...`), jadikan satu contact sheet (`ffmpeg ... tile`), lihat satu kali saja, perbaiki.
5. **Render penuh 60 fps** dalam 2 proses paralel di latar belakang (`FPS=60 nohup node render.js run f0 f1 pN.mp4`), tiap proses setengah frame, cek dengan `sleep` (maks 590 detik per panggilan). Perkiraan 12-16 menit untuk video sekitar 45 detik. Tentukan jumlah frame total = ceil(durasi x 60).
6. Gabung: `ffmpeg -f concat -c copy`, lalu mux VO (`-c:v copy -c:a aac -b:a 192k -t <durasi VO>`, video dan audio sama panjang).
7. Cek akhir singkat (ffprobe, satu contact sheet), lalu kirim file.
8. Perbaikan satu adegan: render ulang hanya rentang frame adegan itu (+/- 10 frame untuk transisi), potong bagian lama dengan re-encode `-crf 16`, sambung dengan concat.

### 5. Hemat token (wajib)
- Jangan membaca ulang file yang baru ditulis. Jangan menampilkan gambar lebih dari satu contact sheet per putaran.
- Tulis kode dalam file kecil bertahap (satu file per panggilan) agar tidak melebihi batas keluaran.
- Pakai engine di Lampiran B apa adanya; hanya tulis file adegan baru.
- Jangan riset ulang fakta yang sudah ada di naskah; naskah fix dianggap final. Fakta yang tidak ada sumbernya di naskah: tulis sumber sesuai naskah, jangan menebak.
- Laporan ke pemilik singkat; tanpa rekap langkah.

### 6. Jebakan teknis (sudah pernah terjadi)
- Modul ES harus dilayani lewat HTTP server (`render.js` sudah melakukannya), bukan `file://`.
- Tunggu font siap sebelum menggambar kanvas: `document.fonts.load(...)` sebelum membuat scene (sudah ada di `main.js`).
- `mix()` di `iso.js` hanya menerima hex 6 digit (`#000000`, bukan `#000`).
- Setiap `makeBlock` harus ditambahkan ke group scene (`g.add(grp)`; sudah di `iso.js`).
- `txt()` otomatis menyesuaikan tinggi kanvas untuk teks beberapa baris; teks panjang harus diperiksa lebarnya (maks 1040 px).
- `silencedetect` menghasilkan banyak jeda koma; jangan percaya pemetaan otomatis.
- Playwright global: jalankan dengan `NODE_PATH=$(npm root -g)`.
- Frame dirender dengan SwiftShader (CPU): sekitar 0,5-1 detik per frame. Jangan membuat scene dengan ratusan sprite berukuran layar penuh.
- Objek dengan `z` di luar -500 sampai +1500 terpotong oleh kamera ortografik (logo pernah tidak muncul karena `z` 5000): pakai `renderOrder` untuk urutan, bukan `z` besar.
- Gambar eksternal (logo) harus dimuat lewat HTTP server `render.js`; tipe `.png` sudah didaftarkan.
- Satu file kanvas besar (blok isometrik) dibagi jadi lapisan agar bisa muncul bertahap (`blockIn`).

### 7. Informasi akun
- Nama akun: **Perbekasian** (konten fakta unik Bekasi untuk TikTok dan Instagram).
- Gaya bahasa narasi: santai, kekinian, tidak kaku; penutup berupa pertanyaan halus (bukan ajakan komen/follow).
- Logo (sudah terpasang di video, bagian 2A): wordmark huruf kecil "perbekasian" dengan huruf "b" berbentuk bulan sabit (font Baloo 2 ExtraBold).
- Tagline yang dipertimbangkan: "Bekasi, ngapa? Banyak ceritanya." / "Dari sungai, jadi cerita Bekasi."

---

## LAMPIRAN A: SIAP PAKAI PROYEK

```bash
mkdir -p /home/claude/pv && cd /home/claude/pv
npm i three @fontsource/plus-jakarta-sans --silent
# Ekstrak semua file di Lampiran B dan C ke folder ini (satu perintah):
python3 - <<'PY'
import re,glob,base64
md=open(glob.glob('/mnt/user-data/uploads/*framework*.md')[0]).read()
for name,code in re.findall(r'<!-- FILE: (\S+) -->\n```\w*\n(.*?)\n```',md,re.S):
    if name.endswith('.b64'):open(name[:-4]+'.png','wb').write(base64.b64decode(code.strip()))
    else:open(name,'w').write(code+'\n')
    print('tulis',name)
PY
```

Setelah ekstrak: jalankan `python3 gaps.py vo.mp3` untuk melihat daftar jeda, lalu tulis `cues.py` (pemetaan manual `S`/`E`/`B` dan nama cue `N`) dan `sfx.py` sesuai naskah baru (Lampiran B memuat contoh dari Episode 4). Tulis `scenesN.js` baru (contoh: `scenes4.js` di Lampiran C; `common.js` berisi bar, skyline, dan helper umum) lalu ubah baris import dan daftar adegan di `main.js`. Salin VO sebagai `vo.mp3`.

Render: `NODE_PATH=$(npm root -g) node render.js run <frame_awal> <frame_akhir> out.mp4` (test: `node render.js test 1.5,4.8,...`).

---

---

## LAMPIRAN B: ENGINE (pakai apa adanya)

### core.js
<!-- FILE: core.js -->
```js
import * as THREE from 'three';
export {THREE};
export const W=1080,H=1920,INK='#1E1A3C',FONT='"Plus Jakarta Sans", sans-serif';
export const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
export const ease=x=>1-(1-clamp(x))**3;
export const back=x=>{x=clamp(x);const c=1.9;return 1+(c+1)*(x-1)**3+c*(x-1)**2};
export const lerp=(a,b,t)=>a+(b-a)*t;
let sd=11;export const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;
export const mkK=Q=>(i,f=0)=>Q.s[i-1]+f*(Q.e[i-1]-Q.s[i-1]);
export const ink=(c,lw=9)=>{c.lineWidth=lw;c.strokeStyle=INK;c.lineJoin=c.lineCap='round'};
export const fs=(c,f,lw=9)=>{c.fillStyle=f;c.fill();ink(c,lw);c.stroke()};
export const blob=(c,fn,f,lw=9)=>{c.beginPath();fn();ink(c,lw*2);c.stroke();c.fillStyle=f;c.fill()};
export const ar=(c,x,y,r)=>{c.moveTo(x+r,y);c.arc(x,y,r,0,7)};
export const line=(c,col,lw)=>{c.lineCap=c.lineJoin='round';c.lineWidth=lw+14;c.strokeStyle=INK;c.stroke();c.lineWidth=lw;c.strokeStyle=col;c.stroke()};
const mat=o=>new THREE.MeshBasicMaterial({transparent:true,depthTest:false,depthWrite:false,...o});
export function S(w,h,draw,x=0,y=0,z=0,g){
  const cv=document.createElement('canvas');cv.width=Math.ceil(w);cv.height=Math.ceil(h);
  const c=cv.getContext('2d');draw(c,cv.width,cv.height);
  const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(cv.width,cv.height),mat({map:t}));
  m.position.set(x,y,z);m.renderOrder=z;m.userData={cv,c,t};if(g)g.add(m);return m}
export const rect=(g,col,y,h,z,x=0,w=W)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat({color:col}));m.position.set(x,y,z);m.renderOrder=z;g.add(m);return m};
export const anc=m=>{m.geometry.translate(0,m.geometry.parameters.height/2,0);return m};
export function txt(g,str,size,fill,x,y,z,w=1000,lw=12,wt=800){
  const m=S(w,size*1.5*Math.max(1,str.split('\n').length),()=>{},x,y,z,g),{cv,c,t}=m.userData;let cur=null;
  m.set=s=>{if(s===cur)return;cur=s;c.clearRect(0,0,cv.width,cv.height);c.font=`${wt} ${size}px ${FONT}`;c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';
    const L=s.split('\n');L.forEach((l,i)=>{const yy=cv.height/2+(i-(L.length-1)/2)*size*1.1;c.lineWidth=lw*2;c.strokeStyle=INK;c.strokeText(l,w/2,yy);c.fillStyle=fill;c.fillText(l,w/2,yy)});t.needsUpdate=true};
  m.set(str);return m}
export function tag(g,s,size,fill,tc,x,y,z,w,h){
  return S(w,h,c=>{c.beginPath();c.roundRect(10,10,w-20,h-20,h/3);fs(c,fill,9);c.font=`800 ${size}px ${FONT}`;c.textAlign='center';c.textBaseline='middle';c.fillStyle=tc;
    const L=s.split('\n');L.forEach((l,i)=>c.fillText(l,w/2,h/2+(i-(L.length-1)/2)*size*1.15))},x,y,z,g)}
export const pop=(m,T,t0,d=.45)=>{m.scale.setScalar(Math.max(back((T-t0)/d),1e-4))};
export const grow=(m,T,t0,d=.5)=>{m.scale.set(1,Math.max(back((T-t0)/d),1e-4),1)};
export const fade=(m,T,t0,d=.3)=>{m.material.opacity=ease((T-t0)/d)};
```

### iso.js
<!-- FILE: iso.js -->
```js
import {THREE,S,ink,INK,rnd} from './core.js';
export const C={grape:'#52489C',cyan:'#59C3C3',plat:'#EBEBEB',ash:'#CAD2C5',teal:'#84A98C',dg:'#2F2866',mg:'#3E3580',lc:'#A9E3E3',dt:'#5F8468',lt:'#B5CDB9',warm:'#F2C96B'};
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
export const mix=(a,b,t)=>{const x=hx(a),y=hx(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('')};
export const cs=b=>({t:mix(b,'#ffffff',.25),l:b,r:mix(b,'#1E1A3C',.3)});
export const poly=(c,p,f,lw)=>{c.beginPath();p.forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));c.closePath();if(f){c.fillStyle=f;c.fill()}if(lw){ink(c,lw);c.stroke()}};
const fp=(a,b,d,u,v)=>[a[0]+(b[0]-a[0])*u+(d[0]-a[0])*v,a[1]+(b[1]-a[1])*u+(d[1]-a[1])*v];
function wins(c,a,b,d,cols,rows,lit,dark){for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const u0=(i+.2)/cols,u1=(i+.8)/cols,v0=(j+.25)/rows,v1=(j+.7)/rows;poly(c,[fp(a,b,d,u0,v0),fp(a,b,d,u1,v0),fp(a,b,d,u1,v1),fp(a,b,d,u0,v1)],rnd()<.45?lit:dark,1.5)}}
export function box(c,P,gx,gy,w,d,h,col,o={}){
  const lw=o.lw||3,A=P(gx,gy,h),B=P(gx+w,gy,h),E=P(gx+w,gy+d,h),D=P(gx,gy+d,h),a0=P(gx,gy+d,0),b0=P(gx+w,gy+d,0),c0=P(gx+w,gy,0);
  poly(c,[a0,b0,E,D],col.l,lw);poly(c,[b0,c0,B,E],col.r,lw);poly(c,[A,B,E,D],col.t,lw);
  if(o.win){const n=Math.max(1,Math.round(h/(o.fh||24)));wins(c,a0,b0,D,Math.max(1,Math.round(w*1.7)),n,C.warm,mix(col.l,'#1E1A3C',.5));wins(c,b0,c0,E,Math.max(1,Math.round(d*1.7)),n,C.warm,mix(col.r,'#1E1A3C',.45))}
  if(o.roof){const Q=(a,b,z)=>P(a,b,z+h);box(c,Q,gx+w*.15,gy+d*.15,w*.3,d*.3,h*.1+4,cs(C.ash),{lw:2});box(c,Q,gx+w*.55,gy+d*.5,w*.25,d*.25,h*.07+3,cs(C.plat),{lw:2})}
}
export function tree(c,P,gx,gy,s=1,col=C.teal){
  const [x,y]=P(gx,gy,0),arcs=[[0,-32,15],[-10,-24,11],[10,-24,11]];
  c.beginPath();c.ellipse(x,y+2*s,15*s,6*s,0,0,7);c.fillStyle='rgba(30,26,60,.25)';c.fill();
  c.beginPath();c.roundRect(x-3*s,y-20*s,6*s,22*s,2);c.fillStyle='#7a5b45';c.fill();ink(c,2);c.stroke();
  arcs.forEach(([a,b,r])=>{c.beginPath();c.arc(x+a*s,y+b*s,r*s,0,7);ink(c,5.5*s);c.stroke()});
  arcs.forEach(([a,b,r])=>{c.beginPath();c.arc(x+a*s,y+b*s,r*s,0,7);c.fillStyle=col;c.fill()});
  c.beginPath();c.arc(x-4*s,y-36*s,6*s,0,7);c.fillStyle=mix(col,'#ffffff',.35);c.fill()}
const near=(pts,x,y,r)=>pts.some(([a,b])=>Math.hypot(a-x,b-y)<r);
function riverPts(){const p=[[0,1.5],[3,2.4],[5.5,3.2],[8,4.6],[10,5.4],[12,6.2]],o=[];for(let i=0;i<p.length-1;i++)for(let t=0;t<1;t+=.1)o.push([p[i][0]+(p[i+1][0]-p[i][0])*t,p[i][1]+(p[i+1][1]-p[i][1])*t]);return o}
export const RIVER=riverPts();
export function makeBlock(g,kind,k,opt={}){
  const n=kind=='city'?4:12,m=kind=='city'?4:8,hs=k/50,t=26*hs,maxH=230*hs,w=Math.ceil((n+m)*k+120),h=Math.ceil((n+m)*k/2+maxH+t+90),ox=m*k+60,oy=maxH+40;
  const P=(a,b,z=0)=>[ox+(a-b)*k,oy+(a+b)*k/2-z*hs],fx=ox+(n-m)*k/2,fy=oy+(n+m)*k/4;
  const specs=[],chim=[],pal=[C.plat,C.ash,C.lc,C.mg,C.cyan,'#8D86C9'];
  if(kind=='city'){for(let qx=0;qx<2;qx++)for(let qy=0;qy<2;qy++)for(let ix=0;ix<2;ix++)for(let iy=0;iy<2;iy++){const b=pal[Math.floor(rnd()*pal.length)];specs.push({k:'b',x:qx*2.1+.2+ix*.85,y:qy*2.1+.2+iy*.85,w:.6,d:.6,h:30+rnd()*100,c:cs(b),win:1,roof:rnd()<.5})}
    [[1.9,.1],[.1,1.9],[3.9,2.2],[2.2,3.9],[1.95,1.95]].forEach(([x,y])=>specs.push({k:'t',x,y,s:.9}))}
  else{for(let zx=0;zx<3;zx++)for(let zy=0;zy<2;zy++){const bx=zx*4,by=zy*4,type=[['farm','fac','vil'],['farm','fac','coast']][zy][zx];
    const ok=(x,y)=>!near(RIVER,x,y,1.1);
    if(type=='fac'){[[.5,.5],[.5,2.2],[2,1.2]].forEach(([a,b])=>{const x=bx+a,y=by+b;if(ok(x+1,y+.4))specs.push({k:'f',x,y,w:1.7,d:.8,h:38,c:cs(C.plat)});});[[bx+3.3,by+.4],[bx+3.4,by+3.3]].forEach(([x,y])=>{if(ok(x,y)){specs.push({k:'b',x,y,w:.22,d:.22,h:115,c:cs(C.ash)});chim.push([x+.11,y+.11,115])}})}
    if(type=='vil')for(let i=0;i<9;i++){const x=bx+.4+(i%3)*1.2,y=by+.4+Math.floor(i/3)*1.2;if(ok(x,y))specs.push({k:'b',x,y,w:.55,d:.55,h:20+rnd()*14,c:cs(i%2?C.plat:C.lc),win:1,roof:1})}
    if(type=='farm'){specs.push({k:'b',x:bx+1.2,y:by+1.6,w:.6,d:.6,h:26,c:cs(C.lc),win:1});[[bx+.5,by+.5],[bx+3.4,by+3.3],[bx+3.2,by+.5]].forEach(([x,y])=>{if(ok(x,y))specs.push({k:'t',x,y,s:.8})})}
    if(type=='coast')for(let i=0;i<9;i++){const x=bx+.5+(i%3)*1.3,y=by+.6+Math.floor(i/3)*1.3;specs.push({k:'t',x,y,s:.7,col:C.dt})}}}
  specs.sort((a,b)=>(a.x+a.y+(a.w||0)/1)-(b.x+b.y+(b.w||0)/1));
  const L=4,per=Math.ceil(specs.length/L),grp=new THREE.Group(),off=[w/2-fx,-(h/2-fy)];
  const add=(draw,z)=>{const m=S(w,h,c=>draw(c,P),off[0],off[1],z+(opt.z||0),grp);return m};
  const tile=(i,j)=>{if(kind=='city')return (i+j)%2?mix(C.ash,'#fff',.35):C.ash;const zx=Math.floor(i/4),zy=Math.floor(j/4),ty=[['farm','fac','vil'],['farm','fac','coast']][zy][zx];
    if(ty=='coast')return (i+j)%2?C.cyan:mix(C.cyan,'#fff',.25);if(ty=='farm')return i%2?'#9DBFA3':'#86AC8E';if(ty=='fac')return (i+j)%2?mix(C.ash,'#fff',.3):C.ash;return (i+j)%2?C.lt:mix(C.lt,'#fff',.3)};
  const slabM=add((c,P)=>{
    poly(c,[P(0,m),P(n,m),P(n,m,-t/hs),P(0,m,-t/hs)],kind=='city'?C.mg:C.dt,4);poly(c,[P(n,0),P(n,m),P(n,m,-t/hs),P(n,0,-t/hs)],mix(kind=='city'?C.mg:C.dt,'#1E1A3C',.3),4);
    for(let i=0;i<n;i++)for(let j=0;j<m;j++)poly(c,[P(i,j),P(i+1,j),P(i+1,j+1),P(i,j+1)],tile(i,j),0);
    if(kind=='city'){[[2,0,2,4],[0,2,4,2]].forEach(([a,b,cx,d])=>{const x0=a?a-.14:0,x1=a?a+.14:4,y0=b?b-.14:0,y1=b?b+.14:4;poly(c,[P(x0,y0),P(x1,y0),P(x1,y1),P(x0,y1)],mix(C.mg,'#1E1A3C',.2),0);c.strokeStyle=C.plat;c.lineWidth=2;c.setLineDash([10,10]);c.beginPath();const A=a?P(a,0):P(0,b),Bq=a?P(a,4):P(4,b);c.moveTo(...A);c.lineTo(...Bq);c.stroke();c.setLineDash([])})}
    else{const L1=[],R1=[];RIVER.forEach(([x,y],i)=>{L1.push(P(x,y-.45));R1.push(P(x,y+.45))});poly(c,[...L1,...R1.reverse()],C.cyan,3);c.strokeStyle=C.lc;c.lineWidth=3;c.setLineDash([14,12]);c.beginPath();RIVER.forEach(([x,y],i)=>{const q=P(x,y);i?c.lineTo(...q):c.moveTo(...q)});c.stroke();c.setLineDash([])}
    poly(c,[P(0,0),P(n,0),P(n,m),P(0,m)],null,4)},-2);
  const layers=[];for(let l=0;l<L;l++){const part=specs.slice(l*per,(l+1)*per);layers.push(add((c,P)=>part.forEach(s=>{if(s.k=='t')tree(c,P,s.x,s.y,s.s*hs,s.col||C.teal);else if(s.k=='f'){box(c,P,s.x,s.y,s.w,s.d,s.h,s.c,{win:1,fh:20});[0,1,2].forEach(i=>box(c,(a,b,z)=>P(a,b,z+s.h),s.x+.1+i*.52,s.y+.1,.4,s.d-.2,10,cs(C.lc),{lw:2}))}else box(c,P,s.x,s.y,s.w,s.d,s.h,s.c,{win:s.win,roof:s.roof})}),l))}
  grp.userData={slab:slabM,layers,P,n,m,k,hs,w,h,off,fx,fy,chim:chim.map(([x,y,z])=>{const q=P(x,y,z);return [q[0]-fx,-(q[1]-fy)]}),add,rel:(a,b,z=0)=>{const q=P(a,b,z);return [q[0]-fx,-(q[1]-fy)]}};
  g.add(grp);return grp}
```

### deco.js
<!-- FILE: deco.js -->
```js
import {THREE,W,H,INK,S,rect,txt,tag,ink,fs,lerp,clamp,rnd,back,ease} from './core.js';
import {C,mix,poly} from './iso.js';
export function bg(g,v=0){
  rect(g,[C.dg,'#2B2563','#2F2866','#332B70','#2B2563','#2F2866','#332B70'][v],0,H,-90);rect(g,C.mg,-420,1100,-89);rect(g,mix(C.mg,C.grape,.5),-760,480,-88);
  return S(W,H,c=>{c.strokeStyle='rgba(235,235,235,.07)';c.lineWidth=2;for(let i=-30;i<30;i++){c.beginPath();c.moveTo(i*100-200,0);c.lineTo(i*100+1100,1300);c.stroke();c.beginPath();c.moveTo(i*100+1300,0);c.lineTo(i*100-100,1300);c.stroke()}},0,300,-85,g)}
export const cloud=(g,w,x,y,z)=>{const u=w/10;return S(w+40,u*5+40,(c,cw,ch)=>{c.translate(20,ch-20);const ar=(a,b,r)=>{c.moveTo(a+r,b);c.arc(a,b,r,0,7)};
  c.beginPath();ar(2.2*u,-1.6*u,1.6*u);ar(4.8*u,-2.4*u,2.1*u);ar(7.5*u,-1.6*u,1.7*u);c.roundRect(0,-1.7*u,10*u,1.7*u,.85*u);ink(c,10);c.stroke();c.fillStyle=C.plat;c.fill();
  c.save();c.clip();c.fillStyle=C.ash;c.fillRect(0,-1.2*u,10*u,1.3*u);c.restore()},x,y,z,g)};
export const gull=(g,w,x,y,z)=>S(w,w*.5,c=>{c.beginPath();c.moveTo(8,w*.32);c.quadraticCurveTo(w*.25,0,w*.5,w*.3);c.quadraticCurveTo(w*.75,0,w-8,w*.32);c.lineCap='round';c.lineWidth=14;c.strokeStyle=INK;c.stroke();c.lineWidth=7;c.strokeStyle=C.plat;c.stroke()},x,y,z,g);
export const spark=(g,r,col,x,y,z)=>S(r*2+16,r*2+16,(c,w)=>{const m=w/2;c.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2,q=i%2?r*.3:r;c.lineTo(m+Math.cos(a)*q,m+Math.sin(a)*q)}c.closePath();fs(c,col,4)},x,y,z,g);
export const pinS=(g,s,x,y,z)=>{const m=S(120*s,170*s,(c,w,h)=>{c.save();c.scale(s,s);c.beginPath();c.ellipse(60,152,30,9,0,0,7);c.fillStyle='rgba(20,16,50,.35)';c.fill();
  c.beginPath();c.moveTo(60,150);c.bezierCurveTo(10,90,12,20,60,12);c.bezierCurveTo(108,20,110,90,60,150);c.closePath();fs(c,C.cyan,8);c.beginPath();c.arc(60,58,22,0,7);fs(c,C.plat,6);c.restore()},x,y,z,g);m.geometry.translate(0,(170*s)/2-9*s,0);return m};
export const src=(g,s,y=-700,z=50)=>txt(g,s,28,'#E6E6EE',0,y,z,1040,4,700);
export const bubble=(g,x,y,z)=>S(190,170,c=>{c.beginPath();c.ellipse(95,70,80,56,0,0,7);c.moveTo(70,118);c.lineTo(50,155);c.lineTo(100,122);ink(c,12);c.stroke();c.fillStyle=C.plat;c.fill();c.beginPath();c.ellipse(95,70,80,56,0,0,7);c.fill()},x,y,z,g);
export function crowd(g,n,col,z){const mk=cl=>S(30,56,c=>{c.beginPath();c.arc(15,12,8.5,0,7);fs(c,'#EAD2B8',3);c.beginPath();c.roundRect(5,22,20,30,9);fs(c,cl,3)},0,0,z,g);
  const cols=[C.cyan,C.plat,C.ash,'#A9A0E0',C.warm],ms=cols.map(mk);ms.forEach(m=>m.visible=false);const o=[];for(let i=0;i<n;i++){const m=ms[i%5].clone();m.visible=true;g.add(m);o.push(m)}return o}
export function person(g,s,x,y,z){const m=S(260*s,520*s,(c,w,h)=>{c.save();c.scale(s,s);c.beginPath();c.ellipse(130,500,70,13,0,0,7);c.fillStyle='rgba(20,16,50,.35)';c.fill();
  c.beginPath();c.roundRect(80,300,45,190,18);fs(c,C.ash,8);c.beginPath();c.roundRect(135,300,45,190,18);fs(c,mix(C.ash,'#000000',.12),8);
  c.beginPath();c.roundRect(72,495,60,18,8);fs(c,C.plat,6);c.beginPath();c.roundRect(130,495,60,18,8);fs(c,C.plat,6);
  c.beginPath();c.roundRect(65,150,130,190,40);fs(c,C.cyan,8);c.beginPath();c.roundRect(40,165,34,150,17);fs(c,mix(C.cyan,'#000000',.1),7);c.beginPath();c.roundRect(186,165,34,150,17);fs(c,mix(C.cyan,'#000000',.1),7);
  c.beginPath();c.roundRect(112,125,36,40,10);fs(c,'#D9B999',6);c.beginPath();c.arc(130,95,48,0,7);fs(c,'#EAD2B8',8);
  c.beginPath();c.arc(130,80,50,Math.PI*1.02,Math.PI*1.98);c.closePath();fs(c,C.dg,8);c.beginPath();c.arc(112,100,5,0,7);c.fillStyle=INK;c.fill();c.beginPath();c.arc(150,100,5,0,7);c.fill();
  c.beginPath();c.arc(131,118,12,.2*Math.PI,.8*Math.PI);ink(c,4);c.stroke();c.restore()},x,y,z,g);return m}
export const sign=(g,s,col,x,y,z)=>S(520,300,c=>{c.beginPath();c.roundRect(238,100,44,190,8);fs(c,mix(C.ash,'#000000',.2),7);c.beginPath();c.roundRect(10,10,500,130,28);fs(c,col,9);c.beginPath();c.roundRect(24,24,472,102,20);ink(c,3);c.strokeStyle='rgba(255,255,255,.6)';c.stroke();
  c.font=`800 ${s.length>6?50:62}px "Plus Jakarta Sans"`;c.textAlign='center';c.textBaseline='middle';c.fillStyle=INK;c.fillText(s,260,78)},x,y,z,g);
```

### util.js
<!-- FILE: util.js -->
```js
import {clamp,back,ease} from './core.js';
export const dropIn=(m,T,t0,dy=90)=>{if(m.userData.by==null)m.userData.by=m.position.y;m.material.opacity=clamp((T-t0)/.2);m.position.y=m.userData.by+dy*(1-back((T-t0)/.5))};
export const blockIn=(b,T,t0,t1=null,dy=110)=>{const u=b.userData,n=u.layers.length;dropIn(u.slab,T,t0,dy*.6);u.layers.forEach((l,i)=>dropIn(l,T,t1==null?t0+.1+i*.13:t0+(t1-t0)*i/(n-1),dy))};
export const fmt=n=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
export const prog=(T,a,b)=>clamp((T-a)/(b-a));
export const drift=(m,x0,sp,T)=>{m.position.x=((x0+T*sp+900)%1800)-900};
export const fadeIn=(m,T,t0,d=.25)=>{m.material.opacity=clamp((T-t0)/d)};
export const flash=(m,T,t0,hold=.25,rest=.3)=>{const u=T-t0;m.material.opacity=u<0?0:u<hold?1:rest};
```

### main.js (sudah memuat logo dan daftar adegan; ubah baris import)
<!-- FILE: main.js -->
```js
import {THREE,W,H,S,fs,lerp} from './core.js';
import {s1,s2,s3,s4,s5,s6,s7} from './scenes4.js'; // ganti sesuai file adegan baru
await Promise.all([700,800].map(w=>document.fonts.load(`${w} 40px "Plus Jakarta Sans"`)));
const Q=await (await fetch('/cues.json')).json();
const R=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(1);R.setSize(W,H);document.body.appendChild(R.domElement);
const cam=new THREE.OrthographicCamera(-W/2,W/2,H/2,-H/2,-1000,1000);cam.position.z=500;
const sc=new THREE.Scene();
const SC=[s1,s2,s3,s4,s5,s6,s7],N=SC.length;
const gs=SC.map(b=>{const g=new THREE.Group();sc.add(g);return {g,u:b(g,Q)}});
const tr=new THREE.Group();sc.add(tr);
const mk=(col,off)=>S(1800,2300,(c,w,h)=>{c.beginPath();c.moveTo(150,0);for(let y=0;y<=h;y+=20)c.lineTo(w-150+Math.sin(y/90+off)*45,y);c.lineTo(150,h);for(let y=h;y>=0;y-=20)c.lineTo(150+Math.sin(y/90+off+2)*45,y);c.closePath();fs(c,col,12)},0,0,0,tr);
const b1=mk('#59C3C3',0),b2=mk('#52489C',1);b1.renderOrder=998;b2.renderOrder=999;
const LI=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src='/logo.png'});const LW=560,LH=Math.round(LW*LI.naturalHeight/LI.naturalWidth);
const lg=S(LW,LH,(c,w,h)=>c.drawImage(LI,0,0,w,h),0,800,100,sc);lg.renderOrder=5000; // logo tengah atas, selalu paling atas
window.renderFrame=T=>{
  gs.forEach((o,i)=>{const on=T>=Q.B[i]&&(T<Q.B[i+1]||i==N-1);o.g.visible=on;if(on)o.u(T)});
  let show=false;for(let i=1;i<N;i++){const d=T-Q.B[i];if(Math.abs(d)<.32){show=true;const cx=lerp(-1700,1700,(d+.32)/.64);b1.position.x=cx-110;b2.position.x=cx}}
  tr.visible=show;R.render(sc,cam);return true};
window.ready=true;
```

### render.js (FPS default 60)
<!-- FILE: render.js -->
```js
const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const root=__dirname,types={'.js':'text/javascript','.html':'text/html','.json':'application/json','.png':'image/png'};
const srv=http.createServer((q,r)=>{let p=q.url.split('?')[0];if(p=='/')p='/index.html';fs.readFile(path.join(root,p),(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':types[path.extname(p)]||'application/octet-stream'});r.end(d)}})});
(async()=>{
  await new Promise(r=>srv.listen(0,r));
  const [mode,a,b,out]=process.argv.slice(2),FPS=+process.env.FPS||60;
  const br=await chromium.launch(),pg=await br.newPage({viewport:{width:1080,height:1920}});
  pg.on('pageerror',e=>console.log('PAGEERR',e.message));pg.on('console',m=>m.type()=='error'&&console.log('CONSOLE',m.text()));
  await pg.goto('http://localhost:'+srv.address().port+'/');await pg.waitForFunction('window.ready',null,{timeout:15000});
  const shot=async T=>{await pg.evaluate(t=>window.renderFrame(t),T);return pg.screenshot({type:'jpeg',quality:92})};
  if(mode=='test'){const ts=a.split(',').map(Number);let t0=Date.now();for(let i=0;i<ts.length;i++)fs.writeFileSync(`/tmp/f${i}.jpg`,await shot(ts[i]));console.log('ms/frame',(Date.now()-t0)/ts.length)}
  else{const f0=+a,f1=+b,ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-c:v','mjpeg','-framerate',String(FPS),'-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-an',out+'.tmp.mp4'],{stdio:['pipe','inherit','inherit']});
    const done=new Promise(r=>ff.on('close',r));let t0=Date.now();
    for(let n=f0;n<f1;n++){if(!ff.stdin.write(await shot(n/FPS)))await new Promise(r=>ff.stdin.once('drain',r))}
    ff.stdin.end();const code=await done;if(code==0)fs.renameSync(out+'.tmp.mp4',out);console.log('done',out,f1-f0,'frames',(Date.now()-t0)/1000,'s')}
  await br.close();srv.close();
})();
```

### index.html
<!-- FILE: index.html -->
```html
<!doctype html><html><head><style>
@font-face{font-family:'Plus Jakarta Sans';font-weight:700;src:url('/node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff2')}
@font-face{font-family:'Plus Jakarta Sans';font-weight:800;src:url('/node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff2')}
</style></head><body style="margin:0;background:#000"><script type="importmap">{"imports":{"three":"/node_modules/three/build/three.module.js"}}</script><script type="module" src="/main.js"></script></body></html>
```

### gaps.py (daftar jeda VO)
<!-- FILE: gaps.py -->
```python
import re,subprocess,sys
f=sys.argv[1] if len(sys.argv)>1 else 'vo.mp3'
d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
o=subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','silencedetect=noise=-32dB:d=0.09','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',o)];en=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',o)]
print('durasi',round(d,3))
for a,b in zip(st,en):print(f'jeda {a:.2f} - {b:.2f} ({b-a:.2f})','<-- akhir kalimat?' if b-a>=.38 else '')
```

### cues.py (contoh Episode 4: pemetaan manual jeda ke kalimat, `d`, `B`, `S`/`E`, cue bernama `N`)
<!-- FILE: cues.py -->
```python
import json
d=46.289
S=[0,0.05,3.57,6.24,9.14,13.53,16.34,18.38,20.39,22.40,24.77,26.22,28.71,31.39,32.64,37.40,42.86]
E=[0,3.17,5.77,8.67,13.17,15.91,17.83,20.26,22.09,24.29,25.78,28.27,30.94,32.17,36.96,42.25,46.03]
B=[0,8.905,16.14,24.53,32.405,37.18,42.555,d]
K=lambda i,fr=0:S[i]+fr*(E[i]-S[i])
N=dict(ck=(1,.18),nk=(1,.62),ibu=(2,.12),q3=(3,.05),rame=(3,.5),
 kw0=(4,.67),kw1=(4,.98),ring=(5,.05),cpin=(5,.7),
 jb=(6,.3),ha0=(7,.05),ha1=(7,.95),mp=(8,.45),pb0=(9,.05),pb1=(9,.95),
 q10=(10,.05),b2a=(11,.05),b2b=(11,.98),b3a=(12,.05),b3b=(12,.98),beda=(13,.1),
 sia=(14,.33),apa=(14,.78),ch1=(14,.8),ch2=(14,.87),ch3=(14,.93),eq=(14,.96),
 f_ck=(15,.17),f_bd=(15,.45),f_as=(15,.78),
 e_txt=(16,.05),e_p=(16,0),e_b=(16,.15),e_s1=(16,.27),e_s2=(16,.62))
json.dump(dict(d=d,B=B,s=S,e=E,t={k:K(*v) for k,v in N.items()}),open('cues.json','w'))
print('ok')
```

### sfx.py (contoh Episode 4; generator SFX dan jadwal dari cues.json)
<!-- FILE: sfx.py -->
```python
import json,wave,numpy as np
Q=json.load(open('cues.json'));t=Q['t'];B=Q['B'];SR=44100;D=Q['d']+.1
out=np.zeros((int(D*SR),2))
def put(x,at,g=1.0,pan=0.0):
    i=int(at*SR);x=x*g;n=min(len(x),len(out)-i)
    if n<=0 or i<0:return
    out[i:i+n,0]+=x[:n]*(1-max(pan,0));out[i:i+n,1]+=x[:n]*(1+min(pan,0))
def env(n,a=.004,r=.08):
    e=np.ones(n);k=max(1,int(a*SR));e[:k]=np.linspace(0,1,k);e*=np.exp(-np.arange(n)/(r*SR));return e
def pop(f=520,dur=.12):
    n=int(dur*SR);x=np.arange(n)/SR;fr=f*(1+.7*np.exp(-x*40));ph=2*np.pi*np.cumsum(fr)/SR;return np.sin(ph)*env(n,.002,.05)
def tick(f=1800,dur=.03):
    n=int(dur*SR);x=np.arange(n)/SR;return (np.sin(2*np.pi*f*x)*.7+np.random.randn(n)*.3)*env(n,.0008,.008)
def thud(dur=.28):
    n=int(dur*SR);x=np.arange(n)/SR;fr=45+55*np.exp(-x*18);return np.sin(2*np.pi*np.cumsum(fr)/SR)*env(n,.002,.09)
def ding(f=1318,dur=.8):
    n=int(dur*SR);x=np.arange(n)/SR;return (np.sin(2*np.pi*f*x)+.45*np.sin(2*np.pi*f*1.5*x)+.2*np.sin(2*np.pi*f*2.01*x))*env(n,.002,.22)
def whoosh(dur=.6,hi=True):
    n=int(dur*SR);x=np.random.randn(n);y=np.zeros(n);lp=0.;b=0.
    for i in range(n):
        u=i/n;c=.02+.35*np.sin(np.pi*u)**1.5 if hi else .03+.2*np.sin(np.pi*u)
        lp+=c*(x[i]-lp);b+=c*(lp-b);y[i]=lp-b
    y/=np.abs(y).max()+1e-9;return y*np.sin(np.pi*np.arange(n)/n)**2
def swipe():
    n=int(.2*SR);x=np.random.randn(n);y=np.diff(x,prepend=0);return y/np.abs(y).max()*np.exp(-np.arange(n)/(.05*SR))
# transisi antar adegan
for i in range(1,7):put(whoosh(.62),B[i]-.32,.5,pan=.5)
# adegan 1
put(pop(480),.1,.35);put(pop(700),t['nk'],.4);put(ding(1175,.6),t['nk']+.03,.25);put(pop(560),t['ibu'],.35);put(pop(640),t['rame'],.38)
for j in range(10):put(pop(800+(j%4)*80,.06),t['rame']+.1+j*.12,.1,pan=(j%2)*.8-.4)
# adegan 2
put(pop(520),B[1]+.15,.3);put(thud(.3),B[1]+.3,.5)
for j in range(11):put(thud(.16),t['kw0']+(t['kw1']-t['kw0'])*j/10,.28);put(tick(1500+j*60),t['kw0']+(t['kw1']-t['kw0'])*j/10+.02,.2)
put(ding(1318,.8),t['kw1']+.1,.35);put(whoosh(.4,False),t['ring']-.1,.22);put(pop(620),t['cpin'],.38);put(thud(.25),t['cpin']+.3,.45)
# adegan 3
put(pop(520),B[2]+.1,.3);put(pop(600),t['jb'],.3)
for j,x in enumerate(np.arange(t['ha0'],t['ha1'],.07)):put(tick(1300+j*20),x,.14)
put(ding(1245,.7),t['ha1']+.05,.32);put(pop(560),t['mp'],.33)
for j in range(20):put(pop(480+(j%5)*50,.07),t['pb0']+(t['pb1']-t['pb0'])*j/19,.17,pan=(j%2)*.6-.3)
put(ding(1397,.9),t['pb1']+.05,.38)
# adegan 4
put(pop(520),B[3]+.1,.3);put(thud(.28),B[3]+.4,.45)
for a,b in [(t['b2a'],t['b2b']),(t['b3a'],t['b3b'])]:
    put(whoosh(.4,False),a-.1,.22)
    for j,x in enumerate(np.arange(a,b,.07)):put(tick(1300+j*20),x,.14)
    put(thud(.3),b,.45)
put(ding(1175,.7),t['b2b']+.02,.3);put(ding(1397,.9),t['b3b']+.02,.35);put(pop(520),t['beda'],.4);put(thud(.4),t['beda']+.02,.5)
# adegan 5
put(pop(520),B[4]+.1,.3);put(pop(600),t['sia'],.35);put(pop(480),t['sia']+.15,.25);put(pop(540),t['sia']+.3,.25)
put(pop(640),t['apa'],.35)
for k in ['ch1','ch2','ch3']:put(pop(560),t[k],.33)
put(swipe(),t['eq']-.02,.35);put(pop(700),t['eq'],.35);put(ding(988,.7),t['eq']+.05,.3)
# adegan 6
put(pop(520),B[5]+.1,.3);put(pop(620),t['f_ck'],.38);put(whoosh(.4,False),t['f_bd']-.1,.22);put(pop(560),t['f_bd'],.35);put(ding(1318,.8),t['f_bd']+.1,.3)
put(thud(.35),t['f_as'],.55);put(ding(1568,1.0),t['f_as']+.03,.38)
# penutup
put(pop(420),t['e_p'],.3);put(pop(760),t['e_b'],.35);put(pop(500),t['e_s1'],.3,-.3);put(pop(560),t['e_s2'],.3,.3);put(ding(1568,1.0),t['e_txt'],.22)
for j in range(8):put(tick(2200+j*180,.04),t['e_p']+.2+j*.22,.1,pan=(j%2)*.6-.3)
out/=max(1e-9,np.abs(out).max())/.7
w=wave.open('sfx.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((out*32767).astype('<i2').tobytes());w.close();print('sfx ok',round(D,2))
```

### common.js (bar koin, skyline, badge, garis putus, helper pop)
<!-- FILE: common.js -->
```js
import {THREE,W,H,INK,S,rect,txt,tag,ink,fs,line,pop,lerp,clamp,rnd,ease,back} from './core.js';
import {C,mix,poly,box,cs} from './iso.js';
import {bg,spark,src,bubble,person,sign} from './deco.js';
import {fmt,prog,fadeIn} from './util.js';
import {ambient} from './scenes1.js';
export const KOTA=C.cyan,KAB=C.lc,KAR=C.teal,JKT='#A9A0E0',BASE=-430,HM=545,H2=479,H3=421,HJ=250;
export const rp=n=>'Rp'+fmt(n);
export const popS=(m,T,t0,s=1,d=.45)=>m.scale.setScalar(Math.max(back((T-t0)/d),1e-4)*s);
export const popP=(m,T,t0,tp,s=1)=>m.scale.setScalar(Math.max(back((T-t0)/.45),1e-4)*s*(1+.13*Math.sin(clamp((T-tp)/.5)*Math.PI)));
export function bar(g,x,baseY,w,hMax,col,z){
  const ch=hMax+100,m=S(w+70,ch,()=>{},x,baseY+ch/2-48,z,g),{cv,c,t}=m.userData;let cur=-1;
  m.set=h=>{h=Math.round(Math.max(0,h));if(h===cur)return;cur=h;c.clearRect(0,0,cv.width,cv.height);m.visible=h>5;if(h<=5){t.needsUpdate=true;return}
    const cx=cv.width/2,base=ch-48,ry=w*.17,top=base-h;
    const body=()=>{c.beginPath();c.moveTo(cx-w/2,top);c.lineTo(cx-w/2,base);c.ellipse(cx,base,w/2,ry,0,Math.PI,0,true);c.lineTo(cx+w/2,top);c.closePath()};
    body();fs(c,col,8);c.save();body();c.clip();c.fillStyle='rgba(255,255,255,.22)';c.fillRect(cx-w/2+w*.12,top,w*.14,h+ry);
    c.strokeStyle='rgba(30,26,60,.35)';c.lineWidth=4;for(let y=base-30;y>top+ry;y-=30){c.beginPath();c.ellipse(cx,y,w/2,ry,0,0,Math.PI);c.stroke()}c.restore();
    body();ink(c,8);c.stroke();c.beginPath();c.ellipse(cx,top,w/2,ry,0,0,7);fs(c,mix(col,'#ffffff',.3),8);t.needsUpdate=true};
  m.set(hMax);return m}
export function skyline(g,kind,x,y,z,s=1){const k=70;
  const m=S(680,580,c=>{const ox=230,oy=300,P=(a,b,zz=0)=>[ox+(a-b)*k,oy+(a+b)*k/2-zz];
    poly(c,[P(-.5,-.4),P(4.4,-.4),P(4.4,2.6),P(-.5,2.6)],mix(C.mg,'#ffffff',.1),5);
    const L=kind=='jkt'?[[0,0,.8,.8,170,C.plat],[1.1,.15,.7,.7,250,C.lc],[2.2,0,.9,.8,130,C.ash],[.2,1.4,.7,.7,100,'#8D86C9'],[1.5,1.3,.8,.8,200,C.cyan]]:[[0,0,1.7,.8,60,C.plat],[2.3,.1,.2,.2,150,C.ash],[0,1.3,1.5,.8,55,C.ash],[2,1.3,.8,.7,120,C.lc],[3.2,1.3,.7,.7,80,'#8D86C9']];
    L.sort((a,b)=>(a[0]+a[1])-(b[0]+b[1])).forEach(([gx,gy,w,d,h,col])=>box(c,P,gx,gy,w,d,h,cs(col),{win:1,fh:26}));
    if(kind=='jkt'){box(c,P,3.2,1.0,.18,.18,230,cs(C.plat));const q=P(3.29,1.09,250);c.beginPath();c.arc(q[0],q[1]-8,16,0,7);fs(c,C.warm,5)}
    else{const q=P(2.4,.2,150);for(let i=0;i<3;i++){c.beginPath();c.arc(q[0]+i*14,q[1]-26-i*30,14+i*5,0,7);fs(c,'rgba(235,235,235,.9)',4)}}},x,y,z,g);
  m.scale.setScalar(s);return m}
export const crown=(g,x,y,z)=>S(170,120,c=>{c.beginPath();c.moveTo(15,105);c.lineTo(15,35);c.lineTo(55,68);c.lineTo(85,15);c.lineTo(115,68);c.lineTo(155,35);c.lineTo(155,105);c.closePath();fs(c,C.warm,8)},x,y,z,g);
export const badge=(g,n,col,x,y,z)=>S(120,120,c=>{c.beginPath();c.arc(60,60,50,0,7);fs(c,col,8);c.font='800 66px "Plus Jakarta Sans"';c.textAlign='center';c.textBaseline='middle';c.fillStyle=INK;c.fillText(n,60,66)},x,y,z,g);
export const dash=(g,w,x,y,z)=>S(w,24,c=>{c.setLineDash([20,14]);c.beginPath();c.moveTo(0,12);c.lineTo(w,12);line(c,C.warm,6)},x,y,z,g);
```

### logo.png (base64, wordmark putih + b cyan; diekstrak otomatis)
<!-- FILE: logo.b64 -->
```
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
```

### logo_light.png (base64, logo untuk latar terang `#EBEBEB`: wordmark ungu tua + b cyan; diekstrak otomatis)
<!-- FILE: logo_light.b64 -->
```
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
```

---

## LAMPIRAN C: CONTOH ADEGAN (pola tata letak 2A; ganti sesuai naskah baru)

### scenes1.js (berisi `ambient`: awan, burung, kilau; dipakai semua adegan)
<!-- FILE: scenes1.js -->
```js
import {W,H,INK,ink,S,rect,txt,tag,pop,lerp,clamp,rnd,ease,back} from './core.js';
import {C,mix,poly,makeBlock} from './iso.js';
import {bg,cloud,gull,spark,src} from './deco.js';
import {blockIn,fmt,prog,drift,fadeIn,flash} from './util.js';
export function ambient(g,seed=0){const cl=[[300,-300,600],[230,360,330],[330,-80,-330]].map(([w,x,y],i)=>[cloud(g,w,x,y,-60+i),x,18+i*9]);
  const gl=[0,1].map(i=>[gull(g,84,0,0,-40),i*700,i*130]);const sp=[...Array(7)].map((_,i)=>[spark(g,10+rnd()*8,i%2?C.cyan:C.plat,(rnd()-.5)*980,-500+rnd()*1300,-45),rnd()*6]);
  return T=>{cl.forEach(([m,x,s])=>drift(m,x,s,T));gl.forEach(([m,x0,o],i)=>{m.position.set(((x0+T*85+900)%1800)-900,560+o+Math.sin(T*2+i)*22,-40);m.scale.set(1,.4+.6*Math.abs(Math.sin(T*7+i)),1)});sp.forEach(([m,o])=>m.scale.setScalar(.6+.5*Math.abs(Math.sin(T*2.2+o))))}}

export function s1(g,Q){const t=Q.t;bg(g,0);const am=ambient(g);
  const kota=makeBlock(g,'city',60,{z:10}),kab=makeBlock(g,'kab',26,{z:10});kota.position.set(0,320,0);kab.position.set(0,-150,0);
  const ck=tag(g,'KOTA',54,C.cyan,INK,0,170,40,300,110),cb=tag(g,'KABUPATEN',54,C.plat,INK,0,-345,40,470,110);
  const vs=S(170,170,c=>{c.beginPath();c.arc(85,85,72,0,7);ink(c,9);c.fillStyle=C.warm;c.fill();c.stroke();c.font='800 62px "Plus Jakarta Sans"';c.textAlign='center';c.textBaseline='middle';c.fillStyle=INK;c.fillText('VS',85,90)},0,0,45,g);
  const h1=txt(g,'KOTA vs KABUPATEN',76,C.plat,0,800,40,1040,12),sub=txt(g,'mana yang lebih gede?',50,C.lc,0,712,40,900,9,700),q=txt(g,'?',320,C.warm,390,170,41,360,16);
  return T=>{am(T);blockIn(kota,T,t.kota1-.3,null,120);blockIn(kab,T,t.kab1-.3,null,120);kota.position.y=320+Math.sin(T*1.6)*7;kab.position.y=-150+Math.sin(T*1.6+1)*7;
    pop(ck,T,t.kota1);pop(cb,T,t.kab1);pop(vs,T,t.vs,.5);vs.rotation.z=Math.sin(T*3)*.12;pop(h1,T,.2);pop(sub,T,t.q1);pop(q,T,t.q1+.05,.6);q.rotation.z=Math.sin(T*3.5)*.1}}

export function s2(g,Q){const t=Q.t;bg(g,1);const am=ambient(g);
  const blk=makeBlock(g,'city',100,{z:10});blk.position.set(0,-170,0);const u=blk.userData;
  const zs=[];for(let i=0;i<4;i++)for(let j=0;j<3;j++)zs.push(u.add((c,P)=>{const a=i,b=i+1,d=j*4/3,e=(j+1)*4/3;poly(c,[P(a,d),P(b,d),P(b,e),P(a,e)],'rgba(89,195,195,.5)',6)},40+zs.length));
  const gr=u.add((c,P)=>{for(let i=0;i<4;i++)for(let j=0;j<3;j++){const a=i,b=i+1,d=j*4/3,e=(j+1)*4/3;poly(c,[P(a,d),P(b,d),P(b,e),P(a,e)],null,3);c.strokeStyle='rgba(235,235,235,.55)';c.stroke()}},39);
  const tt=tag(g,'KOTA BEKASI',58,C.cyan,INK,0,835,40,520,115),nm=txt(g,'0 km²',170,C.plat,0,690,40,1000,14),ch=tag(g,'12 kecamatan',52,C.plat,INK,0,545,40,470,105),sc=src(g,'Sumber: BPS Kota Bekasi 2025 (luas 213,12 km²; 12 kecamatan, 56 kelurahan)');
  return T=>{am(T);blockIn(blk,T,t.k_land,t.k_b1,140);blk.position.y=-170+Math.sin(T*1.5)*6;
    pop(tt,T,t.k_land);pop(nm,T,t.k_num0-.1,.4);nm.set(fmt(213*ease(prog(T,t.k_num0,t.k_num1)))+' km²');pop(ch,T,t.k_chip);pop(sc,T,t.k_land+.4,.3);
    gr.material.opacity=clamp((T-t.k_z0+.2)/.3);zs.forEach((z,i)=>flash(z,T,lerp(t.k_z0,t.k_z1,i/11),.22,.12))}}

export function s3(g,Q){const t=Q.t;bg(g,2);const am=ambient(g);
  const blk=makeBlock(g,'kab',50,{z:10});blk.position.set(0,-70,0);const u=blk.userData;
  const gh=[],nums=[];for(let i=0;i<6;i++){const zx=i%3,zy=Math.floor(i/3),x0=4*zx,y0=4*zy;
    gh.push(u.add((c,P)=>{poly(c,[P(x0,y0),P(x0+4,y0),P(x0+4,y0+4),P(x0,y0+4)],'rgba(89,195,195,.42)',6);c.setLineDash([16,10]);c.strokeStyle=C.plat;c.lineWidth=4;c.stroke()},40+i));
    const r=u.rel(x0+2,y0+2,70);nums.push(txt(blk,String(i+1),110,C.plat,r[0],r[1],60+i,200,12))}
  const tt=tag(g,'KABUPATEN BEKASI',54,C.plat,INK,0,835,40,690,115),nm=txt(g,'0 km²',160,C.cyan,0,690,40,1000,14),bd=tag(g,'≈ 6× Kota',92,C.warm,INK,0,-470,60,620,170),lg=tag(g,'= 1 Kota Bekasi',40,C.cyan,INK,-290,400,60,420,90),
    sc=src(g,'Sumber: BPS Kabupaten Bekasi 2024 (1.273,88 km²)',-700),sc2=src(g,'dan BPS Kota Bekasi (213,12 km²)',-735);
  return T=>{am(T);blockIn(blk,T,t.kab_in,t.kab_in+.8,150);blk.position.y=-70+Math.sin(T*1.5)*6;
    pop(tt,T,t.kab_in+.1);pop(nm,T,t.kab_num0-.1,.4);nm.set(fmt(1274*ease(prog(T,t.kab_num0,t.kab_num1)))+' km²');pop(sc,T,t.kab_num0,.3);pop(sc2,T,t.kab_num0,.3);
    gh.forEach((m,i)=>{const ti=lerp(t.g0,t.g1,i/5);fadeIn(m,T,ti,.2);pop(nums[i],T,ti+.05,.4)});pop(lg,T,t.g0);
    pop(bd,T,t.x6,.5);bd.rotation.z=Math.sin(T*4)*.03}}
```

### scenes4.js (contoh Episode 4: 7 adegan dengan `scene(g)` untuk zona konten dan `SRC` untuk sumber)
<!-- FILE: scenes4.js -->
```js
import {THREE,W,H,INK,S,rect,txt,tag,ink,fs,line,pop,lerp,clamp,rnd,ease,back} from './core.js';
import {C,mix,poly,box,cs,makeBlock} from './iso.js';
import {bg,spark,src,bubble,person,sign,pinS,crowd} from './deco.js';
import {fmt,prog,fadeIn} from './util.js';
import {ambient} from './scenes1.js';
import {popS,popP,bar,skyline,badge,dash,KOTA,JKT} from './common.js';
const KAB=C.lc,KAR=C.teal;
const scene=g=>{const cg=new THREE.Group();cg.scale.setScalar(.72);cg.position.set(0,77,0);g.add(cg);return cg};
const SRC=(g,a,b)=>[src(g,a,-492),...(b?[src(g,b,-526)]:[])];
const fIcon=(g,x,y,z,s=1)=>{const m=S(170,215,c=>{const P=(a,b,zz=0)=>[85+(a-b)*34,165+(a+b)*17-zz];
  c.beginPath();c.ellipse(85,185,58,20,0,0,7);c.fillStyle='rgba(20,16,50,.35)';c.fill();
  box(c,P,0,0,1.6,.9,44,cs(C.plat),{win:1,fh:22});box(c,P,1.15,.1,.28,.28,100,cs(C.ash));
  for(let i=0;i<3;i++){const q=P(1.29,.24,106);c.beginPath();c.arc(q[0]+i*9,q[1]-12-i*22,9+i*4,0,7);fs(c,'rgba(235,235,235,.92)',3)}},x,y,z,g);m.scale.setScalar(s);return m};
const ring=(g,w,h,x,y,z)=>S(w,h,c=>{c.setLineDash([22,14]);c.beginPath();c.ellipse(w/2,h/2,w/2-12,h/2-12,0,0,7);line(c,C.warm,7)},x,y,z,g);

export function s1(g,Q){const t=Q.t;bg(g,0);const am=ambient(g);const cg=scene(g);
  const blk=makeBlock(cg,'kab',54,{z:10});blk.position.set(0,-190,0);const u=blk.userData,pr=u.rel(6,2,60),px=pr[0],py=pr[1]-190;
  const pin=pinS(cg,1.25,px,py,45),tc=tag(cg,'CIKARANG',64,C.cyan,INK,px,py+250,46,470,125),ib=tag(cg,'Ibu kota\nKab. Bekasi',50,C.lc,INK,px+10,py+420,46,520,160),
    h1=txt(cg,'CIKARANG = KOTA?',112,C.plat,0,800,41,1500,14),kk=tag(cg,'Kok rame\nkayak kota?',60,C.warm,INK,-420,py+200,47,520,190),cr=crowd(cg,26,null,48);
  const cp=cr.map((m,i)=>[(rnd()-.5)*520,(rnd()-.5)*230-40,rnd()*6]);
  return T=>{am(T);blockIn2(blk,T,-.6);blk.position.y=-190+Math.sin(T*1.5)*6;popS(pin,T,-.6,1);pin.position.y=py+Math.abs(Math.sin(T*3))*10;
    popP(tc,T,-.6,t.ck);popP(h1,T,-.6,t.nk);h1.set(T<t.nk?'CIKARANG = KOTA?':'CIKARANG ≠ KOTA');pop(ib,T,t.ibu);ib.rotation.z=Math.sin(T*3)*.02;
    pop(kk,T,t.rame);kk.rotation.z=Math.sin(T*3)*.03;
    cr.forEach((m,i)=>{const e=T-(t.rame+i*.03);m.visible=e>0;m.position.set(px+cp[i][0],py-30+cp[i][1]+Math.abs(Math.sin(T*5+cp[i][2]))*22,48+i*.01);m.scale.setScalar(1.3*Math.max(back(e/.3),1e-4))})}}
import {blockIn} from './util.js';
const blockIn2=(b,T,t0)=>blockIn(b,T,t0,null,110);

export function s2(g,Q){const t=Q.t,B0=Q.B[1];bg(g,1);const am=ambient(g);const cg=scene(g);
  const blk=makeBlock(cg,'kab',50,{z:10});blk.position.set(0,-200,0);const u=blk.userData;
  const pts=[[1,1.5],[2,5.5],[9.5,5.5],[10.5,2],[3,3.5],[5,1],[6,.8],[7,1.6],[5.2,2.6],[6.4,3],[7.4,3.2]],ic=pts.map(([a,b],i)=>{const r=u.rel(a,b,10);return fIcon(cg,r[0],r[1]-200+60,45+i*.01,.95)}),
    order=[0,5,1,6,2,7,3,8,4,9,10];
  const tt=tag(cg,'KABUPATEN BEKASI',60,C.cyan,INK,0,870,40,740,125),nm=txt(cg,'≈ 0',240,C.plat,0,640,42,1000,16),lb=tag(cg,'KAWASAN INDUSTRI',62,C.plat,INK,0,420,42,700,125),
    rg=ring(cg,520,260,u.rel(6.2,2,10)[0],u.rel(6.2,2,10)[1]-140,44),cp=pinS(cg,1.25,u.rel(6.2,2,10)[0],u.rel(6.2,2,10)[1]-120,50),ct=tag(cg,'CIKARANG',62,C.cyan,INK,u.rel(6.2,2,10)[0],u.rel(6.2,2,10)[1]+10,51,470,115),
    sc=SRC(g,'Sumber: Good News From Indonesia (2025); IQPlus via BCA Sekuritas','Posisi ikon hanya ilustrasi, bukan peta');
  return T=>{am(T);blockIn2(blk,T,B0+.1);blk.position.y=-200+Math.sin(T*1.5)*6;pop(tt,T,B0+.15);
    const p=prog(T,t.kw0,t.kw1);ic.forEach((m,i)=>{const k=order.indexOf(i),ti=lerp(t.kw0,t.kw1,k/10),e=T-ti;m.visible=e>-.01;m.scale.setScalar(.95*Math.max(back(e/.3),1e-4))});
    nm.set('≈ '+Math.round(11*p));pop(nm,T,t.kw0-.1,.35);pop(lb,T,t.kw0-.05,.35);fadeIn(rg,T,t.ring,.3);popS(cp,T,t.cpin,1,.4);cp.position.y+=0;pop(ct,T,t.cpin+.05);sc.forEach(m=>pop(m,T,B0+.4,.3))}}

export function s3(g,Q){const t=Q.t,B0=Q.B[2];bg(g,2);const am=ambient(g);const cg=scene(g);
  const gr=S(960,560,c=>{poly(c,[[480,20],[940,290],[480,540],[20,290]],mix(C.mg,'#ffffff',.12),8);c.strokeStyle='rgba(235,235,235,.25)';c.lineWidth=3;for(let i=1;i<5;i++){const a=i/5;c.beginPath();c.moveTo(480+a*460,20+a*270);c.lineTo(480+a*460-460,20+a*270+270);c.moveTo(480-a*460,20+a*270);c.lineTo(480-a*460+460,20+a*270+270);c.stroke()}},0,130,10,cg);gr.scale.setScalar(1.45);
  const ic=[];for(let i=0;i<5;i++)for(let j=0;j<4;j++){const u_=(i+.5)/5,v_=(j+.5)/4,px=(480+u_*460-v_*460-480)*1.45,py=-(20+u_*270+v_*270-290)*1.45+130;ic.push(fIcon(cg,px,py+40,40+(i+j)*.1,1.0))}
  const tt=tag(cg,'KAWASAN INDUSTRI JABABEKA',58,C.cyan,INK,0,870,40,1020,125),hc=txt(cg,'> 0 ha',170,C.plat,0,715,42,1200,14),lg=tag(cg,'1 ikon ≈ 100 pabrik',46,C.warm,INK,0,-175,45,700,105),
    pb=txt(cg,'± 0 pabrik',150,C.plat,0,-370,42,1300,14),mp=tag(cg,'menurut pengelola',54,C.lc,INK,0,-560,42,720,115),
    sc=SRC(g,'Sumber: Kemenperin via Fortune IDN (2.267 ha); IQPlus via BCA Sekuritas (±2.000 pabrik)','Jumlah pabrik adalah klaim pengelola kawasan');
  return T=>{am(T);popS(gr,T,B0+.1,1.45);pop(tt,T,B0+.1);const p1=ease(prog(T,t.ha0,t.ha1));hc.set('> '+fmt(2000*p1)+' ha');pop(hc,T,t.ha0-.1,.35);
    const p2=prog(T,t.pb0,t.pb1);ic.forEach((m,i)=>{const e=T-lerp(t.pb0,t.pb1,i/19);m.visible=e>-.01;m.scale.setScalar(Math.max(back(e/.28),1e-4))});
    pb.set('± '+fmt(Math.round(2000*ease(p2)/50)*50)+' pabrik');pop(pb,T,t.pb0-.1,.35);pop(lg,T,t.pb0);pop(mp,T,t.mp);sc.forEach(m=>pop(m,T,B0+.4,.3))}}

export function s4(g,Q){const t=Q.t,B0=Q.B[3],BS=-560,hs=[219,437,820];
  bg(g,3);const am=ambient(g);const cg=scene(g);
  const X=[-470,0,470],cols=[JKT,KAB,C.cyan],bars=X.map((x,i)=>bar(cg,x,BS,300,hs[i],cols[i],20)),
    nms=['Jababeka\n(pengelola)','Kab. Bekasi\n(DDTC News)','Kab. Bekasi\n(Good News\nFrom Indonesia)'],nt=X.map((x,i)=>tag(cg,nms[i],40,cols[i],INK,x,BS-110,40,440,i==2?170:140)),
    vals=['± 2.000','± 4.000','> 7.500'],nv=X.map((x,i)=>txt(cg,vals[i],74,C.plat,x,BS+120,42,420,10)),
    ti=txt(cg,'Kalau se-Kabupaten?',112,C.plat,0,860,41,1500,14),bd=tag(cg,'Beda jauh ya?',96,C.warm,INK,0,620,46,820,170),
    dl=dash(cg,980,235,BS+820,44),br=S(70,hs[2]-hs[1]+40,c=>{const h=c.canvas.height;c.beginPath();c.moveTo(35,10);c.lineTo(35,h-10);c.moveTo(10,45);c.lineTo(35,8);c.lineTo(60,45);c.moveTo(10,h-45);c.lineTo(35,h-8);c.lineTo(60,h-45);line(c,C.warm,7)},X[1]+215,BS+(hs[1]+hs[2])/2,44,cg),
    sc=SRC(g,'Sumber: IQPlus via BCA Sekuritas; DDTC News; Good News From Indonesia','Angka dari sumber berbeda, bukan data resmi tunggal');
  return T=>{am(T);bars[0].set(hs[0]);bars[1].set(hs[1]*ease(prog(T,t.b2a,t.b2b)));bars[2].set(hs[2]*ease(prog(T,t.b3a,t.b3b)));
    pop(ti,T,B0+.1);[0,1,2].forEach(i=>{pop(nt[i],T,[B0+.15,t.b2a,t.b3a][i]);pop(nv[i],T,[B0+.2,t.b2a+.2,t.b3a+.2][i],.35)});nv[1].set(T<t.b2b?'± '+fmt(Math.round(4000*ease(prog(T,t.b2a,t.b2b))/50)*50):'± 4.000');nv[2].set(T<t.b3b?'> '+fmt(Math.round(7500*ease(prog(T,t.b3a,t.b3b))/50)*50):'> 7.500');
    fadeIn(dl,T,t.beda,.25);fadeIn(br,T,t.beda,.25);popP(bd,T,t.beda,t.beda+.3);sc.forEach(m=>pop(m,T,B0+.4,.3))}}

export function s5(g,Q){const t=Q.t,B0=Q.B[4];bg(g,4);const am=ambient(g);const cg=scene(g);
  const ti=txt(cg,'Beda yang ngitung,\nbeda hasilnya',108,C.plat,0,790,41,1500,14),
    t1=tag(cg,'SIAPA YANG\nNGITUNG?',62,C.cyan,INK,-380,380,46,560,190),t2=tag(cg,'APA YANG\nDIHITUNG?',62,C.lc,INK,380,380,46,560,190),
    p1=person(cg,.7,-540,50,45),p2=person(cg,.7,-240,50,45),l1=tag(cg,'Pengelola',46,C.plat,INK,-540,-250,46,300,100),l2=tag(cg,'Media',46,C.plat,INK,-240,-250,46,300,100),
    ch=['pabrik','tenant','perusahaan'].map((s,i)=>tag(cg,s,60,[C.plat,C.ash,C.lc][i],INK,380,130-i*150,46,520,115)),
    eq=tag(cg,'Jababeka: ± 2.000 pabrik  vs  ± 1.700 tenant',52,C.warm,INK,0,-470,47,1360,140),
    sc=SRC(g,'Sumber: IQPlus via BCA Sekuritas (±2.000 pabrik); Kontan (±1.700 tenant)','Contoh perbedaan satuan hitung; periode data bisa berbeda');
  return T=>{am(T);pop(ti,T,B0+.1);pop(t1,T,t.sia);pop(p1,T,t.sia+.1,.5);pop(p2,T,t.sia+.25,.5);p1.rotation.z=Math.sin(T*2)*.02;p2.rotation.z=Math.sin(T*2+1)*.02;pop(l1,T,t.sia+.2);pop(l2,T,t.sia+.35);
    pop(t2,T,t.apa);ch.forEach((m,i)=>pop(m,T,[t.ch1,t.ch2,t.ch3][i]));pop(eq,T,t.eq);eq.rotation.z=Math.sin(T*3)*.012;sc.forEach(m=>pop(m,T,B0+.4,.3))}}

export function s6(g,Q){const t=Q.t,B0=Q.B[5];bg(g,5);const am=ambient(g);const cg=scene(g);
  const sl=skyline(cg,'bks',0,-230,10,1.3),rg=ring(cg,1100,640,0,-230,5);
  const tc=tag(cg,'CIKARANG',72,C.cyan,INK,0,880,46,620,135),tx=txt(cg,'SALAH SATU\nPUSAT INDUSTRI\nTERBESAR',92,C.plat,0,610,45,1400,14),
    ro=S(300,380,c=>{c.beginPath();c.moveTo(80,230);c.lineTo(40,360);c.lineTo(100,330);c.lineTo(130,372);c.lineTo(150,250);c.closePath();fs(c,C.cyan,8);c.beginPath();c.moveTo(220,230);c.lineTo(260,360);c.lineTo(200,330);c.lineTo(170,372);c.lineTo(150,250);c.closePath();fs(c,C.lc,8);
      c.beginPath();c.arc(150,150,120,0,7);fs(c,C.warm,9);c.beginPath();c.arc(150,150,90,0,7);fs(c,mix(C.warm,'#ffffff',.3),6);c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?32:70;c.lineTo(150+Math.cos(a)*r,150+Math.sin(a)*r)}c.closePath();fs(c,C.dg,5)},0,250,48,cg),
    bn=tag(cg,'ASIA TENGGARA',100,C.warm,INK,0,10,50,1040,160),sc=SRC(g,'Sumber: Good News From Indonesia; Wikipedia (Cikarang)','Sebutan umum, bukan peringkat resmi');
  return T=>{am(T);popS(sl,T,B0+.1,1.3);fadeIn(rg,T,B0+.2,.3);popP(tc,T,t.f_ck,t.f_ck+.1);pop(tx,T,t.f_bd);pop(ro,T,t.f_bd+.1,.5);ro.rotation.z=Math.sin(T*3)*.05;popP(bn,T,t.f_as,t.f_as);bn.rotation.z=Math.sin(T*2.5)*.015;sc.forEach(m=>pop(m,T,B0+.4,.3))}}

export function s7(g,Q){const t=Q.t,B0=Q.B[6];bg(g,6);const am=ambient(g);const cg=scene(g);
  const rd=S(1080,900,c=>{const P=[[[440,440],[560,440],[300,0],[150,0]],[[520,440],[640,440],[930,0],[780,0]],[[380,900],[700,900],[640,440],[440,440]]];P.forEach(p=>{c.beginPath();p.forEach((q,i)=>i?c.lineTo(...q):c.moveTo(...q));c.closePath();c.fillStyle=C.ash;c.fill();ink(c,8);c.stroke()});
    c.setLineDash([26,22]);c.strokeStyle=C.plat;c.lineWidth=7;c.beginPath();c.moveTo(540,890);c.lineTo(540,450);c.moveTo(470,430);c.lineTo(250,20);c.moveTo(590,430);c.lineTo(850,20);c.stroke()},0,-280,-30,cg);rd.scale.setScalar(1.1);
  const sl=skyline(cg,'bks',-390,330,10,.7),sr=skyline(cg,'jkt',390,330,10,.7),sk=sign(cg,'PERNAH KERJA',C.cyan,-360,-30,40),sb=sign(cg,'LEWAT DOANG',JKT,360,-30,40),pe=person(cg,.95,0,-330,45),bb=bubble(cg,0,60,50),qm=txt(cg,'?',120,C.dg,0,68,51,200,6),
    tx=txt(cg,'Lu yang mana?',124,C.plat,0,820,60,1500,14),cf=[...Array(16)].map((_,i)=>[spark(cg,15,[C.cyan,C.plat,C.warm,'#A9A0E0'][i%4],(rnd()-.5)*1400,0,70),rnd()]);
  return T=>{am(T);popS(sl,T,B0+.2,.7);popS(sr,T,B0+.4,.7);pop(sk,T,t.e_s1,.5);sk.scale.multiplyScalar(1.1);pop(sb,T,t.e_s2,.5);sb.scale.multiplyScalar(1.1);
    pop(pe,T,t.e_p,.5);pe.rotation.z=Math.sin(T*2)*.015;pop(bb,T,t.e_b,.5);pop(qm,T,t.e_b+.1,.5);bb.position.y=60+Math.sin(T*3)*8;qm.position.y=68+Math.sin(T*3)*8;pop(tx,T,t.e_txt,.5);tx.rotation.z=Math.sin(T*2)*.012;
    cf.forEach(([s,o],i)=>{const e=T-t.e_p;s.visible=e>0;s.position.y=1000-((e*230+o*2200)%2200);s.rotation.z=T*3+i})}}
```

