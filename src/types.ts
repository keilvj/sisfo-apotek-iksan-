export type ViewType = 'login' | 'register' | 'products' | 'services' | 'employees' | 'receipt' | 'location' | 'about' | 'reports';

export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  originalPrice: number;
  price: number;
  discount?: number;
  status: 'Tersedia' | 'Menipis' | 'Kosong';
  image: string;
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
