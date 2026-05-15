"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icons } from "@/app/components/Icons";

export default function PosterPage() {
  const [posters, setPosters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const supabase = createClient();

  async function fetchPosters() {
    setLoading(true);
    const { data } = await supabase.from("posters").select("*").order("created_at", { ascending: false });
    setPosters(data || []);
    setLoading(false);
  }

  useEffect(() => { fetchPosters(); }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const record = {
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      image_url: fd.get("image_url") as string,
      is_active: fd.get("is_active") === "on",
    };
    if (editing) {
      await supabase.from("posters").update(record).eq("id", editing.id);
    } else {
      await supabase.from("posters").insert(record);
    }
    setShowForm(false);
    setEditing(null);
    fetchPosters();
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from("posters").update({ is_active: !current }).eq("id", id);
    fetchPosters();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus poster ini?")) return;
    await supabase.from("posters").delete().eq("id", id);
    fetchPosters();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2"><Icons.Image className="w-6 h-6 text-primary-600" /> Poster Promosi</h1>
          <p className="text-text-muted text-sm mt-1">Upload poster yang sama seperti di Story WA & Instagram</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="gradient-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          + Upload Poster
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-extrabold text-text-primary mb-4">{editing ? "Edit Poster" : "Upload Poster Baru"}</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input name="title" defaultValue={editing?.title} required placeholder="Judul poster" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
              <textarea name="description" defaultValue={editing?.description} placeholder="Deskripsi singkat" rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
              <input name="image_url" defaultValue={editing?.image_url} placeholder="URL gambar poster" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
              <p className="text-xs text-text-muted flex items-center gap-1"><Icons.AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Upload gambar ke Supabase Storage, lalu paste URL-nya di sini</p>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="is_active" defaultChecked={editing?.is_active ?? true} />
                Aktif (tampil di website)
              </label>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 gradient-primary text-white font-bold py-2.5 rounded-xl text-sm">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-text-muted">Memuat...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posters.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-primary-200"><Icons.Image className="w-16 h-16" /></span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-text-primary text-sm flex-1">{p.title}</h3>
                  <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full ${p.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {p.is_active ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
                <p className="text-xs text-text-muted line-clamp-2 mb-3">{p.description}</p>
                <div className="flex gap-2 text-xs">
                  <button onClick={() => toggleActive(p.id, p.is_active)} className={`font-semibold px-3 py-1.5 rounded-lg ${p.is_active ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700"}`}>
                    {p.is_active ? "Nonaktifkan" : "Aktifkan"}
                  </button>
                  <button onClick={() => { setEditing(p); setShowForm(true); }} className="text-primary-600 font-semibold px-3 py-1.5 rounded-lg bg-primary-50">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 font-semibold px-3 py-1.5 rounded-lg bg-red-50">Hapus</button>
                </div>
              </div>
            </div>
          ))}
          {posters.length === 0 && (
            <div className="col-span-full text-center py-10 text-text-muted bg-white rounded-2xl border border-gray-100">
              Belum ada poster. Klik &quot;Upload Poster&quot; untuk mulai.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
