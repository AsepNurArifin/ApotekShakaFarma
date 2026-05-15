import Link from "next/link";
import { Product } from "@/lib/types";
import { CategoryLabel, StockLabel } from "@/lib/types";
import { formatPrice, getProductWALink } from "@/lib/whatsapp";
import { getCategoryIcon } from "./Icons";

function getCategoryBadgeClass(category: string): string {
  const map: Record<string, string> = {
    OB: "badge-ob", OBT: "badge-obt", SUPLEMEN: "badge-suplemen",
    HERBAL: "badge-herbal", ALKES: "badge-alkes", IBU_ANAK: "badge-ibu-anak",
  };
  return map[category] || "badge-ob";
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover group flex flex-col" id={`product-card-${product.id}`}>
      {/* Image */}
      <div className="relative aspect-square bg-surface-dim overflow-hidden img-zoom-container flex items-center justify-center">
        {getCategoryIcon(product.category, "w-24 h-24 text-gray-200 img-zoom")}

        {/* Stock Badge */}
        {product.stockStatus !== "TERSEDIA" && (
          <div className={`absolute top-3 right-3 badge ${product.stockStatus === "TERBATAS" ? "badge-stock-terbatas" : "badge-stock-habis"}`}>
            {StockLabel[product.stockStatus]}
          </div>
        )}

        <div className="absolute inset-0 bg-primary-700/0 group-hover:bg-primary-700/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className={`badge ${getCategoryBadgeClass(product.category)} self-start mb-2`}>
          {CategoryLabel[product.category]}
        </span>

        <Link href={`/katalog/${product.id}`} className="font-bold text-sm text-text-primary hover:text-primary-600 transition-colors line-clamp-2 leading-snug mb-1">
          {product.name}
        </Link>

        <p className="text-xs text-text-muted line-clamp-2 mb-3 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="mb-3">
          <span className="font-extrabold text-lg text-primary-700">{formatPrice(product.price)}</span>
        </div>

        {product.stockStatus !== "HABIS" ? (
          <a
            href={getProductWALink(product.name, product.price)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center gradient-wa text-white text-sm font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 btn-interactive"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Tanya via WA
          </a>
        ) : (
          <button disabled className="w-full text-center bg-gray-200 text-gray-500 text-sm font-bold py-2.5 rounded-xl cursor-not-allowed">
            Stok Habis
          </button>
        )}
      </div>
    </div>
  );
}
