// ==========================================
// Apotek Shaka Farma — Type Definitions
// ==========================================

export enum Category {
  OB = "OB",
  OBT = "OBT",
  SUPLEMEN = "SUPLEMEN",
  HERBAL = "HERBAL",
  ALKES = "ALKES",
  IBU_ANAK = "IBU_ANAK",
}

export const CategoryLabel: Record<Category, string> = {
  [Category.OB]: "Obat Bebas",
  [Category.OBT]: "Obat Bebas Terbatas",
  [Category.SUPLEMEN]: "Suplemen",
  [Category.HERBAL]: "Herbal",
  [Category.ALKES]: "Alat Kesehatan",
  [Category.IBU_ANAK]: "Ibu & Anak",
};

export const CategoryIcon: Record<Category, string> = {
  [Category.OB]: "💊",
  [Category.OBT]: "💉",
  [Category.SUPLEMEN]: "🧬",
  [Category.HERBAL]: "🌿",
  [Category.ALKES]: "🩺",
  [Category.IBU_ANAK]: "👶",
};

export enum StockStatus {
  TERSEDIA = "TERSEDIA",
  TERBATAS = "TERBATAS",
  HABIS = "HABIS",
}

export const StockLabel: Record<StockStatus, string> = {
  [StockStatus.TERSEDIA]: "Tersedia",
  [StockStatus.TERBATAS]: "Stok Terbatas",
  [StockStatus.HABIS]: "Habis",
};

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  indication: string;
  dosage: string;
  price: number;
  stockStatus: StockStatus;
  imageUrl: string;
  symptoms: string[];
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
}

// Poster Promosi — menggantikan sistem promo/flash sale
// Admin upload poster (gambar) yang dipajang di website, sama seperti SW/SG
export interface Poster {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkedProductIds: string[]; // produk yang dipromosikan di poster
  isActive: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  content: string;
  rating: number;
  isPublished: boolean;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  relatedProductIds: string[];
  isPublished: boolean;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  productId: string | null;
  status: "NEW" | "FOLLOWED_UP" | "CLOSED";
  createdAt: string;
}

export interface Profile {
  id: string;
  fullName: string;
  role: "ADMIN" | "SUPERADMIN";
  createdAt: string;
}
