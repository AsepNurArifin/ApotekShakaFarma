import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getPosters,
  createPoster,
  updatePoster,
  deletePoster,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
  getInquiries,
  updateInquiryStatus,
} from "@/actions/domain-actions";

// ==========================================
// ADMIN PRODUCTS
// ==========================================

export function useAdminProducts() {
  return useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      const res = await getProducts();
      if (res.error) throw new Error(res.error);
      return res.data || [];
    },
  });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await createProduct(data);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await updateProduct(id, data);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteProduct(id);
      if (res.error) throw new Error(res.error);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// ==========================================
// ADMIN ARTICLES
// ==========================================

export function useAdminArticles() {
  return useQuery({
    queryKey: ["admin", "articles"],
    queryFn: async () => {
      const res = await getArticles();
      if (res.error) throw new Error(res.error);
      return res.data || [];
    },
  });
}

export function useCreateArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await createArticle(data);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useUpdateArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await updateArticle(id, data);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useDeleteArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteArticle(id);
      if (res.error) throw new Error(res.error);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

// ==========================================
// ADMIN POSTERS
// ==========================================

export function useAdminPosters() {
  return useQuery({
    queryKey: ["admin", "posters"],
    queryFn: async () => {
      const res = await getPosters();
      if (res.error) throw new Error(res.error);
      return res.data || [];
    },
  });
}

export function useCreatePosterMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await createPoster(data);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "posters"] });
      queryClient.invalidateQueries({ queryKey: ["posters"] });
    },
  });
}

export function useUpdatePosterMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await updatePoster(id, data);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "posters"] });
      queryClient.invalidateQueries({ queryKey: ["posters"] });
    },
  });
}

export function useDeletePosterMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deletePoster(id);
      if (res.error) throw new Error(res.error);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "posters"] });
      queryClient.invalidateQueries({ queryKey: ["posters"] });
    },
  });
}

// ==========================================
// ADMIN TESTIMONIALS
// ==========================================

export function useAdminTestimonials() {
  return useQuery({
    queryKey: ["admin", "testimonials"],
    queryFn: async () => {
      const res = await getTestimonials();
      if (res.error) throw new Error(res.error);
      return res.data || [];
    },
  });
}

export function useUpdateTestimonialMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await updateTestimonial(id, data);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useDeleteTestimonialMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteTestimonial(id);
      if (res.error) throw new Error(res.error);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

// ==========================================
// ADMIN INQUIRIES
// ==========================================

export function useAdminInquiries() {
  return useQuery({
    queryKey: ["admin", "inquiries"],
    queryFn: async () => {
      const res = await getInquiries();
      if (res.error) throw new Error(res.error);
      return res.data || [];
    },
  });
}

export function useUpdateInquiryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await updateInquiryStatus(id, data);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "inquiries"] });
    },
  });
}
