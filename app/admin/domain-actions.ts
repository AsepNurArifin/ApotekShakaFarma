"use server";

import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { cache } from "react";
import { 
  ProductSchema, 
  ArticleSchema, 
  PosterSchema, 
  TestimonialSchema,
  InquiryUpdateSchema,
  ProductInput,
  ArticleInput,
  PosterInput,
  TestimonialInput,
  InquiryUpdateInput
} from "@/lib/validation";
import { Product, Article, Poster, Testimonial, Inquiry } from "@/lib/types";

// ==========================================
// HELPER: Admin Client & Auth (CACHED)
// ==========================================

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("Variabel lingkungan 'NEXT_PUBLIC_SUPABASE_URL' belum diatur. Pastikan database URL Anda terkonfigurasi dengan benar.");
  }
  
  if (!serviceKey) {
    throw new Error("Variabel lingkungan 'SUPABASE_SERVICE_ROLE_KEY' (Service Role Key) belum diatur di server hosting (production) Anda. Silakan tambahkan 'SUPABASE_SERVICE_ROLE_KEY' di settings/environment variables hosting dashboard Anda (misal Vercel Dashboard) agar fitur Admin berfungsi.");
  }

  return createClient(url, serviceKey);
}

// Cache auth check untuk menghindari multiple calls
const requireAuth = cache(async () => {
  const supabase = await createServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error("Tidak memiliki akses");
  }
  
  return user;
});

// ==========================================
// PRODUCTS
// ==========================================

export async function getProducts() {
  try {
    await requireAuth();
    const admin = getAdminClient();
    const { data, error } = await admin
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("getProducts error:", error);
      return { data: null, error: error.message };
    }
    return { data, error: null };
  } catch (error: any) {
    console.error("getProducts exception:", error);
    return { data: null, error: error.message || "Terjadi kesalahan" };
  }
}

