import React from 'react';
import { LayoutDashboard, Users, IdCard, HeartHandshake, BarChart, Info, MapPin, LogOut } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  currentUser?: any;
}

export function Sidebar({ currentView, onNavigate, currentUser }: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees' as ViewType, label: 'Karyawan', icon: Users },
    { id: 'products' as ViewType, label: 'Katalog', icon: IdCard }, // Map "Katalog" to products for demo
    { id: 'services' as ViewType, label: 'Layanan', icon: HeartHandshake },
    { id: 'reports' as ViewType, label: 'Laporan', icon: BarChart },
    { id: 'location' as ViewType, label: 'Lokasi', icon: MapPin },
    { id: 'about' as ViewType, label: 'Tentang', icon: Info },
    { id: 'login' as ViewType, label: 'Keluar', icon: LogOut }, // Map to login for demo
  ];

  const getDisplayName = (email: string) => {
    if (!email) return 'Guest';
    return email.split('@')[0];
  };

  return (
    <aside className="hidden md:flex flex-col bg-surface h-full w-72 fixed inset-y-0 left-0 z-50 border-r border-outline-variant">
      <div className="p-8 flex flex-col gap-6 border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="font-headline text-2xl italic tracking-tight text-on-surface leading-tight mb-1">Natura.</h2>
            <p className="text-[10px] uppercase tracking-[2px] text-on-surface-variant">Selamat Datang, {getDisplayName(currentUser?.email)}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 transition-all rounded-none ${
                isActive 
                  ? 'bg-transparent text-on-surface border-b border-on-surface' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <item.icon className="w-4 h-4 opacity-70" />
              <span className="text-[11px] uppercase tracking-[2px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-8 border-t border-outline-variant text-[10px] uppercase tracking-[2px] text-on-surface-variant opacity-50">
        EST. 2024 // NATURA
      </div>
    </aside>
  );
}
