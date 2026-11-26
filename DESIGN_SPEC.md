# Shahih Sunnah - Web App Design Specification (PSD / Layout Blueprint)

Dokumen ini mendefinisikan rancangan visual, hierarki warna, tipografi, dan tata letak UI (yang setara dengan file desain Photoshop / PSD) untuk aplikasi **Shahih Sunnah**.

---

## 1. Palet Warna (Color Palette)
Aplikasi mengusung tema **Neumorphism Modern** dengan nuansa Islami yang tenang (Hijau Emerald, Dark Slate, dan Soft Cream).

* **Primary / Emerald (Aksen Utama)**:
  * `#065f46` (Emerald 800 - Teks/Tombol Utama)
  * `#10b981` (Emerald 500 - Indikator & Badge Aktif)
  * `#d1fae5` (Emerald 100 - Background Soft / Hover State)
* **Dark Mode Backgrounds**:
  * `#0f172a` (Slate 900 - Background Utama)
  * `#1e293b` (Slate 800 - Card / Neumorphic Surface)
  * `#334155` (Slate 700 - Border / Divider)
* **Light Mode Backgrounds**:
  * `#f8fafc` (Slate 50 - Background Utama)
  * `#ffffff` (White - Card Surface)
  * `#e2e8f0` (Slate 200 - Border / Divider)
* **Text Colors**:
  * Dark mode text: `#f8fafc` (Primary), `#94a3b8` (Muted)
  * Light mode text: `#0f172a` (Primary), `#64748b` (Muted)

---

## 2. Tipografi (Typography)
* **Judul & Teks Umum**: `Bricolage Grotesque` / `Sans-Serif` modern untuk kesan bersih dan elegan.
* **Teks Arab / Ayat / Zikir**: `Amiri` (Google Fonts), ukuran besar, line-height longgar (`leading-loose`), memastikan keterbacaan teks Arab yang sangat baik.
* **Angka / Counter**: `JetBrains Mono` untuk penghitung zikir (`counter`).

---

## 3. Komponen & Struktur Halaman (Artboards)

### A. Beranda (`/`)
* **Hero Banner**: Judul aplikasi, kutipan hadis harian, tombol cepat ke "Zikir Pagi & Petang".
* **Grid Fitur Cepat**: Kartu Neumorphic interaktif untuk Zikir, Hadis, Kompas, dan Peringkat.
* **Ringkasan Aktivitas / Streak**: Widget penghitung hari konsisten ibadah pengguna.

### B. Halaman Zikir Pagi & Petang (`/zikir`)
* **Tab Switcher**: Toggle antara "Pagi", "Petang", dan "Setelah Sholat".
* **Card Zikir**:
  * Judul Zikir & Keutamaan (Fadilah).
  * Teks Arab (`Amiri`) dengan harakat lengkap.
  * Terjemahan Bahasa Indonesia.
  * Counter Interaktif (Tombol ketuk dengan animasi dan efek getar/suara opsional).

### C. Halaman Hadis & Sunnah (`/hadis` & `/sunnah`)
* **Search & Filter Bar**: Pencarian berdasarkan topik, perawi, atau kategori.
* **List Hadis**: Kartu kutipan dengan nomor hadis, status kesahihan (Shahih), matan, dan terjemahan.

### D. Panel Navigasi (Navbar & Footer)
* **Sticky Header / Bottom Nav (Mobile)**: Ikon cepat menuju Beranda, Zikir, Hadis, Kiat, dan Profil.
* **Footer**: Informasi hak cipta, tautan tentang aplikasi, dan navigasi situs.
Update commit message sesuai instruksi.
