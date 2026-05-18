"use client";
import { useState, useEffect } from "react";
import { Icons } from "@/app/components/Icons";
import { getInquiries, updateInquiryStatus } from "../../domain-actions";

type InquiryRow = {
  id: string;
  name: string;
  phone: string;
  message: string;
  product_id: string | null;
  status: "NEW" | "FOLLOWED_UP" | "CLOSED";
  created_at: string;
};

export default function InquiryPage() {
  const [items, setItems] = useState<InquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function showFB(type: "success" | "error", msg: string) { setFeedback({ type, message: msg }); setTimeout(() => setFeedback(null), 4000); }

  async function fetchItems() {
    setLoading(true);
    const res = await getInquiries();
    if (res.error) showFB("error", res.error);
    const allItems = res.data || [];
    // Filter di client side
    const filtered = filter === "ALL" ? allItems : allItems.filter((i: InquiryRow) => i.status === filter);
    setItems(filtered);
    setLoading(false);
  }
  useEffect(() => { fetchItems(); }, [filter]);

  async function updateStatus(id: string, status: "NEW" | "FOLLOWED_UP" | "CLOSED") {
    const res = await updateInquiryStatus(id, { status });
    if (res.error) { showFB("error", res.error); return; }
    showFB("success", status === "FOLLOWED_UP" ? "Ditindaklanjuti!" : "Selesai!"); fetchItems();
  }

  const statusColors: Record<string, string> = { NEW: "bg-red-500/10 text-red-400", FOLLOWED_UP: "bg-amber-500/10 text-amber-400", CLOSED: "bg-green-500/10 text-green-400" };

  return (<div>
    {feedback && <div className={`fixed top-4 right-4 z-100 px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl ${feedback.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>{feedback.message}</div>}
    <div className="flex items-center justify-between mb-6">
      <div><h1 className="text-2xl font-extrabold text-zinc-100 flex items-center gap-2"><Icons.MessageCircle className="w-6 h-6 text-primary-500" /> Inquiry</h1><p className="text-zinc-400 text-sm mt-1">Pertanyaan masuk dari pengunjung</p></div>
    </div>
    <div className="flex gap-2 mb-4">
      {["ALL","NEW","FOLLOWED_UP","CLOSED"].map(s => <button key={s} onClick={() => setFilter(s)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${filter === s ? "bg-primary-500 text-white" : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800"}`}>{s === "ALL" ? "Semua" : s === "NEW" ? "Baru" : s === "FOLLOWED_UP" ? "Ditindak" : "Selesai"}</button>)}
    </div>
    {loading ? <div className="text-center py-10 text-zinc-500">Memuat...</div> : <div className="space-y-3">
      {items.map(i => <div key={i.id} className="bg-zinc-900 rounded-xl border border-zinc-800/50 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center gap-2 mb-1"><span className="font-bold text-sm text-zinc-100">{i.name}</span><span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full ${statusColors[i.status]}`}>{i.status === "NEW" ? "Baru" : i.status === "FOLLOWED_UP" ? "Ditindak" : "Selesai"}</span></div>
            <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><Icons.Phone className="w-3 h-3" /> {i.phone}</p>
            <p className="text-sm text-zinc-400 mt-2">{i.message}</p>
            <p className="text-xs text-zinc-600 mt-2">{new Date(i.created_at).toLocaleString("id-ID")}</p>
          </div>
          <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
            {i.status === "NEW" && <button onClick={() => updateStatus(i.id, "FOLLOWED_UP")} className="flex-1 sm:flex-none text-xs bg-amber-500/10 text-amber-400 font-semibold px-3 py-2 rounded-lg text-center">Tindak Lanjut</button>}
            {i.status === "FOLLOWED_UP" && <button onClick={() => updateStatus(i.id, "CLOSED")} className="flex-1 sm:flex-none text-xs bg-green-500/10 text-green-400 font-semibold px-3 py-2 rounded-lg text-center">Selesai</button>}
            <a href={`https://wa.me/${i.phone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none text-xs bg-green-500/10 text-green-400 font-semibold px-3 py-2 rounded-lg text-center">Chat WA</a>
          </div>
        </div>
      </div>)}
      {items.length === 0 && <div className="text-center py-10 text-zinc-500 bg-zinc-900 rounded-2xl border border-zinc-800/50">Belum ada inquiry.</div>}
    </div>}
  </div>);
}
