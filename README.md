# Latihan SKD CPNS dan BUMN

Aplikasi web latihan soal (TWK, TIU, TKP, BUMN TKD dan AKHLAK) dengan pembahasan, evaluasi materi, timer,
login, dan bisa dipasang ke layar utama HP serta dibuka offline.

## Struktur folder
```
index.html              halaman utama (memuat css dan js)
manifest.webmanifest    pengaturan aplikasi terpasang (nama, ikon, warna)
sw.js                   service worker (offline). Naikkan VERSI di dalamnya tiap file berubah
404.html  robots.txt  _headers
css/style.css           komponen dan tampilan 3D
css/theme.css           warna merek (mode terang)
css/futuristic.css      tema futuristik 3D (neon, kaca, grid). Ubah warna di blok :root:root
css/fun3d.css           efek 3D menyenangkan (kubus, kartu membalik, percikan)
css/depth3d.css         kedalaman 3D: papan dan tombol tebal, panggung berperspektif, objek melayang
js/config.js            nama aplikasi dan pengaturan login
js/bank.js              registri bank soal
js/auth.js              login / daftar / keluar
js/topics.js            materi belajar per topik
js/app.js               logika latihan, skor, evaluasi
js/modes.js             mode Per Topik dan Simulasi CAT (110 soal, 100 menit)
js/fx.js                efek miring 3D kartu (hanya mouse)
js/fun.js               efek menyenangkan: kubus 3D, percikan, rangkaian benar
js/pwa.js               pendaftaran service worker
data/*.js               bank soal per jenis (tambah soal di sini)
img/                    ikon
docs/                   TAMBAH-SOAL.md, LOGIN.md, KEAMANAN.md
```

## Pasang online (gratis)
- **Netlify**: buka app.netlify.com/drop dan seret SELURUH isi folder ini. File `_headers` otomatis aktif.
- **GitHub Pages**: dari browser komputer, seret SELURUH isi folder ke halaman Upload files (pastikan folder
  css, js, data, img ikut), lalu Settings, Pages, Deploy from a branch, main, root.

## Bank soal
Isi dasar sekitar 2.130 soal. Tambah soal dengan menyalin satu baris di folder `data/` (lihat docs/TAMBAH-SOAL.md).
Setelah mengubah file apa pun, naikkan angka VERSI di sw.js (contoh skd-v3) supaya pengguna mendapat pembaruan.

Catatan: soal adalah bahan latihan, bukan soal asli ujian.

## Mode
- Latihan: pilih TWK/TIU/TKP/Campuran/BUMN lalu sesi, dengan pembahasan langsung.
- Per Topik: latih satu topik (misalnya Numerik atau Pelayanan Publik), sesi sekitar 20 soal.
- Simulasi CAT: paket 110 soal (30 TWK, 35 TIU, 45 TKP), 100 menit, navigator soal, tanda ragu-ragu, hasil di akhir.
  Jumlah paket otomatis menyesuaikan bank soal (maksimal 8). Ubah jumlah/komposisi di js/modes.js (CATQ, CATMIN).
