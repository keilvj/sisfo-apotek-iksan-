import React, { useState } from 'react';
import { Search, Filter, Plus, ShoppingBag, Minus } from 'lucide-react';
import { ViewType, Cart, Product } from '../types';

export function ProductsView({ onNavigate, cart, setCart, searchQuery, setSearchQuery, products, setProducts }: { onNavigate?: (view: ViewType) => void, cart: Cart, setCart: React.Dispatch<React.SetStateAction<Cart>>, searchQuery: string, setSearchQuery: (query: string) => void, products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>> }) {

  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'status'>>({
    name: '',
    category: '',
    stock: 0,
    expiryDate: '',
    originalPrice: 0,
    price: 0,
    image: 'https://via.placeholder.com/150'
  });
  
  const categories = ['Semua', ...Array.from(new Set(products.map(p => p.category)))];

  const handleAddProduct = () => {
    const status = newProduct.stock === 0 ? 'Kosong' : newProduct.stock < 20 ? 'Menipis' : 'Tersedia';
    const product: Product = {
      id: `p${Date.now()}`,
      ...newProduct,
      status
    };
    setProducts([...products, product]);
    setShowAddModal(false);
    setNewProduct({ name: '', category: '', stock: 0, expiryDate: '', originalPrice: 0, price: 0, image: 'https://via.placeholder.com/150' });
  };

  const filteredProducts = products.filter(p => 
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
     p.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'Semua' || p.category === selectedCategory)
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
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-on-primary text-[10px] uppercase tracking-[2px] font-bold px-6 py-3 rounded-none hover:bg-on-surface-variant transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Entri
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="font-headline text-xl mb-4">Tambah Produk Baru</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Nama Produk</label>
                <input type="text" placeholder="Contoh: Paracetamol 500mg" className="w-full p-2 border border-outline-variant rounded" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Kategori</label>
                <input type="text" placeholder="Contoh: Obat Bebas" className="w-full p-2 border border-outline-variant rounded" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Stok Awal</label>
                <input type="number" placeholder="Contoh: 100" className="w-full p-2 border border-outline-variant rounded" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Tanggal Kadaluwarsa</label>
                <input type="date" className="w-full p-2 border border-outline-variant rounded" value={newProduct.expiryDate} onChange={e => setNewProduct({...newProduct, expiryDate: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Harga Modal (Rp)</label>
                <input type="number" placeholder="Contoh: 5000" className="w-full p-2 border border-outline-variant rounded" value={newProduct.originalPrice} onChange={e => setNewProduct({...newProduct, originalPrice: parseInt(e.target.value)})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Harga Jual (Rp)</label>
                <input type="number" placeholder="Contoh: 7500" className="w-full p-2 border border-outline-variant rounded" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseInt(e.target.value)})} />
              </div>
              <label className="block text-xs font-bold text-on-surface mb-2">Foto Produk</label>
              <input 
                type="file" 
                accept="image/*" 
                className="w-full p-2 border border-outline-variant rounded" 
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewProduct({...newProduct, image: reader.result as string});
                    };
                    reader.readAsDataURL(file);
                  }
                }} 
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-on-surface">Tutup</button>
              <button onClick={handleAddProduct} className="bg-primary text-on-primary px-4 py-2 rounded">Tambah</button>
            </div>
          </div>
        </div>
      )}

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
        <select 
          className="px-6 py-3 border border-outline-variant rounded-none bg-surface text-on-surface text-[10px] uppercase tracking-[2px] font-bold flex items-center gap-2 hover:bg-surface-variant transition-colors w-full md:w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-on-surface-variant border border-outline-variant bg-surface/50 backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-[2px] font-bold">Tidak ada produk yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-surface/80 backdrop-blur-sm border border-outline-variant rounded-none flex flex-col relative group hover:shadow-lg hover:border-on-surface transition-all duration-300">
              {product.discount && (
                <div className="absolute top-4 left-4 z-10 bg-primary text-on-primary px-3 py-1 rounded-none text-[10px] uppercase tracking-[1px] font-bold shadow-none transition-transform group-hover:scale-105">
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
                  product.status === 'Menipis' ? 'bg-amber-100 text-amber-900 border-amber-300' : 
                  'bg-red-100 text-red-900 border-red-300'
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
                      <p className="text-[9px] uppercase tracking-[2px] font-bold text-on-surface-variant mb-1">Kadaluwarsa: {new Date(product.expiryDate).toLocaleDateString('id-ID')}</p>
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

