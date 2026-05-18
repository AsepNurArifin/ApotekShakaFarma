"use client";
import { useState, useEffect } from "react";
import { Icons } from "@/app/components/Icons";
import { getArticles, createArticle, updateArticle, deleteArticle } from "../../domain-actions";

type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  related_product_ids: string[];
  is_published: boolean;
  created_at: string;
};

export default function ArtikelAdminPage() {
  const [items, setItems] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ArticleRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function showFB(type: "success" | "error", msg: string) { setFeedback({ type, message: msg }); setTimeout(() => setFeedback(null), 4000); }

  async function fetchItems() {
    setLoading(true);
    const res = await getArticles();
    if (res.error) showFB("error", res.error);
    setItems(res.data || []);
    setLoading(false);
  }
  useEffect(() => { fetchItems(); }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      const title = fd.get("title") as string;
      const record = { 
        title, 
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), 
        excerpt: fd.get("excerpt") as string, 
        content: fd.get("content") as string, 
        is_published: fd.get("is_published") === "on",
        image_url: null,
        related_product_ids: [],
      };
      const res = editing ? await updateArticle(editing.id, record) : await createArticle(record);
      if (res.error) { showFB("error", res.error); return; }
      showFB("success", editing ? "Artikel diupdate!" : "Artikel ditambahkan!");
      setShowForm(false); setEditing(null); fetchItems();
    } catch (err: any) {
      console.error("handleSave error:", err);
      showFB("error", "Gagal menyimpan. Periksa koneksi internet Anda.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus?")) return;
    const res = await deleteArticle(id);
    if (res.error) { showFB("error", res.error); return; }
    showFB("success", "Artikel dihapus!"); fetchItems();
  }

  return (<div>
    {feedback && <div className={`fixed top-4 right-4 z-100 px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl ${feedback.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>{feedback.message}</div>}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div><h1 className="text-2xl font-extrabold text-zinc-100 flex items-center gap-2"><Icons.FileText className="w-6 h-6 text-primary-500" /> Artikel</h1><p className="text-zinc-400 text-sm mt-1">{items.length} artikel</p></div>
      <button onClick={() => { setEditing(null); setShowForm(true); }} className="w-full sm:w-auto gradient-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90">+ Tulis Artikel</button>
    </div>
    {showForm && <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm" onClick={() => setShowForm(false)}>
      <div className="bg-zinc-900 rounded-2xl p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-800" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-extrabold text-zinc-100 mb-4">{editing ? "Edit" : "Tulis"} Artikel</h2>
        <form onSubmit={handleSave} className="space-y-3">
          <input name="title" defaultValue={editing?.title} required placeholder="Judul artikel" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
          <textarea name="excerpt" defaultValue={editing?.excerpt} placeholder="Ringkasan singkat" rows={2} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
          <textarea name="content" defaultValue={editing?.content} required placeholder="Isi artikel" rows={10} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm font-mono focus:border-primary-500 outline-none" />
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="is_published" defaultChecked={editing?.is_published ?? false} /> Publish</label>
          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={saving} className="flex-1 gradient-primary text-white font-bold py-2.5 rounded-xl text-sm disabled:opacity-50">{saving ? "Menyimpan..." : "Simpan"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm font-medium">Batal</button>
          </div>
        </form>
      </div>
    </div>}
    {loading ? <div className="text-center py-10 text-zinc-500">Memuat...</div> : <div className="bg-zinc-900 rounded-2xl border border-zinc-800/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-zinc-950/50 text-zinc-400"><tr><th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Judul</th><th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Status</th><th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Tanggal</th><th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Aksi</th></tr></thead>
          <tbody className="divide-y divide-zinc-800">{items.map(a => <tr key={a.id} className="hover:bg-zinc-800/50">
            <td className="px-4 py-3 font-medium text-zinc-100 min-w-[200px]">{a.title}</td>
            <td className="px-4 py-3 whitespace-nowrap"><span className={`text-xs font-bold px-2 py-1 rounded ${a.is_published ? "bg-green-500/10 text-green-400" : "bg-zinc-800 text-zinc-500"}`}>{a.is_published ? "Published" : "Draft"}</span></td>
            <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">{new Date(a.created_at).toLocaleDateString("id-ID")}</td>
            <td className="px-4 py-3 whitespace-nowrap"><div className="flex gap-2"><button onClick={() => { setEditing(a); setShowForm(true); }} className="text-primary-400 font-medium px-2 py-1">Edit</button><button onClick={() => handleDelete(a.id)} className="text-red-400 font-medium px-2 py-1">Hapus</button></div></td>
          </tr>)}</tbody>
        </table>
      </div>
      {items.length === 0 && <div className="text-center py-10 text-zinc-500">Belum ada artikel.</div>}
    </div>}
  </div>);
}
