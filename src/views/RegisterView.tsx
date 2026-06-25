import React, { useState } from 'react';
import { ViewType } from '../types';
import { Eye, EyeOff } from 'lucide-react';
import pharmacyBackground from '../assets/images/pharmacy_background_1782358561112.jpg';

export function RegisterView({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('login');
  };

  return (
    <div 
      className="bg-background text-on-background min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${pharmacyBackground})` }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-0 pointer-events-none"></div>

      <main className="w-full max-w-2xl bg-surface/90 backdrop-blur-md border border-outline-variant flex flex-col p-8 md:p-16 z-10 relative">
        
        <div className="text-center flex flex-col items-center mb-10">
          <h1 className="font-headline text-3xl italic tracking-tight text-on-surface mb-2">Apotek Natura.</h1>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-[2px]">Registrasi Pengelola</p>
        </div>
          
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-on-surface uppercase tracking-[2px]" htmlFor="telepon">Nomor Telepon</label>
              <input className="w-full py-3 bg-transparent border-b border-outline-variant text-sm text-on-surface focus:outline-none focus:border-primary placeholder:text-on-surface-variant/40 transition-colors rounded-none" id="telepon" placeholder="08123456789" required type="tel"/>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-on-surface uppercase tracking-[2px]" htmlFor="email">Email Pengelola</label>
              <input className="w-full py-3 bg-transparent border-b border-outline-variant text-sm text-on-surface focus:outline-none focus:border-primary placeholder:text-on-surface-variant/40 transition-colors rounded-none" id="email" placeholder="admin@apoteknatura.com" required type="email"/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2 relative">
              <label className="text-[10px] font-bold text-on-surface uppercase tracking-[2px]" htmlFor="password">Password</label>
              <input className="w-full py-3 pr-10 bg-transparent border-b border-outline-variant text-sm text-on-surface focus:outline-none focus:border-primary placeholder:text-on-surface-variant/40 transition-colors rounded-none" id="password" placeholder="••••••••" required type={showPassword ? "text" : "password"}/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 bottom-3 text-outline hover:text-on-surface focus:outline-none">
                {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
              </button>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-[10px] font-bold text-on-surface uppercase tracking-[2px]" htmlFor="konfirmasi_password">Konfirmasi Password</label>
              <input className="w-full py-3 pr-10 bg-transparent border-b border-outline-variant text-sm text-on-surface focus:outline-none focus:border-primary placeholder:text-on-surface-variant/40 transition-colors rounded-none" id="konfirmasi_password" placeholder="••••••••" required type={showConfirmPassword ? "text" : "password"}/>
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 bottom-3 text-outline hover:text-on-surface focus:outline-none">
                {showConfirmPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
              </button>
            </div>
          </div>

          <div className="pt-8">
            <button className="w-full flex justify-center items-center py-4 bg-primary text-on-primary text-[11px] uppercase tracking-[2px] font-bold hover:bg-on-surface-variant transition-colors focus:outline-none rounded-none" type="submit">
              Daftar Sekarang
            </button>
          </div>
        </form>
        
        <div className="mt-10 pt-6 border-t border-outline-variant text-center">
          <p className="text-[10px] uppercase tracking-[1px] text-on-surface-variant">
            Sudah memiliki akun? 
            <button onClick={() => onNavigate('login')} className="font-bold text-primary hover:opacity-70 transition-opacity ml-2">Masuk</button>
          </p>
        </div>
      </main>
    </div>
  );
}
