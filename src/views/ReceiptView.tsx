import React, { useState } from 'react';
import { ViewType, Cart, Transaction, Product } from '../types';
import { products as initialProducts } from '../data';
import { Printer, Check, Tag } from 'lucide-react';
import pharmacyBackground from '../assets/images/pharmacy_background_1782358561112.jpg';

export function ReceiptView({ onNavigate, cart, setTransactions, setCart, selectedTransaction, currentUser, products = initialProducts, setProducts, showToast }: { 
  onNavigate: (view: ViewType) => void, 
  cart: Cart, 
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>, 
  setCart: React.Dispatch<React.SetStateAction<Cart>>,
  selectedTransaction?: Transaction | null,
  currentUser?: any,
  products?: Product[],
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>,
  showToast?: (message: string, type?: 'success'|'error'|'info') => void
}) {
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>(selectedTransaction ? selectedTransaction.customer : '');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState<string>('QRIS');
  
  const isViewing = !!selectedTransaction;

  const getDisplayName = (email: string) => {
    if (!email) return 'Kasir Utama';
    return email.split('@')[0];
  };

  const cashierName = currentUser?.email ? getDisplayName(currentUser.email) : 'Kasir Utama';

  const cartItems = isViewing 
    ? (selectedTransaction?.itemsDetails || []).map((item, index) => ({ id: index.toString(), name: item.name, quantity: item.quantity, price: item.price }))
    : Object.entries(cart).map(([id, quantity]) => {
        const product = products.find(p => p.id === id);
        return product ? { ...product, quantity } : undefined;
      }).filter(item => item !== undefined);

  const subtotal = cartItems.reduce((sum, item) => sum + (item!.price * item!.quantity), 0);
  // Original selectedDiscount calculation used selectedDiscount/100 or as raw? The buttons pass values like 10, 20.
  // We should keep the original logic for discountAmount
  const discountAmount = subtotal * (selectedDiscount / 100);
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * 0.11;
  const total = afterDiscount + tax;

  const onComplete = () => {
    if (!isViewing) {
      const newTransaction: Transaction = {
        id: `TRX-${Date.now()}`,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        customer: customerName || 'Umum',
        cashier: cashierName,
        total: Math.round(total),
        status: 'Selesai',
        items: cartItems.reduce((sum, item) => sum + item!.quantity, 0),
        itemsDetails: cartItems.map(item => ({ name: item!.name, quantity: item!.quantity, price: item!.price }))
      };
      setTransactions(prev => [...prev, newTransaction]);
      
      if (setProducts) {
        setProducts(prevProducts => prevProducts.map(p => {
          const cartItem = cart[p.id];
          if (cartItem) {
            return { ...p, stock: Math.max(0, p.stock - cartItem) };
          }
          return p;
        }));
      }

      setCart({});
      if (showToast) showToast('Transaksi berhasil diselesaikan', 'success');
    }
    onNavigate('products');
  };

  const handlePrint = () => {
    window.print();
    if (showToast) showToast('Mencetak struk termal...', 'info');
  };

  return (
    <div 
      className="bg-background text-on-background min-h-screen flex flex-col items-center py-12 px-4 font-sans antialiased bg-cover bg-center bg-fixed relative print:bg-none print:bg-white print:p-0 print:min-h-0 print:block"
      style={{ backgroundImage: `url(${pharmacyBackground})` }}
    >
      <div className="absolute inset-0 bg-background/80 z-0 pointer-events-none print:hidden"></div>

      <main className="w-full max-w-xl bg-surface border border-outline-variant shadow-none flex flex-col relative z-10 print:border-none print:shadow-none print:w-full print:max-w-none print:block">
        <div className="p-10 pb-6 print:p-4 print:pb-3 flex flex-col items-center text-center border-b border-outline-variant print:border-black">
          <h1 className="font-headline text-3xl print:text-xl italic tracking-tight text-on-surface mb-2">Apotek Natura.</h1>
          <p className="text-[10px] print:text-[8px] font-bold text-on-surface-variant uppercase tracking-[2px]">Cabang Utama - Makassar / EST. 2024</p>
        </div>
        
        <div className="px-10 py-6 print:px-4 print:py-4 flex flex-col gap-4 print:gap-2 border-b border-outline-variant print:border-black text-[10px] print:text-[8px] uppercase tracking-[1px]">
          <div className="flex justify-between w-full">
            <span className="font-bold text-on-surface-variant">No. Rekam / Struk</span>
            <span className="font-mono text-on-surface text-right">{isViewing ? selectedTransaction?.id : 'TRX-20231027-084'}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="font-bold text-on-surface-variant">Waktu Transaksi</span>
            <span className="font-mono text-on-surface text-right">
              {isViewing 
                ? `${selectedTransaction?.date}, ${selectedTransaction?.time}`
                : `${currentTime.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}, ${currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`
              }
            </span>
          </div>
          <div className="flex justify-between w-full">
            <span className="font-bold text-on-surface-variant">Kasir</span>
            <span className="text-on-surface text-right">{isViewing ? selectedTransaction?.cashier : cashierName}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="font-bold text-on-surface-variant">Pelanggan</span>
            <span className="text-on-surface text-right">{customerName || 'Umum'}</span>
          </div>
        </div>

        <div className="px-10 py-8 print:px-4 print:py-4 flex flex-col gap-6 print:gap-3 border-b border-outline-variant print:border-black">
          <div className="text-[10px] print:text-[8px] font-bold text-on-surface-variant uppercase tracking-[2px] border-b border-outline-variant print:border-black pb-2 flex justify-between">
            <span>Rincian Produk</span>
            <span>Total</span>
          </div>

          <div className="flex flex-col gap-2 print:gap-1">
            {cartItems.map(item => (
              <div key={item!.id} className="flex justify-between items-start">
                <div className="flex flex-col max-w-[65%]">
                  <span className="text-sm print:text-[10px] text-on-surface font-normal leading-tight mb-1">{item!.name}</span>
                  <span className="font-mono text-[11px] print:text-[8px] text-on-surface-variant">{item!.quantity} x Rp {item!.price.toLocaleString('id-ID')}</span>
                </div>
                <span className="font-mono text-sm print:text-[10px] text-on-surface">Rp {(item!.price * item!.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
        </div>

        {!isViewing && (
          <>
            <div className="px-10 py-8 flex flex-col gap-4 border-b border-outline-variant print:hidden">
              <label htmlFor="customer-input" className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[2px]">Nama Pelanggan (Opsional)</label>
              <input 
                id="customer-input"
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full py-3 bg-transparent border-b border-outline-variant text-sm text-on-surface focus:outline-none focus:border-primary placeholder:text-on-surface-variant/40 transition-colors rounded-none"
                placeholder="Masukkan nama pelanggan..."
              />
            </div>

            <div className="px-10 py-8 flex flex-col gap-4 border-b border-outline-variant print:hidden">
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

            <div className="px-10 py-8 flex flex-col gap-4 border-b border-outline-variant print:hidden">
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
                <button 
                  onClick={() => setSelectedDiscount(15)}
                  className={`py-3 px-4 text-[10px] uppercase tracking-[1px] font-bold border transition-colors flex items-center justify-center gap-2 ${selectedDiscount === 15 ? 'bg-on-surface text-surface border-on-surface' : 'bg-transparent text-on-surface-variant border-outline-variant hover:border-on-surface'}`}
                >
                  <Tag className="w-3 h-3" />
                  Flash Sale (15%)
                </button>
                <button 
                  onClick={() => setSelectedDiscount(20)}
                  className={`py-3 px-4 text-[10px] uppercase tracking-[1px] font-bold border transition-colors flex items-center justify-center gap-2 ${selectedDiscount === 20 ? 'bg-on-surface text-surface border-on-surface' : 'bg-transparent text-on-surface-variant border-outline-variant hover:border-on-surface'}`}
                >
                  <Tag className="w-3 h-3" />
                  Voucher (20%)
                </button>
              </div>
            </div>
          </>
        )}

        <div className="px-10 py-8 print:px-4 print:py-4 flex flex-col gap-3 print:gap-1 border-b border-outline-variant print:border-black bg-surface-variant/20 print:bg-transparent">
          <div className="flex justify-between items-center text-[11px] print:text-[10px] uppercase tracking-[1px]">
            <span className="text-on-surface-variant font-bold">Subtotal</span>
            <span className="font-mono text-on-surface">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          {selectedDiscount > 0 && (
            <div className="flex justify-between items-center text-[11px] print:text-[10px] uppercase tracking-[1px]">
              <span className="text-primary print:text-black font-bold">Diskon ({selectedDiscount}%)</span>
              <span className="font-mono text-primary print:text-black">-Rp {discountAmount.toLocaleString('id-ID')}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-[11px] print:text-[10px] uppercase tracking-[1px]">
            <span className="text-on-surface-variant font-bold">PPN (11%)</span>
            <span className="font-mono text-on-surface">Rp {tax.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-end print:border-black print:mt-2 print:pt-2">
            <div>
              <span className="block text-[10px] print:text-[10px] font-bold text-on-surface-variant uppercase tracking-[2px] mb-1 print:mb-0">Total Bayar</span>
              <span className="text-[10px] print:text-[8px] text-on-surface-variant uppercase tracking-[1px]">Via {paymentMethod} • Anda Mendapatkan {Math.floor(total / 10000)} Poin</span>
            </div>
            <span className="font-headline text-3xl print:text-xl font-normal text-on-surface">Rp {total.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
        
        <div className="px-10 py-6 print:px-4 print:py-4 text-center">
          <p className="text-[10px] print:text-[8px] text-on-surface-variant uppercase tracking-[2px] italic">Terima kasih atas kunjungan Anda.</p>
        </div>
      </main>

      <div className="w-full max-w-xl mt-8 flex flex-col sm:flex-row gap-4 px-4 md:px-0 print:hidden">
        <button onClick={onComplete} className="flex-1 py-5 px-8 bg-primary text-on-primary text-[11px] uppercase tracking-[2px] font-bold shadow-lg hover:bg-primary-container hover:shadow-xl rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5">
          <Check className="w-4 h-4" />
          Selesai & Kembali
        </button>
        <button onClick={handlePrint} className="flex-1 py-5 px-8 bg-secondary text-on-secondary text-[11px] uppercase tracking-[2px] font-bold shadow-lg hover:bg-secondary-container hover:shadow-xl rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5">
          <Printer className="w-4 h-4" />
          Cetak/Simpan PDF
        </button>
      </div>
    </div>
  );
}
