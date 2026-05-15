// ==========================================
// WhatsApp CTA Helper Functions
// ==========================================

const WA_PHONE = "6281234567890"; // Ganti dengan nomor WhatsApp apotek

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getProductWALink(productName: string, price: number): string {
  const message = `Halo Apotek Shaka Farma! 👋\nSaya tertarik dengan produk: ${productName}\nHarga: ${formatPrice(price)}\nApakah masih tersedia?\nTerima kasih!`;
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getPosterWALink(posterTitle: string): string {
  const message = `Halo! Saya lihat poster "${posterTitle}" di website.\nSaya ingin bertanya lebih lanjut.\nTerima kasih! 🙏`;
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWALink(): string {
  const message = `Halo Apotek Shaka Farma!\nSaya ingin bertanya tentang produk/ketersediaan obat.\nTerima kasih!`;
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getWAPhoneDisplay(): string {
  return "+62 812-3456-7890";
}
