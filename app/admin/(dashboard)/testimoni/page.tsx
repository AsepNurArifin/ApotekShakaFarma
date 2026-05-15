"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icons } from "@/app/components/Icons";

export default function TestimoniPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const supabase = createClient();

  async function fetchItems() {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }
  useEffect(() => { fetchItems(); }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const record = {
      customer_name: fd.get("customer_name") as string,
      content: fd.get("content") as string,
      rating: parseInt(fd.get("rating") as string) || 5,
      is_published: fd.get("is_published") === "on",
    };
    if (editing) { await supabase.from("testimonials").update(record).eq("id", editing.id); }
    else { await supabase.from("testimonials").insert(record); }
    setShowForm(false); setEditing(null); fetchItems();
  }

  async function togglePublish(id: string, current: boolean) {
    await supabase.from("testimonials").update({ is_published: !current }).eq("id", id);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    fetchItems();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2"><Icons.Star className="w-6 h-6 text-primary-600" /> Testimoni</h1><p className="text-text-muted text-sm mt-1">{items.length} testimoni</p></div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="gradient-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90">+ Tambah</button>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-extrabold mb-4">{editing ? "Edit" : "Tambah"} Testimoni</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input name="customer_name" defaultValue={editing?.customer_name} required placeholder="Nama pelanggan" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
              <textarea name="content" defaultValue={editing?.content} required placeholder="Isi testimoni" rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
              <select name="rating" defaultValue={editing?.rating || 5} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{"★".repeat(r)} ({r})</option>)}
              </select>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_published" defaultChecked={editing?.is_published ?? true} /> Publish</label>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 gradient-primary text-white font-bold py-2.5 rounded-xl text-sm">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {loading ? <div className="text-center py-10 text-text-muted">Memuat...</div> : (
        <div className="space-y-3">
          {items.map(t => (
            <div key={t.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">{t.customer_name}</span>
                  <span className="text-xs text-amber-500">{"★".repeat(t.rating)}</span>
                  <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full ${t.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{t.is_published ? "Published" : "Draft"}</span>
                </div>
                <p className="text-sm text-text-secondary">{t.content}</p>
              </div>
              <div className="flex gap-2 text-xs flex-shrink-0">
                <button onClick={() => togglePublish(t.id, t.is_published)} className="text-primary-600 font-semibold">{t.is_published ? "Unpublish" : "Publish"}</button>
                <button onClick={() => { setEditing(t); setShowForm(true); }} className="text-primary-600 font-semibold">Edit</button>
                <button onClick={() => handleDelete(t.id)} className="text-red-500 font-semibold">Hapus</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-10 text-text-muted bg-white rounded-2xl border">Belum ada testimoni.</div>}
        </div>
      )}
    </div>
  );
}
