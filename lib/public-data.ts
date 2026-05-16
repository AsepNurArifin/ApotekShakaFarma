import { createClient } from "@supabase/supabase-js";
import { Product, Poster, Article, Testimonial, Category, StockStatus } from "./types";

// Public Supabase client (anon key — safe for read-only public access)
function getPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ==========================================
// Field mapping: Supabase snake_case → TypeScript camelCase
// ==========================================

function mapProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name || "",
    category: (row.category as Category) || Category.OB,
    description: row.description || "",
    indication: row.indication || "",
    dosage: row.dosage || "",
    price: row.price || 0,
    stockStatus: (row.stock_status as StockStatus) || StockStatus.TERSEDIA,
    imageUrl: row.image_url || "",
    symptoms: row.symptoms || [],
    isFeatured: row.is_featured || false,
    viewCount: row.view_count || 0,
    createdAt: row.created_at || "",
  };
}

function mapPoster(row: any): Poster {
  return {
    id: row.id,
    title: row.title || "",
    description: row.description || "",
    imageUrl: row.image_url || "",
    linkedProductIds: row.linked_product_ids || [],
    isActive: row.is_active ?? true,
    createdAt: row.created_at || "",
  };
}

function mapArticle(row: any): Article {
  return {
    id: row.id,
    title: row.title || "",
    slug: row.slug || "",
    excerpt: row.excerpt || "",
    content: row.content || "",
    imageUrl: row.image_url || "",
    relatedProductIds: row.related_product_ids || [],
    isPublished: row.is_published ?? false,
    createdAt: row.created_at || "",
  };
}

function mapTestimonial(row: any): Testimonial {
  return {
    id: row.id,
    customerName: row.customer_name || "",
    content: row.content || "",
    rating: row.rating || 5,
    isPublished: row.is_published ?? false,
    createdAt: row.created_at || "",
  };
}

// ==========================================
// Products
// ==========================================

export async function getProducts(): Promise<Product[]> {
  const sb = getPublicClient();
  const { data } = await sb.from("products").select("*").order("created_at", { ascending: false });
  return (data || []).map(mapProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const sb = getPublicClient();
  const { data } = await sb.from("products").select("*").eq("id", id).single();
  return data ? mapProduct(data) : null;
}

export async function getPopularProducts(limit = 8): Promise<Product[]> {
  const sb = getPublicClient();
  const { data } = await sb.from("products").select("*").order("view_count", { ascending: false }).limit(limit);
  return (data || []).map(mapProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const sb = getPublicClient();
  const { data } = await sb.from("products").select("*").eq("is_featured", true).order("created_at", { ascending: false });
  return (data || []).map(mapProduct);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const sb = getPublicClient();
  const { data } = await sb.from("products").select("*").eq("category", product.category).neq("id", product.id).limit(limit);
  return (data || []).map(mapProduct);
}

// ==========================================
// Posters
// ==========================================

export async function getActivePosters(): Promise<Poster[]> {
  const sb = getPublicClient();
  const { data } = await sb.from("posters").select("*").eq("is_active", true).order("created_at", { ascending: false });
  return (data || []).map(mapPoster);
}

export async function getPosterProducts(poster: Poster): Promise<Product[]> {
  if (!poster.linkedProductIds || poster.linkedProductIds.length === 0) return [];
  const sb = getPublicClient();
  const { data } = await sb.from("products").select("*").in("id", poster.linkedProductIds);
  return (data || []).map(mapProduct);
}

// ==========================================
// Articles
// ==========================================

export async function getArticles(): Promise<Article[]> {
  const sb = getPublicClient();
  const { data } = await sb.from("articles").select("*").eq("is_published", true).order("created_at", { ascending: false });
  return (data || []).map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const sb = getPublicClient();
  const { data } = await sb.from("articles").select("*").eq("slug", slug).single();
  return data ? mapArticle(data) : null;
}

// ==========================================
// Testimonials
// ==========================================

export async function getTestimonials(): Promise<Testimonial[]> {
  const sb = getPublicClient();
  const { data } = await sb.from("testimonials").select("*").eq("is_published", true).order("created_at", { ascending: false });
  return (data || []).map(mapTestimonial);
}

// ==========================================
// Search (for katalog)
// ==========================================

export async function searchProducts(query: string): Promise<Product[]> {
  const sb = getPublicClient();
  const q = `%${query}%`;
  const { data } = await sb.from("products").select("*").or(`name.ilike.${q},description.ilike.${q}`);
  return (data || []).map(mapProduct);
}
