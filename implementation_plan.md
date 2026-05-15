# Apotek Shaka Farma — Website Promosi

Website landing page promosi untuk Apotek Shaka Farma, dibangun sebagai tujuan klik dari WhatsApp Story & Instagram Story.

## Prinsip Utama
**Lihat → Tertarik → Chat → Beli di Apotek / Delivery via WhatsApp**

---

## User Review Required

> [!IMPORTANT]
> **Nomor WhatsApp:** Saya akan menggunakan placeholder `6281234567890`. Tolong berikan nomor WhatsApp apotek yang benar agar CTA berfungsi.

> [!IMPORTANT]
> **Data Produk:** Karena belum ada koneksi Supabase, saya akan membuat **mock data** (data contoh) untuk ~20 produk dan 3 promo. Nanti bisa diganti ke Supabase saat production.

> [!WARNING]
> **Tailwind CSS:** PRD meminta Tailwind CSS + Shadcn UI. Project sudah menggunakan Tailwind v4. Saya akan menggunakan Tailwind v4 langsung tanpa Shadcn UI (karena Shadcn memerlukan setup tambahan yang signifikan). Komponen akan dibuat custom dengan styling premium. Konfirmasi jika Anda ingin Shadcn UI diinstall.

---

## Open Questions

1. Apakah ada **logo Apotek Shaka Farma** (SVG/PNG) yang sudah ready? Jika tidak, saya akan generate placeholder.
2. Apakah ada **foto apotek, tim, atau produk** yang ingin digunakan? Jika tidak, saya akan generate dengan AI.
3. Apakah ada **alamat lengkap, jam operasional, dan nomor izin apotek** yang harus ditampilkan?

---

## Proposed Changes

### Phase 1: Foundation & Design System

#### [MODIFY] [globals.css](file:///c:/Users/Arifi/Desktop/ads_shaka_farma/app/globals.css)
- Setup design tokens: color palette (hijau apotek), typography (Inter/Plus Jakarta Sans), spacing
- Custom CSS variables untuk tema apotek
- Utility classes global (gradients, shadows, animations)
- Mobile-first responsive breakpoints

#### [MODIFY] [layout.tsx](file:///c:/Users/Arifi/Desktop/ads_shaka_farma/app/layout.tsx)
- Update metadata untuk SEO (title, description, keywords)
- Ganti font ke Inter/Plus Jakarta Sans
- Set lang="id" (Bahasa Indonesia)
- Include Navbar & Footer sebagai layout components
- Include Floating WhatsApp Button

#### [NEW] app/components/Navbar.tsx
- Logo + nama apotek
- Navigation links: Beranda, Katalog, Promo, Tentang Kami
- Mobile hamburger menu
- Sticky on scroll dengan glassmorphism effect

#### [NEW] app/components/Footer.tsx
- Info apotek: alamat, jam operasional, kontak
- Nomor izin apotek & SIPA
- Quick links (Katalog, Promo, Tentang)
- Social media links (Instagram, WhatsApp)
- Disclaimer medis
- Copyright

#### [NEW] app/components/WhatsAppFloat.tsx
- Floating sticky button di pojok kanan bawah
- Icon WhatsApp + teks "Chat Apoteker"
- Animasi pulse untuk menarik perhatian
- Buka WA dengan template pesan general

---

### Phase 2: Landing Page (Halaman Utama)

#### [MODIFY] [page.tsx](file:///c:/Users/Arifi/Desktop/ads_shaka_farma/app/page.tsx)
- Hero section dengan banner promo aktif
- Search bar produk
- Grid kategori produk (6 kategori)
- Section "Promo Hari Ini" dengan countdown timer
- Section "Produk Paling Dicari"
- Keunggulan Shaka Farma (6 poin)
- Testimoni pelanggan (carousel)

#### [NEW] app/components/HeroBanner.tsx
- Banner besar promo utama
- Gradient overlay + CTA button
- Auto-slide jika >1 banner

#### [NEW] app/components/SearchBar.tsx
- Input search dengan icon
- Pencarian berdasarkan nama obat, gejala, kategori
- Redirect ke halaman katalog dengan query

