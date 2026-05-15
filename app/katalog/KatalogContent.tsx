"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/data";
import { Category, CategoryLabel } from "@/lib/types";
import ProductCard from "../components/ProductCard";

type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

export default function KatalogContent() {
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
  }, [query, selectedCategory, sort]);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-text-primary mb-2">Katalog Produk</h1>
          <p className="text-text-muted">Temukan obat, vitamin, dan alat kesehatan yang Anda butuhkan</p>
        </div>
        <div className="mb-6">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari obat, vitamin, atau gejala..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none text-sm" />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button onClick={() => setShowFilters(!showFilters)} className="sm:hidden inline-flex items-center gap-2 bg-primary-50 text-primary-700 font-semibold text-sm px-4 py-2 rounded-lg">
            Filter
          </button>
          <div className={`flex flex-wrap gap-2 ${showFilters ? "flex" : "hidden sm:flex"} w-full sm:w-auto`}>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as Category | "")} className="text-sm border-2 border-gray-200 rounded-lg px-3 py-2 bg-white focus:border-primary-500 outline-none">
              <option value="">Semua Kategori</option>
              {Object.values(Category).map((cat) => (<option key={cat} value={cat}>{CategoryLabel[cat]}</option>))}
            </select>
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="text-sm border-2 border-gray-200 rounded-lg px-3 py-2 bg-white focus:border-primary-500 outline-none ml-auto">
            <option value="popular">Terpopuler</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
            <option value="newest">Terbaru</option>
          </select>
        </div>
        <p className="text-sm text-text-muted mb-4">{filtered.length} produk ditemukan</p>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (<ProductCard key={product.id} product={product} />))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-bold text-lg text-text-primary mb-2">Produk tidak ditemukan</h3>
            <p className="text-text-muted text-sm">Coba kata kunci lain atau ubah filter pencarian</p>
          </div>
        )}
      </div>
    </div>
  );
}
