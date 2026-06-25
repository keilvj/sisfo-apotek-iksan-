import React from 'react';
import { employees } from '../data';
import { Filter, Plus, ArrowUp, Clock, Phone, Mail, MoreVertical, MapPin, Box } from 'lucide-react';

export function EmployeesView() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface/80 backdrop-blur-sm rounded-xl p-6 border border-outline-variant/50 shadow-sm">
        <div>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface m-0 p-0">Karyawan</h2>
          <p className="text-sm text-on-surface-variant mt-1">Kelola data staf dan apoteker.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-primary text-primary hover:bg-surface-container-low transition-colors px-4 py-2 rounded-lg text-xs font-semibold">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-primary text-white hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm px-4 py-2 rounded-lg text-xs font-semibold">
            <Plus className="w-4 h-4" />
            Tambah Staf
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface/70 backdrop-blur border border-white/30 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Total Staf</span>
          <div className="flex items-end gap-2">
            <span className="font-headline text-3xl font-bold text-primary leading-none">12</span>
            <span className="text-sm text-secondary mb-1 flex items-center font-medium"><ArrowUp className="w-3 h-3 mr-1"/> 2</span>
          </div>
        </div>
        <div className="bg-surface/70 backdrop-blur border border-white/30 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Apoteker Aktif</span>
          <div className="flex items-end gap-2">
            <span className="font-headline text-3xl font-bold text-on-surface leading-none">3</span>
          </div>
        </div>
        <div className="rounded-xl p-4 flex flex-col gap-2 col-span-2 md:col-span-2 bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-container shadow-sm relative overflow-hidden">
          <span className="text-xs font-semibold uppercase tracking-wider opacity-80 relative z-10">Shift Saat Ini</span>
          <div className="flex items-center justify-between mt-1 relative z-10">
            <div>
              <span className="font-headline text-xl font-bold">Shift Pagi</span>
              <p className="font-mono text-sm opacity-90">08:00 - 16:00</p>
            </div>
            <Clock className="w-10 h-10 opacity-20" />
          </div>
        </div>
      </div>

      <div className="bg-surface/80 backdrop-blur-sm rounded-xl border border-outline-variant/50 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 divide-y divide-outline-variant/30">
          {employees.map((employee) => (
            <div key={employee.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-container-low transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container-highest shrink-0 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                  <img className="w-full h-full object-cover" src={employee.avatar} alt={employee.name} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface m-0 p-0">{employee.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className={`font-semibold text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full border ${
                      employee.role.includes('Apoteker') && !employee.role.includes('Asisten') ? 'bg-secondary-container/50 text-on-secondary-container border-secondary-container' :
                      employee.role.includes('Asisten') ? 'bg-primary-container/20 text-on-primary-fixed-variant border-primary-container/30' :
                      employee.role === 'Kasir' ? 'bg-surface-variant text-on-surface-variant border-outline-variant/50' :
                      employee.role.includes('Gudang') ? 'bg-tertiary-container/30 text-tertiary border-tertiary-container/50' :
                      'bg-primary/10 text-primary border-primary/20'
                    }`}>
                      {employee.role}
                    </span>
                    <span className="text-on-surface-variant font-mono text-[11px] flex items-center gap-1">
                      {employee.location.includes('Gudang') ? <Box className="w-3 h-3"/> : <MapPin className="w-3 h-3"/>}
                      {employee.location}
                    </span>
                    <span className="text-on-surface-variant font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3"/> {employee.shift}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button aria-label="Call" className="w-10 h-10 rounded-full bg-surface border border-outline-variant flex items-center justify-center text-primary hover:bg-surface-variant hover:border-primary transition-all">
                  <Phone className="w-5 h-5" />
                </button>
                <button aria-label="Email" className="w-10 h-10 rounded-full bg-surface border border-outline-variant flex items-center justify-center text-primary hover:bg-surface-variant hover:border-primary transition-all">
                  <Mail className="w-5 h-5" />
                </button>
                <button aria-label="More" className="w-10 h-10 rounded-full bg-surface border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-all md:hidden">
                  <MoreVertical className="w-5 h-5" />
                </button>
                <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant transition-colors text-xs font-semibold">
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
