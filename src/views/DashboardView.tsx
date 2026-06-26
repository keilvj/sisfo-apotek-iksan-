import React, { useState } from 'react';
import { LayoutDashboard, Package, Users, AlertTriangle, TrendingUp, Bell, CheckCircle2, Clock } from 'lucide-react';
import { Product, Employee, Transaction } from '../types';

export function DashboardView({ products, employees, transactions }: { products: Product[], employees: Employee[], transactions: Transaction[] }) {
  const totalProducts = products.length;
  const totalEmployees = employees.length;
  const lowStockProducts = products.filter(p => p.stock < 20);
  
  // Create notifications based on dynamic data
  const notifications = [
    ...lowStockProducts.map(p => ({
      id: `low-stock-${p.id}`,
      type: 'warning',
      title: 'Stok Menipis',
      message: `Produk ${p.name} sisa ${p.stock} item. Segera restok!`,
      time: 'Baru saja'
    })),
    // Dummy recent activities or shift updates
    {
      id: 'n1',
      type: 'info',
      title: 'Pergantian Shift',
      message: 'Shift sore telah dimulai. 3 apoteker hadir.',
      time: '1 jam yang lalu'
    },
    {
      id: 'n2',
      type: 'success',
      title: 'Target Penjualan',
      message: 'Target harian berhasil tercapai (120%).',
      time: '3 jam yang lalu'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <LayoutDashboard className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-on-surface">Dashboard</h2>
        </div>
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-on-surface-variant" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-surface"></span>
          )}
        </div>
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
          <AlertTriangle className={`w-10 h-10 ${lowStockProducts.length > 0 ? 'text-error' : 'text-primary'}`} />
          <div>
            <p className="text-sm text-on-surface-variant">Produk Perlu Restok</p>
            <p className={`text-2xl font-bold ${lowStockProducts.length > 0 ? 'text-error' : 'text-on-surface'}`}>{lowStockProducts.length}</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notifikasi Terbaru
        </h3>
        <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant">
              <CheckCircle2 className="w-12 h-12 mx-auto text-primary opacity-50 mb-4" />
              <p>Tidak ada notifikasi baru.</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} className="p-4 md:p-6 hover:bg-surface-variant/50 transition-colors flex gap-4">
                <div className="shrink-0 mt-1">
                  {notif.type === 'warning' && <AlertTriangle className="w-5 h-5 text-error" />}
                  {notif.type === 'info' && <Clock className="w-5 h-5 text-primary" />}
                  {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm text-on-surface">{notif.title}</h4>
                    <span className="text-[10px] text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full">{notif.time}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">{notif.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
