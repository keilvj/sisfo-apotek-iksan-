import React, { useState, useRef } from 'react';
import { Upload, Info, MessageSquare, ShieldCheck, Clock, HelpCircle, Star } from 'lucide-react';

export function AboutView() {
  const [profileImage, setProfileImage] = useState<string>('https://lh3.googleusercontent.com/aida-public/AB6AXuDgHcuCZ8K2Sj_HSjdNNoK7fzgVyjDhasvrUrwk-oF6YpP7or9ZMU_h-voVXseAF5AYHfUakKjnT0K-ideOU5up3Ywk1Ag8csLmjb2N4plygJpqpKykKo5dqewwzL4Kh-eyQ6VdTvxFKvuBNHOaoiZPZ_bmofzuyPHpRQA6VaA67QUGK43-em4R_SoYX9H55CM-HhYAFOUiReC97eTsHJMkMZVTkQ9au6lZkfL9rEKh64JKyYomRk_50oMbBtTU_eAtcuV64vDaLHE');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <div className="p-4 md:p-12 max-w-7xl mx-auto w-full space-y-8">
      <div className="border-b border-outline-variant pb-8">
        <h2 className="font-headline text-4xl italic tracking-tight text-on-surface mb-2">Tentang Natura.</h2>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-[2px]">Profil, Filosofi & Informasi</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 bg-surface/80 backdrop-blur-sm border border-outline-variant p-8 flex flex-col items-center text-center">
          <div className="relative group mb-6">
            <div className="w-40 h-40 rounded-full overflow-hidden border border-outline-variant bg-surface-variant/20 flex items-center justify-center">
              {profileImage ? (
                <img src={profileImage} alt="Admin Profile" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
              ) : (
                <Info className="w-12 h-12 text-outline" />
              )}
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-primary text-on-primary p-3 rounded-full shadow-lg hover:bg-on-surface-variant transition-colors"
              aria-label="Upload Foto"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          
          <h3 className="font-headline text-2xl mb-1">Kepala Administrasi</h3>
          <p className="text-[10px] uppercase tracking-[2px] text-on-surface-variant font-bold mb-6">Apotek Natura Pusat</p>
          
          <div className="w-full border-t border-outline-variant pt-6 space-y-3 text-left">
            <div className="flex justify-between"><span className="text-xs text-on-surface-variant">Nama</span><span className="text-sm font-bold">Ikhsan Zani Ibadillah</span></div>
            <div className="flex justify-between"><span className="text-xs text-on-surface-variant">Kelas</span><span className="text-sm font-bold">1B D3 Teknik Elektronika</span></div>
            <div className="flex justify-between"><span className="text-xs text-on-surface-variant">ID Pegawai</span><span className="font-mono text-sm">32325064</span></div>
            <div className="flex justify-between"><span className="text-xs text-on-surface-variant">Bergabung</span><span className="font-mono text-sm">Jan 2024</span></div>
          </div>
        </div>

        {/* Motto & Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-8">
            <blockquote className="font-headline text-3xl leading-snug italic text-on-surface mb-6">
              "Menyembuhkan dengan kehati-hatian, melayani dengan ketulusan."
            </blockquote>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Apotek Natura didirikan pada prinsip bahwa kesehatan adalah keseimbangan. Kami menggabungkan ilmu farmasi modern dengan pendekatan holistik untuk memberikan layanan yang tidak hanya mengobati, tetapi juga merawat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <h3 className="font-headline text-xl">Mengapa Memilih Kami?</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-surface-container p-4 rounded-lg"><p className="font-bold text-sm">Obat Lengkap</p><p className="text-[10px] text-on-surface-variant">Stok obat terjaga dan lengkap.</p></div>
                <div className="bg-surface-container p-4 rounded-lg"><p className="font-bold text-sm">Apoteker Ahli</p><p className="text-[10px] text-on-surface-variant">Konsultasi profesional & ramah.</p></div>
              </div>
            </div>

            <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-8">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h3 className="font-headline text-xl">FAQ</h3>
              </div>
              <div className="space-y-4 text-sm">
                <div><p className="font-bold">Apakah apotek buka 24 jam?</p><p className="text-on-surface-variant">Buka 08:00 - 22:00 setiap hari.</p></div>
                <div><p className="font-bold">Apakah ada konsultasi?</p><p className="text-on-surface-variant">Ya, apoteker kami siap melayani di tempat.</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section: Contact & Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h3 className="font-headline text-xl">Hubungi Kami</h3>
          </div>
          {status === 'sent' ? (
            <p className="text-sm font-bold text-primary p-4 bg-primary/10 rounded">Pesan Anda telah terkirim. Terima kasih!</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Nama Anda" required className="w-full bg-surface-container text-xs p-3 rounded border border-outline-variant" />
              <textarea placeholder="Pesan Anda" required className="w-full bg-surface-container text-xs p-3 rounded border border-outline-variant" rows={3}></textarea>
              <button type="submit" disabled={status === 'sending'} className="bg-primary text-on-primary text-xs font-bold px-6 py-3 rounded disabled:opacity-50">
                {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          )}
        </div>
        <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-primary" />
                <h3 className="font-headline text-xl">Testimoni</h3>
            </div>
            <p className="italic text-sm text-on-surface-variant">"Layanan yang sangat memuaskan dan apotekernya sangat membantu." - Pelanggan Setia</p>
        </div>
      </div>
    </div>
  );
}
