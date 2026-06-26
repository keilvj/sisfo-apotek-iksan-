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

export function ReportsView({ onNavigate, transactions, setSelectedTransaction }: { onNavigate: (view: ViewType) => void, transactions: Transaction[], setSelectedTransaction: (t: Transaction) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'thisMonth'>('all');
  
  const now = new Date();
  const thisMonthName = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  const filteredTransactions = transactions.filter(trx => {
    const matchesSearch = trx.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          trx.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === 'thisMonth') {
      // Assuming transaction date format is 'DD/MM/YYYY'
      const [day, month, year] = trx.date.split('/').map(Number);
      const trxDate = new Date(year, month - 1, day);
      return matchesSearch && trxDate.getMonth() === now.getMonth() && trxDate.getFullYear() === now.getFullYear();
    }
    
    return matchesSearch;
  });

  const totalRevenue = transactions.filter(t => t.status === 'Selesai').reduce((sum, t) => sum + t.total, 0);
  const completedTransactions = transactions.filter(t => t.status === 'Selesai');
  const averageTransaction = completedTransactions.length > 0 ? Math.round(totalRevenue / completedTransactions.length) : 0;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h2 className="font-headline text-4xl italic tracking-tight text-on-surface mb-2">Laporan</h2>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-[2px]">Riwayat Transaksi & Ringkasan</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={() => setFilterType(filterType === 'thisMonth' ? 'all' : 'thisMonth')} className={`flex-1 md:flex-none border border-outline-variant ${filterType === 'thisMonth' ? 'bg-primary text-on-primary' : 'bg-surface text-on-surface'} py-3 px-6 text-[10px] uppercase tracking-[2px] font-bold hover:bg-surface-variant hover:border-on-surface transition-all flex items-center justify-center gap-2`}>
            <Calendar className="w-4 h-4" />
            Bulan Ini
          </button>
          <button 
            onClick={() => {
              const headers = ['ID', 'Tanggal', 'Waktu', 'Pelanggan', 'Kasir', 'Total', 'Status', 'Jumlah Item'];
              const csvContent = [
                headers.join(','),
                ...filteredTransactions.map(t => 
                  [t.id, t.date, t.time, t.customer, t.cashier, t.total, t.status, t.items].join(',')
                )
              ].join('\n');
              
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.setAttribute('download', `laporan_transaksi_${new Date().toISOString().split('T')[0]}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex-1 md:flex-none bg-primary text-on-primary py-3 px-6 text-[10px] uppercase tracking-[2px] font-bold hover:bg-on-surface-variant transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Unduh CSV
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
            <span className="font-headline text-4xl font-normal text-on-surface block">{completedTransactions.length}</span>
            <span className="text-xs text-on-surface-variant mt-2 flex items-center gap-1">{thisMonthName}</span>
          </div>
        </div>
        
        <div className="bg-surface/80 backdrop-blur-sm border border-outline-variant p-6 flex flex-col justify-between min-h-[140px]">
          <span className="text-[10px] uppercase tracking-[2px] font-bold text-on-surface-variant">Rata-rata Transaksi</span>
          <div>
            <span className="font-headline text-4xl font-normal text-on-surface block">Rp {averageTransaction.toLocaleString('id-ID')}</span>
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
          <button 
            onClick={() => setFilterType(filterType === 'all' ? 'all' : 'all')} 
            className="border border-outline-variant text-on-surface py-3 px-6 text-[10px] uppercase tracking-[2px] font-bold hover:bg-surface-variant transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Semua
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
                        onClick={() => { setSelectedTransaction(trx); onNavigate('receipt'); }}
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
