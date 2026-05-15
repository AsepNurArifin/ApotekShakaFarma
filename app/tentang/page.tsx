import { Metadata } from "next";
import { getGeneralWALink, getWAPhoneDisplay } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali Apotek Shaka Farma — apotek independen terpercaya dengan apoteker bersertifikat dan layanan profesional.",
};

export default function TentangPage() {
  const isOpenNow = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    if (day === 0) return hour >= 9 && hour < 17;
    return hour >= 8 && hour < 21;
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="gradient-hero text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">Tentang Apotek Shaka Farma</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Apotek independen terpercaya yang berkomitmen memberikan pelayanan kefarmasian terbaik dengan harga bersahabat.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Profil */}
        <section className="py-16" id="profil">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-4">Sejarah & Visi Kami</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Apotek Shaka Farma didirikan dengan visi menjadi apotek masyarakat yang menyediakan obat-obatan berkualitas dengan harga yang terjangkau. Kami percaya bahwa akses terhadap obat yang baik adalah hak setiap orang.
                </p>
                <p>
                  Dilayani oleh apoteker bersertifikat dan berpengalaman, kami tidak hanya menjual obat — kami juga memberikan konsultasi kefarmasian gratis untuk memastikan Anda mendapatkan pengobatan yang tepat.
                </p>
                <p>
                  Dengan inovasi digital, kini Anda bisa melihat katalog produk kami, mengecek poster promosi, dan berkonsultasi langsung via WhatsApp kapan saja.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">🏥</div>
                <p className="text-primary-700 font-bold">Apotek Shaka Farma</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tim */}
        <section className="py-16 border-t border-gray-100" id="tim">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-8 text-center">Tim Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: "Apt. Ahmad Fauzi, S.Farm", role: "Apoteker Penanggung Jawab", emoji: "👨‍⚕️" },
              { name: "Siti Nurhaliza", role: "Asisten Apoteker", emoji: "👩‍⚕️" },
              { name: "Budi Prasetyo", role: "Customer Service", emoji: "🧑‍💼" },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm card-hover">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-4xl mx-auto mb-4">{member.emoji}</div>
                <h3 className="font-bold text-text-primary text-sm">{member.name}</h3>
                <p className="text-text-muted text-xs mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Legalitas */}
        <section className="py-16 border-t border-gray-100" id="legalitas">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-8 text-center">Legalitas & Izin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { label: "Nomor Izin Apotek", value: "SI.APT/2024/XXXX", icon: "📜" },
              { label: "Nomor SIPA Apoteker PJ", value: "SIPA.2024/XXXX", icon: "🪪" },
              { label: "NPWP", value: "XX.XXX.XXX.X-XXX.XXX", icon: "🏢" },
              { label: "Dinas Kesehatan", value: "Kota Sehat, Jawa Barat", icon: "🏛️" },
            ].map((item) => (
              <div key={item.label} className="bg-primary-50 rounded-xl p-5 flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-xs text-primary-600 font-bold uppercase">{item.label}</div>
                  <div className="text-sm text-text-primary font-semibold mt-0.5">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lokasi & Jam */}
        <section className="py-16 border-t border-gray-100" id="lokasi">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-8 text-center">Lokasi & Jam Operasional</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Map placeholder */}
            <div className="bg-gray-200 rounded-2xl aspect-video flex items-center justify-center overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.84513!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNiJTIDEwNsKwNTAnNDIuNSJF!5e0!3m2!1sid!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 250 }}
                allowFullScreen
                loading="lazy"
                title="Lokasi Apotek Shaka Farma"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-primary mb-2">📍 Alamat</h3>
                <p className="text-sm text-text-secondary">Jl. Kesehatan No. 123, Kelurahan Sehat, Kecamatan Bugar, Kota Sehat, Jawa Barat 40123</p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary mb-2">⏰ Jam Operasional</h3>
                <div className="space-y-1 text-sm text-text-secondary">
                  <div className="flex justify-between"><span>Senin - Sabtu</span><span className="font-semibold">08.00 - 21.00</span></div>
                  <div className="flex justify-between"><span>Minggu</span><span className="font-semibold">09.00 - 17.00</span></div>
                </div>
                <div className={`inline-flex items-center gap-2 text-sm font-bold mt-3 px-3 py-1.5 rounded-full ${isOpenNow() ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  <span className={`w-2 h-2 rounded-full ${isOpenNow() ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                  {isOpenNow() ? "Buka Sekarang" : "Tutup Saat Ini"}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-text-primary mb-2">📞 Kontak</h3>
                <div className="space-y-1 text-sm text-text-secondary">
                  <p>WhatsApp: {getWAPhoneDisplay()}</p>
                  <p>Instagram: @apotekshakafarma</p>
                  <p>Email: info@shakafarma.com</p>
                </div>
              </div>

              <a
                href={getGeneralWALink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gradient-wa text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                💬 Chat Kami via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Cara Belanja */}
        <section className="py-16 border-t border-gray-100" id="cara-belanja">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-8 text-center">Cara Belanja</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: "1", icon: "🔍", title: "Cek Katalog di Website", desc: "Buka website kami, cek katalog produk dan poster promosi terbaru." },
              { step: "2", icon: "💬", title: "Chat via WhatsApp", desc: "Klik tombol WhatsApp, tanya ketersediaan dan konfirmasi pesanan Anda." },
              { step: "3", icon: "🚗", title: "Ambil di Apotek / Diantar", desc: "Ambil langsung di apotek atau kami antar ke alamat Anda via kurir." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl gradient-primary text-white text-xl font-extrabold flex items-center justify-center mx-auto mb-3 shadow-lg">{s.step}</div>
                <div className="text-3xl mb-2">{s.icon}</div>
                <h3 className="font-bold text-text-primary mb-1">{s.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
