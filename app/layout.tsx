import type { Metadata } from "next";
import "./globals.css";
import PublicShell from "./components/PublicShell";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: {
    default: "Apotek Shaka Farma — Apotek Terpercaya, Harga Bersahabat",
    template: "%s | Apotek Shaka Farma",
  },
  description:
    "Apotek Shaka Farma menyediakan obat, vitamin, suplemen, dan alat kesehatan berkualitas dengan harga bersahabat. Chat langsung dengan apoteker via WhatsApp.",
  keywords: [
    "apotek",
    "obat",
    "vitamin",
    "suplemen",
    "apotek terdekat",
    "shaka farma",
    "beli obat online",
    "harga obat",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Apotek Shaka Farma",
    title: "Apotek Shaka Farma — Apotek Terpercaya",
    description:
      "Obat, vitamin, dan alat kesehatan berkualitas. Chat langsung dengan apoteker kami!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <PublicShell>{children}</PublicShell>
        <SpeedInsights />
      </body>
    </html>
  );
}

