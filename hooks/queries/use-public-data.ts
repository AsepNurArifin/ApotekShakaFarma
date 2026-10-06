import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getFeaturedProducts,
  getPopularProducts,
  getProductById,
  getArticles,
  getArticleBySlug,
  getActivePosters,
  getTestimonials,
  searchProducts,
} from "@/lib/services/public-data";
import { Product } from "@/lib/types";

export function useProductsInitial(initialData?: Product[]) {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    initialData,
  });
}

export function useFeaturedProductsInitial(initialData?: Product[]) {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => getFeaturedProducts(),
    initialData,
  });
}

export function usePopularProductsInitial(limit = 8, initialData?: Product[]) {
  return useQuery({
    queryKey: ["products", "popular", limit],
    queryFn: () => getPopularProducts(limit),
    initialData,
  });
}

export function useProductById(id: string, initialData?: Product | null) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    initialData,
  });
}

export function useArticlesInitial(initialData?: any[]) {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(),
    initialData,
  });
}

export function useArticleBySlug(slug: string, initialData?: any) {
  return useQuery({
    queryKey: ["articles", slug],
    queryFn: () => getArticleBySlug(slug),
    enabled: !!slug,
    initialData,
  });
}

export function useActivePosters(initialData?: any[]) {
  return useQuery({
    queryKey: ["posters"],
    queryFn: () => getActivePosters(),
    initialData,
  });
}

export function useTestimonials(initialData?: any[]) {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => getTestimonials(),
    initialData,
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
  });
}
