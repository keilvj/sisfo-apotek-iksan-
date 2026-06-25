import React, { useState } from 'react';
import { products as initialProducts, employees as initialEmployees } from './data';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { ViewType, Cart, Transaction } from './types';
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
import { DashboardView } from './views/DashboardView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Cart>({});
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : initialEmployees;
  });
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  React.useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  React.useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TRX-20231027-085',
      date: '27 Okt 2023',
      time: '10:00',
      customer: 'Anita (Member)',
      cashier: 'Budi Santoso',
      total: 104618,
      status: 'Selesai',
      items: 3,
      itemsDetails: [
        { name: 'Paracetamol', quantity: 2, price: 5000 },
        { name: 'Amoxicillin', quantity: 1, price: 94618 }
      ]
    },
    {
      id: 'TRX-20231027-084',
      date: '27 Okt 2023',
      time: '09:40',
      customer: 'Umum',
      cashier: 'Budi Santoso',
      total: 25000,
      status: 'Selesai',
      items: 1,
      itemsDetails: [
        { name: 'Vitamin C', quantity: 1, price: 25000 }
      ]
    }
  ]);

  // Views that don't have the main layout (sidebar, topbar, bottomnav)
  const isAuthView = currentView === 'login' || currentView === 'register';
  // Receipt view also suppresses navigation as per the prompt instructions
  const isReceiptView = currentView === 'receipt';

  if (isAuthView) {
    return currentView === 'login' 
      ? <LoginView onNavigate={setCurrentView} users={users} /> 
      : <RegisterView onNavigate={setCurrentView} setUsers={setUsers} users={users} />;
  }

  if (isReceiptView) {
     return <ReceiptView onNavigate={setCurrentView} cart={cart} setTransactions={setTransactions} setCart={setCart} selectedTransaction={selectedTransaction} />;
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
          <TopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <div className="flex-1 overflow-y-auto">
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'products' && <ProductsView onNavigate={setCurrentView} cart={cart} setCart={setCart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} products={products} setProducts={setProducts} />}
            {currentView === 'employees' && <EmployeesView employees={employees} setEmployees={setEmployees} />}
            {currentView === 'services' && <ServicesView />}
            {currentView === 'location' && <LocationView />}
            {currentView === 'about' && <AboutView />}
            {currentView === 'reports' && <ReportsView onNavigate={setCurrentView} transactions={transactions} setSelectedTransaction={setSelectedTransaction} />}
            <Footer />
          </div>
          
          {/* Spacing for mobile bottom nav */}
          <div className="h-16 md:h-0 shrink-0" />
        </main>

        <BottomNav currentView={currentView} onNavigate={setCurrentView} />
      </div>
    </div>
  );
}