#### [NEW] app/components/CategoryGrid.tsx
- 6 kategori: Obat Bebas, Obat Bebas Terbatas, Suplemen, Herbal, Alat Kesehatan, Ibu & Anak
- Card dengan icon + nama kategori
- Link ke katalog dengan filter kategori

#### [NEW] app/components/PromoSection.tsx
- Grid promo aktif
- Countdown timer untuk flash sale
- Label diskon (%, bundle, fixed)

#### [NEW] app/components/ProductCard.tsx
- Thumbnail produk
- Nama, harga normal, harga promo (coret)
- Badge kategori (OB/OBT/Suplemen/Herbal)
- Label stok (Tersedia/Terbatas/Habis)
- Badge promo (diskon %)
- CTA "Tanya via WA"

#### [NEW] app/components/TestimonialCarousel.tsx
- Carousel testimoni pelanggan
- Nama, rating (bintang), isi review
- Auto-slide

#### [NEW] app/components/AdvantageSection.tsx
- 6 poin keunggulan: Harga bersahabat, Apoteker bersertifikat, Stok lengkap, Bisa antar, Konsultasi gratis, Privasi terjaga
- Icon + judul + deskripsi singkat

---

### Phase 3: Katalog & Detail Produk

#### [NEW] app/katalog/page.tsx
- Grid produk lengkap
- Filter: kategori, harga, promo aktif, stok
- Sort: harga, popularitas, terbaru
- Search terintegrasi
- Pagination/infinite scroll

#### [NEW] app/katalog/[id]/page.tsx
- Detail produk: foto besar, nama, deskripsi, indikasi, dosis
- Harga + harga promo
- Label kategori + stok
- CTA "Tanya Obat Ini via WA" dengan template pesan
- Produk terkait
- Disclaimer medis wajib
- Share button

---

### Phase 4: Promo Detail, Tentang, & Artikel

#### [NEW] app/promo/page.tsx
- Daftar semua promo aktif
- Card promo dengan countdown

#### [NEW] app/promo/[id]/page.tsx
- Detail promo: banner, deskripsi, S&K
- Countdown timer
- Daftar produk dalam promo
- CTA "Klaim Promo Ini" via WA

#### [NEW] app/tentang/page.tsx
- Profil Shaka Farma (sejarah, visi)
- Tim apoteker
- Legalitas & izin (SIPA, izin apotek)
- Google Maps embed (lokasi)
- Jam operasional + indikator "Buka Sekarang"
- Cara belanja (3 langkah)
- Kontak lengkap

#### [NEW] app/artikel/page.tsx
- Daftar artikel/tips kesehatan
- Card artikel dengan thumbnail, judul, snippet

#### [NEW] app/artikel/[id]/page.tsx
- Konten artikel
- Rekomendasi produk terkait
- Share button

---

### Phase 5: Data Layer & Utilities

#### [NEW] lib/data.ts
- Mock data produk (~20 produk dengan berbagai kategori)
- Mock data promo (3 promo aktif)
- Mock data testimoni (5 testimoni)
- Mock data artikel (3 artikel)
- Helper functions: filter, search, sort

#### [NEW] lib/types.ts
- TypeScript interfaces: Product, Promo, PromoProduct, Inquiry, Testimonial, Article
- Enum types: Category, StockStatus, DiscountType

#### [NEW] lib/whatsapp.ts
- Helper untuk generate WhatsApp link
- Template pesan per konteks (produk, promo, general)
- URL encoding

#### [NEW] app/components/CountdownTimer.tsx
- Client component countdown timer
- Menghitung sisa waktu promo berakhir

#### [NEW] app/components/ShareButton.tsx
- Share ke WhatsApp & copy link

---

## Verification Plan

### Automated Tests
1. `npm run build` — Pastikan build berhasil tanpa error
2. `npm run dev` — Run dev server dan test semua halaman
3. Browser test — Navigasi semua halaman, test WhatsApp links, responsive design

### Manual Verification
- Test di browser: semua halaman load dengan benar
- Test responsive: mobile, tablet, desktop
- Test WhatsApp CTA: link terbuka dengan template pesan yang benar
- Test filter & search di katalog
- Test countdown timer
- Verify disclaimer medis ada di setiap halaman produk
- Verify footer menampilkan info legalitas
