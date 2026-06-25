import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { TopBar } from './components/TopBar';
import { ViewType } from './types';
import pharmacyBackground from './assets/images/pharmacy_background_1782358561112.jpg';

// Placeholder imports for views
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ProductsView } from './views/ProductsView';
import { EmployeesView } from './views/EmployeesView';
import { ServicesView } from './views/ServicesView';
import { ReceiptView } from './views/ReceiptView';
import { LocationView } from './views/LocationView';
import { AboutView } from './views/AboutView';
import { ReportsView } from './views/ReportsView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('login');

  // Views that don't have the main layout (sidebar, topbar, bottomnav)
  const isAuthView = currentView === 'login' || currentView === 'register';
  // Receipt view also suppresses navigation as per the prompt instructions
  const isReceiptView = currentView === 'receipt';

  if (isAuthView) {
    return currentView === 'login' 
      ? <LoginView onNavigate={setCurrentView} /> 
      : <RegisterView onNavigate={setCurrentView} />;
  }

  if (isReceiptView) {
     return <ReceiptView onNavigate={setCurrentView} />;
  }

  return (
    <div 
      className="flex flex-col md:flex-row min-h-screen overflow-hidden bg-background bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${pharmacyBackground})` }}
    >
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] z-0 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen w-full">
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
        
        <main className="flex-1 flex flex-col w-full md:pl-72 h-screen bg-surface/60 backdrop-blur-md">
          <TopBar />
          
          <div className="flex-1 overflow-y-auto">
            {currentView === 'products' && <ProductsView onNavigate={setCurrentView} />}
            {currentView === 'employees' && <EmployeesView />}
            {currentView === 'services' && <ServicesView />}
            {currentView === 'location' && <LocationView />}
            {currentView === 'about' && <AboutView />}
            {currentView === 'reports' && <ReportsView onNavigate={setCurrentView} />}
          </div>
          
          {/* Spacing for mobile bottom nav */}
          <div className="h-16 md:h-0 shrink-0" />
        </main>

        <BottomNav currentView={currentView} onNavigate={setCurrentView} />
      </div>
    </div>
  );
}
