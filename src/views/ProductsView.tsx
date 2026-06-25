import React, { useState } from 'react';
import { products } from '../data';
import { Search, Filter, Plus, ShoppingBag, Minus } from 'lucide-react';
import { ViewType } from '../types';

export function ProductsView({ onNavigate }: { onNavigate?: (view: ViewType) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [id: string]: number }>({});

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="p-4 md:p-12 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-outline-variant pb-8">
        <div>
          <h2 className="font-headline text-4xl italic tracking-tight text-on-surface mb-2">Katalog Natura.</h2>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-[2px]">Edisi 2024 / Inventaris Terkurasi</p>
        </div>
        <button className="bg-primary text-on-primary text-[10px] uppercase tracking-[2px] font-bold px-6 py-3 rounded-none hover:bg-on-surface-variant transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Entri
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <div className="flex-1 flex items-center border-b border-outline-variant py-2 focus-within:border-primary transition-all w-full">
          <Search className="w-5 h-5 text-on-surface-variant mr-3" />
          <input 
            className="w-full bg-transparent border-none p-0 text-sm text-on-surface focus:ring-0 placeholder:text-outline-variant outline-none" 
            placeholder="Cari arsip produk..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="px-6 py-3 border border-outline-variant rounded-none text-on-surface text-[10px] uppercase tracking-[2px] font-bold flex items-center gap-2 hover:bg-surface-variant transition-colors w-full md:w-auto justify-center">
          <Filter className="w-4 h-4" />
          Saring
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-on-surface-variant border border-outline-variant bg-surface/50 backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-[2px] font-bold">Tidak ada produk yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-surface/80 backdrop-blur-sm border border-outline-variant rounded-none flex flex-col relative group">
              {product.discount && (
                <div className="absolute top-4 left-4 z-10 bg-primary text-on-primary px-3 py-1 rounded-none text-[10px] uppercase tracking-[1px] font-bold shadow-none">
                  DISKON {product.discount}%
                </div>
              )}
              
              <div className="aspect-[4/5] bg-surface-container-high relative overflow-hidden flex items-center justify-center border-b border-outline-variant">
                <img 
                  className="object-cover h-full w-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
                  src={product.image} 
                  alt={product.name} 
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-none border ${
                  product.status === 'Tersedia' ? 'bg-surface text-on-surface border-outline-variant' : 
                  product.status === 'Menipis' ? 'bg-surface-variant text-on-surface border-outline' : 
                  'bg-background text-outline border-outline-variant'
                }`}>
                  <span className="text-[9px] font-bold uppercase tracking-[2px]">{product.status}</span>
                </div>
              </div>
              
              <div className={`p-6 flex flex-col flex-1 ${product.status === 'Kosong' ? 'opacity-50' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-on-surface-variant text-[9px] uppercase tracking-[2px] font-bold block mb-2">{product.category}</span>
                    <h3 className="font-headline text-lg font-normal text-on-surface leading-snug line-clamp-2">{product.name}</h3>
                  </div>
                </div>
                
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex justify-between items-end border-t border-outline-variant pt-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[2px] font-bold text-on-surface-variant mb-1">Stok: {product.stock}</p>
                      <div className="flex items-center gap-2">
                        {product.originalPrice !== product.price && (
                           <p className="text-[10px] text-outline-variant line-through">Rp {product.originalPrice.toLocaleString('id-ID')}</p>
                        )}
                        <p className="font-mono text-sm text-on-surface">
                          Rp {product.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {cart[product.id] ? (
                    <div className="flex items-center justify-between border border-primary text-primary w-full py-[11px] px-4">
                      <button onClick={() => handleRemoveFromCart(product.id)} className="p-1 hover:bg-surface-variant transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="text-[11px] font-mono">{cart[product.id]}</span>
                      <button 
                        onClick={() => handleAddToCart(product.id)} 
                        disabled={cart[product.id] >= product.stock}
                        className="p-1 hover:bg-surface-variant transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.status === 'Kosong'}
                      className="w-full bg-transparent border border-outline-variant text-on-surface text-[10px] uppercase tracking-[2px] font-bold py-3 hover:bg-primary hover:text-on-primary hover:border-primary transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      Tambah
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalItems > 0 && (
        <div className="fixed bottom-24 right-4 md:bottom-12 md:right-12 z-50">
          <button 
            onClick={() => onNavigate && onNavigate('receipt')}
            className="bg-primary text-on-primary px-6 py-4 flex items-center gap-4 hover:bg-on-surface-variant transition-colors shadow-none border border-outline-variant"
          >
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-[2px] font-bold opacity-80">Proses Pembayaran</span>
              <span className="font-mono text-sm">{totalItems} Item</span>
            </div>
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

