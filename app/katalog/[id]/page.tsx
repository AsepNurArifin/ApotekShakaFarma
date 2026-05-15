import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/lib/data";
import { CategoryLabel, StockLabel } from "@/lib/types";
import { formatPrice, getProductWALink } from "@/lib/whatsapp";
import ProductCard from "../../components/ProductCard";
import { Icons, getCategoryIcon } from "../../components/Icons";

function getCatBadge(cat: string) {
  const m: Record<string, string> = { OB: "badge-ob", OBT: "badge-obt", SUPLEMEN: "badge-suplemen", HERBAL: "badge-herbal", ALKES: "badge-alkes", IBU_ANAK: "badge-ibu-anak" };
  return m[cat] || "badge-ob";
}

function getStockBadge(s: string) {
  const m: Record<string, string> = { TERSEDIA: "badge-stock-tersedia", TERBATAS: "badge-stock-terbatas", HABIS: "badge-stock-habis" };
  return m[s] || "badge-stock-tersedia";
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Produk Tidak Ditemukan" };
  return {
    title: product.name,
    description: `${product.description} — Tersedia di Apotek Shaka Farma. Harga: ${formatPrice(product.price)}`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const waLink = getProductWALink(product.name, product.price);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-primary-600">Beranda</Link>
          <span>/</span>
          <Link href="/katalog" className="hover:text-primary-600">Katalog</Link>
          <span>/</span>
          <span className="text-text-primary font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div className="bg-surface-dim rounded-2xl aspect-square flex items-center justify-center img-zoom-container group">
            {getCategoryIcon(product.category, "w-40 h-40 text-gray-200 img-zoom")}
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`badge ${getCatBadge(product.category)}`}>{CategoryLabel[product.category]}</span>
              <span className={`badge ${getStockBadge(product.stockStatus)}`}>{StockLabel[product.stockStatus]}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-text-primary mb-3">{product.name}</h1>
            <div className="mb-6">
              <span className="text-3xl font-extrabold text-primary-700">{formatPrice(product.price)}</span>
            </div>
            <div className="mb-6">
              <h3 className="font-bold text-sm text-text-primary mb-2">Deskripsi</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{product.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-primary-50 rounded-xl p-4">
                <h4 className="font-bold text-xs text-primary-700 uppercase mb-1">Indikasi</h4>
                <p className="text-sm text-text-secondary">{product.indication}</p>
              </div>
              <div className="bg-primary-50 rounded-xl p-4">
                <h4 className="font-bold text-xs text-primary-700 uppercase mb-1">Dosis</h4>
                <p className="text-sm text-text-secondary">{product.dosage}</p>
              </div>
            </div>
            {product.symptoms.length > 0 && (
              <div className="mb-6">
                <h4 className="font-bold text-xs text-text-muted uppercase mb-2">Gejala Terkait</h4>
                <div className="flex flex-wrap gap-2">
                  {product.symptoms.map((s) => (
                    <Link key={s} href={`/katalog?q=${encodeURIComponent(s)}`} className="text-xs bg-gray-100 text-text-secondary px-3 py-1.5 rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors">{s}</Link>
                  ))}
                </div>
              </div>
            )}
            {product.stockStatus !== "HABIS" ? (
              <a href={waLink} target="_blank" rel="noopener noreferrer" id="product-cta-wa" className="inline-flex items-center gap-3 gradient-wa text-white font-extrabold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity shadow-xl w-full sm:w-auto justify-center btn-interactive">
                <Icons.MessageCircle className="w-6 h-6" /> Tanya Obat Ini via WA
              </a>
            ) : (
              <button disabled className="w-full sm:w-auto bg-gray-200 text-gray-500 font-bold px-8 py-4 rounded-xl text-lg cursor-not-allowed">Stok Habis</button>
            )}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
              <Icons.AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed"><strong>Disclaimer:</strong> Informasi ini tidak menggantikan saran medis profesional. Konsultasikan dengan apoteker kami sebelum menggunakan obat.</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-extrabold text-text-primary mb-6">Produk Terkait</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
