import { Metadata } from "next";
import { getGeneralWALink, getWAPhoneDisplay } from "@/lib/whatsapp";
import { Icons } from "@/app/components/Icons";

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
    <div className="pb-16 bg-surface-dim">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 mb-6">
            <Icons.HeartPulse className="w-8 h-8 text-primary-200" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight">Tentang Apotek Shaka Farma</h1>
          <p className="text-primary-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Apotek independen terpercaya yang berkomitmen memberikan pelayanan kefarmasian terbaik dengan harga bersahabat.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        {/* Profil */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-primary-900/5 border border-gray-100" id="profil">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-primary-600 font-bold mb-4 uppercase tracking-wider text-sm">
                <Icons.Activity className="w-5 h-5" /> Sejarah & Visi Kami
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-6 leading-tight">Mendedikasikan Diri untuk Kesehatan Anda</h2>
              <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
                <p>
                  Apotek Shaka Farma didirikan dengan visi menjadi apotek masyarakat yang menyediakan obat-obatan berkualitas dengan harga yang terjangkau. Kami percaya bahwa akses terhadap pengobatan yang baik adalah hak setiap orang.
                </p>
                <p>
                  Dilayani oleh apoteker bersertifikat dan berpengalaman, kami tidak hanya menjual obat — kami juga memberikan konsultasi kefarmasian gratis untuk memastikan Anda mendapatkan terapi yang tepat dan aman.
                </p>
                <div className="flex items-start gap-4 p-5 bg-primary-50 rounded-2xl border border-primary-100 mt-6">
                  <div className="bg-white p-2 rounded-xl shadow-sm text-primary-600">
                    <Icons.ShieldCheck className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-primary-900">
                    Dengan inovasi digital, kini Anda bisa melihat katalog produk kami, mengecek poster promosi, dan berkonsultasi langsung via WhatsApp kapan saja.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-primary-600 rounded-[2.5rem] rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500" />
              <div className="relative bg-gradient-to-br from-white to-primary-50 rounded-3xl aspect-square flex flex-col items-center justify-center p-12 border border-white shadow-2xl overflow-hidden backdrop-blur-sm">
                <div className="absolute -top-10 -right-10 text-primary-100 opacity-50">
                  <Icons.Cross className="w-64 h-64" />
                </div>
                <div className="relative z-10 w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-6 text-primary-600">
                  <Icons.Cross className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-extrabold text-primary-950 mb-2 relative z-10">Apotek Shaka Farma</h3>
                <p className="text-primary-600 font-medium relative z-10">Mitra Kesehatan Terpercaya</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tim */}
        <section className="py-20" id="tim">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">Tim Kami</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">Didukung oleh tenaga profesional yang siap melayani kebutuhan kesehatan Anda dengan sepenuh hati.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Apt. Ahmad Fauzi, S.Farm", role: "Apoteker Penanggung Jawab", icon: Icons.Stethoscope },
              { name: "Siti Nurhaliza", role: "Asisten Apoteker", icon: Icons.Pill },
              { name: "Budi Prasetyo", role: "Customer Service", icon: Icons.Users },
            ].map((member, i) => (
              <div key={member.name} className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-20 h-20 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <member.icon className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-text-primary text-lg mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cara Belanja - Horizontal Stepper Design */}
        <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-950 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-20" id="cara-belanja">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Cara Belanja Mudah</h2>
            <p className="text-primary-200 text-lg">Pesan obat dari rumah, kami yang urus sisanya.</p>
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-400/0 via-primary-400/50 to-primary-400/0 z-0" />
            {[
              { step: "01", title: "Cek Katalog", desc: "Buka website kami, cek katalog produk dan promosi terbaru.", icon: Icons.Search },
              { step: "02", title: "Chat via WhatsApp", desc: "Konsultasi, tanya ketersediaan dan konfirmasi pesanan Anda.", icon: Icons.MessageCircle },
              { step: "03", title: "Ambil / Diantar", desc: "Ambil langsung di apotek atau kami antar ke alamat Anda.", icon: Icons.Truck },
            ].map((s) => (
              <div key={s.step} className="relative z-10 text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/20 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-primary-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-900/50">
                  <s.icon className="w-8 h-8" />
                </div>
                <div className="text-primary-300 font-mono text-sm font-bold mb-2 tracking-widest">{s.step}</div>
                <h3 className="font-bold text-white text-xl mb-3">{s.title}</h3>
                <p className="text-primary-100 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Legalitas & Lokasi Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Legalitas */}
          <section className="lg:col-span-5 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm" id="legalitas">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary-50 rounded-xl text-primary-600"><Icons.FileText className="w-6 h-6" /></div>
              <h2 className="text-2xl font-extrabold text-text-primary">Legalitas & Izin</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: "Nomor Izin Apotek", value: "SI.APT/2024/XXXX", icon: Icons.ShieldCheck },
                { label: "Nomor SIPA Apoteker PJ", value: "SIPA.2024/XXXX", icon: Icons.Award },
                { label: "NPWP", value: "XX.XXX.XXX.X-XXX.XXX", icon: Icons.Building },
                { label: "Dinas Kesehatan", value: "Kota Sehat, Jawa Barat", icon: Icons.MapPin },
              ].map((item) => (
                <div key={item.label} className="bg-surface-dim rounded-2xl p-4 flex items-center gap-4 hover:bg-primary-50 transition-colors group">
                  <div className="p-2 bg-white rounded-xl shadow-sm text-primary-500 group-hover:text-primary-600 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted font-bold uppercase tracking-wider">{item.label}</div>
                    <div className="text-sm text-text-primary font-semibold mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lokasi & Jam */}
          <section className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col" id="lokasi">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-50 rounded-xl text-primary-600"><Icons.Map className="w-6 h-6" /></div>
                <h2 className="text-2xl font-extrabold text-text-primary">Lokasi & Jam Buka</h2>
              </div>
              <div suppressHydrationWarning className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full ${isOpenNow() ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                <span suppressHydrationWarning className={`w-2 h-2 rounded-full ${isOpenNow() ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                {isOpenNow() ? "Buka" : "Tutup"}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs text-text-muted font-bold uppercase tracking-wider mb-2">Alamat</h3>
                  <p className="text-sm text-text-primary font-medium leading-relaxed">
                    Jl. Lintas Sumatera, Way Tuba, Kec. Way Tuba, Kabupaten Way Kanan, Lampung 34767
                  </p>
                </div>
                <div>
                  <h3 className="text-xs text-text-muted font-bold uppercase tracking-wider mb-2">Jam Operasional</h3>
                  <div className="space-y-2 text-sm text-text-primary font-medium">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-text-secondary">Senin - Minggu</span>
                      <span className="bg-surface-dim px-2 py-1 rounded-md">07.00 - 21.00</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <a href={getGeneralWALink()} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 gradient-wa text-white font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-green-500/30">
                    <Icons.MessageCircle className="w-5 h-5" /> Hubungi Kami
                  </a>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-full min-h-[250px] relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4843.050104857592!2d104.39870451137067!3d-4.404602046969019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e38fb00702327b7%3A0x596a3367f268430b!2sApotek%20Shaka%20Farma!5e1!3m2!1sid!2sid!4v1778902209782!5m2!1sid!2sid"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Lokasi Apotek Shaka Farma"
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
