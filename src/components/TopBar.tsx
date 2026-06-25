import React from 'react';
import { Menu, Search } from 'lucide-react';

export function TopBar() {
  return (
    <header className="bg-surface border-b border-outline-variant flex justify-between items-center w-full px-4 md:px-8 h-16 shrink-0 z-40 sticky top-0">
      <div className="flex items-center gap-3">
        <button aria-label="Open Menu" className="md:hidden text-primary p-2 -ml-2 rounded-none hover:bg-surface-variant transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="font-headline text-xl italic font-normal text-on-surface m-0 p-0 tracking-tight">Apotek Natura.</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-transparent border-b border-outline-variant px-2 w-64 focus-within:border-primary transition-all">
          <Search className="w-4 h-4 text-on-surface-variant mr-2" />
          <input 
            className="bg-transparent border-none outline-none text-[11px] uppercase tracking-[1px] font-bold w-full placeholder:text-on-surface-variant/40 text-on-surface py-2" 
            placeholder="PENCARIAN..." 
            type="text"
          />
        </div>
        <button aria-label="Search" className="text-primary p-2 rounded-none hover:bg-surface-variant transition-colors md:hidden">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
