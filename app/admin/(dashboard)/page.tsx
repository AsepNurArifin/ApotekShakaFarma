import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Icons } from "../../components/Icons";

async function getStats() {
  const supabase = await createClient();
  const [prodRes, posterRes, testiRes, artRes, inqRes] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("posters").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "NEW"),
  ]);
  return {
    products: prodRes.count ?? 0,
    posters: posterRes.count ?? 0,
    testimonials: testiRes.count ?? 0,
    articles: artRes.count ?? 0,
    newInquiries: inqRes.count ?? 0,
  };
}

export default async function AdminDashboard() {
  let stats = { products: 0, posters: 0, testimonials: 0, articles: 0, newInquiries: 0 };
  try {
    stats = await getStats();
  } catch {
    // Tables may not exist yet — show 0s
  }

  const cards = [
    { label: "Total Produk", value: stats.products, icon: <Icons.Box className="w-6 h-6" />, href: "/admin/produk", color: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
    { label: "Poster Aktif", value: stats.posters, icon: <Icons.Image className="w-6 h-6" />, href: "/admin/poster", color: "bg-green-500/10 text-green-400 border border-green-500/20" },
    { label: "Inquiry Baru", value: stats.newInquiries, icon: <Icons.MessageCircle className="w-6 h-6" />, href: "/admin/inquiry", color: "bg-red-500/10 text-red-400 border border-red-500/20" },
    { label: "Testimoni", value: stats.testimonials, icon: <Icons.Star className="w-6 h-6" />, href: "/admin/testimoni", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
    { label: "Artikel", value: stats.articles, icon: <Icons.FileText className="w-6 h-6" />, href: "/admin/artikel", color: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-zinc-100">Dashboard</h1>
        <p className="text-zinc-400 text-sm mt-1">Selamat datang di Admin Panel Apotek Shaka Farma</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800/50 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/20 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>{card.icon}</span>
            </div>
            <div className="text-2xl font-extrabold text-zinc-100">{card.value}</div>
            <div className="text-xs text-zinc-400 mt-1">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800/50 p-6 shadow-sm">
        <h2 className="font-bold text-zinc-100 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/produk" className="inline-flex items-center gap-2 bg-primary-500/10 text-primary-400 border border-primary-500/20 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-primary-500/20 transition-colors">
            <Icons.Box className="w-4 h-4" /> Tambah Produk
          </Link>
          <Link href="/admin/poster" className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-green-500/20 transition-colors">
            <Icons.Image className="w-4 h-4" /> Upload Poster
          </Link>
          <Link href="/admin/artikel" className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-purple-500/20 transition-colors">
            <Icons.FileText className="w-4 h-4" /> Tulis Artikel
          </Link>
          <Link href="/admin/inquiry" className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-red-500/20 transition-colors">
            <Icons.MessageCircle className="w-4 h-4" /> Lihat Inquiry ({stats.newInquiries} baru)
          </Link>
        </div>
      </div>
    </div>
  );
}
