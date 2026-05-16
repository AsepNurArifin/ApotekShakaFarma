import { z } from "zod";
import { Category, StockStatus } from "./types";

// ==========================================
// VALIDATION SCHEMAS
// ==========================================

export const ProductSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi").max(200, "Nama terlalu panjang"),
  category: z.nativeEnum(Category, { message: "Kategori tidak valid" }),
  description: z.string().max(2000, "Deskripsi terlalu panjang").optional().default(""),
  indication: z.string().max(500, "Indikasi terlalu panjang").optional().default(""),
  dosage: z.string().max(500, "Dosis terlalu panjang").optional().default(""),
  price: z.number().min(0, "Harga tidak boleh negatif").max(100000000, "Harga terlalu besar"),
  stock_status: z.nativeEnum(StockStatus, { message: "Status stok tidak valid" }),
  symptoms: z.array(z.string()).default([]),
  is_featured: z.boolean().default(false),
  image_url: z.string().url("URL gambar tidak valid").optional().nullable(),
});

export const ArticleSchema = z.object({
  title: z.string().min(1, "Judul artikel wajib diisi").max(200, "Judul terlalu panjang"),
  slug: z.string().min(1, "Slug wajib diisi").max(250, "Slug terlalu panjang"),
  excerpt: z.string().max(500, "Ringkasan terlalu panjang").optional().default(""),
  content: z.string().min(1, "Konten artikel wajib diisi").max(50000, "Konten terlalu panjang"),
  image_url: z.string().url("URL gambar tidak valid").optional().nullable(),
  related_product_ids: z.array(z.string().uuid()).default([]),
  is_published: z.boolean().default(false),
});

export const PosterSchema = z.object({
  title: z.string().min(1, "Judul poster wajib diisi").max(200, "Judul terlalu panjang"),
  description: z.string().max(1000, "Deskripsi terlalu panjang").optional().default(""),
  image_url: z.string().url("URL gambar tidak valid"),
  linked_product_ids: z.array(z.string().uuid()).default([]),
  is_active: z.boolean().default(true),
});

export const TestimonialSchema = z.object({
  customer_name: z.string().min(1, "Nama pelanggan wajib diisi").max(100, "Nama terlalu panjang"),
  content: z.string().min(1, "Konten testimoni wajib diisi").max(1000, "Konten terlalu panjang"),
  rating: z.number().min(1, "Rating minimal 1").max(5, "Rating maksimal 5"),
  is_published: z.boolean().default(false),
});

export const InquiryUpdateSchema = z.object({
  status: z.enum(["NEW", "FOLLOWED_UP", "CLOSED"], { message: "Status tidak valid" }),
});

// ==========================================
// TYPES (inferred dari schema)
// ==========================================

export type ProductInput = z.infer<typeof ProductSchema>;
export type ArticleInput = z.infer<typeof ArticleSchema>;
export type PosterInput = z.infer<typeof PosterSchema>;
export type TestimonialInput = z.infer<typeof TestimonialSchema>;
export type InquiryUpdateInput = z.infer<typeof InquiryUpdateSchema>;
