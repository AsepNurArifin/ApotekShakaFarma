import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getProductById } from "@/lib/public-data";
import ProductCard from "../../components/ProductCard";
import { Icons } from "../../components/Icons";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArtikelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  // Fetch related products
  const relatedProductPromises = (article.relatedProductIds || []).map((id) => getProductById(id));
  const relatedResults = await Promise.all(relatedProductPromises);
  const relatedProducts = relatedResults.filter(Boolean) as NonNullable<Awaited<ReturnType<typeof getProductById>>>[];

  return (
    <div className="pt-24 pb-16 bg-surface-dim min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-primary-600">Beranda</Link>
          <span>/</span>
          <Link href="/artikel" className="hover:text-primary-600">Artikel</Link>
          <span>/</span>
          <span className="text-text-primary font-medium truncate">{article.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-primary-600 font-medium mb-3">
            <Icons.Calendar className="w-4 h-4" />
            {new Date(article.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight mb-4">{article.title}</h1>
          <p className="text-lg text-text-secondary">{article.excerpt}</p>
        </div>

        {/* Image */}
        <div className="aspect-video bg-gradient-to-br from-primary-50 via-primary-100 to-white rounded-3xl flex items-center justify-center mb-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 mix-blend-overlay" />
          <div className="w-24 h-24 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/50 text-primary-500">
            <Icons.FileText className="w-12 h-12" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 mb-12">
          <div className="prose prose-lg max-w-none">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-text-secondary leading-relaxed mb-4 whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 mb-12 pt-6 border-t border-gray-200">
          <span className="text-sm font-bold text-text-primary">Bagikan:</span>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${article.title} - Baca di Apotek Shaka Farma`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-wa-green/10 text-wa-green hover:bg-wa-green hover:text-white transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-text-primary">Produk Terkait</h2>
          <div className="w-[60px] h-1 bg-accent-500 mt-3 mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
