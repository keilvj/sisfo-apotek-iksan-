import React, { useState } from 'react';
import { ViewType } from '../types';
import { Printer, Check, Tag } from 'lucide-react';
import pharmacyBackground from '../assets/images/pharmacy_background_1782358561112.jpg';

export function ReceiptView({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState<string>('QRIS');

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const subtotal = 135000;
  const discountAmount = subtotal * (selectedDiscount / 100);
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * 0.11;
  const total = afterDiscount + tax;

  return (
    <div 
      className="bg-background text-on-background min-h-screen flex flex-col items-center py-12 px-4 font-sans antialiased bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${pharmacyBackground})` }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-0 pointer-events-none"></div>

      <main className="w-full max-w-xl bg-surface/90 backdrop-blur-md border border-outline-variant shadow-none flex flex-col relative z-10">
        <div className="p-10 pb-6 flex flex-col items-center text-center border-b border-outline-variant">
          <h1 className="font-headline text-3xl italic tracking-tight text-on-surface mb-2">Apotek Natura.</h1>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[2px]">Cabang Utama - Jakarta / EST. 2024</p>
        </div>
        
        <div className="px-10 py-6 grid grid-cols-2 gap-4 border-b border-outline-variant text-[10px] uppercase tracking-[1px]">
          <div>
            <span className="font-bold text-on-surface-variant block mb-1">No. Rekam / Struk</span>
            <span className="font-mono text-on-surface">TRX-20231027-084</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-on-surface-variant block mb-1">Waktu Transaksi</span>
            <span className="font-mono text-on-surface">
              {currentTime.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}, {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div>
            <span className="font-bold text-on-surface-variant block mb-1">Kasir</span>
            <span className="text-on-surface">Budi Santoso</span>
          </div>
          <div className="text-right">
            <label htmlFor="customer-name" className="font-bold text-on-surface-variant block mb-1">Pelanggan</label>
            <input 
              id="customer-name"
              type="text" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-transparent text-on-surface text-right w-full outline-none border-b border-dashed border-outline-variant focus:border-primary focus:border-solid placeholder:text-on-surface-variant/40"
              placeholder="Nama pelanggan..."
            />
          </div>
        </div>

        <div className="px-10 py-8 flex flex-col gap-6 border-b border-outline-variant">
          <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[2px] border-b border-outline-variant pb-2 flex justify-between">
            <span>Rincian Produk</span>
            <span>Total</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-sm text-on-surface font-normal">Panadol Extra 10 Kaplet</span>
                <span className="font-mono text-[11px] text-on-surface-variant mt-1">1 x Rp 15.000</span>
              </div>
              <span className="font-mono text-sm text-on-surface">Rp 15.000</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-sm text-on-surface font-normal">Enervon-C Multivitamin</span>
                <span className="font-mono text-[11px] text-on-surface-variant mt-1">2 x Rp 25.000</span>
              </div>
              <span className="font-mono text-sm text-on-surface">Rp 50.000</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-sm text-on-surface font-normal">Masker Medis 3-Ply</span>
                <span className="font-mono text-[11px] text-on-surface-variant mt-1">2 x Rp 35.000</span>
              </div>
              <span className="font-mono text-sm text-on-surface">Rp 70.000</span>
            </div>
          </div>
        </div>

        <div className="px-10 py-8 flex flex-col gap-4 border-b border-outline-variant">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[2px]">Pilih Metode Pembayaran</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setPaymentMethod('Tunai')}
              className={`py-3 px-4 text-[10px] uppercase tracking-[1px] font-bold border transition-colors flex items-center justify-center gap-2 ${paymentMethod === 'Tunai' ? 'bg-on-surface text-surface border-on-surface' : 'bg-transparent text-on-surface-variant border-outline-variant hover:border-on-surface'}`}
            >
              Tunai
            </button>
            <button 
              onClick={() => setPaymentMethod('Debit/Kredit')}
              className={`py-3 px-4 text-[10px] uppercase tracking-[1px] font-bold border transition-colors flex items-center justify-center gap-2 ${paymentMethod === 'Debit/Kredit' ? 'bg-on-surface text-surface border-on-surface' : 'bg-transparent text-on-surface-variant border-outline-variant hover:border-on-surface'}`}
            >
              Debit/Kredit
            </button>
            <button 
              onClick={() => setPaymentMethod('QRIS')}
              className={`py-3 px-4 text-[10px] uppercase tracking-[1px] font-bold border transition-colors flex items-center justify-center gap-2 ${paymentMethod === 'QRIS' ? 'bg-on-surface text-surface border-on-surface' : 'bg-transparent text-on-surface-variant border-outline-variant hover:border-on-surface'}`}
            >
              QRIS
            </button>
          </div>
        </div>

        <div className="px-10 py-8 flex flex-col gap-4 border-b border-outline-variant">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[2px]">Pilih Diskon</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setSelectedDiscount(0)}
              className={`py-3 px-4 text-[10px] uppercase tracking-[1px] font-bold border transition-colors flex items-center justify-center gap-2 ${selectedDiscount === 0 ? 'bg-on-surface text-surface border-on-surface' : 'bg-transparent text-on-surface-variant border-outline-variant hover:border-on-surface'}`}
            >
              Tanpa Diskon
            </button>
            <button 
              onClick={() => setSelectedDiscount(5)}
              className={`py-3 px-4 text-[10px] uppercase tracking-[1px] font-bold border transition-colors flex items-center justify-center gap-2 ${selectedDiscount === 5 ? 'bg-on-surface text-surface border-on-surface' : 'bg-transparent text-on-surface-variant border-outline-variant hover:border-on-surface'}`}
            >
              <Tag className="w-3 h-3" />
              Member (5%)
            </button>
            <button 
              onClick={() => setSelectedDiscount(10)}
              className={`py-3 px-4 text-[10px] uppercase tracking-[1px] font-bold border transition-colors flex items-center justify-center gap-2 ${selectedDiscount === 10 ? 'bg-on-surface text-surface border-on-surface' : 'bg-transparent text-on-surface-variant border-outline-variant hover:border-on-surface'}`}
            >
              <Tag className="w-3 h-3" />
              Promo Spesial (10%)
            </button>
          </div>
        </div>

        <div className="px-10 py-8 flex flex-col gap-3 border-b border-outline-variant bg-surface-variant/20">
          <div className="flex justify-between items-center text-[11px] uppercase tracking-[1px]">
            <span className="text-on-surface-variant font-bold">Subtotal</span>
            <span className="font-mono text-on-surface">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          {selectedDiscount > 0 && (
            <div className="flex justify-between items-center text-[11px] uppercase tracking-[1px]">
              <span className="text-primary font-bold">Diskon ({selectedDiscount}%)</span>
              <span className="font-mono text-primary">-Rp {discountAmount.toLocaleString('id-ID')}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-[11px] uppercase tracking-[1px]">
            <span className="text-on-surface-variant font-bold">PPN (11%)</span>
            <span className="font-mono text-on-surface">Rp {tax.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-end">
            <div>
              <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[2px] mb-1">Total Bayar</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-[1px]">Via {paymentMethod}</span>
            </div>
            <span className="font-headline text-3xl font-normal text-on-surface">Rp {total.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
        
        <div className="px-10 py-6 text-center">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-[2px] italic">Terima kasih atas kunjungan Anda.</p>
        </div>
      </main>

      <div className="w-full max-w-xl mt-8 flex flex-col sm:flex-row gap-4 px-4 md:px-0">
        <button onClick={() => onNavigate('products')} className="flex-1 py-4 px-6 border border-outline-variant bg-surface text-on-surface text-[10px] uppercase tracking-[2px] font-bold hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          Selesai & Kembali
        </button>
        <button className="flex-1 py-4 px-6 bg-primary text-on-primary text-[10px] uppercase tracking-[2px] font-bold hover:bg-on-surface-variant transition-colors flex items-center justify-center gap-2">
          <Printer className="w-4 h-4" />
          Cetak Arsip
        </button>
      </div>
    </div>
  );
}
