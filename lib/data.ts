import { Product, Poster, Testimonial, Article, Category, StockStatus } from "./types";

export const products: Product[] = [
  { id: "p1", name: "Paracetamol 500mg", category: Category.OB, description: "Obat pereda nyeri dan penurun demam yang aman untuk dewasa dan anak-anak di atas 6 tahun.", indication: "Demam, sakit kepala, nyeri ringan hingga sedang", dosage: "Dewasa: 1-2 tablet, 3-4x sehari. Anak 6-12 tahun: 1/2-1 tablet.", price: 5000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/paracetamol.jpg", symptoms: ["demam", "sakit kepala", "nyeri"], isFeatured: true, viewCount: 320, createdAt: "2026-05-01" },
  { id: "p2", name: "Ambroxol Sirup 60ml", category: Category.OB, description: "Sirup pengencer dahak untuk meredakan batuk berdahak pada dewasa dan anak.", indication: "Batuk berdahak", dosage: "Dewasa: 10ml 3x sehari. Anak: 5ml 2-3x sehari.", price: 18000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/ambroxol.jpg", symptoms: ["batuk", "dahak", "flu"], isFeatured: false, viewCount: 180, createdAt: "2026-05-01" },
  { id: "p3", name: "Vitamin C 1000mg", category: Category.SUPLEMEN, description: "Suplemen vitamin C dosis tinggi untuk meningkatkan daya tahan tubuh dan antioksidan.", indication: "Meningkatkan imunitas, antioksidan", dosage: "1 tablet effervescent per hari, larutkan dalam air.", price: 45000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/vitc.jpg", symptoms: ["daya tahan tubuh", "lelah", "imunitas"], isFeatured: true, viewCount: 450, createdAt: "2026-05-02" },
  { id: "p4", name: "Antangin Herbal", category: Category.HERBAL, description: "Jamu herbal untuk meredakan masuk angin, perut kembung, dan mual.", indication: "Masuk angin, kembung, mual", dosage: "1 sachet 2-3x sehari setelah makan.", price: 3000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/antangin.jpg", symptoms: ["masuk angin", "kembung", "mual"], isFeatured: false, viewCount: 210, createdAt: "2026-05-02" },
  { id: "p5", name: "Tensimeter Digital Omron", category: Category.ALKES, description: "Alat pengukur tekanan darah digital otomatis yang akurat dan mudah digunakan di rumah.", indication: "Monitoring tekanan darah", dosage: "-", price: 385000, stockStatus: StockStatus.TERBATAS, imageUrl: "/products/tensimeter.jpg", symptoms: ["tekanan darah", "hipertensi"], isFeatured: true, viewCount: 95, createdAt: "2026-05-03" },
  { id: "p6", name: "Cetirizine 10mg", category: Category.OBT, description: "Obat antihistamin untuk meredakan alergi seperti bersin, gatal, dan pilek alergi.", indication: "Alergi, rhinitis, urtikaria", dosage: "Dewasa: 1 tablet 1x sehari.", price: 8000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/cetirizine.jpg", symptoms: ["alergi", "bersin", "gatal", "pilek"], isFeatured: false, viewCount: 160, createdAt: "2026-05-03" },
  { id: "p7", name: "Minyak Kayu Putih 60ml", category: Category.HERBAL, description: "Minyak kayu putih alami untuk menghangatkan badan dan meredakan perut kembung.", indication: "Perut kembung, masuk angin, gigitan serangga", dosage: "Oleskan secukupnya pada area yang diinginkan.", price: 22000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/kayuputih.jpg", symptoms: ["kembung", "masuk angin", "pegal"], isFeatured: false, viewCount: 130, createdAt: "2026-05-03" },
  { id: "p8", name: "Prenatal Multivitamin", category: Category.IBU_ANAK, description: "Suplemen lengkap untuk ibu hamil mengandung asam folat, zat besi, kalsium, dan DHA.", indication: "Kebutuhan nutrisi ibu hamil", dosage: "1 tablet 1x sehari setelah makan.", price: 95000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/prenatal.jpg", symptoms: ["kehamilan", "nutrisi ibu hamil"], isFeatured: true, viewCount: 200, createdAt: "2026-05-04" },
  { id: "p9", name: "Omeprazole 20mg", category: Category.OBT, description: "Obat untuk mengurangi produksi asam lambung berlebih.", indication: "Asam lambung, GERD, tukak lambung", dosage: "1 kapsul 1x sehari sebelum makan.", price: 12000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/omeprazole.jpg", symptoms: ["asam lambung", "maag", "GERD"], isFeatured: false, viewCount: 275, createdAt: "2026-05-04" },
  { id: "p10", name: "Hansaplast Plester Roll", category: Category.ALKES, description: "Plester gulung untuk menutup luka kecil, tahan air dan hipoalergenik.", indication: "Luka kecil, goresan", dosage: "Potong sesuai kebutuhan, tempelkan pada luka yang bersih.", price: 15000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/hansaplast.jpg", symptoms: ["luka", "pertolongan pertama"], isFeatured: false, viewCount: 80, createdAt: "2026-05-05" },
  { id: "p11", name: "Madu Murni TJ 500g", category: Category.HERBAL, description: "Madu murni alami berkualitas tinggi untuk menjaga kesehatan dan daya tahan tubuh.", indication: "Meningkatkan stamina, meredakan batuk alami", dosage: "1-2 sendok makan per hari.", price: 75000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/madu.jpg", symptoms: ["stamina", "batuk", "daya tahan tubuh"], isFeatured: true, viewCount: 190, createdAt: "2026-05-05" },
  { id: "p12", name: "Ibuprofen 400mg", category: Category.OBT, description: "Obat antiinflamasi non-steroid (NSAID) untuk meredakan nyeri dan peradangan.", indication: "Nyeri otot, sakit gigi, nyeri haid", dosage: "1 tablet 3x sehari setelah makan.", price: 7000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/ibuprofen.jpg", symptoms: ["nyeri", "sakit gigi", "nyeri haid", "peradangan"], isFeatured: false, viewCount: 220, createdAt: "2026-05-06" },
  { id: "p13", name: "Caladine Lotion 60ml", category: Category.IBU_ANAK, description: "Lotion anti gatal untuk biang keringat dan iritasi kulit pada bayi dan anak.", indication: "Biang keringat, gatal ringan, iritasi kulit", dosage: "Oleskan pada area kulit yang gatal 2-3x sehari.", price: 18000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/caladine.jpg", symptoms: ["gatal", "biang keringat", "iritasi kulit"], isFeatured: false, viewCount: 110, createdAt: "2026-05-06" },
  { id: "p14", name: "Multivitamin Dewasa Complete", category: Category.SUPLEMEN, description: "Multivitamin lengkap untuk memenuhi kebutuhan vitamin dan mineral harian orang dewasa.", indication: "Kebutuhan vitamin harian, pencegahan defisiensi", dosage: "1 tablet 1x sehari setelah makan.", price: 65000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/multivit.jpg", symptoms: ["lelah", "daya tahan tubuh", "nutrisi"], isFeatured: true, viewCount: 300, createdAt: "2026-05-07" },
  { id: "p15", name: "Betadine Antiseptik 30ml", category: Category.OB, description: "Larutan antiseptik povidone iodine untuk membersihkan dan mencegah infeksi pada luka.", indication: "Luka kecil, luka bakar ringan, pencegahan infeksi", dosage: "Oleskan pada area luka 2-3x sehari.", price: 25000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/betadine.jpg", symptoms: ["luka", "infeksi", "antiseptik"], isFeatured: false, viewCount: 140, createdAt: "2026-05-07" },
  { id: "p16", name: "Thermometer Digital", category: Category.ALKES, description: "Termometer digital yang cepat dan akurat untuk mengukur suhu tubuh.", indication: "Pengukuran suhu tubuh", dosage: "-", price: 35000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/thermometer.jpg", symptoms: ["demam", "suhu tubuh"], isFeatured: false, viewCount: 75, createdAt: "2026-05-08" },
  { id: "p17", name: "OBH Combi Batuk Plus 60ml", category: Category.OB, description: "Sirup obat batuk hitam untuk meredakan batuk berdahak dan kering.", indication: "Batuk berdahak, batuk kering, flu", dosage: "Dewasa: 15ml 3x sehari. Anak 6-12: 10ml 3x sehari.", price: 16000, stockStatus: StockStatus.TERBATAS, imageUrl: "/products/obhcombi.jpg", symptoms: ["batuk", "flu", "pilek"], isFeatured: false, viewCount: 195, createdAt: "2026-05-08" },
  { id: "p18", name: "Omega-3 Fish Oil 1000mg", category: Category.SUPLEMEN, description: "Suplemen minyak ikan kaya omega-3 untuk kesehatan jantung dan otak.", indication: "Kesehatan jantung, otak, menurunkan trigliserida", dosage: "1-2 softgel 1x sehari setelah makan.", price: 85000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/omega3.jpg", symptoms: ["jantung", "kolesterol", "otak"], isFeatured: false, viewCount: 165, createdAt: "2026-05-09" },
  { id: "p19", name: "Diapers Premium Bayi M 20pcs", category: Category.IBU_ANAK, description: "Popok bayi premium ultra tipis dan daya serap tinggi untuk kenyamanan si kecil.", indication: "-", dosage: "Ganti setiap 3-4 jam atau saat sudah penuh.", price: 55000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/diapers.jpg", symptoms: [], isFeatured: false, viewCount: 120, createdAt: "2026-05-09" },
  { id: "p20", name: "Masker Medis 3-Ply 50pcs", category: Category.ALKES, description: "Masker medis 3 lapis dengan filter bakteri untuk perlindungan harian.", indication: "Perlindungan saluran pernapasan", dosage: "Gunakan 1 masker, ganti setiap 4-6 jam.", price: 30000, stockStatus: StockStatus.TERSEDIA, imageUrl: "/products/masker.jpg", symptoms: [], isFeatured: false, viewCount: 250, createdAt: "2026-05-10" },
];

export const posters: Poster[] = [
  { id: "pos1", title: "Vitamin C untuk Imunitas!", description: "Jaga daya tahan tubuh di musim pancaroba. Dapatkan Vitamin C 1000mg hanya di Apotek Shaka Farma!", imageUrl: "/posters/poster-vitc.jpg", linkedProductIds: ["p3", "p14"], isActive: true, createdAt: "2026-05-10" },
  { id: "pos2", title: "Obat Flu & Batuk Lengkap", description: "Stok lengkap obat flu dan batuk untuk seluruh keluarga. Konsultasikan dengan apoteker kami!", imageUrl: "/posters/poster-flu.jpg", linkedProductIds: ["p1", "p2", "p17"], isActive: true, createdAt: "2026-05-12" },
  { id: "pos3", title: "Alat Kesehatan untuk Rumah", description: "Lengkapi kebutuhan alat kesehatan di rumah Anda. Tensimeter, termometer, dan lainnya tersedia!", imageUrl: "/posters/poster-alkes.jpg", linkedProductIds: ["p5", "p16", "p20"], isActive: true, createdAt: "2026-05-14" },
];

export const testimonials: Testimonial[] = [
  { id: "t1", customerName: "Ibu Sari", content: "Lihat info vitamin di story WA, langsung klik ke website. Harganya transparan dan bisa langsung chat WA. Pelayanannya ramah banget!", rating: 5, isPublished: true, createdAt: "2026-05-05" },
  { id: "t2", customerName: "Budi Santoso", content: "Apotek Shaka Farma lengkap banget stoknya. Saya sering cek produk di website, praktis buat tahu harga dan ketersediaan.", rating: 5, isPublished: true, createdAt: "2026-05-07" },
  { id: "t3", customerName: "Dewi Lestari", content: "Apotekernya sangat membantu, saya tanya via WA langsung dijawab. Obatnya juga bisa diantar ke rumah!", rating: 4, isPublished: true, createdAt: "2026-05-08" },
  { id: "t4", customerName: "Pak Tono", content: "Sudah jadi pelanggan setia. Website-nya mudah dipakai, tinggal cari obat yang dibutuhkan dan langsung chat. Sangat praktis!", rating: 5, isPublished: true, createdAt: "2026-05-10" },
  { id: "t5", customerName: "Rina Wati", content: "Harganya lebih murah dari apotek lain. Pengalaman belanja saya selalu menyenangkan dan obatnya lengkap.", rating: 4, isPublished: true, createdAt: "2026-05-12" },
];

export const articles: Article[] = [
  { id: "a1", title: "Tips Memilih Vitamin yang Tepat untuk Daya Tahan Tubuh", slug: "tips-memilih-vitamin", excerpt: "Panduan lengkap memilih suplemen vitamin yang sesuai kebutuhan tubuh Anda di musim pancaroba.", content: "Di musim pancaroba, daya tahan tubuh sering kali menurun. Memilih vitamin yang tepat sangat penting untuk menjaga kesehatan. Berikut beberapa tips:\n\n1. **Kenali kebutuhan tubuh Anda** — Setiap orang memiliki kebutuhan vitamin berbeda.\n2. **Perhatikan dosis** — Jangan konsumsi melebihi dosis harian.\n3. **Pilih yang terdaftar BPOM** — Pastikan produk aman.\n4. **Konsultasi apoteker** — Tanyakan pada apoteker kami untuk rekomendasi.\n\nDi Apotek Shaka Farma, kami menyediakan berbagai vitamin berkualitas dengan harga terjangkau.", imageUrl: "/articles/vitamin-tips.jpg", relatedProductIds: ["p3", "p14"], isPublished: true, createdAt: "2026-05-05" },
  { id: "a2", title: "Obat Flu yang Aman: Panduan untuk Keluarga", slug: "obat-flu-aman-keluarga", excerpt: "Kenali jenis-jenis obat flu yang aman untuk seluruh anggota keluarga, dari anak-anak hingga lansia.", content: "Flu adalah penyakit yang sering menyerang, terutama saat pergantian musim. Berikut panduan obat flu yang aman:\n\n1. **Paracetamol** — Aman untuk menurunkan demam.\n2. **Obat batuk** — Pilih sesuai jenis batuk.\n3. **Dekongestan** — Untuk hidung tersumbat.\n4. **Istirahat & cairan** — Tetap penting.\n\nKonsultasikan dengan apoteker kami untuk dosis yang tepat.", imageUrl: "/articles/flu-guide.jpg", relatedProductIds: ["p1", "p2", "p17"], isPublished: true, createdAt: "2026-05-08" },
  { id: "a3", title: "Pentingnya P3K di Rumah: Daftar Obat & Alat yang Wajib Ada", slug: "p3k-di-rumah", excerpt: "Daftar lengkap obat-obatan dan alat kesehatan yang wajib tersedia di kotak P3K keluarga Anda.", content: "Setiap rumah perlu memiliki kotak P3K yang lengkap. Berikut daftar wajib:\n\n1. **Perban & plester** — Untuk luka kecil.\n2. **Antiseptik** — Betadine atau alkohol 70%.\n3. **Paracetamol** — Pereda nyeri & demam.\n4. **Termometer** — Untuk cek suhu.\n5. **Masker** — Perlindungan.\n\nDapatkan semua kebutuhan P3K di Apotek Shaka Farma!", imageUrl: "/articles/p3k-guide.jpg", relatedProductIds: ["p10", "p15", "p16", "p20"], isPublished: true, createdAt: "2026-05-12" },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getPopularProducts(limit = 8): Product[] {
  return [...products].sort((a, b) => b.viewCount - a.viewCount).slice(0, limit);
}

export function getActivePosters(): Poster[] {
  return posters.filter((p) => p.isActive);
}

export function getPosterProducts(poster: Poster): Product[] {
  return poster.linkedProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.symptoms.some((s) => s.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  );
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, limit);
}
