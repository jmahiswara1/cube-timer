# Cube Timer

## Deskripsi
Cube Timer adalah aplikasi pencatat waktu berbasis web yang dirancang khusus untuk para pemain Rubik's Cube. Aplikasi ini mengusung desain antarmuka bergaya Neobrutalism yang dicirikan dengan warna-warna kontras tinggi, garis pinggir yang tebal, dan bayangan hitam solid yang memberikan kesan tegas serta modern. Timer ini dibuat untuk mensimulasikan penggunaan timer kompetisi resmi, di mana pengguna harus menahan tombol spasi (atau menahan sentuhan pada gawai) hingga indikator siap menyala, dan waktu akan mulai berjalan tepat ketika tombol dilepaskan. Aplikasi ini juga terintegrasi dengan generator algoritma pengacakan, sistem penyimpanan riwayat penyelesaian secara lokal, dan kalkulasi statistik otomatis.

## Tech Stack
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide React
- next-pwa

## Fitur
- Desain Antarmuka Neobrutalism: Tampilan responsif yang unik dengan estetika pop-art brutalist.
- Timer Presisi: Memanfaatkan kalkulasi waktu bawaan peramban tingkat milidetik yang akurat.
- Mekanisme Kontrol Standar: Kontrol kompetisi menggunakan tombol spasi untuk komputer dan layar sentuh untuk ponsel cerdas.
- Mode Layar Fokus: Elemen navigasi, statistik, dan riwayat akan otomatis menghilang (expand) ketika timer bersiap atau sedang berjalan, memberikan pengalaman bebas gangguan mekanik.
- Generator Pengacakan WCA: Menghasilkan notasi pengacakan acak standar World Cube Association sebelum setiap penyelesaian dilakukan.
- Manajemen Sesi Lokal: Seluruh riwayat penyelesaian disimpan dengan aman di dalam penyimpanan peramban tanpa memerlukan koneksi basis data server.
- Kalkulasi Statistik Terpadu: Menampilkan waktu penyelesaian tercepat (Personal Best), Rata-rata 5 penyelesaian terakhir (Average of 5), dan Rata-rata 12 penyelesaian terakhir (Average of 12) menggunakan algoritma pemotongan standar kompetisi.
- Dukungan Progressive Web App: Dapat diinstal langsung dari peramban menjadi aplikasi mandiri berlogo di gawai ponsel pintar maupun komputer, serta sanggup beroperasi secara luring (offline) alias tanpa akses sinyal internet.
- Modal Pengaturan Kustom: Memberikan peringatan hapus riwayat sesi lengkap dengan warna sesuai tema situs yang ramah antarmuka.
