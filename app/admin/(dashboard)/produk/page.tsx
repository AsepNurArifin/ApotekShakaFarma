"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icons } from "@/app/components/Icons";

export default function ProdukPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [search, setSearch] = useState("");

  const supabase = createClient();

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  }

  useEffect(() => { fetchProducts(); }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const record = {
      name: fd.get("name") as string,
      category: fd.get("category") as string,
      description: fd.get("description") as string,
      indication: fd.get("indication") as string,
      dosage: fd.get("dosage") as string,
      price: parseInt(fd.get("price") as string) || 0,
      stock_status: fd.get("stock_status") as string,
      symptoms: (fd.get("symptoms") as string).split(",").map(s => s.trim()).filter(Boolean),
      is_featured: fd.get("is_featured") === "on",
    };
    if (editing) {
      await supabase.from("products").update(record).eq("id", editing.id);
    } else {
      await supabase.from("products").insert(record);
    }
    setShowForm(false);
    setEditing(null);
    fetchProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus produk ini?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-100 flex items-center gap-2"><Icons.Box className="w-6 h-6 text-primary-500" /> Kelola Produk</h1>
          <p className="text-zinc-400 text-sm mt-1">{products.length} produk total</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="gradient-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          + Tambah Produk
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk..." className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100 focus:border-primary-500 outline-none text-sm placeholder:text-zinc-500" />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-zinc-900 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-zinc-800" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-extrabold text-zinc-100 mb-4">{editing ? "Edit Produk" : "Tambah Produk"}</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input name="name" defaultValue={editing?.name} required placeholder="Nama produk" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <select name="category" defaultValue={editing?.category || "OB"} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 text-sm focus:border-primary-500 outline-none">
                <option value="OB">Obat Bebas</option>
                <option value="OBT">Obat Bebas Terbatas</option>
                <option value="SUPLEMEN">Suplemen</option>
                <option value="HERBAL">Herbal</option>
                <option value="ALKES">Alat Kesehatan</option>
                <option value="IBU_ANAK">Ibu & Anak</option>
              </select>
              <textarea name="description" defaultValue={editing?.description} placeholder="Deskripsi" rows={3} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <input name="indication" defaultValue={editing?.indication} placeholder="Indikasi" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <input name="dosage" defaultValue={editing?.dosage} placeholder="Dosis" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <input name="price" type="number" defaultValue={editing?.price} required placeholder="Harga (Rp)" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <select name="stock_status" defaultValue={editing?.stock_status || "TERSEDIA"} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 text-sm focus:border-primary-500 outline-none">
                <option value="TERSEDIA">Tersedia</option>
                <option value="TERBATAS">Stok Terbatas</option>
                <option value="HABIS">Habis</option>
              </select>
              <input name="symptoms" defaultValue={editing?.symptoms?.join(", ")} placeholder="Gejala (pisah koma)" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" name="is_featured" defaultChecked={editing?.is_featured} />
                Produk Unggulan
              </label>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 gradient-primary text-white font-bold py-2.5 rounded-xl text-sm">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm font-medium transition-colors">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-10 text-zinc-500">Memuat...</div>
      ) : (
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800/50 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-950/50 text-zinc-400">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Nama</th>
                  <th className="px-4 py-3 text-left font-semibold">Kategori</th>
                  <th className="px-4 py-3 text-left font-semibold">Harga</th>
                  <th className="px-4 py-3 text-left font-semibold">Stok</th>
                  <th className="px-4 py-3 text-left font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-zinc-100">{p.name}</td>
                    <td className="px-4 py-3 text-zinc-400">{p.category}</td>
                    <td className="px-4 py-3 text-zinc-400">Rp {p.price?.toLocaleString("id-ID")}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${p.stock_status === "TERSEDIA" ? "bg-green-500/10 text-green-400" : p.stock_status === "TERBATAS" ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>
                        {p.stock_status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => { setEditing(p); setShowForm(true); }} className="text-primary-400 hover:text-primary-300 font-medium">Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 font-medium">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-zinc-500">Belum ada produk. Klik "Tambah Produk" untuk mulai.</div>
          )}
        </div>
      )}
    </div>
  );
}
