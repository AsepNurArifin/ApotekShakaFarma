"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/katalog?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto" id="search-bar">
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari obat, vitamin, atau gejala..."
          className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-primary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none text-sm text-text-primary placeholder:text-text-muted transition-all shadow-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 gradient-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
        >
          Cari
        </button>
      </div>
    </form>
  );
}