export async function createProduct(input: ProductInput) {
  try {
    await requireAuth();
    const validation = ProductSchema.safeParse(input);
    if (!validation.success) {
      return { data: null, error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") };
    }
    const admin = getAdminClient();
    const { data, error } = await admin.from("products").insert(validation.data).select().single();
    if (error) return { data: null, error: error.message };
    return { data, error: null };
  } catch (err: any) {
    console.error("createProduct error:", err);
    return { data: null, error: err.message || "Gagal membuat produk" };
  }
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  try {
    await requireAuth();
    const validation = ProductSchema.partial().safeParse(input);
    if (!validation.success) {
      return { data: null, error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") };
    }
    const admin = getAdminClient();
    const { data, error } = await admin.from("products").update(validation.data).eq("id", id).select().single();
    if (error) return { data: null, error: error.message };
    return { data, error: null };
  } catch (err: any) {
    console.error("updateProduct error:", err);
    return { data: null, error: err.message || "Gagal update produk" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await requireAuth();
    const admin = getAdminClient();
    const { error } = await admin.from("products").delete().eq("id", id);
    if (error) return { error: error.message };
    return { error: null };
  } catch (err: any) {
    console.error("deleteProduct error:", err);
    return { error: err.message || "Gagal hapus produk" };
  }
}

// ==========================================
// ARTICLES
// ==========================================

export async function getArticles() {
  try {
    await requireAuth();
    const admin = getAdminClient();
    const { data, error } = await admin.from("articles").select("*").order("created_at", { ascending: false });
    if (error) return { data: null, error: error.message };
    return { data, error: null };
  } catch (err: any) {
    console.error("getArticles error:", err);
    return { data: null, error: err.message || "Gagal memuat artikel" };
  }
}

export async function createArticle(input: ArticleInput) {
  try {
    await requireAuth();
    const validation = ArticleSchema.safeParse(input);
    if (!validation.success) {
      return { data: null, error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") };
    }
    const admin = getAdminClient();
    const { data, error } = await admin.from("articles").insert(validation.data).select().single();
    if (error) return { data: null, error: error.message };
    return { data, error: null };
  } catch (err: any) {
    console.error("createArticle error:", err);
    return { data: null, error: err.message || "Gagal membuat artikel" };
  }
}

export async function updateArticle(id: string, input: Partial<ArticleInput>) {
  await requireAuth();
  
  const validation = ArticleSchema.partial().safeParse(input);
  if (!validation.success) {
    return { 
      data: null, 
      error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") 
    };
  }

  const admin = getAdminClient();
  const { data, error } = await admin
    .from("articles")
    .update(validation.data)
    .eq("id", id)
    .select()
    .single();
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function deleteArticle(id: string) {
  try {
    await requireAuth();
    const admin = getAdminClient();
    const { error } = await admin.from("articles").delete().eq("id", id);
    if (error) return { error: error.message };
    return { error: null };
  } catch (err: any) {
    console.error("deleteArticle error:", err);
    return { error: err.message || "Gagal hapus artikel" };
  }
}

// ==========================================
// POSTERS
// ==========================================

export async function getPosters() {
  try {
    await requireAuth();
    const admin = getAdminClient();
    const { data, error } = await admin.from("posters").select("*").order("created_at", { ascending: false });
    if (error) return { data: null, error: error.message };
    return { data, error: null };
  } catch (err: any) {
    console.error("getPosters error:", err);
    return { data: null, error: err.message || "Gagal memuat poster" };
  }
}

export async function createPoster(input: PosterInput) {
  try {
    await requireAuth();
    const validation = PosterSchema.safeParse(input);
    if (!validation.success) {
      return { data: null, error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") };
    }
    const admin = getAdminClient();
    const { data, error } = await admin.from("posters").insert(validation.data).select().single();
    if (error) return { data: null, error: error.message };
    return { data, error: null };
  } catch (err: any) {
    console.error("createPoster error:", err);
    return { data: null, error: err.message || "Gagal membuat poster" };
  }
}

export async function updatePoster(id: string, input: Partial<PosterInput>) {
  await requireAuth();
  
  const validation = PosterSchema.partial().safeParse(input);
  if (!validation.success) {
    return { 
      data: null, 
      error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") 
    };
  }

  const admin = getAdminClient();
  const { data, error } = await admin
    .from("posters")
    .update(validation.data)
    .eq("id", id)
    .select()
    .single();
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function deletePoster(id: string) {
  try {
    await requireAuth();
    const admin = getAdminClient();
    const { error } = await admin.from("posters").delete().eq("id", id);
    if (error) return { error: error.message };
    return { error: null };
  } catch (err: any) {
    console.error("deletePoster error:", err);
    return { error: err.message || "Gagal hapus poster" };
  }
}

// ==========================================
// TESTIMONIALS
// ==========================================

export async function getTestimonials() {
  try {
    await requireAuth();
    const admin = getAdminClient();
    const { data, error } = await admin.from("testimonials").select("*").order("created_at", { ascending: false });
    if (error) return { data: null, error: error.message };
    return { data, error: null };
  } catch (err: any) {
    console.error("getTestimonials error:", err);
    return { data: null, error: err.message || "Gagal memuat testimoni" };
  }
}

export async function updateTestimonial(id: string, input: Partial<TestimonialInput>) {
  await requireAuth();
  
  const validation = TestimonialSchema.partial().safeParse(input);
  if (!validation.success) {
    return { 
      data: null, 
      error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") 
    };
  }

  const admin = getAdminClient();
  const { data, error } = await admin
    .from("testimonials")
    .update(validation.data)
    .eq("id", id)
    .select()
    .single();
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function deleteTestimonial(id: string) {
  try {
    await requireAuth();
    const admin = getAdminClient();
    const { error } = await admin.from("testimonials").delete().eq("id", id);
    if (error) return { error: error.message };
    return { error: null };
  } catch (err: any) {
    console.error("deleteTestimonial error:", err);
    return { error: err.message || "Gagal hapus testimoni" };
  }
}

// ==========================================
// INQUIRIES
// ==========================================

export async function getInquiries() {
  try {
    await requireAuth();
    const admin = getAdminClient();
    const { data, error } = await admin.from("inquiries").select("*").order("created_at", { ascending: false });
    if (error) return { data: null, error: error.message };
    return { data, error: null };
  } catch (err: any) {
    console.error("getInquiries error:", err);
    return { data: null, error: err.message || "Gagal memuat inquiry" };
  }
}

export async function updateInquiryStatus(id: string, input: InquiryUpdateInput) {
  await requireAuth();
  
  const validation = InquiryUpdateSchema.safeParse(input);
  if (!validation.success) {
    return { 
      data: null, 
      error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") 
    };
  }

  const admin = getAdminClient();
  const { data, error } = await admin
    .from("inquiries")
    .update(validation.data)
    .eq("id", id)
    .select()
    .single();
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

// ==========================================
// PROFILES (User Management)
// ==========================================

export async function getProfiles() {
  await requireAuth();
  const admin = getAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function updateProfileRole(id: string, input: { role: "ADMIN" | "SUPERADMIN" }) {
  await requireAuth();
  
  // Validasi role
  if (!["ADMIN", "SUPERADMIN"].includes(input.role)) {
    return { data: null, error: "Role tidak valid" };
  }

  const admin = getAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .update({ role: input.role })
    .eq("id", id)
    .select()
    .single();
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

// ==========================================
// IMAGE UPLOAD (tetap generic karena memang utility)
// ==========================================

export async function adminUploadImage(formData: FormData) {
  try {
    await requireAuth();
    const admin = getAdminClient();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "general";

    if (!file || !(file instanceof File) || file.size === 0) {
      return { url: null, error: "File tidak ditemukan atau kosong" };
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return { url: null, error: "Tipe file tidak valid. Hanya JPG, PNG, dan WebP yang diperbolehkan" };
    }

    // Validasi ukuran file (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { url: null, error: "Ukuran file terlalu besar. Maksimal 5MB" };
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    const { error } = await admin.storage.from("images").upload(fileName, uint8, {
      contentType: file.type,
      upsert: false,
    });

    if (error) return { url: null, error: `Upload storage gagal: ${error.message}` };

    const { data: urlData } = admin.storage.from("images").getPublicUrl(fileName);
    return { url: urlData.publicUrl, error: null };
  } catch (err: any) {
    console.error("adminUploadImage fatal error:", err);
    return { url: null, error: err.message || "Terjadi kesalahan saat upload gambar" };
  }
}
