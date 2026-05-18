"use client";

import { useState, useEffect, useRef } from "react";
import { Icons } from "@/app/components/Icons";
import { getProducts, createProduct, updateProduct, deleteProduct, adminUploadImage } from "../../domain-actions";
import { Product, Category, StockStatus } from "@/lib/types";
import { compressImage } from "@/lib/image-compress";

type ProductRow = {
  id: string;
  name: string;
  category: string;
  description: string;
  indication: string;
  dosage: string;
  price: number;
  stock_status: string;
  image_url: string | null;
  symptoms: string[];
  is_featured: boolean;
  view_count: number;
  created_at: string;
};

export default function ProdukPage() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function showFB(type: "success" | "error", message: string) {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  }

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await getProducts();
      if (res.error) {
        showFB("error", `Gagal memuat: ${res.error}`);
        console.error("Error fetching products:", res.error);
      } else {
        setProducts(res.data || []);
      }
    } catch (error) {
      showFB("error", "Terjadi kesalahan saat memuat data");
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchProducts(); }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData(e.currentTarget);

      let imageUrl = editing?.image_url || null;
      if (imageFile) {
        const compressed = await compressImage(imageFile);
        const uploadFD = new FormData();
        uploadFD.append("file", compressed);
        uploadFD.append("folder", "products");
        const uploadRes = await adminUploadImage(uploadFD);
        if (uploadRes.error) { showFB("error", `Gagal upload gambar: ${uploadRes.error}`); return; }
        imageUrl = uploadRes.url;
      }

      const symptomsRaw = fd.get("symptoms") as string;
      const symptoms = symptomsRaw ? symptomsRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
      
      const priceRaw = fd.get("price") as string;
      const price = parseInt(priceRaw) || 0;

      const record = {
        name: fd.get("name") as string,
        category: fd.get("category") as Category,
        description: fd.get("description") as string,
        indication: fd.get("indication") as string,
        dosage: fd.get("dosage") as string,
        price: price,
        stock_status: fd.get("stock_status") as StockStatus,
        symptoms: symptoms,
        is_featured: fd.get("is_featured") === "on",
        image_url: imageUrl,
      };

      const res = editing
        ? await updateProduct(editing.id, record)
        : await createProduct(record);

      if (res.error) { showFB("error", `Gagal menyimpan: ${res.error}`); return; }
      showFB("success", editing ? "Produk berhasil diupdate!" : "Produk berhasil ditambahkan!");
      setShowForm(false); setEditing(null); setImageFile(null); setImagePreview(null);
      fetchProducts();
    } catch (err: any) {
      console.error("handleSave error:", err);
      showFB("error", "Gagal menyimpan. Periksa koneksi internet Anda atau coba gambar yang lebih kecil.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus produk ini?")) return;
    const res = await deleteProduct(id);
    if (res.error) { showFB("error", `Gagal menghapus: ${res.error}`); return; }
    showFB("success", "Produk berhasil dihapus!");
    fetchProducts();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function openForm(item: ProductRow | null = null) {
    setEditing(item); setImageFile(null); setImagePreview(item?.image_url || null); setShowForm(true);
  }

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {feedback && (
        <div className={`fixed top-4 right-4 z-100 px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl ${feedback.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
          {feedback.message}
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-100 flex items-center gap-2"><Icons.Box className="w-6 h-6 text-primary-500" /> Kelola Produk</h1>
          <p className="text-zinc-400 text-sm mt-1">{products.length} produk total</p>
        </div>
        <button onClick={() => openForm()} className="gradient-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90">+ Tambah Produk</button>
      </div>
      <div className="mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk..." className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100 focus:border-primary-500 outline-none text-sm placeholder:text-zinc-500" />
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-zinc-900 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-zinc-800" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-extrabold text-zinc-100 mb-4">{editing ? "Edit Produk" : "Tambah Produk"}</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input name="name" defaultValue={editing?.name} required placeholder="Nama produk" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <select name="category" defaultValue={editing?.category || "OB"} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none">
                <option value="OB">Obat Bebas</option><option value="OBT">Obat Bebas Terbatas</option><option value="SUPLEMEN">Suplemen</option><option value="HERBAL">Herbal</option><option value="ALKES">Alat Kesehatan</option><option value="IBU_ANAK">Ibu &amp; Anak</option>
              </select>
              <textarea name="description" defaultValue={editing?.description} placeholder="Deskripsi" rows={3} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <input name="indication" defaultValue={editing?.indication} placeholder="Indikasi" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <input name="dosage" defaultValue={editing?.dosage} placeholder="Dosis" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <input name="price" type="number" defaultValue={editing?.price} required placeholder="Harga (Rp)" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <select name="stock_status" defaultValue={editing?.stock_status || "TERSEDIA"} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none">
                <option value="TERSEDIA">Tersedia</option><option value="TERBATAS">Stok Terbatas</option><option value="HABIS">Habis</option>
              </select>
              <input name="symptoms" defaultValue={editing?.symptoms?.join(", ")} placeholder="Gejala (pisah koma)" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Gambar Produk</label>
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-4 text-center cursor-pointer hover:border-primary-500/50 transition-colors" onClick={() => fileInputRef.current?.click()}>
                  {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full max-h-40 object-contain rounded-lg mx-auto" /> : (
                    <div className="text-zinc-500 text-sm"><Icons.Image className="w-8 h-8 mx-auto mb-2 text-zinc-600" />Klik untuk pilih gambar</div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                {imagePreview && <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-xs text-red-400 mt-1.5 hover:underline">Hapus gambar</button>}
              </div>
              <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="is_featured" defaultChecked={editing?.is_featured} /> Produk Unggulan</label>
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={saving} className="flex-1 gradient-primary text-white font-bold py-2.5 rounded-xl text-sm disabled:opacity-50">{saving ? "Menyimpan..." : "Simpan"}</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm font-medium">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {loading ? <div className="text-center py-10 text-zinc-500">Memuat...</div> : (
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-950/50 text-zinc-400"><tr>
                <th className="px-4 py-3 text-left font-semibold">Gambar</th><th className="px-4 py-3 text-left font-semibold">Nama</th><th className="px-4 py-3 text-left font-semibold">Kategori</th><th className="px-4 py-3 text-left font-semibold">Harga</th><th className="px-4 py-3 text-left font-semibold">Stok</th><th className="px-4 py-3 text-left font-semibold">Aksi</th>
              </tr></thead>
              <tbody className="divide-y divide-zinc-800">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-zinc-800/50">
                    <td className="px-4 py-3">{p.image_url ? <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center"><Icons.Box className="w-5 h-5 text-zinc-600" /></div>}</td>
                    <td className="px-4 py-3 font-medium text-zinc-100">{p.name}</td>
                    <td className="px-4 py-3 text-zinc-400">{p.category}</td>
                    <td className="px-4 py-3 text-zinc-400">Rp {p.price?.toLocaleString("id-ID")}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-1 rounded ${p.stock_status === "TERSEDIA" ? "bg-green-500/10 text-green-400" : p.stock_status === "TERBATAS" ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>{p.stock_status}</span></td>
                    <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => openForm(p)} className="text-primary-400 hover:text-primary-300 font-medium">Edit</button><button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 font-medium">Hapus</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-10 text-zinc-500">Belum ada produk. Klik &quot;Tambah Produk&quot; untuk mulai.</div>}
        </div>
      )}
    </div>
  );
}
