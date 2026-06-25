import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import interiorApotekGedung from '../assets/images/interior_apotek_gedung_1782357713123.jpg';

export function LocationView() {
  return (
    <div className="p-4 md:p-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-outline-variant pb-8">
        <div>
          <h2 className="font-headline text-4xl italic tracking-tight text-on-surface mb-2">Lokasi Natura.</h2>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-[2px]">Cabang Makassar / Sulawesi Selatan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-2">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127154.5422634351!2d119.34571958632612!3d-5.11111624647318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefd31ab10245d%3A0x6a0c5c3e74213197!2sMakassar%2C%20Makassar%20City%2C%20South%20Sulawesi!5e0!3m2!1sen!2sid!4v1714481300000!5m2!1sen!2sid" 
              width="100%" 
              height="500" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[30%] hover:grayscale-0 transition-all duration-500 w-full"
            ></iframe>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[2px] text-on-surface-variant font-bold">Tampak Depan Gedung</span>
              <div className="aspect-video bg-surface-variant/20 border border-outline-variant overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" 
                  alt="Apotek Tampak Depan Gedung" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[2px] text-on-surface-variant font-bold">Tampak Dalam Gedung</span>
              <div className="aspect-video bg-surface-variant/20 border border-outline-variant overflow-hidden">
                <img 
                  src={interiorApotekGedung} 
                  alt="Apotek Tampak Dalam Gedung" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-8 flex flex-col gap-6">
            <div className="border-b border-outline-variant pb-4">
              <h3 className="font-headline text-2xl mb-1">Apotek Natura.</h3>
              <p className="text-[10px] uppercase tracking-[2px] text-on-surface-variant font-bold">Pusat Layanan Farmasi</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-on-surface-variant shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant block mb-1">Alamat</span>
                  <p className="text-sm text-on-surface leading-relaxed">
                    Jl. Penghibur No. 10 (Pantai Losari)<br/>
                    Makassar, Sulawesi Selatan<br/>
                    Indonesia 90111
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-on-surface-variant shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant block mb-1">Jam Operasional</span>
                  <p className="text-sm text-on-surface leading-relaxed">
                    Senin - Sabtu: 08:00 - 22:00<br/>
                    Minggu: 09:00 - 20:00
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-on-surface-variant shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant block mb-1">Kontak</span>
                  <p className="text-sm text-on-surface leading-relaxed">
                    (0411) 876-5432
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-on-surface-variant shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant block mb-1">Email</span>
                  <p className="text-sm text-on-surface leading-relaxed">
                    hello@apoteknatura.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
