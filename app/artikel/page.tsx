import { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/public-data";
import { Icons } from "@/app/components/Icons";

export const metadata: Metadata = {
  title: "Artikel & Tips Kesehatan",
  description: "Baca artikel dan tips kesehatan dari Apotek Shaka Farma. Info seputar obat, vitamin, dan gaya hidup sehat.",
};

export default async function ArtikelPage() {
  const articles = await getArticles();

  return (
    <div className="pt-24 pb-24 bg-surface-dim min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 text-primary-500">
            <Icons.BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight">Artikel & Tips Kesehatan</h1>
          <div className="w-[60px] h-1 bg-accent-500 mt-4 mb-4 mx-auto relative z-10"></div>
          <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed">Temukan wawasan terbaru dan panduan kesehatan terpercaya langsung dari tim apoteker ahli kami.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/artikel/${article.slug}`}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group flex flex-col"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-primary-50 via-primary-100 to-white relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 ease-out">
                  <div className="w-20 h-20 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/50 text-primary-500 group-hover:text-primary-600 group-hover:bg-white/60 transition-colors">
                    <Icons.FileText className="w-10 h-10" />
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-bold text-primary-600 uppercase tracking-wider mb-4">
                  <Icons.Calendar className="w-4 h-4" />
                  {new Date(article.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                </div>
                <h2 className="text-xl font-extrabold text-text-primary group-hover:text-primary-600 transition-colors line-clamp-2 mb-3 leading-tight">
                  {article.title}
                </h2>
                <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed mb-6 flex-1">
                  {article.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-primary-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                  Baca Selengkapnya <Icons.ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm mt-8">
            <div className="w-20 h-20 bg-surface-dim rounded-full flex items-center justify-center mx-auto mb-4 text-text-muted">
              <Icons.FileText className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-xl text-text-primary mb-2">Belum ada artikel</h3>
            <p className="text-text-muted">Artikel dan tips kesehatan akan segera hadir.</p>
          </div>
        )}
      </div>
    </div>
  );
}
