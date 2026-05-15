"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icons } from "@/app/components/Icons";

export default function PengaturanPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function fetchUsers() {
    setLoading(true);
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    setUsers(data || []);
    setLoading(false);
  }
  useEffect(() => { fetchUsers(); }, []);

  async function toggleRole(id: string, currentRole: string) {
    const newRole = currentRole === "SUPERADMIN" ? "ADMIN" : "SUPERADMIN";
    await supabase.from("profiles").update({ role: newRole }).eq("id", id);
    fetchUsers();
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2"><Icons.Settings className="w-6 h-6 text-primary-600" /> Pengaturan</h1>
        <p className="text-text-muted text-sm mt-1">Kelola user admin (hanya SUPERADMIN)</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-text-primary mb-4">User Admin</h2>
        {loading ? <div className="text-center py-5 text-text-muted">Memuat...</div> : (
          <div className="space-y-3">
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100">
                <div>
                  <div className="font-semibold text-sm">{u.full_name || "Unnamed"}</div>
                  <div className="text-xs text-text-muted">{u.id}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${u.role === "SUPERADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{u.role}</span>
                  <button onClick={() => toggleRole(u.id, u.role)} className="text-xs text-primary-600 font-semibold hover:underline">
                    {u.role === "SUPERADMIN" ? "→ Admin" : "→ Superadmin"}
                  </button>
                </div>
              </div>
            ))}
            {users.length === 0 && <p className="text-sm text-text-muted">Belum ada user admin terdaftar.</p>}
          </div>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2"><Icons.AlertCircle className="w-5 h-5 text-amber-600" /> Cara Menambah Admin Baru</h3>
        <ol className="text-sm text-amber-800 space-y-1 list-decimal list-inside">
          <li>Buka Supabase Dashboard → Authentication → Users</li>
          <li>Klik &quot;Add User&quot; → Masukkan email dan password</li>
          <li>User baru akan otomatis mendapat role ADMIN</li>
          <li>Untuk SUPERADMIN, ubah role di halaman ini</li>
        </ol>
      </div>
    </div>
  );
}
