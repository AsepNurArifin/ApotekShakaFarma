import { Metadata } from "next";
import Link from "next/link";
import { getActivePosters, getPosterProducts } from "@/lib/data";
import { getPosterWALink } from "@/lib/whatsapp";
import ProductCard from "../components/ProductCard";
import { Icons } from "../components/Icons";

export const metadata: Metadata = {
  title: "Promosi",
  description: "Lihat poster promosi terbaru dari Apotek Shaka Farma. Info produk unggulan dan penawaran menarik.",
};

export default function PromosiPage() {
  const activePosters = getActivePosters();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-3">📢 Poster Promosi</h1>
          <p className="text-text-muted max-w-lg mx-auto">Info produk unggulan dan promosi terbaru dari Apotek Shaka Farma. Sama seperti di Story WA & Instagram kami!</p>
        </div>

        <div className="space-y-16">
          {activePosters.map((poster) => {
            const linkedProducts = getPosterProducts(poster);
            return (
              <div key={poster.id} id={poster.id} className="scroll-mt-24">
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                  {/* Poster Header */}
                  <div className="bg-surface-dim p-8 sm:p-12 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icons.Image className="w-8 h-8 text-primary-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-text-primary">{poster.title}</h2>
                        <p className="text-text-secondary text-sm mb-4 max-w-lg">{poster.description}</p>
                        <div className="text-xs text-text-muted">
                          Diposting: {new Date(poster.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions + Products */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-3 mb-6">
                      <a
                        href={getPosterWALink(poster.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 gradient-wa text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity btn-interactive"
                      >
                        <Icons.MessageCircle className="w-4 h-4" /> Tanya via WhatsApp
                      </a>
                    </div>

                    {linkedProducts.length > 0 && (
                      <div>
                        <h3 className="font-bold text-text-primary mb-4">Produk dalam poster ini:</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
          })}
        </div>

        {activePosters.length === 0 && (
          <div className="text-center py-20">
            <Icons.Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-text-primary mb-2">Belum ada poster promosi</h3>
            <p className="text-text-muted text-sm">Nantikan poster promosi terbaru dari kami!</p>
          </div>
        )}
      </div>
    </div>
  );
}
