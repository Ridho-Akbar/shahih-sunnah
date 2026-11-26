<div align="center">
<img width="1200" height="475" alt="Shahih Sunnah Banner" src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" />

# Shahih Sunnah
Aplikasi web Islami modern untuk kumpulan zikir pagi & petang, hadis-hadis pilihan, kiat amalan sunnah, serta fitur pendukung ibadah harian.
</div>

## Fitur Utama

1. **Zikir Pagi & Petang (`/zikir`)**: Panduan lengkap zikir harian sesuai waktu dengan hitungan interaktif.
2. **Hadis Shahih (`/hadis`)**: Koleksi hadis pilihan lengkap dengan terjemahan dan referensi.
3. **Kiat & Sunnah (`/kiat`, `/sunnah`)**: Panduan dan tips praktis amalan sunnah sehari-hari.
4. **Kompas Kiblat (`/kompas`)**: Fitur pencari arah kiblat untuk membantu ibadah.
5. **Peringkat & Gamifikasi (`/peringkat`)**: Papan peringkat keaktifan ibadah dan pelacakan amalan harian.
6. **Blog & Edukasi (`/blog`, `/tentang`)**: Artikel keislaman, biografi tokoh, dan informasi seputar aplikasi.
7. **Panel Admin (`/admin`)**: Manajemen konten aplikasi yang aman dan terintegrasi.

## Teknologi

* **Framework**: Next.js 16 (App Router) & React 19
* **Bahasa**: TypeScript
* **Styling**: Tailwind CSS & Neumorphism Modern Dark/Light Design, Font Arab Amiri
* **Database & ORM**: PostgreSQL & Drizzle ORM
* **Autentikasi**: Firebase Auth

## Menjalankan Proyek Secara Lokal

**Prerequisites:** Node.js / Bun

1. Install dependensi:
   ```bash
   bun install
   ```
   *(atau `npm install`)*
2. Jalankan server pengembangan lokal:
   ```bash
   bun run dev
   ```
   *(atau `npm run dev`)*
3. Buka browser di [http://localhost:3000](http://localhost:3000).
