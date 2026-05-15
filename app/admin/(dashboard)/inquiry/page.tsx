"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icons } from "@/app/components/Icons";

export default function InquiryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const supabase = createClient();

  async function fetchItems() {
    setLoading(true);
    let q = supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (filter !== "ALL") q = q.eq("status", filter);
    const { data } = await q;
    setItems(data || []);
    setLoading(false);
  }
  useEffect(() => { fetchItems(); }, [filter]);

  async function updateStatus(id: string, status: string) {
    await supabase.from("inquiries").update({ status }).eq("id", id);
    fetchItems();
  }

  const statusColors: Record<string, string> = {
    NEW: "bg-red-100 text-red-700",
    FOLLOWED_UP: "bg-amber-100 text-amber-700",
    CLOSED: "bg-green-100 text-green-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2"><Icons.MessageCircle className="w-6 h-6 text-primary-600" /> Inquiry</h1><p className="text-text-muted text-sm mt-1">Pertanyaan masuk dari pengunjung</p></div>
      </div>
      <div className="flex gap-2 mb-4">
        {["ALL", "NEW", "FOLLOWED_UP", "CLOSED"].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${filter === s ? "bg-primary-500 text-white" : "bg-white border border-gray-200 text-text-secondary"}`}>
            {s === "ALL" ? "Semua" : s === "NEW" ? "Baru" : s === "FOLLOWED_UP" ? "Ditindak" : "Selesai"}
          </button>
        ))}
      </div>
      {loading ? <div className="text-center py-10 text-text-muted">Memuat...</div> : (
        <div className="space-y-3">
          {items.map(i => (
            <div key={i.id} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-text-primary">{i.name}</span>
                    <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full ${statusColors[i.status]}`}>{i.status}</span>
                  </div>
                  <p className="text-xs text-text-muted mb-1 flex items-center gap-1"><Icons.Phone className="w-3 h-3" /> {i.phone}</p>
                  <p className="text-sm text-text-secondary">{i.message}</p>
                  <p className="text-xs text-text-muted mt-2">{new Date(i.created_at).toLocaleString("id-ID")}</p>
                </div>
                <div className="flex flex-col gap-1 flex-shrink-0">
                  {i.status === "NEW" && <button onClick={() => updateStatus(i.id, "FOLLOWED_UP")} className="text-xs bg-amber-50 text-amber-700 font-semibold px-3 py-1.5 rounded-lg">Tindak Lanjut</button>}
                  {i.status === "FOLLOWED_UP" && <button onClick={() => updateStatus(i.id, "CLOSED")} className="text-xs bg-green-50 text-green-700 font-semibold px-3 py-1.5 rounded-lg">Selesai</button>}
                  <a href={`https://wa.me/${i.phone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-50 text-green-700 font-semibold px-3 py-1.5 rounded-lg text-center">Chat WA</a>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-10 text-text-muted bg-white rounded-2xl border">Belum ada inquiry.</div>}
        </div>
      )}
    </div>
  );
}
