# Cara menambah soal

Buka file di folder `data/` sesuai jenis soal, salin satu baris, lalu ubah isinya. Sesi dan skor menyesuaikan sendiri.
Soal baru boleh ditaruh di file baru (misalnya `data/twk-3.js`), asal didaftarkan di index.html dan daftar INTI di sw.js.

| File | Isi | Jawaban (a) |
|---|---|---|
| data/twk.js, twk-2.js, twk-3.js | TWK | nomor pilihan benar, mulai 0 |
| data/tiu.js, tiu-2.js | TIU | nomor pilihan benar |
| data/tkp.js, tkp-2.js, tkp-3.js | TKP | nilai tiap pilihan 1-5, contoh [5,3,1,2] |
| data/tkd.js, tkd-2.js | BUMN TKD | nomor pilihan benar |
| data/akhlak.js, akhlak-2.js | BUMN AKHLAK | nilai tiap pilihan 1-5 |

Contoh satu baris (akhiri koma kecuali baris terakhir):
{"t":"A","q":"Sila ketiga Pancasila berbunyi...","o":["pilihan 0","pilihan 1","pilihan 2","pilihan 3"],"a":1,"e":"Pembahasan singkat."}

- t = kode topik untuk evaluasi materi (lihat js/topics.js): A,B,C = TWK; D,E,F = TIU; G,H,I,J = TKP; K,L,M = TKD; N = AKHLAK.
- Tanda kutip dalam teks ditulis \" dan jangan ada baris kosong di dalam daftar.
- Setiap soal harus punya 4 pilihan. Periksa kunci jawaban sebelum dipublikasikan.
