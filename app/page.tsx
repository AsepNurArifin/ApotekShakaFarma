import Link from "next/link";
import React from "react";
import { Category, CategoryLabel } from "@/lib/types";
import { getGeneralWALink, getPosterWALink } from "@/lib/whatsapp";
import { getPopularProducts, getActivePosters, getPosterProducts, getTestimonials } from "@/lib/public-data";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import TestimonialCarousel from "./components/TestimonialCarousel";
import { Icons, getCategoryIcon } from "./components/Icons";

const categories = Object.values(Category);

const advantages = [
  { icon: <Icons.Wallet className="w-10 h-10 text-primary-600 mx-auto" />, title: "Harga Bersahabat", desc: "Harga kompetitif untuk semua produk" },
  { icon: <Icons.UserCheck className="w-10 h-10 text-primary-600 mx-auto" />, title: "Apoteker Bersertifikat", desc: "Dilayani oleh apoteker profesional" },
  { icon: <Icons.Box className="w-10 h-10 text-primary-600 mx-auto" />, title: "Stok Lengkap", desc: "Ribuan produk obat, vitamin, dan alkes" },
  { icon: <Icons.MessageCircle className="w-10 h-10 text-primary-600 mx-auto" />, title: "Konsultasi Gratis", desc: "Tanya apoteker kapan saja via WA" },
  { icon: <Icons.ShieldCheck className="w-10 h-10 text-primary-600 mx-auto" />, title: "Privasi Terjaga", desc: "Data konsultasi Anda aman bersama kami" },
];

