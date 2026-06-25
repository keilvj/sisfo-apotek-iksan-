import React, { useState } from 'react';
import { ViewType, User } from '../types';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import pharmacyBackground from '../assets/images/pharmacy_background_1782358561112.jpg';

export function LoginView({ onNavigate, users }: { onNavigate: (view: ViewType) => void, users: User[] }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      onNavigate('products'); // Default view after login
    } else {
      alert('Email atau password salah');
    }
  };

  return (
    <div 
      className="bg-background text-on-background min-h-screen flex items-center justify-center p-4 md:p-8 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${pharmacyBackground})` }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-0 pointer-events-none"></div>
      
      <main className="w-full max-w-md bg-surface/90 backdrop-blur-md border border-outline-variant rounded-none overflow-hidden flex flex-col shadow-none z-10 relative">
        <div className="p-10 flex flex-col gap-10">
          <div className="text-center flex flex-col items-center">
            <h1 className="font-headline text-3xl italic tracking-tight text-on-surface mb-2">Apotek Natura.</h1>
            <p className="text-xs text-on-surface-variant uppercase tracking-[2px]">Administrasi</p>
          </div>
          
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-on-surface uppercase tracking-[2px]" htmlFor="username">Email</label>
              <div className="relative flex items-center">
                <input 
                  className="w-full py-3 bg-transparent border-b border-outline-variant focus:border-primary text-sm text-on-surface outline-none transition-colors rounded-none placeholder:text-on-surface-variant/40" 
                  id="username" 
                  name="username" 
                  placeholder="Masukkan email" 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-on-surface uppercase tracking-[2px]" htmlFor="password">Password</label>
              <div className="relative flex items-center">
                <input 
                  className="w-full py-3 bg-transparent border-b border-outline-variant focus:border-primary text-sm text-on-surface outline-none transition-colors rounded-none placeholder:text-on-surface-variant/40" 
                  id="password" 
                  name="password" 
                  placeholder="Masukkan password" 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button className="absolute right-0 text-on-surface-variant hover:text-primary transition-colors focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input className="w-4 h-4 border-outline-variant text-primary focus:ring-primary bg-transparent rounded-none" type="checkbox" />
                <span className="text-[10px] uppercase tracking-[1px] text-on-surface-variant">Ingat saya</span>
              </label>
              <a className="text-[10px] uppercase tracking-[1px] font-bold text-primary hover:opacity-70 transition-opacity" href="#">Lupa Password?</a>
            </div>
            
            <button className="mt-6 w-full bg-primary text-on-primary py-4 px-6 rounded-none text-[11px] uppercase tracking-[2px] font-bold hover:bg-on-surface-variant transition-colors focus:outline-none flex justify-center items-center gap-2" type="submit">
              Masuk
              <LogIn className="w-4 h-4" />
            </button>
          </form>
          
          <div className="border-t border-outline-variant pt-6 text-center">
            <p className="text-[10px] uppercase tracking-[1px] text-on-surface-variant">
              Belum punya akun? 
              <button onClick={() => onNavigate('register')} className="font-bold text-primary hover:opacity-70 transition-opacity ml-2">
                Daftar
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
