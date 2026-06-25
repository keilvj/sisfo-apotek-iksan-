import React, { useState, useRef } from 'react';
import { Upload, Info } from 'lucide-react';

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
    <div className="p-4 md:p-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-outline-variant pb-8">
        <div>
          <h2 className="font-headline text-4xl italic tracking-tight text-on-surface mb-2">Tentang Natura.</h2>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-[2px]">Profil & Filosofi</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-8">
          <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-10 flex flex-col items-center text-center">
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
            
            <div className="w-full border-t border-outline-variant pt-6">
              <span className="text-[10px] uppercase tracking-[2px] text-on-surface-variant font-bold block mb-4">Informasi Profil</span>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-on-surface-variant uppercase tracking-[1px]">Nama</span>
                <span className="text-sm font-bold">Ikhsan Zani Ibadillah</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-on-surface-variant uppercase tracking-[1px]">Kelas</span>
                <span className="text-sm font-bold">1B D3 Teknik Elektronika</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-on-surface-variant uppercase tracking-[1px]">ID Pegawai</span>
                <span className="font-mono text-sm">32325064</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-on-surface-variant uppercase tracking-[1px]">Bergabung</span>
                <span className="font-mono text-sm">Jan 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-10 flex flex-col h-full justify-center relative overflow-hidden">
            <span className="text-[10px] uppercase tracking-[2px] text-on-surface-variant font-bold block mb-6">Motto Kami</span>
            <blockquote className="font-headline text-3xl md:text-4xl leading-snug italic text-on-surface mb-8">
              "Menyembuhkan dengan kehati-hatian, melayani dengan ketulusan."
            </blockquote>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              Apotek Natura didirikan pada prinsip bahwa kesehatan adalah keseimbangan. Kami menggabungkan ilmu farmasi modern dengan pendekatan holistik untuk memberikan layanan yang tidak hanya mengobati, tetapi juga merawat.
            </p>
            <div className="border-l-2 border-primary pl-4">
              <p className="text-[11px] uppercase tracking-[1px] font-bold text-on-surface">Visi</p>
              <p className="text-sm text-on-surface-variant mt-1">Menjadi ruang pemulihan yang paling dipercaya di setiap komunitas.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-10">
              <h3 className="font-headline text-2xl mb-6">Mengapa Memilih Kami?</h3>
              <div className="space-y-4">
                <div className="bg-surface-container p-4 rounded-lg">
                  <p className="font-bold text-sm text-on-surface">Obat Lengkap</p>
                  <p className="text-[10px] text-on-surface-variant">Stok obat terjaga dan lengkap.</p>
                </div>
                <div className="bg-surface-container p-4 rounded-lg">
                  <p className="font-bold text-sm text-on-surface">Apoteker Ahli</p>
                  <p className="text-[10px] text-on-surface-variant">Konsultasi profesional & ramah.</p>
                </div>
              </div>
            </div>

            <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-10">
              <h3 className="font-headline text-2xl mb-6">FAQ</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-sm text-on-surface">Apakah apotek buka 24 jam?</p>
                  <p className="text-xs text-on-surface-variant mt-1">Saat ini kami buka setiap hari mulai 08:00 sampai 22:00.</p>
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface">Apakah tersedia layanan konsultasi?</p>
                  <p className="text-xs text-on-surface-variant mt-1">Ya, apoteker kami siap melayani konsultasi obat secara langsung di tempat.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-10">
            <h3 className="font-headline text-2xl mb-6">Testimoni</h3>
            <p className="italic text-sm text-on-surface-variant mb-4">"Layanan yang sangat memuaskan dan apotekernya sangat membantu." - Pelanggan Setia</p>
          </div>

          <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-10">
            <h3 className="font-headline text-2xl mb-6">Hubungi Kami</h3>
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
        </div>
      </div>
    </div>
  );
}
