"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icons } from "@/app/components/Icons";

export default function ArtikelAdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const supabase = createClient();

  async function fetchItems() {
    setLoading(true);
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }
  useEffect(() => { fetchItems(); }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = fd.get("title") as string;
    const record = {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      excerpt: fd.get("excerpt") as string,
      content: fd.get("content") as string,
      is_published: fd.get("is_published") === "on",
    };
    if (editing) { await supabase.from("articles").update(record).eq("id", editing.id); }
    else { await supabase.from("articles").insert(record); }
    setShowForm(false); setEditing(null); fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus?")) return;
    await supabase.from("articles").delete().eq("id", id);
    fetchItems();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2"><Icons.FileText className="w-6 h-6 text-primary-600" /> Artikel</h1><p className="text-text-muted text-sm mt-1">{items.length} artikel</p></div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="gradient-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90">+ Tulis Artikel</button>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-extrabold mb-4">{editing ? "Edit" : "Tulis"} Artikel</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input name="title" defaultValue={editing?.title} required placeholder="Judul artikel" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
              <textarea name="excerpt" defaultValue={editing?.excerpt} placeholder="Ringkasan singkat" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
              <textarea name="content" defaultValue={editing?.content} required placeholder="Isi artikel (mendukung format teks)" rows={10} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono" />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_published" defaultChecked={editing?.is_published ?? false} /> Publish</label>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 gradient-primary text-white font-bold py-2.5 rounded-xl text-sm">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {loading ? <div className="text-center py-10 text-text-muted">Memuat...</div> : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-text-muted"><tr>
              <th className="px-4 py-3 text-left font-semibold">Judul</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Tanggal</th>
              <th className="px-4 py-3 text-left font-semibold">Aksi</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-text-primary">{a.title}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-1 rounded ${a.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{a.is_published ? "Published" : "Draft"}</span></td>
                  <td className="px-4 py-3 text-text-muted">{new Date(a.created_at).toLocaleDateString("id-ID")}</td>
                  <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => { setEditing(a); setShowForm(true); }} className="text-primary-600 font-medium">Edit</button><button onClick={() => handleDelete(a.id)} className="text-red-500 font-medium">Hapus</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="text-center py-10 text-text-muted">Belum ada artikel.</div>}
        </div>
      )}
    </div>
  );
}
