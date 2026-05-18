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
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
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
  await requireAuth();
  
  // Validasi input
  const validation = ProductSchema.safeParse(input);
  if (!validation.success) {
    return { 
      data: null, 
      error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") 
    };
  }

  const admin = getAdminClient();
  const { data, error } = await admin
    .from("products")
    .insert(validation.data)
    .select()
    .single();
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  await requireAuth();
  
  // Validasi input (partial untuk update)
  const validation = ProductSchema.partial().safeParse(input);
  if (!validation.success) {
    return { 
      data: null, 
      error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") 
    };
  }

  const admin = getAdminClient();
  const { data, error } = await admin
    .from("products")
    .update(validation.data)
    .eq("id", id)
    .select()
    .single();
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function deleteProduct(id: string) {
  await requireAuth();
  
  const admin = getAdminClient();
  const { error } = await admin
    .from("products")
    .delete()
    .eq("id", id);
  
  if (error) return { error: error.message };
  return { error: null };
}

// ==========================================
// ARTICLES
// ==========================================

export async function getArticles() {
  await requireAuth();
  const admin = getAdminClient();
  const { data, error } = await admin
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function createArticle(input: ArticleInput) {
  await requireAuth();
  
  const validation = ArticleSchema.safeParse(input);
  if (!validation.success) {
    return { 
      data: null, 
      error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") 
    };
  }

  const admin = getAdminClient();
  const { data, error } = await admin
    .from("articles")
    .insert(validation.data)
    .select()
    .single();
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
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
  await requireAuth();
  
  const admin = getAdminClient();
  const { error } = await admin
    .from("articles")
    .delete()
    .eq("id", id);
  
  if (error) return { error: error.message };
  return { error: null };
}

// ==========================================
// POSTERS
// ==========================================

export async function getPosters() {
  await requireAuth();
  const admin = getAdminClient();
  const { data, error } = await admin
    .from("posters")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function createPoster(input: PosterInput) {
  await requireAuth();
  
  const validation = PosterSchema.safeParse(input);
  if (!validation.success) {
    return { 
      data: null, 
      error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") 
    };
  }

  const admin = getAdminClient();
  const { data, error } = await admin
    .from("posters")
    .insert(validation.data)
    .select()
    .single();
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
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
  await requireAuth();
  
  const admin = getAdminClient();
  const { error } = await admin
    .from("posters")
    .delete()
    .eq("id", id);
  
  if (error) return { error: error.message };
  return { error: null };
}

// ==========================================
// TESTIMONIALS
// ==========================================

export async function getTestimonials() {
  await requireAuth();
  const admin = getAdminClient();
  const { data, error } = await admin
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
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
  await requireAuth();
  
  const admin = getAdminClient();
  const { error } = await admin
    .from("testimonials")
    .delete()
    .eq("id", id);
  
  if (error) return { error: error.message };
  return { error: null };
}

// ==========================================
// INQUIRIES
// ==========================================

export async function getInquiries() {
  await requireAuth();
  const admin = getAdminClient();
  const { data, error } = await admin
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) return { data: null, error: error.message };
  return { data, error: null };
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
  await requireAuth();
  const admin = getAdminClient();
  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "general";

  if (!file) {
    return { url: null, error: "File tidak ditemukan" };
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
  const { error } = await admin.storage.from("images").upload(fileName, arrayBuffer, {
    contentType: file.type,
  });

  if (error) return { url: null, error: error.message };

  const { data: urlData } = admin.storage.from("images").getPublicUrl(fileName);
  return { url: urlData.publicUrl, error: null };
}
