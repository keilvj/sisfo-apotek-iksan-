import React, { useState } from 'react';
import { ViewType } from '../types';
import { Search, Filter, Receipt, FileText, Download, Calendar } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  time: string;
  customer: string;
  cashier: string;
  total: number;
  status: 'Selesai' | 'Batal';
  items: number;
}

export function ReportsView({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const now = new Date();
  const todayDate = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  const yesterdayDate = new Date(now.getTime() - 86400000).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  const thisMonthName = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  const getTimeMinusMinutes = (minutes: number) => {
    const d = new Date(now.getTime() - minutes * 60000);
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const transactions: Transaction[] = [
    {
      id: `TRX-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-085`,
      date: todayDate,
      time: getTimeMinusMinutes(5),
      customer: 'Anita (Member)',
      cashier: 'Budi Santoso',
      total: 104618,
      status: 'Selesai',
      items: 3
    },
    {
      id: `TRX-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-084`,
      date: todayDate,
      time: getTimeMinusMinutes(20),
      customer: 'Umum',
      cashier: 'Budi Santoso',
      total: 25000,
      status: 'Selesai',
      items: 1
    },
    {
      id: `TRX-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-083`,
      date: todayDate,
      time: getTimeMinusMinutes(65),
      customer: 'Bapak Rudi',
      cashier: 'Siti Aminah',
      total: 150000,
      status: 'Selesai',
      items: 4
    },
    {
      id: `TRX-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-082`,
      date: todayDate,
      time: getTimeMinusMinutes(150),
      customer: 'Ibu Ratna',
      cashier: 'Siti Aminah',
      total: 75000,
      status: 'Batal',
      items: 2
    },
    {
      id: `TRX-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate() - 1).padStart(2, '0')}-102`,
      date: yesterdayDate,
      time: '19:30',
      customer: 'Umum',
      cashier: 'Budi Santoso',
      total: 45000,
      status: 'Selesai',
      items: 2
    },
    {
      id: `TRX-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate() - 1).padStart(2, '0')}-101`,
      date: yesterdayDate,
      time: '18:10',
      customer: 'Andi (Member)',
      cashier: 'Budi Santoso',
      total: 320000,
      status: 'Selesai',
      items: 5
    }
  ];

  const filteredTransactions = transactions.filter(trx => 
    trx.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    trx.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = transactions.filter(t => t.status === 'Selesai').reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h2 className="font-headline text-4xl italic tracking-tight text-on-surface mb-2">Laporan</h2>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-[2px]">Riwayat Transaksi & Ringkasan</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none border border-outline-variant bg-surface text-on-surface py-3 px-6 text-[10px] uppercase tracking-[2px] font-bold hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            Bulan Ini
          </button>
          <button className="flex-1 md:flex-none bg-primary text-on-primary py-3 px-6 text-[10px] uppercase tracking-[2px] font-bold hover:bg-on-surface-variant transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Unduh PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-6 flex flex-col justify-between min-h-[140px]">
          <span className="text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant">Total Pendapatan</span>
          <div>
            <span className="font-headline text-4xl font-normal text-on-surface block">Rp {totalRevenue.toLocaleString('id-ID')}</span>
            <span className="text-xs text-primary mt-2 flex items-center gap-1">+12.5% dari bulan lalu</span>
          </div>
        </div>
        
        <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-6 flex flex-col justify-between min-h-[140px]">
          <span className="text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant">Total Transaksi Selesai</span>
          <div>
            <span className="font-headline text-4xl font-normal text-on-surface block">{transactions.filter(t => t.status === 'Selesai').length}</span>
            <span className="text-xs text-on-surface-variant mt-2 flex items-center gap-1">{thisMonthName}</span>
          </div>
        </div>
        
        <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-6 flex flex-col justify-between min-h-[140px]">
          <span className="text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant">Rata-rata Transaksi</span>
          <div>
            <span className="font-headline text-4xl font-normal text-on-surface block">Rp {Math.round(totalRevenue / transactions.filter(t => t.status === 'Selesai').length).toLocaleString('id-ID')}</span>
            <span className="text-xs text-on-surface-variant mt-2 flex items-center gap-1">Per transaksi valid</span>
          </div>
        </div>
      </div>

      <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant flex flex-col h-[500px]">
        <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Cari ID transaksi atau pelanggan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-outline-variant pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-on-surface-variant/50"
            />
          </div>
          <button className="border border-outline-variant text-on-surface py-3 px-6 text-[10px] uppercase tracking-[2px] font-bold hover:bg-surface-variant transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-variant/20 sticky top-0 backdrop-blur-sm">
              <tr>
                <th className="py-4 px-6 text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant border-b border-outline-variant">ID Transaksi</th>
                <th className="py-4 px-6 text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant border-b border-outline-variant">Waktu</th>
                <th className="py-4 px-6 text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant border-b border-outline-variant">Pelanggan</th>
                <th className="py-4 px-6 text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant border-b border-outline-variant">Kasir</th>
                <th className="py-4 px-6 text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant border-b border-outline-variant text-right">Total</th>
                <th className="py-4 px-6 text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant border-b border-outline-variant text-center">Status</th>
                <th className="py-4 px-6 text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant border-b border-outline-variant text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="border-b border-outline-variant/50 hover:bg-surface-variant/10 transition-colors group">
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm text-on-surface">{trx.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-on-surface block">{trx.date}</span>
                    <span className="text-xs text-on-surface-variant font-mono">{trx.time}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-on-surface">{trx.customer}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-on-surface">{trx.cashier}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-mono text-sm text-on-surface">Rp {trx.total.toLocaleString('id-ID')}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block px-3 py-1 text-[10px] uppercase tracking-[1px] font-bold ${
                      trx.status === 'Selesai' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-error/10 text-error'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onNavigate('receipt')}
                        className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/10 rounded"
                        title="Lihat Struk"
                      >
                        <Receipt className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/10 rounded"
                        title="Rincian"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-on-surface-variant">
                    Tidak ada transaksi yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
