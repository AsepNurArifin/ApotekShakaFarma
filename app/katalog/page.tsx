import { Suspense } from "react";
import { Metadata } from "next";
import KatalogContent from "./KatalogContent";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description: "Katalog lengkap obat, vitamin, suplemen, dan alat kesehatan di Apotek Shaka Farma. Filter berdasarkan kategori, harga, dan promo.",
};

export default function KatalogPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-2" />
            <div className="h-5 w-80 bg-gray-100 rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="aspect-square bg-gray-100 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mt-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <KatalogContent />
    </Suspense>
  );
}
