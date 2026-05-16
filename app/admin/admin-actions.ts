"use server";

import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

// ==========================================
// DEPRECATED: File ini sudah tidak digunakan lagi.
// Gunakan domain-actions.ts untuk semua operasi admin.
// ==========================================
// 
// File ini dipertahankan sementara untuk backward compatibility,
// tapi semua fungsi generic CRUD sudah dipindahkan ke domain-specific
// functions di domain-actions.ts dengan validasi input yang proper.
// ==========================================

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function requireAuth() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Tidak memiliki akses");
  return user;
}

// DEPRECATED: Gunakan fungsi spesifik di domain-actions.ts
export async function adminFetch(table: string, options?: { orderBy?: string; ascending?: boolean; filter?: { column: string; value: string } }) {
  console.warn("⚠️ adminFetch() is deprecated. Use domain-specific functions from domain-actions.ts");
  await requireAuth();
  const admin = getAdminClient();
  let query = admin.from(table).select("*");
  if (options?.filter) query = query.eq(options.filter.column, options.filter.value);
  if (options?.orderBy) query = query.order(options.orderBy, { ascending: options?.ascending ?? false });
  const { data, error } = await query;
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

// DEPRECATED: Gunakan fungsi spesifik di domain-actions.ts
export async function adminInsert(table: string, record: Record<string, unknown>) {
  console.warn("⚠️ adminInsert() is deprecated. Use domain-specific functions from domain-actions.ts");
  await requireAuth();
  const admin = getAdminClient();
  const { data, error } = await admin.from(table).insert(record).select().single();
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

// DEPRECATED: Gunakan fungsi spesifik di domain-actions.ts
export async function adminUpdate(table: string, id: string, record: Record<string, unknown>) {
  console.warn("⚠️ adminUpdate() is deprecated. Use domain-specific functions from domain-actions.ts");
  await requireAuth();
  const admin = getAdminClient();
  const { data, error } = await admin.from(table).update(record).eq("id", id).select().single();
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

// DEPRECATED: Gunakan fungsi spesifik di domain-actions.ts
export async function adminDelete(table: string, id: string) {
  console.warn("⚠️ adminDelete() is deprecated. Use domain-specific functions from domain-actions.ts");
  await requireAuth();
  const admin = getAdminClient();
  const { error } = await admin.from(table).delete().eq("id", id);
  if (error) return { error: error.message };
  return { error: null };
}

// Image upload masih digunakan, tapi sudah dipindahkan ke domain-actions.ts dengan validasi
export async function adminUploadImage(formData: FormData) {
  console.warn("⚠️ adminUploadImage() from admin-actions.ts is deprecated. Use the one from domain-actions.ts");
  await requireAuth();
  const admin = getAdminClient();
  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "general";

  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error } = await admin.storage.from("images").upload(fileName, arrayBuffer, {
    contentType: file.type,
  });

  if (error) return { url: null, error: error.message };

  const { data: urlData } = admin.storage.from("images").getPublicUrl(fileName);
  return { url: urlData.publicUrl, error: null };
}
