import Link from "next/link";
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
      <section className="relative min-h-[92vh] flex items-center gradient-hero overflow-hidden" id="hero">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] rounded-full bg-white/5" />
        <div className="absolute top-[20%] right-[20%] w-[200px] h-[200px] rounded-full bg-white/5 animate-float" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in-up shadow-lg">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              Apotek Terpercaya — Harga Bersahabat
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 animate-fade-in-up tracking-tight drop-shadow-sm">
              Apotek <span className="text-accent-400">Shaka Farma</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 animate-fade-in-up max-w-lg drop-shadow-sm">
              Obat berkualitas, harga bersahabat. Cek produk kami dan chat langsung dengan apoteker via WhatsApp!
            </p>
            <div className="animate-fade-in-up mb-8">
              <SearchBar />
            </div>
            <div className="flex flex-wrap gap-3 animate-fade-in-up">
              <Link href="/katalog" className="inline-flex items-center gap-2 bg-white text-primary-800 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-xl btn-interactive" id="hero-cta-katalog">
                <Icons.Box className="w-5 h-5" /> Lihat Katalog
              </Link>
              <a href={getGeneralWALink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-all shadow-xl btn-interactive" id="hero-cta-wa">
                <Icons.MessageCircle className="w-5 h-5" /> Chat Apoteker
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KATEGORI ===== */}
      <section className="py-16 bg-surface-dim" id="kategori">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Kategori Produk</h2>
            <p className="text-text-muted mt-2">Temukan produk sesuai kebutuhan Anda</p>
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
                <p className="text-text-muted mt-1 text-sm">Lihat promosi terbaru dari Apotek Shaka Farma</p>
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
              <p className="text-text-muted mt-1 text-sm">Produk terfavorit pilihan pelanggan kami</p>
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
      <section className="py-16" id="keunggulan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Kenapa Shaka Farma?</h2>
            <p className="text-text-muted mt-2">Keunggulan yang membuat kami dipercaya ribuan pelanggan</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 card-hover border border-gray-100 text-center">
                <div className="mb-4 flex justify-center">{adv.icon}</div>
                <h3 className="font-bold text-lg text-text-primary mb-2">{adv.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CARA BELANJA ===== */}
      <section className="py-16 bg-surface-dim" id="cara-belanja">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Cara Belanja</h2>
            <p className="text-text-muted mt-2">Mudah, cepat, dan tanpa ribet!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { step: "1", icon: <Icons.Search className="w-8 h-8 mx-auto" />, title: "Cek Website", desc: "Lihat katalog produk dan poster promosi terbaru" },
              { step: "2", icon: <Icons.MessageCircle className="w-8 h-8 mx-auto" />, title: "Chat WA", desc: "Klik tombol WhatsApp, tanya apoteker langsung" },
              { step: "3", icon: <Icons.Store className="w-8 h-8 mx-auto" />, title: "Ambil / Diantar", desc: "Ambil di apotek atau minta diantar ke rumah" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-4 shadow-lg">{s.step}</div>
                <div className="text-primary-600 mb-3">{s.icon}</div>
                <h3 className="font-bold text-lg text-text-primary mb-1">{s.title}</h3>
                <p className="text-sm text-text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      {testimonials.length > 0 && (
        <section className="py-16" id="testimoni">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Apa Kata Pelanggan Kami?</h2>
              <p className="text-text-muted mt-2">Kepuasan pelanggan adalah prioritas utama kami</p>
            </div>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 gradient-hero text-center relative overflow-hidden border-t border-gray-100" id="cta-final">
        <div className="relative max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight drop-shadow-sm">Butuh Obat atau Konsultasi?</h2>
          <p className="text-white/90 mb-8 text-lg drop-shadow-sm">Chat langsung dengan apoteker bersertifikat kami. Kami membalas dalam 15 menit pada jam operasional.</p>
          <a href={getGeneralWALink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-primary-800 font-extrabold px-8 py-4 rounded-xl text-lg hover:bg-gray-50 transition-all shadow-2xl btn-interactive" id="cta-final-wa">
            <Icons.MessageCircle className="w-6 h-6" /> Chat Apoteker Sekarang
          </a>
        </div>
      </section>
    </>
  );
}
