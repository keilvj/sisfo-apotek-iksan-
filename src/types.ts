export type ViewType = 'login' | 'register' | 'products' | 'services' | 'employees' | 'receipt' | 'location' | 'about' | 'reports' | 'dashboard';

export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  expiryDate: string;
  originalPrice: number;
  price: number;
  discount?: number;
  status: 'Tersedia' | 'Menipis' | 'Kosong';
  image: string;
}

export type Cart = { [id: string]: number };

export interface TransactionItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Transaction {
  id: string;
  date: string;
  time: string;
  customer: string;
  cashier: string;
  total: number;
  status: 'Selesai' | 'Batal';
  items: number;
  itemsDetails?: TransactionItem[];
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  location: string;
  shift: string;
  avatar: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  status: 'Tersedia' | 'Sesuai Jadwal';
  icon: string;
}

export interface User {
  email: string;
  password: string;
  phone: string;
}
