"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Product, Category, CategoryLabel } from "@/lib/types";
import ProductCard from "../components/ProductCard";
import { Icons } from "@/app/components/Icons";

type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

export default function KatalogContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const initialCat = searchParams.get("category") as Category | null;

  const [query, setQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState<Category | "">(initialCat || "");
  const [sort, setSort] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.symptoms.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      default: result.sort((a, b) => b.viewCount - a.viewCount);
    }
    return result;
  }, [query, selectedCategory, sort, products]);

  return (
    <div className="pt-24 pb-24 bg-surface-dim min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header section */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary-200/50 rounded-[100%] blur-[80px] opacity-40 pointer-events-none" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight relative z-10">Katalog Produk</h1>
          <div className="w-[60px] h-1 bg-accent-500 mt-4 mb-4 mx-auto relative z-10"></div>
          <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed relative z-10">Temukan obat, vitamin, dan alat kesehatan terlengkap dengan harga terbaik.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl shadow-primary-900/5 border border-gray-100 mb-10 relative z-10">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-primary-400">
                <Icons.Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Cari nama obat, vitamin, atau keluhan (cth: batuk)..." 
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-surface-dim border border-transparent focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-500/10 outline-none text-text-primary placeholder:text-text-muted font-medium transition-all"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute inset-y-0 right-5 flex items-center text-gray-400 hover:text-gray-600">
                  <Icons.Cross className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className="lg:hidden w-full flex items-center justify-center gap-2 bg-primary-50 text-primary-700 font-bold py-3.5 rounded-2xl hover:bg-primary-100 transition-colors"
            >
              <Icons.Filter className="w-5 h-5" /> {showFilters ? "Tutup Filter" : "Filter & Urutkan"}
            </button>

            {/* Filters (Desktop or Expanded Mobile) */}
            <div className={`${showFilters ? "flex" : "hidden lg:flex"} flex-col sm:flex-row w-full lg:w-auto gap-3 items-center`}>
              <div className="relative w-full sm:w-auto min-w-[200px]">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value as Category | "")} 
                  className="w-full appearance-none bg-surface-dim border border-transparent hover:border-gray-200 focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-500/10 rounded-2xl px-5 py-4 pr-10 text-text-primary font-semibold outline-none cursor-pointer transition-all"
                >
                  <option value="">Semua Kategori</option>
                  {Object.values(Category).map((cat) => (<option key={cat} value={cat}>{CategoryLabel[cat]}</option>))}
                </select>
                <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative w-full sm:w-auto min-w-[200px]">
                <select 
                  value={sort} 
                  onChange={(e) => setSort(e.target.value as SortOption)} 
                  className="w-full appearance-none bg-surface-dim border border-transparent hover:border-gray-200 focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-500/10 rounded-2xl px-5 py-4 pr-10 text-text-primary font-semibold outline-none cursor-pointer transition-all"
                >
                  <option value="popular">Terpopuler</option>
                  <option value="price-asc">Harga Terendah</option>
                  <option value="price-desc">Harga Tertinggi</option>
                  <option value="newest">Terbaru</option>
                </select>
                <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(query || selectedCategory) && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-text-muted font-medium">Filter aktif:</span>
              {query && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 font-semibold rounded-lg">
                  &quot;{query}&quot; <button onClick={() => setQuery("")} className="hover:text-primary-900"><Icons.Cross className="w-3.5 h-3.5" /></button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 font-semibold rounded-lg">
                  {CategoryLabel[selectedCategory]} <button onClick={() => setSelectedCategory("")} className="hover:text-primary-900"><Icons.Cross className="w-3.5 h-3.5" /></button>
                </span>
              )}
              <button onClick={() => { setQuery(""); setSelectedCategory(""); }} className="text-gray-400 hover:text-gray-700 font-medium ml-2 underline decoration-gray-300 underline-offset-2">Hapus semua</button>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <p className="font-semibold text-text-secondary">{filtered.length} <span className="font-normal text-text-muted">produk ditemukan</span></p>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (<ProductCard key={product.id} product={product} />))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm mt-4">
            <div className="w-24 h-24 bg-surface-dim rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Icons.Search className="w-12 h-12" />
            </div>
            <h3 className="font-extrabold text-2xl text-text-primary mb-2">Produk tidak ditemukan</h3>
            <p className="text-text-muted text-lg max-w-md mx-auto">Kami tidak dapat menemukan produk yang cocok dengan pencarian Anda. Coba gunakan kata kunci lain.</p>
            <button onClick={() => { setQuery(""); setSelectedCategory(""); }} className="mt-8 px-6 py-3 bg-primary-50 text-primary-700 font-bold rounded-xl hover:bg-primary-100 transition-colors">
              Reset Pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
