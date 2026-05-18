"use client";
import { useState, useEffect } from "react";
import { Icons } from "@/app/components/Icons";
import { getTestimonials, updateTestimonial, deleteTestimonial } from "../../domain-actions";

type TestimonialRow = {
  id: string;
  customer_name: string;
  content: string;
  rating: number;
  is_published: boolean;
  created_at: string;
};

export default function TestimoniPage() {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TestimonialRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function showFB(type: "success" | "error", msg: string) { setFeedback({ type, message: msg }); setTimeout(() => setFeedback(null), 4000); }

  async function fetchItems() {
    setLoading(true);
    const res = await getTestimonials();
    if (res.error) showFB("error", res.error);
    setItems(res.data || []);
    setLoading(false);
  }
  useEffect(() => { fetchItems(); }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSaving(true);
    const fd = new FormData(e.currentTarget);
    const ratingRaw = fd.get("rating") as string;
    const record = { 
      customer_name: fd.get("customer_name") as string, 
      content: fd.get("content") as string, 
      rating: parseInt(ratingRaw) || 5, 
      is_published: fd.get("is_published") === "on" 
    };
    
    if (!editing) {
      showFB("error", "Testimoni hanya bisa diedit, tidak bisa ditambah manual");
      setSaving(false);
      return;
    }
    
    const res = await updateTestimonial(editing.id, record);
    if (res.error) { showFB("error", res.error); setSaving(false); return; }
    showFB("success", "Testimoni diupdate!");
    setShowForm(false); setEditing(null); setSaving(false); fetchItems();
  }

  async function togglePublish(id: string, current: boolean) {
    const res = await updateTestimonial(id, { is_published: !current });
    if (res.error) { showFB("error", res.error); return; }
    showFB("success", current ? "Di-unpublish!" : "Di-publish!"); fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus?")) return;
    const res = await deleteTestimonial(id);
    if (res.error) { showFB("error", res.error); return; }
    showFB("success", "Testimoni dihapus!"); fetchItems();
  }

  return (<div>
    {feedback && <div className={`fixed top-4 right-4 z-100 px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl ${feedback.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>{feedback.message}</div>}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div><h1 className="text-2xl font-extrabold text-zinc-100 flex items-center gap-2"><Icons.Star className="w-6 h-6 text-primary-500" /> Testimoni</h1><p className="text-zinc-400 text-sm mt-1">{items.length} testimoni</p></div>
      <button onClick={() => { setEditing(null); setShowForm(true); }} className="w-full sm:w-auto gradient-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90">+ Tambah</button>
    </div>
    {showForm && <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm" onClick={() => setShowForm(false)}>
      <div className="bg-zinc-900 rounded-2xl p-4 sm:p-6 max-w-lg w-full border border-zinc-800" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-extrabold text-zinc-100 mb-4">{editing ? "Edit" : "Tambah"} Testimoni</h2>
        <form onSubmit={handleSave} className="space-y-3">
          <input name="customer_name" defaultValue={editing?.customer_name} required placeholder="Nama pelanggan" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
          <textarea name="content" defaultValue={editing?.content} required placeholder="Isi testimoni" rows={3} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
          <select name="rating" defaultValue={editing?.rating || 5} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none">
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{"★".repeat(r)} ({r})</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="is_published" defaultChecked={editing?.is_published ?? true} /> Publish</label>
          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={saving} className="flex-1 gradient-primary text-white font-bold py-2.5 rounded-xl text-sm disabled:opacity-50">{saving ? "Menyimpan..." : "Simpan"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm font-medium">Batal</button>
          </div>
        </form>
      </div>
    </div>}
    {loading ? <div className="text-center py-10 text-zinc-500">Memuat...</div> : <div className="space-y-3">
      {items.map(t => <div key={t.id} className="bg-zinc-900 rounded-xl border border-zinc-800/50 p-4 flex flex-col sm:flex-row items-start gap-4">
        <div className="flex-1 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-sm text-zinc-100">{t.customer_name}</span>
            <span className="text-xs text-amber-400">{"★".repeat(t.rating)}</span>
            <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full ${t.is_published ? "bg-green-500/10 text-green-400" : "bg-zinc-800 text-zinc-500"}`}>{t.is_published ? "Published" : "Draft"}</span>
          </div>
          <p className="text-sm text-zinc-400 mt-2">{t.content}</p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2 text-xs shrink-0 w-full sm:w-auto mt-2 sm:mt-0 justify-start sm:justify-end">
          <button onClick={() => togglePublish(t.id, t.is_published)} className="text-primary-400 font-semibold px-2 py-1 bg-primary-500/10 rounded-lg">{t.is_published ? "Unpublish" : "Publish"}</button>
          <button onClick={() => { setEditing(t); setShowForm(true); }} className="text-primary-400 font-semibold px-2 py-1 bg-primary-500/10 rounded-lg">Edit</button>
          <button onClick={() => handleDelete(t.id)} className="text-red-400 font-semibold px-2 py-1 bg-red-500/10 rounded-lg">Hapus</button>
        </div>
      </div>)}
      {items.length === 0 && <div className="text-center py-10 text-zinc-500 bg-zinc-900 rounded-2xl border border-zinc-800/50">Belum ada testimoni.</div>}
    </div>}
  </div>);
}
