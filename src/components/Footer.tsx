import React, { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-surface border-t border-outline-variant py-12 px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-headline text-lg italic text-on-surface">Apotek Natura.</h2>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-[1px]">Melayani sepenuh hati sejak 2024.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold uppercase tracking-[1px] text-on-surface">Kontak</h3>
          <p className="text-xs text-on-surface-variant">Jl. Penghibur No. 10, Makassar</p>
          <p className="text-xs text-on-surface-variant">Email: info@apoteknatura.com</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold uppercase tracking-[1px] text-on-surface">Newsletter</h3>
          <p className="text-xs text-on-surface-variant">Dapatkan update kesehatan mingguan.</p>
          {status === 'sent' ? (
            <p className="text-xs font-bold text-primary">Terima kasih telah mendaftar!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Anda" 
                required
                className="bg-surface-container text-xs p-2 rounded flex-1 border border-outline-variant" 
              />
              <button type="submit" disabled={status === 'sending'} className="bg-primary text-on-primary text-xs px-3 py-2 rounded disabled:opacity-50">
                {status === 'sending' ? '...' : 'Daftar'}
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-outline-variant text-center">
        <p className="text-[10px] text-on-surface-variant uppercase tracking-[2px]">&copy; 2026 Apotek Natura. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
