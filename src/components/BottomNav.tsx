import React from 'react';
import { MonitorSmartphone, Pill, Database, User, MapPin, Info } from 'lucide-react';
import { ViewType } from '../types';

interface BottomNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'receipt' as ViewType, label: 'Transaksi', icon: MonitorSmartphone },
    { id: 'products' as ViewType, label: 'Produk', icon: Pill },
    { id: 'services' as ViewType, label: 'Layanan', icon: Database },
    { id: 'location' as ViewType, label: 'Lokasi', icon: MapPin },
    { id: 'about' as ViewType, label: 'Tentang', icon: Info },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface border-t border-outline-variant shadow-lg pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center px-4 py-1 transition-all rounded-lg group ${
              isActive ? 'text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <div className={`flex items-center justify-center w-12 h-8 rounded-full mb-1 transition-all duration-200 ${
              isActive ? 'bg-secondary-container text-on-secondary-container scale-110' : ''
            }`}>
              <item.icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} strokeWidth={isActive ? 2 : 1.5} />
            </div>
            <span className="text-xs font-semibold">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
