import React from 'react';
import { products, employees } from '../data';
import { LayoutDashboard, Package, Users, AlertTriangle, TrendingUp } from 'lucide-react';

export function DashboardView() {
  const totalProducts = products.length;
  const totalEmployees = employees.length;
  const lowStockProducts = products.filter(p => p.stock < 20).length;
  
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <LayoutDashboard className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
          <Package className="w-10 h-10 text-primary" />
          <div>
            <p className="text-sm text-on-surface-variant">Total Produk</p>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
          <Users className="w-10 h-10 text-primary" />
          <div>
            <p className="text-sm text-on-surface-variant">Total Karyawan</p>
            <p className="text-2xl font-bold">{totalEmployees}</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
          <AlertTriangle className="w-10 h-10 text-red-500" />
          <div>
            <p className="text-sm text-on-surface-variant">Produk Perlu Restok</p>
            <p className="text-2xl font-bold text-red-500">{lowStockProducts}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
