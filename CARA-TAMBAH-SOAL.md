# Cara menambah soal

Semua soal ada di satu berkas: `soal.js`. Kamu cukup menambah baris baru, tanpa mengubah bagian lain aplikasi.

## Langkah (dari HP atau laptop)

1. Buka repositori GitHub-mu, klik berkas `soal.js`, lalu klik ikon pensil (Edit).
2. Gulir ke bagian paling bawah, tepat sebelum baris `];`.
3. Pada baris soal terakhir, pastikan ada koma di ujungnya, lalu tempel soal barumu di baris berikutnya (soal paling akhir tidak perlu koma).
4. Klik **Commit changes**.
5. Naikkan angka versi di `sw.js` (`skd-v2` menjadi `skd-v3`) supaya HP yang sudah memasang aplikasi mengambil soal terbaru, lalu commit lagi.
6. Tunggu 1 sampai 3 menit, buka aplikasi, dan cek soal barunya.

## Format soal

**TWK atau TIU** (satu jawaban benar):

```js
m("TWK","Tuliskan pertanyaan di sini ...",["Pilihan A","Pilihan B","Pilihan C","Pilihan D","Pilihan E"],2,"Tuliskan pembahasan singkat di sini."),
```

Angka `2` adalah nomor jawaban benar, dihitung mulai dari 0: 0 = A, 1 = B, 2 = C, 3 = D, 4 = E. Ganti `"TWK"` dengan `"TIU"` untuk soal TIU.

**TKP** (setiap pilihan bernilai 1 sampai 5, tiap angka dipakai tepat sekali):

```js
t("Tuliskan skenario di sini ...",[["Pilihan terbaik",5],["Pilihan baik",4],["Pilihan cukup",3],["Pilihan kurang",2],["Pilihan terburuk",1]],"Tuliskan pembahasan singkat di sini."),
```

## Tipe soal (topik) untuk dropdown dan campuran A sampai Z

Tambahkan nama topik sebagai isian terakhir (setelah pembahasan) agar soal masuk ke tipe yang tepat:

```js
m("TIU","Lanjutkan deret: 3, 6, 12, 24, ...",["36","42","48","54","60"],2,"Dikali 2, jadi 24 x 2 = 48.","Deret angka"),
```

Nama topik TIU yang sudah dipakai: Sinonim dan antonim, Analogi, Deret angka, Hitungan dan persen, Perbandingan dan soal cerita, Logika dan silogisme, Penalaran analitis. Kamu boleh membuat topik baru; ia muncul sendiri di dropdown. Soal TWK, TKP, dan soal lama tanpa topik dikelompokkan otomatis menurut kata kunci. Mode "Campuran" mengambil soal bergantian dari semua topik.

## Aturan penting

- Setiap soal harus punya tepat 5 pilihan.
- Pakai tanda kutip ganda `"..."`. Kalau teks soal memuat tanda kutip ganda, ganti dengan tanda kutip tunggal `'` atau hapus.
- Jangan lupa koma di akhir tiap baris, kecuali baris terakhir.
- Jangan hapus tanda `];` di akhir daftar.
- Tulis soal sendiri dan jangan menyalin dari bank soal atau bimbel lain.
- Minta guru atau praktisi memeriksa jawabannya sebelum dipakai untuk berjualan.

## Kalau ada yang salah

- **Muncul kotak merah "format soal nomor ... belum benar":** soal itu punya pilihan yang kurang atau lebih dari 5, jawaban benar tidak jelas, atau poin TKP tidak lengkap 1 sampai 5. Perbaiki baris nomor yang disebut.
- **Muncul tulisan "Bank soal gagal dimuat":** ada tanda baca yang salah di `soal.js` (misalnya koma atau kutip hilang). Kembalikan perubahan terakhir atau kirim isi berkasnya ke saya untuk diperiksa.

## Paket tryout dan dropdown

- Pilihan di dropdown (campuran, TWK, TIU, TKP, dan paket) mengikuti jumlah soal secara otomatis.
- Tiap paket tryout membutuhkan 6 TWK, 8 TIU, dan 10 TKP baru. Dengan 26 soal per subtes ada 2 paket. Setelah soal bertambah, paket ke-3 dan seterusnya muncul sendiri.
