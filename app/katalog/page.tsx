import { Suspense } from "react";
import { Metadata } from "next";
import { getProducts } from "@/lib/public-data";
import KatalogContent from "./KatalogContent";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description: "Katalog lengkap obat, vitamin, suplemen, dan alat kesehatan di Apotek Shaka Farma. Filter berdasarkan kategori, harga, dan promo.",
};

export const revalidate = 0;

export default async function KatalogPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={
      <div className="pt-24 pb-24 bg-surface-dim min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Skeleton Header */}
          <div className="text-center mb-12">
            <div className="h-12 w-64 bg-gray-200 rounded-2xl animate-pulse mx-auto mb-4" />
            <div className="h-6 w-96 bg-gray-200/60 rounded-xl animate-pulse mx-auto" />
          </div>
          
          {/* Skeleton Search Bar */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl shadow-primary-900/5 border border-gray-100 mb-10 h-24 flex items-center gap-4">
            <div className="flex-1 h-14 bg-gray-100 rounded-2xl animate-pulse" />
            <div className="w-48 h-14 bg-gray-100 rounded-2xl animate-pulse hidden sm:block" />
            <div className="w-48 h-14 bg-gray-100 rounded-2xl animate-pulse hidden lg:block" />
          </div>

          <div className="h-5 w-32 bg-gray-200 rounded-lg animate-pulse mb-6" />

          {/* Skeleton Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <div className="aspect-square bg-gray-100 animate-pulse" />
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-5 w-full bg-gray-300 rounded-md animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse flex-1" />
                  <div className="h-6 w-28 bg-gray-300 rounded-md animate-pulse mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <KatalogContent products={products} />
    </Suspense>
  );
}
