"use client";

import { useActionState } from "react";
import Image from "next/image";
import { loginAction } from "../actions";
import { Icons } from "@/app/components/Icons";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 shadow-lg ring-4 ring-white/20">
            <Image 
              src="/logo.jpeg" 
              alt="Apotek Shaka Farma Logo" 
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Admin Panel</h1>
          <p className="text-white/60 text-sm mt-1">Apotek Shaka Farma</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-extrabold text-text-primary mb-1">Masuk</h2>
          <p className="text-text-muted text-sm mb-6">Masukkan email dan password admin Anda</p>

          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
              <Icons.AlertCircle className="w-5 h-5" /> {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-1.5">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@shakafarma.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-text-primary mb-1.5">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full gradient-primary text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          © {new Date().getFullYear()} Apotek Shaka Farma. Admin Panel.
        </p>
      </div>
    </div>
  );
}
