"use client";
import { useState, useEffect, useRef } from "react";
import { Icons } from "@/app/components/Icons";
import { getPosters, createPoster, updatePoster, deletePoster, adminUploadImage } from "../../domain-actions";
import { compressImage, formatFileSize } from "@/lib/image-compress";

type PosterRow = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  linked_product_ids: string[];
  is_active: boolean;
  created_at: string;
};

export default function PosterPage() {
  const [posters, setPosters] = useState<PosterRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PosterRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [compressInfo, setCompressInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function showFB(type: "success" | "error", msg: string) { setFeedback({ type, message: msg }); setTimeout(() => setFeedback(null), 4000); }

  async function fetchPosters() {
    setLoading(true);
    const res = await getPosters();
    if (res.error) showFB("error", res.error);
    setPosters(res.data || []);
    setLoading(false);
  }
  useEffect(() => { fetchPosters(); }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      let imageUrl = editing?.image_url || "";
      if (imageFile) {
        // Kompres gambar otomatis sebelum upload
        const compressed = await compressImage(imageFile);
        const uploadFD = new FormData();
        uploadFD.append("file", compressed);
        uploadFD.append("folder", "posters");
        const upRes = await adminUploadImage(uploadFD);
        if (upRes.error) { showFB("error", `Upload gagal: ${upRes.error}`); setSaving(false); return; }
        imageUrl = upRes.url || "";
      }
      if (!editing && !imageFile) { showFB("error", "Gambar poster wajib diupload!"); setSaving(false); return; }
      
      const record = { 
        title: fd.get("title") as string, 
        description: fd.get("description") as string, 
        is_active: fd.get("is_active") === "on",
        image_url: imageUrl,
        linked_product_ids: [],
      };
      
      const res = editing ? await updatePoster(editing.id, record) : await createPoster(record);
      if (res.error) { showFB("error", res.error); setSaving(false); return; }
      showFB("success", editing ? "Poster diupdate!" : "Poster diupload!");
      setShowForm(false); setEditing(null); setImageFile(null); setImagePreview(null); setCompressInfo(null); fetchPosters();
    } catch (err: any) {
      console.error("handleSave error:", err);
      showFB("error", "Gagal menyimpan. Periksa koneksi internet Anda atau coba gambar yang lebih kecil.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(id: string, current: boolean) {
    const res = await updatePoster(id, { is_active: !current });
    if (res.error) { showFB("error", res.error); return; }
    showFB("success", current ? "Dinonaktifkan!" : "Diaktifkan!"); fetchPosters();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus?")) return;
    const res = await deletePoster(id);
    if (res.error) { showFB("error", res.error); return; }
    showFB("success", "Poster dihapus!"); fetchPosters();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setCompressInfo(`Asli: ${formatFileSize(file.size)} — akan dikompres otomatis saat upload`);
      const r = new FileReader();
      r.onload = (ev) => setImagePreview(ev.target?.result as string);
      r.readAsDataURL(file);
    }
  }

  function openForm(item: PosterRow | null = null) { setEditing(item); setImageFile(null); setImagePreview(item?.image_url || null); setCompressInfo(null); setShowForm(true); }

  return (<div>
    {feedback && <div className={`fixed top-4 right-4 z-100 px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl ${feedback.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>{feedback.message}</div>}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div><h1 className="text-2xl font-extrabold text-zinc-100 flex items-center gap-2"><Icons.Image className="w-6 h-6 text-primary-500" /> Poster Promosi</h1><p className="text-zinc-400 text-sm mt-1">Upload poster seperti di Story WA &amp; Instagram</p></div>
      <button onClick={() => openForm()} className="w-full sm:w-auto gradient-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90">+ Upload Poster</button>
    </div>
    {showForm && <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm" onClick={() => setShowForm(false)}>
      <div className="bg-zinc-900 rounded-2xl p-4 sm:p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-zinc-800" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-extrabold text-zinc-100 mb-4">{editing ? "Edit Poster" : "Upload Poster Baru"}</h2>
        <form onSubmit={handleSave} className="space-y-3">
          <input name="title" defaultValue={editing?.title} required placeholder="Judul poster" className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
          <textarea name="description" defaultValue={editing?.description} placeholder="Deskripsi singkat" rows={3} className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 text-sm focus:border-primary-500 outline-none" />
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Gambar Poster {!editing && <span className="text-red-400">*</span>}</label>
            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center cursor-pointer hover:border-primary-500/50" onClick={() => fileInputRef.current?.click()}>
              {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full max-h-60 object-contain rounded-lg mx-auto" /> : <div className="text-zinc-500 text-sm"><Icons.Image className="w-10 h-10 mx-auto mb-2 text-zinc-600" /><p>Klik untuk pilih gambar</p><p className="text-xs text-zinc-600 mt-1">JPG, PNG, WebP</p></div>}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            {imagePreview && <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); if(fileInputRef.current) fileInputRef.current.value=""; }} className="text-xs text-red-400 mt-1.5 hover:underline">Hapus gambar</button>}
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="is_active" defaultChecked={editing?.is_active ?? true} /> Aktif (tampil di website)</label>
          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={saving} className="flex-1 gradient-primary text-white font-bold py-2.5 rounded-xl text-sm disabled:opacity-50">{saving ? "Mengupload..." : "Simpan"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm font-medium">Batal</button>
          </div>
        </form>
      </div>
    </div>}
    {loading ? <div className="text-center py-10 text-zinc-500">Memuat...</div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posters.map(p => <div key={p.id} className="bg-zinc-900 rounded-2xl border border-zinc-800/50 overflow-hidden">
        <div className="aspect-4/5 bg-zinc-800 flex items-center justify-center">
          {p.image_url ? <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" /> : <Icons.Image className="w-16 h-16 text-zinc-700" />}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2"><h3 className="font-bold text-zinc-100 text-sm flex-1">{p.title}</h3><span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full ${p.is_active ? "bg-green-500/10 text-green-400" : "bg-zinc-800 text-zinc-500"}`}>{p.is_active ? "Aktif" : "Nonaktif"}</span></div>
          <p className="text-xs text-zinc-500 line-clamp-2 mb-3">{p.description}</p>
          <div className="flex gap-2 text-xs">
            <button onClick={() => toggleActive(p.id, p.is_active)} className={`font-semibold px-3 py-1.5 rounded-lg ${p.is_active ? "bg-zinc-800 text-zinc-400" : "bg-green-500/10 text-green-400"}`}>{p.is_active ? "Nonaktifkan" : "Aktifkan"}</button>
            <button onClick={() => openForm(p)} className="text-primary-400 font-semibold px-3 py-1.5 rounded-lg bg-primary-500/10">Edit</button>
            <button onClick={() => handleDelete(p.id)} className="text-red-400 font-semibold px-3 py-1.5 rounded-lg bg-red-500/10">Hapus</button>
          </div>
        </div>
      </div>)}
      {posters.length === 0 && <div className="col-span-full text-center py-10 text-zinc-500 bg-zinc-900 rounded-2xl border border-zinc-800/50">Belum ada poster.</div>}
    </div>}
  </div>);
}
