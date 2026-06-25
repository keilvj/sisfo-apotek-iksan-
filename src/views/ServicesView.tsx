import React, { useState } from 'react';
import { services } from '../data';
import { ArrowRight, Droplet, Headset, Activity, Truck, Home, X } from 'lucide-react';
import { Service } from '../types';

const iconMap: Record<string, React.ElementType> = {
  droplet: Droplet,
  headset: Headset,
  activity: Activity,
  truck: Truck,
  home: Home
};

export function ServicesView() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-2">Layanan Medis</h2>
        <p className="text-sm text-on-surface-variant">Daftar layanan kesehatan yang tersedia di apotek kami.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Activity;
          return (
            <div key={service.id} className="bg-surface-container-lowest/80 backdrop-blur-sm border border-outline-variant rounded-xl p-4 hover:shadow-lg transition-shadow duration-200 group flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  service.status === 'Tersedia' 
                    ? 'bg-secondary-container text-on-secondary-container' 
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {service.status}
                </span>
              </div>
              
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">{service.name}</h3>
              <p className="text-sm text-on-surface-variant flex-1 mb-4 leading-relaxed">{service.description}</p>
              
              <div className="flex items-end justify-between mt-auto pt-4 border-t border-surface-container-high">
                <p className="font-headline text-lg font-bold text-primary">{service.price}</p>
                <button 
                  onClick={() => setSelectedService(service)}
                  className="text-primary hover:text-primary-container text-xs font-semibold flex items-center gap-1"
                >
                  Detail <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-surface p-6 rounded-2xl max-w-md w-full border border-outline-variant shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline text-xl font-bold text-on-surface">{selectedService.name}</h3>
              <button onClick={() => setSelectedService(null)} className="text-on-surface-variant hover:text-on-surface">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-on-surface-variant mb-6">{selectedService.description}</p>
            <p className="font-headline text-2xl font-bold text-primary">{selectedService.price}</p>
          </div>
        </div>
      )}
    </div>
  );
}
