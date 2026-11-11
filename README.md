# Latihan SKD CPNS 2026: pasang di GitHub Pages (gratis, tanpa build)

Folder ini sudah siap pakai. Isinya 7 berkas yang semuanya diletakkan di folder paling luar (tanpa subfolder), jadi mudah diunggah dari HP:

- `index.html` (aplikasi)
- `soal.js` (bank soal; di sinilah kamu menambah soal)
- `manifest.webmanifest` (data pemasangan sebagai aplikasi)
- `sw.js` (membuat aplikasi tetap jalan saat sinyal jelek atau offline)
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (ikon)

## Langkah

1. Buat akun di github.com (gratis), lalu buat repositori baru dengan **Public** (nama bebas, misalnya `skd-cpns`).
2. Di repositori itu, pilih **Add file, lalu Upload files**, pilih ketujuh berkas di atas, lalu klik **Commit changes**.
3. Buka **Settings, lalu Pages**. Pada Source pilih **Deploy from a branch**, Branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu 1 sampai 3 menit. Link-nya berbentuk `https://NAMA-GITHUB-MU.github.io/NAMA-REPO/`. Buka link itu di browser untuk memastikan aplikasinya tampil.
5. **Pasang di HP (Android, Chrome):** buka link, lalu menu titik tiga, pilih **Pasang aplikasi** atau **Tambahkan ke layar utama** (nama menu bisa sedikit berbeda). Ikonnya muncul di layar utama dan aplikasi terbuka seperti aplikasi biasa. Di iPhone, buka di Safari lalu pilih **Bagikan, lalu Tambah ke Layar Utama**.
6. **Bagikan:** kirim link tadi ke WhatsApp. Tombol bagikan di dalam aplikasi otomatis memakai alamat link itu.

## Mengaktifkan tombol masukan (opsional)

Buka `index.html` di GitHub, klik ikon pensil, cari baris `const FEEDBACK="";`, isi nomor WhatsApp-mu dengan format `628xxxxxxxxxx`, lalu commit. Tombol "Kirim masukan" dan "Laporkan soal" akan muncul.

## Menambah soal

Buka `soal.js` di GitHub, klik ikon pensil, tambahkan baris soal baru, lalu commit. Format dan contohnya ada di bagian atas `soal.js` dan di file CARA-TAMBAH-SOAL. Pilihan latihan di aplikasi (dropdown) dan jumlah paket tryout ikut bertambah otomatis.

## Memperbarui aplikasi

1. Ganti `index.html` atau `soal.js` (edit atau unggah ulang).
2. Buka `sw.js` dan naikkan angka versi pada baris `const V = "skd-v1";` (misalnya `skd-v2`). Tanpa ini, HP yang sudah memasang bisa tetap menampilkan versi lama.

## Catatan

- Ini aplikasi web yang bisa dipasang (PWA), bukan berkas APK. Untuk berkas APK sungguhan atau Play Store, pakai paket `latihan-skd-apk` yang terpisah.
- Aplikasi tidak meminta login dan tidak mengirim data pribadi ke server. Progres simulasi disimpan di perangkat.
- Sudah diuji di komputer dengan server lokal: manifest dan ikon terbaca, serta aplikasi tetap bisa dibuka dan dipakai saat offline. Belum diuji langsung di HP dan di alamat github.io.
- Pastikan teks "bukan aplikasi resmi BKN dan tidak menjamin kelulusan" tetap ada.
