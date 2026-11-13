# Keamanan

Sudah diterapkan:
- Content Security Policy (di index.html dan _headers): hanya skrip dari domain sendiri, tanpa objek, tanpa form.
- Teks dari pengguna (nama) di-escape sebelum ditampilkan. Sudah diuji dengan nama berisi kode HTML.
- Login demo: kata sandi di-hash PBKDF2-SHA256 (150.000 putaran) dengan garam acak, tidak disimpan polos.
- Kata sandi minimal 8 karakter berisi huruf dan angka, batas panjang input, validasi email.
- 5 kali salah masuk mengunci login 60 detik. Sesi kedaluwarsa setelah 7 hari.
- Header keamanan di _headers (Netlify): nosniff, anti-iframe, HSTS, pembatasan izin browser.

Batasan:
- Situs statis tidak bisa melindungi isi soal: siapa pun bisa melihat kode dan data. Login mode 'local' hanya demo
  di perangkat dan bisa diakali pemilik perangkat.
- Untuk jualan: pindahkan soal premium ke database (Supabase dengan Row Level Security per pelanggan), pakai mode
  'supabase', dan aktifkan pembayaran (Midtrans/Xendit) dengan verifikasi di server. GitHub Pages tidak mendukung
  header HTTP kustom, jadi untuk header penuh pakai Netlify.
- Jangan menaruh kunci rahasia (service role key, kunci pembayaran) di folder ini. Hanya anon key Supabase yang boleh.
