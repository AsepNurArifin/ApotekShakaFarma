# 🚀 Panduan Developer - Apotek Shaka Farma

## 📌 Struktur Project

```
app/
├── admin/
│   ├── domain-actions.ts       ← ✅ GUNAKAN INI (fungsi baru)
│   ├── admin-actions.ts        ← ❌ DEPRECATED (jangan gunakan)
│   ├── actions.ts              ← Auth actions (login/logout)
│   └── (dashboard)/
│       ├── produk/
│       ├── artikel/
│       ├── poster/
│       ├── testimoni/
│       ├── inquiry/
│       └── pengaturan/
lib/
├── validation.ts               ← ✅ Schema validasi Zod
├── types.ts                    ← Type definitions
└── public-data.ts              ← Public data fetching
```

---

## 🔥 PENTING: Cara Kerja dengan Data Admin

### ❌ JANGAN LAKUKAN INI (Cara Lama):

```typescript
// ❌ DEPRECATED - Jangan gunakan lagi!
import { adminFetch, adminInsert, adminUpdate, adminDelete } from "../admin-actions";

const res = await adminFetch("products", { orderBy: "created_at" });
await adminInsert("products", record);
await adminUpdate("products", id, record);
await adminDelete("products", id);
```

### ✅ LAKUKAN INI (Cara Baru):

```typescript
// ✅ RECOMMENDED - Gunakan fungsi domain-specific
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../domain-actions";

// Fetch data
const res = await getProducts();
if (res.error) {
  console.error(res.error);
} else {
  console.log(res.data);
}

// Create
const newProduct = {
  name: "Paracetamol 500mg",
  category: Category.OB,
  price: 5000,
  stock_status: StockStatus.TERSEDIA,
  symptoms: ["demam", "sakit kepala"],
  is_featured: false,
  image_url: "https://...",
  description: "Obat penurun demam",
  indication: "Demam, sakit kepala",
  dosage: "3x sehari 1 tablet",
};

const result = await createProduct(newProduct);
if (result.error) {
  alert(`Error: ${result.error}`); // Pesan error sudah jelas dari validasi
} else {
  alert("Produk berhasil ditambahkan!");
}

// Update
await updateProduct(id, { price: 6000, is_featured: true });

// Delete
await deleteProduct(id);
```

---

## 📋 Daftar Fungsi yang Tersedia

### Products
```typescript
getProducts()                                    // Ambil semua produk
createProduct(input: ProductInput)               // Tambah produk baru
updateProduct(id, input: Partial<ProductInput>)  // Update produk
deleteProduct(id)                                // Hapus produk
```

### Articles
```typescript
getArticles()                                    // Ambil semua artikel
createArticle(input: ArticleInput)               // Tambah artikel baru
updateArticle(id, input: Partial<ArticleInput>)  // Update artikel
deleteArticle(id)                                // Hapus artikel
```

### Posters
```typescript
getPosters()                                     // Ambil semua poster
createPoster(input: PosterInput)                 // Tambah poster baru
updatePoster(id, input: Partial<PosterInput>)    // Update poster
deletePoster(id)                                 // Hapus poster
```

### Testimonials
```typescript
getTestimonials()                                      // Ambil semua testimoni
updateTestimonial(id, input: Partial<TestimonialInput>) // Update testimoni
deleteTestimonial(id)                                  // Hapus testimoni
```

### Inquiries
```typescript
getInquiries()                                   // Ambil semua inquiry
updateInquiryStatus(id, { status: "CLOSED" })    // Update status inquiry
```

### Profiles (User Management)
```typescript
getProfiles()                                    // Ambil semua user admin
updateProfileRole(id, { role: "SUPERADMIN" })    // Update role user
```

### Image Upload
```typescript
adminUploadImage(formData)                       // Upload gambar
// Validasi otomatis: JPG/PNG/WebP, max 5MB
```

---

## 🛡️ Validasi Input Otomatis

Semua fungsi di atas **sudah tervalidasi otomatis** dengan Zod. Jika input tidak valid, akan return error dengan pesan yang jelas.

### Contoh Error Handling:

```typescript
const result = await createProduct({
  name: "",           // ❌ Error: "name: Nama produk wajib diisi"
  price: -1000,       // ❌ Error: "price: Harga tidak boleh negatif"
  category: "INVALID" // ❌ Error: "category: Kategori tidak valid"
});

if (result.error) {
  alert(result.error); // Tampilkan pesan error ke user
}
```

### Validasi yang Diterapkan:

**Products:**
- ✅ Nama: wajib diisi, max 200 karakter
- ✅ Harga: minimal 0, maksimal 100 juta
- ✅ Kategori: harus salah satu dari enum Category
- ✅ Status stok: harus salah satu dari enum StockStatus
- ✅ Image URL: harus valid URL (jika ada)

