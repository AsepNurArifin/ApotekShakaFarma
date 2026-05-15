import { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Artikel & Tips Kesehatan",
  description: "Baca artikel dan tips kesehatan dari Apotek Shaka Farma. Info seputar obat, vitamin, dan gaya hidup sehat.",
};

export default function ArtikelPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-3">📚 Artikel & Tips Kesehatan</h1>
          <p className="text-text-muted max-w-lg mx-auto">Informasi kesehatan terpercaya dari tim apoteker kami</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/artikel/${article.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover group"
            >
              <div className="aspect-video bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                <span className="text-5xl">📝</span>
              </div>
              <div className="p-5">
                <div className="text-xs text-text-muted mb-2">
                  {new Date(article.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </div>
                <h2 className="font-bold text-text-primary group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-text-muted line-clamp-3 leading-relaxed">{article.excerpt}</p>
                <div className="mt-4 text-primary-600 font-bold text-sm">Baca Selengkapnya →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
