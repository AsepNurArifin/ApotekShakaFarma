"use client";
import { useState, useEffect } from "react";
import { Icons } from "@/app/components/Icons";
import { getProfiles, updateProfileRole } from "../../domain-actions";

type ProfileRow = {
  id: string;
  full_name: string | null;
  role: "ADMIN" | "SUPERADMIN";
  created_at: string;
};

export default function PengaturanPage() {
  const [users, setUsers] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function showFB(type: "success" | "error", msg: string) { setFeedback({ type, message: msg }); setTimeout(() => setFeedback(null), 4000); }

  async function fetchUsers() {
    setLoading(true);
    const res = await getProfiles();
    if (res.error) showFB("error", res.error);
    setUsers(res.data || []);
    setLoading(false);
  }
  useEffect(() => { fetchUsers(); }, []);

  async function toggleRole(id: string, currentRole: "ADMIN" | "SUPERADMIN") {
    const newRole: "ADMIN" | "SUPERADMIN" = currentRole === "SUPERADMIN" ? "ADMIN" : "SUPERADMIN";
    const res = await updateProfileRole(id, { role: newRole });
    if (res.error) { showFB("error", res.error); return; }
    showFB("success", `Role diubah ke ${newRole}!`); fetchUsers();
  }

  return (<div>
    {feedback && <div className={`fixed top-4 right-4 z-100 px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl ${feedback.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>{feedback.message}</div>}
    <div className="mb-6"><h1 className="text-2xl font-extrabold text-zinc-100 flex items-center gap-2"><Icons.Settings className="w-6 h-6 text-primary-500" /> Pengaturan</h1><p className="text-zinc-400 text-sm mt-1">Kelola user admin (hanya SUPERADMIN)</p></div>
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800/50 p-6 mb-6">
      <h2 className="font-bold text-zinc-100 mb-4">User Admin</h2>
      {loading ? <div className="text-center py-5 text-zinc-500">Memuat...</div> : <div className="space-y-3">
        {users.map(u => <div key={u.id} className="flex items-center justify-between p-3 rounded-xl border border-zinc-800">
          <div><div className="font-semibold text-sm text-zinc-100">{u.full_name || "Unnamed"}</div><div className="text-xs text-zinc-600 font-mono">{u.id}</div></div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-2 py-1 rounded ${u.role === "SUPERADMIN" ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-400"}`}>{u.role}</span>
            <button onClick={() => toggleRole(u.id, u.role)} className="text-xs text-primary-400 font-semibold hover:underline">{u.role === "SUPERADMIN" ? "→ Admin" : "→ Superadmin"}</button>
          </div>
        </div>)}
        {users.length === 0 && <p className="text-sm text-zinc-500">Belum ada user admin.</p>}
      </div>}
    </div>
    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
      <h3 className="font-bold text-amber-400 mb-2 flex items-center gap-2"><Icons.AlertCircle className="w-5 h-5 text-amber-500" /> Cara Menambah Admin Baru</h3>
      <ol className="text-sm text-amber-400/80 space-y-1 list-decimal list-inside">
        <li>Buka Supabase Dashboard → Authentication → Users</li>
        <li>Klik &quot;Add User&quot; → Masukkan email dan password</li>
        <li>User baru akan otomatis mendapat role ADMIN</li>
        <li>Untuk SUPERADMIN, ubah role di halaman ini</li>
      </ol>
    </div>
  </div>);
}