**Articles:**
- ✅ Judul: wajib diisi, max 200 karakter
- ✅ Slug: wajib diisi, max 250 karakter
- ✅ Konten: wajib diisi, max 50.000 karakter

**Posters:**
- ✅ Judul: wajib diisi, max 200 karakter
- ✅ Image URL: wajib diisi dan harus valid URL

**Image Upload:**
- ✅ Tipe file: hanya JPG, PNG, WebP
- ✅ Ukuran: maksimal 5MB

---

## 🎨 Contoh Lengkap: Form Produk

```typescript
"use client";
import { useState } from "react";
import { createProduct, updateProduct } from "../../domain-actions";
import { Category, StockStatus } from "@/lib/types";

export default function ProductForm() {
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    
    const productData = {
      name: formData.get("name") as string,
      category: formData.get("category") as Category,
      price: parseInt(formData.get("price") as string),
      stock_status: formData.get("stock_status") as StockStatus,
      description: formData.get("description") as string,
      indication: formData.get("indication") as string,
      dosage: formData.get("dosage") as string,
      symptoms: (formData.get("symptoms") as string).split(",").map(s => s.trim()),
      is_featured: formData.get("is_featured") === "on",
      image_url: null, // atau URL dari upload
    };

    const result = await createProduct(productData);
    
    if (result.error) {
      alert(`Error: ${result.error}`);
    } else {
      alert("Produk berhasil ditambahkan!");
      // Refresh data atau redirect
    }
    
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" required placeholder="Nama produk" />
      <select name="category">
        <option value={Category.OB}>Obat Bebas</option>
        <option value={Category.OBT}>Obat Bebas Terbatas</option>
        {/* ... */}
      </select>
      <input name="price" type="number" required placeholder="Harga" />
      {/* ... field lainnya ... */}
      <button type="submit" disabled={saving}>
        {saving ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
```

---

## 🔍 Debugging Tips

### 1. Cek Error Validasi
```typescript
const result = await createProduct(data);
if (result.error) {
  console.log("Validation error:", result.error);
  // Error message sudah jelas, misal:
  // "name: Nama produk wajib diisi, price: Harga tidak boleh negatif"
}
```

### 2. Cek Data yang Dikirim
```typescript
console.log("Data yang akan dikirim:", productData);
const result = await createProduct(productData);
```

### 3. Cek Response dari Server
```typescript
const result = await getProducts();
console.log("Response:", result);
// { data: [...], error: null } atau { data: null, error: "..." }
```

---

## ⚠️ Hal yang Perlu Diperhatikan

1. **Jangan gunakan `admin-actions.ts`** - File ini deprecated
2. **Selalu handle error** - Cek `result.error` sebelum akses `result.data`
3. **Type casting yang benar** - Gunakan `as Category`, `as StockStatus`, dll
4. **Image upload terpisah** - Upload gambar dulu, baru simpan URL-nya
5. **Partial update** - Untuk update, tidak perlu kirim semua field

---

## 🚀 Quick Start untuk Fitur Baru

### Menambah Fitur CRUD Baru (misal: "Promo")

1. **Tambah type di `lib/types.ts`:**
```typescript
export interface Promo {
  id: string;
  title: string;
  discount: number;
  isActive: boolean;
  createdAt: string;
}
```

2. **Tambah schema validasi di `lib/validation.ts`:**
```typescript
export const PromoSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  discount: z.number().min(0).max(100, "Diskon 0-100%"),
  is_active: z.boolean().default(true),
});
```

3. **Tambah fungsi di `app/admin/domain-actions.ts`:**
```typescript
export async function getPromos() {
  await requireAuth();
  const admin = getAdminClient();
  const { data, error } = await admin.from("promos").select("*");
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function createPromo(input: PromoInput) {
  await requireAuth();
  const validation = PromoSchema.safeParse(input);
  if (!validation.success) {
    return { 
      data: null, 
      error: validation.error.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ") 
    };
  }
  const admin = getAdminClient();
  const { data, error } = await admin.from("promos").insert(validation.data).select().single();
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

// ... updatePromo, deletePromo
```

4. **Gunakan di halaman admin:**
```typescript
import { getPromos, createPromo } from "../../domain-actions";
```

---

## 📞 Butuh Bantuan?

- Baca file `REFACTOR_SUMMARY.md` untuk detail lengkap refactor
- Cek `lib/validation.ts` untuk melihat semua validasi yang tersedia
- Cek `lib/types.ts` untuk melihat semua type definitions
- Lihat contoh implementasi di halaman admin yang sudah ada

---

**Happy Coding! 🚀**
