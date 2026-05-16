import { Metadata } from "next";
import Link from "next/link";
import { getActivePosters, getPosterProducts } from "@/lib/public-data";
import { getPosterWALink } from "@/lib/whatsapp";
import ProductCard from "../components/ProductCard";
import { Icons } from "../components/Icons";

export const metadata: Metadata = {
  title: "Promosi",
  description: "Lihat poster promosi terbaru dari Apotek Shaka Farma. Info produk unggulan dan penawaran menarik.",
};

export default async function PromosiPage() {
  const activePosters = await getActivePosters();

  return (
    <div className="pt-24 pb-24 bg-surface-dim min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-primary-200/40 to-pharmacy-200/40 rounded-full blur-[100px] opacity-60 pointer-events-none" />
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl shadow-xl shadow-primary-900/20 mb-6 text-white transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <Icons.Megaphone className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-text-primary tracking-tight relative z-10">Poster Promosi</h1>
          <div className="w-[60px] h-1 bg-accent-500 mt-6 mb-6 mx-auto relative z-10"></div>
          <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed relative z-10">
            Penawaran spesial, diskon menarik, dan produk unggulan terbaru dari Apotek Shaka Farma. Segera dapatkan sebelum kehabisan!
          </p>
        </div>

        <div className="space-y-16">
          {await Promise.all(activePosters.map(async (poster) => {
            const linkedProducts = await getPosterProducts(poster);
            return (
              <div key={poster.id} id={poster.id} className="scroll-mt-32">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-900/5 border border-gray-100/50">
                  
                  {/* Poster Graphic Header */}
                  <div className="relative overflow-hidden aspect-[21/9] sm:aspect-[21/7] bg-gradient-to-tr from-primary-900 via-primary-800 to-primary-950 flex items-center justify-center p-8">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 mix-blend-overlay" />
                    
                    {poster.imageUrl ? (
                      <img src={poster.imageUrl} alt={poster.title} className="absolute inset-0 w-full h-full object-cover opacity-60 blur-sm mix-blend-luminosity" />
                    ) : null}

                    {/* Content inside header */}
                    <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center flex-shrink-0 shadow-2xl overflow-hidden">
                        {poster.imageUrl ? (
                          <img src={poster.imageUrl} alt={poster.title} className="w-full h-full object-cover" />
                        ) : (
                          <Icons.Image className="w-12 h-12 text-white/50" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/30 backdrop-blur-md border border-primary-400/30 rounded-full text-white text-xs font-bold uppercase tracking-wider mb-4">
                          <Icons.Tag className="w-3.5 h-3.5" /> Promo Terbatas
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 text-white leading-tight drop-shadow-md">{poster.title}</h2>
                        <p className="text-primary-100 text-lg sm:text-xl max-w-2xl drop-shadow-sm line-clamp-2">{poster.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions + Products Body */}
                  <div className="p-8 sm:p-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-10 border-b border-gray-100">
                      <div>
                        <p className="text-sm text-text-muted font-medium mb-1">Diposting pada</p>
                        <p className="font-bold text-text-primary text-lg flex items-center gap-2">
                          <Icons.Calendar className="w-5 h-5 text-primary-400" />
                          {new Date(poster.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                      
                      {/* Animated CTA */}
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-pharmacy-400 to-pharmacy-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse" />
                        <a
                          href={getPosterWALink(poster.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-flex items-center gap-3 bg-gradient-to-br from-pharmacy-500 to-pharmacy-700 text-white font-extrabold px-8 py-4 rounded-2xl text-lg hover:shadow-xl hover:shadow-pharmacy-500/20 hover:-translate-y-1 transition-all"
                        >
                          <Icons.MessageCircle className="w-6 h-6 animate-bounce" /> Tanya Promo via WhatsApp
                        </a>
                      </div>
                    </div>

                    {linkedProducts.length > 0 && (
                      <div>
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2 bg-primary-50 rounded-xl text-primary-600">
                            <Icons.Package className="w-6 h-6" />
                          </div>
                          <h3 className="text-2xl font-extrabold text-text-primary">Produk dalam Promo Ini</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                          {linkedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }))}
        </div>

        {activePosters.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-primary-900/5 relative overflow-hidden mt-8">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary-50/50" />
            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-300 relative z-10">
              <Icons.Megaphone className="w-12 h-12" />
            </div>
            <h3 className="font-extrabold text-3xl text-text-primary mb-3 relative z-10">Belum ada promosi</h3>
            <p className="text-text-muted text-lg max-w-md mx-auto relative z-10">Kami sedang menyiapkan penawaran menarik. Nantikan poster promosi terbaru dari kami!</p>
          </div>
        )}
      </div>
    </div>
  );
}
