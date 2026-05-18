"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { logoutAction } from "./actions";
import { Icons } from "../components/Icons";

interface AdminUser {
  email: string;
  fullName: string;
  role: "ADMIN" | "SUPERADMIN";
}

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: <Icons.LayoutDashboard className="w-5 h-5" /> },
  { href: "/admin/produk", label: "Produk", icon: <Icons.Box className="w-5 h-5" /> },
  { href: "/admin/poster", label: "Poster Promosi", icon: <Icons.Image className="w-5 h-5" /> },
  { href: "/admin/testimoni", label: "Testimoni", icon: <Icons.Star className="w-5 h-5" /> },
  { href: "/admin/artikel", label: "Artikel", icon: <Icons.FileText className="w-5 h-5" /> },
  { href: "/admin/inquiry", label: "Inquiry", icon: <Icons.MessageCircle className="w-5 h-5" /> },
];

const SUPERADMIN_ITEMS = [
  { href: "/admin/pengaturan", label: "Pengaturan", icon: <Icons.Settings className="w-5 h-5" /> },
];

export default function AdminShell({ user, children }: { user: AdminUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const allNav = user.role === "SUPERADMIN" ? [...NAV_ITEMS, ...SUPERADMIN_ITEMS] : NAV_ITEMS;

  return (
    <div className="min-h-screen bg-zinc-950 flex text-zinc-300">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="p-5 border-b border-zinc-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden">
              <Image 
                src="/logo.jpeg" 
                alt="Apotek Shaka Farma Logo" 
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-extrabold text-sm text-zinc-100">Shaka Farma</div>
              <div className="text-[0.6rem] text-zinc-500 uppercase tracking-wider">Admin Panel</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {allNav.map((item) => {
            const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? "bg-primary-500/10 text-primary-400 font-semibold" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                }`}
              >
                <span className="flex items-center justify-center w-6">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-3 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-primary-500/20">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-zinc-100 truncate">{user.fullName}</div>
              <div className="text-[0.6rem] text-zinc-500">{user.role}</div>
            </div>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="w-full mt-2 text-sm text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
              <Icons.LogOut className="w-4 h-4" /> Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-zinc-900 border-b border-zinc-800 px-4 sm:px-6 py-3 flex items-center gap-4 sticky top-0 z-30 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-zinc-800 text-zinc-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex-1" />
          <Link href="/" target="_blank" className="text-xs font-semibold text-zinc-400 hover:text-primary-400 transition-colors flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-700">
            <Icons.Globe className="w-4 h-4" /> Lihat Website
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