export default async function Home() {
  const [popularProducts, activePosters, testimonials] = await Promise.all([
    getPopularProducts(8),
    getActivePosters(),
    getTestimonials(),
  ]);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pb-10" id="hero" style={{ background: 'linear-gradient(180deg, #1E40AF 0%, #3B82F6 60%, #FFFFFF 100%)' }}>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
            {/* Logo - Mobile Only */}
            <div className="mb-6 md:hidden">
              <div className="relative w-24 h-24 rounded-full bg-white p-2 shadow-lg">
                <img src="/logo.jpeg" alt="Apotek Shaka Farma" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            
            {/* Headline */}
            <h1 className="text-[28px] md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] mb-3 tracking-tight px-4">
              Apotek <span className="text-accent-400">Shaka Farma</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-base md:text-xl text-blue-100 leading-relaxed mb-6 px-5 md:px-0 max-w-lg">
              Obat berkualitas, harga bersahabat. Cek produk kami dan chat langsung dengan apoteker via WhatsApp!
            </p>
            
            {/* CTA Buttons - Stacked on Mobile, Side by Side on Desktop */}
            <div className="flex flex-col md:flex-row gap-3 w-full px-6 md:px-0 max-w-md">
              <Link 
                href="/katalog" 
                className="flex items-center justify-center gap-2 bg-accent-500 text-primary-800 font-bold h-[52px] rounded-[14px] hover:bg-accent-400 transition-colors shadow-[0_4px_12px_rgba(245,158,11,0.4)] active:scale-[0.98] w-full md:flex-1" 
                id="hero-cta-katalog"
              >
                <Icons.Box className="w-5 h-5" /> Lihat Katalog
              </Link>
              <a 
                href={getGeneralWALink()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 border-2 border-white text-white font-bold h-[52px] rounded-[14px] hover:bg-white/10 transition-all active:scale-[0.98] w-full md:flex-1" 
                id="hero-cta-wa"
              >
                <Icons.MessageCircle className="w-5 h-5" /> Chat Apoteker
              </a>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[40px] sm:h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,93.2,105.22,86.74,156.4,75.9,212.8,63.9,268.4,67.6,321.39,56.44Z" fill="#FFFFFF"></path>
          </svg>
        </div>
      </section>

      {/* ===== KATEGORI ===== */}
      <section className="py-16 bg-surface-dim" id="kategori">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Kategori Produk</h2>
            <div className="w-[60px] h-1 bg-accent-500 mt-3 mx-auto"></div>
            <p className="text-text-muted mt-3">Temukan produk sesuai kebutuhan Anda</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat} href={`/katalog?category=${cat}`} className="bg-white rounded-2xl p-5 text-center card-hover border border-gray-100 group" id={`cat-${cat.toLowerCase()}`}>
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(cat, "w-10 h-10 text-primary-500")}
                </div>
                <div className="font-bold text-sm text-text-primary">{CategoryLabel[cat]}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POSTER PROMOSI ===== */}
      {activePosters.length > 0 && (
        <section className="py-16" id="poster-promosi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                  <Icons.Megaphone className="w-3.5 h-3.5" /> Info Promosi
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Poster Promosi Terbaru</h2>
                <div className="w-[60px] h-1 bg-accent-500 mt-3"></div>
                <p className="text-text-muted mt-3 text-sm">Lihat promosi terbaru dari Apotek Shaka Farma</p>
              </div>
              <Link href="/promosi" className="text-primary-600 font-bold text-sm hover:text-primary-700 hidden sm:block">
                Lihat Semua →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePosters.slice(0, 3).map((poster) => (
                <div key={poster.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover group">
                  <Link href={`/promosi#${poster.id}`}>
                    <div className="aspect-4/5 bg-linear-to-br from-primary-100 to-primary-200 flex items-center justify-center relative img-zoom-container">
                      {poster.imageUrl ? (
                        <img src={poster.imageUrl} alt={poster.title} className="w-full h-full object-cover img-zoom" />
                      ) : (
                        <div className="text-center p-6 img-zoom flex flex-col items-center">
                          <Icons.Image className="w-16 h-16 text-primary-300 mb-4" />
                          <p className="font-bold text-primary-700 text-lg">{poster.title}</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary-700/0 group-hover:bg-primary-700/5 transition-colors" />
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link href={`/promosi#${poster.id}`}>
                      <h3 className="font-bold text-text-primary group-hover:text-primary-600 transition-colors mb-1">{poster.title}</h3>
                      <p className="text-sm text-text-muted line-clamp-2">{poster.description}</p>
                    </Link>
                    <div className="mt-3 flex items-center gap-2">
                      <a href={getPosterWALink(poster.title)} target="_blank" rel="noopener noreferrer" className="text-xs gradient-wa text-white font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity btn-interactive flex items-center gap-1">
                        <Icons.MessageCircle className="w-3.5 h-3.5" /> Tanya via WA
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6 sm:hidden">
              <Link href="/promosi" className="text-primary-600 font-bold text-sm">Lihat Semua →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== PRODUK POPULER ===== */}
      <section className="py-16 bg-surface-dim" id="produk-populer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Produk Paling Dicari</h2>
              <div className="w-[60px] h-1 bg-accent-500 mt-3"></div>
              <p className="text-text-muted mt-3 text-sm">Produk terfavorit pilihan pelanggan kami</p>
            </div>
            <Link href="/katalog" className="text-primary-600 font-bold text-sm hover:text-primary-700 hidden sm:block">Lihat Semua →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <Link href="/katalog" className="text-primary-600 font-bold text-sm">Lihat Semua →</Link>
          </div>
        </div>
      </section>

      {/* ===== KEUNGGULAN ===== */}
      <section className="py-12 md:py-16 bg-white" id="keunggulan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Kenapa Shaka Farma?</h2>
            <div className="w-12 h-[3px] bg-accent-500 mt-3 mx-auto rounded-sm"></div>
            <p className="text-text-muted mt-3">Keunggulan yang membuat kami dipercaya ribuan pelanggan</p>
          </div>
          
          {/* Mobile: Vertical Stack, Desktop: Grid */}
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((adv, i) => (
              <div 
                key={i} 
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm active:scale-[0.98] transition-transform duration-150"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  {React.cloneElement(adv.icon, { className: "w-6 h-6 text-primary-800" })}
                </div>
                
                {/* Title */}
                <h3 className="font-semibold text-lg text-gray-900 mb-1.5">{adv.title}</h3>
                
                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CARA BELANJA ===== */}
      <section className="py-12 md:py-16 bg-primary-800" id="cara-belanja">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-[22px] md:text-3xl font-bold text-white">Cara Belanja</h2>
            <div className="w-12 h-[3px] bg-accent-500 mt-3 mx-auto rounded-sm"></div>
            <p className="text-blue-100 mt-3">Mudah, cepat, dan tanpa ribet!</p>
          </div>
          
          {/* Mobile: Vertical Timeline, Desktop: Horizontal Grid */}
          <div className="max-w-xs mx-auto md:max-w-4xl">
            {/* Mobile Layout */}
            <div className="flex flex-col md:hidden space-y-0">
              {[
                { step: "1", icon: <Icons.Search className="w-5 h-5" />, title: "Cek Website", desc: "Lihat katalog produk dan poster promosi terbaru" },
                { step: "2", icon: <Icons.MessageCircle className="w-5 h-5" />, title: "Chat WA", desc: "Klik tombol WhatsApp, tanya apoteker langsung" },
                { step: "3", icon: <Icons.Store className="w-5 h-5" />, title: "Ambil / Diantar", desc: "Ambil di apotek atau minta diantar ke rumah" },
              ].map((s, idx) => (
                <div key={s.step}>
                  <div className="flex items-start gap-4">
                    {/* Step Circle */}
                    <div className="w-10 h-10 rounded-full bg-accent-500 text-primary-800 font-bold text-base flex items-center justify-center shrink-0">
                      {s.step}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-blue-200">{s.icon}</div>
                        <h3 className="font-semibold text-base text-white">{s.title}</h3>
                      </div>
                      <p className="text-sm text-blue-100 leading-snug">{s.desc}</p>
                    </div>
                  </div>
                  
                  {/* Connecting Line */}
                  {idx < 2 && (
                    <div className="w-0.5 h-10 bg-blue-400 ml-[19px]"></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-8">
              {[
                { step: "1", icon: <Icons.Search className="w-8 h-8" />, title: "Cek Website", desc: "Lihat katalog produk dan poster promosi terbaru" },
                { step: "2", icon: <Icons.MessageCircle className="w-8 h-8" />, title: "Chat WA", desc: "Klik tombol WhatsApp, tanya apoteker langsung" },
                { step: "3", icon: <Icons.Store className="w-8 h-8" />, title: "Ambil / Diantar", desc: "Ambil di apotek atau minta diantar ke rumah" },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent-500 text-primary-800 text-2xl font-extrabold flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {s.step}
                  </div>
                  <div className="text-primary-100 mb-3 flex justify-center">{s.icon}</div>
                  <h3 className="font-bold text-lg text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-blue-100">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      {testimonials.length > 0 && (
        <section className="py-16" id="testimoni">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Apa Kata Pelanggan Kami?</h2>
              <div className="w-[60px] h-1 bg-accent-500 mt-3 mx-auto"></div>
              <p className="text-text-muted mt-3">Kepuasan pelanggan adalah prioritas utama kami</p>
            </div>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* ===== CTA FINAL ===== */}
      <section className="py-12 md:py-20 bg-accent-100 text-center relative overflow-hidden" id="cta-final">
        <div className="relative max-w-md mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">Butuh Obat atau Konsultasi?</h2>
          <p className="text-base text-slate-700 mb-6 leading-relaxed">Chat langsung dengan apoteker bersertifikat kami. Kami membalas dalam 15 menit pada jam operasional.</p>
          
          {/* Big CTA Button */}
          <a 
            href={getGeneralWALink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center gap-2 bg-pharmacy-500 text-white font-bold text-base h-14 w-full max-w-xs rounded-2xl shadow-[0_8px_24px_rgba(16,185,129,0.35)] hover:bg-pharmacy-600 active:bg-pharmacy-700 transition-colors duration-150" 
            id="cta-final-wa"
          >
            <Icons.MessageCircle className="w-6 h-6" /> Chat Apoteker Sekarang
          </a>
          
          {/* Disclaimer */}
          <p className="text-xs text-slate-500 mt-5 leading-relaxed">
            Layanan konsultasi gratis tersedia pada jam operasional apotek. Response time dapat bervariasi tergantung antrian.
          </p>
        </div>
      </section>
    </>
  );
}
