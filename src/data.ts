import { Product, Employee, Service } from './types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Paracetamol 500mg Strip',
    category: 'Obat Bebas',
    stock: 142,
    originalPrice: 9500,
    price: 8550,
    discount: 10,
    status: 'Tersedia',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF2-ZENNtRzqbF7WGycPZ4BUink9h5ss6sPhfo9BeSxTPmSREO19sIKISlQf1SyKeRcL_N7qJvHTrP9vy2rn2h3rjEyzY0am0TApOQRkOGYQLhSjj5_t6Lgc05A2NBFrPKqymqoFz38Rdj7q4Ic8ZQUimYfmPiqZtGohk2wp6PqXDQr2VRuqY9Ql0f_91ekIgtE4u3frscj5CZxGf4RLw1kbRwc2q6AvKpMbyaK0g1JjBp6oYH55aCsptMruF_LqAnOHvLYTmuecA'
  },
  {
    id: 'p2',
    name: 'Amoxicillin Sirup 125mg/5ml',
    category: 'Antibiotik (Resep)',
    stock: 12,
    originalPrice: 15000,
    price: 15000,
    status: 'Menipis',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZhKNe-MKApyeXESoErtCCf2zirJYlHzQjKv7ICQD8MSYr6Wew0CDg8lMcWoXg20Kl2AbLi2P3MMWh8B4HH8wPCAmMduIp-1vwWexEjvzk6p9cihuSro3BTX96IwWqY1LoRUPFcLPyKwrR9tO8sONghpCwIWHFNoP4bx4IUU2Yvh40EVFm5W0jk1tRD-gePRj6s5KEfEWdxzkeSkbybPN3S9lUAbRmhRuvE8RB1vCPnXFNRxfpeGgQpJmmCn4k3jKdWQwUU7xyGjM'
  },
  {
    id: 'p3',
    name: 'Vitamin C 1000mg Effervescent',
    category: 'Suplemen',
    stock: 58,
    originalPrice: 45000,
    price: 38250,
    discount: 15,
    status: 'Tersedia',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2CkRrYjT1wZ3SetB-Q-tpJWVogKs977ewr3HcK9RUTbW09M6sKABF-GK2bgu1AwSgVwDWspc49mjmSmqZg_cE3EzKZq8gZGr7mUHwnCqGvoxlrWTUi8ZFBEAGmkT9fbLAxkY-ZBr_ImtHTjZp2_DeCkVitjNJqysTm3B8E05xx4fYW8x62ak3jqAT0L_EaM10suUmGYl0LqCkaGbDJBVhetno1K6AopQiwoWH2tXwJtQb53uzK6AFMrMsH31IfJ2DRXLPKWo8tQ'
  },
  {
    id: 'p4',
    name: 'Cetirizine 10mg Tablet',
    category: 'Obat Bebas Terbatas',
    stock: 34,
    originalPrice: 22500,
    price: 22500,
    status: 'Tersedia',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsY3XPenFjwNh23EdEvlyruI1xQf_2W04YOdiU-3WOgv3ePPXSVfWtVLlNJLoXNyQqD0U-4LTo5LEiuQsck1xet4nmUQeP3Ej1WHOg7gGTCRNapX3kiS6sd8LUzO42_q2deD7e5XJX6QdmoQomv_Z3p8F_4jzH7fbb6sFVM1kVOQTkFHISvoiXYkVI2Dhn2LWrU9EI2aD2KE86T_4qacTNpaV5crCzRpeYmcUEbCFyWRKo_4Spi5xGhaLMzrGzZ1Z7Ei_z1BGBHKE'
  },
  {
    id: 'p5',
    name: 'Ibuprofen 400mg Strip',
    category: 'Obat Bebas Terbatas',
    stock: 0,
    originalPrice: 10000,
    price: 8000,
    discount: 20,
    status: 'Kosong',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP64YJXEtKloQcOtE61RYjeN89UWmcpfeUcfQirkzhgl35T4eAV6RkZ81JZRbaqwNHvZSXlE7JscVSnd2XfhfdwC9I5CJXjuac4IvImzpX7_vzbR5gHTzW_8jeudCtdbbnrq9x-HKZ4Jp_RUszLohye32ssREcABYCFk-z59UX1gTpOg-g_ZHPj6mnABqM4Qc1p921jT2eWsbpD6VhNf_ZP6Vxz0gUXOrs15esDs8w9fadZqdJ8OKtcwv-cfWsPCWpGG19lpH2TTM'
  },
  {
    id: 'p6',
    name: 'Omeprazole 20mg Kapsul',
    category: 'Obat Resep',
    stock: 89,
    originalPrice: 12000,
    price: 12000,
    status: 'Tersedia',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnC9B2TXuajdQ06n2HhHid1ITSyGfKjzJXuOChwGaL3LX0zBUo835t5f1zF9YrHbCXAgAwMLWZ40i6dLJRB4L4vh-xsVrFcXWjarQZQFDRbGFJViH13ZoSKqrt4uttCfnIBjPoh6u0tr99q6ycZKudxNxoZNI-8VUMeDZDTFreaTAYSkZ0D-ETJqBAJTe6P789_s4sFmaXvy36SEFkYH8iEeDT48FM9bSuWaJz-tWng5SRg4lLPCX_VBWxbYPw5T5SoU3cj3yyYh0'
  },
  {
    id: 'p7',
    name: 'Antasida Doen Tablet Kunyah',
    category: 'Obat Bebas',
    stock: 210,
    originalPrice: 4500,
    price: 4500,
    status: 'Tersedia',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAJa20lQt0lVp0c3FlGe4l9Iw3i6zAN6EPTtGEodTlKx-u32mzn87jcn_TneDWCGQn6pBDS9sHjXIiTWEhXQjlaD6EPLRI2N4UbCCHhaEhl9NmPXGeAtukjuhCROHyFaiiah20QefX-_F3cO0SLfVtEFH7roWt6pXi5XN2uiUr1yy72w7pbxb1tRmaMks1t2hGpNcSgp1M1v04RnQEwVrQqLcqoWJWmtHbRD407I_SIQ_zUSBtNQhFCbFrWMULFyoCLP1IppJH4ac'
  },
  {
    id: 'p8',
    name: 'Loratadine 10mg Tablet',
    category: 'Obat Bebas Terbatas',
    stock: 45,
    originalPrice: 18000,
    price: 18000,
    status: 'Tersedia',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz3HjVhLMvxVfH0PwdPWDZPWca6lG46vqSB_Qs1mka2IihkQkV5qmfre05FzETxC7zkWpzdOey0xIuwr5QTZaKjehynGmRqddyIrR3zimi6dfAUgK15_QD16U8mlhD91FuHwXah8b-3WFqkJlD6qUaW1mSrkM7tXcuHuUZlVAvNvRwClXxm6iBfCdG0YyOdJNkLkYPP5_gId4vkidixLHUHDNtutgyktRDXxa1TG6d_MZ8yx0E1zuJg0ChTuK2ZQwvVTP-F8u2c6s'
  }
];

export const employees: Employee[] = [
  {
    id: 'e1',
    name: 'Budi Santoso, S.Farm., Apt.',
    role: 'Apoteker Penanggung Jawab',
    location: 'Cabang Utama',
    shift: 'Shift Pagi',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3r6yRPbYlceznj2-Hw2VHLiu_eKH-Bt9uRGO0QZoNzFBHAAng8Kw7GsVjRBS8NzQHHKrGo7ug9pzjPiHCW3_IQTDui9UnypRZUtPiYrI-zTUIiIPLUTT1EsdSo17ZaQEX2o9Y80RMJ8xxs9IL1whxd_64y--ibyFQ9NxwMyRI_qMbitA7Imj0mAxt_PrWUmmFTAHvN3Dtu2c6ji7wGuJwlNJiz3MCPfdocoN3sK7GmMmvNegu5BWp4_ipsZxUOXqUZP0GcQyM0mk'
  },
  {
    id: 'e2',
    name: 'Siti Aminah',
    role: 'Asisten Apoteker',
    location: 'Cabang Utama',
    shift: 'Shift Pagi',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmzMKC23o3ulQOOTWuqKvF5BA3fIGk21vgDif_2B6Q-FkgLYMrbNRjCod1CdQdRqFpbqXtbl3kPopEo3HrC7qKSvqNfjyrX-Qy552F-jNURKaXL-TdbViM7RUX8ewI-ZdNQ2wrr8UjeGsPeGQ-lZpzUCCtBi2uFIDtalOPEyFw-fK0O8droh0Ecfn9IqizzIuPtjjETiuB8HQN87Ws-2pHvhLvgFUGauUW_pNYEAMXv0gDpdf2oo0WKbzAFctF_sf01mLRq2LW0tg'
  },
  {
    id: 'e3',
    name: 'Doni Wijaya',
    role: 'Kasir',
    location: 'Cabang Utama',
    shift: 'Shift Siang',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC74H7sIgdqCW1N2IIEkhRFF4HiJoUgv5l4T8yIS53zmcw7NU_5JpHn_7LYT6lwiZW6d1J45BcGRo4_rAVWiFoJmoqMiPDDZS_9USgou4igqgNwoP-IJlftrrFcXADdN7UtQkMyYpOReddJO9ff_T7mVrDDlpwWSZfcKntUHyYY-jy4jNZBptYlL3TqYhJWa01BXenpt5wnnqYgZdzIC5ZF3EsnzAugNJc5EP7QHD3gH0VHrTXoLlaJALUJNoZnFOA5MxDjN6vfDhA'
  },
  {
    id: 'e4',
    name: 'Hendra Kusuma',
    role: 'Staf Gudang',
    location: 'Gudang Utama',
    shift: 'Shift Malam',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgWDD4zoCyANQN8yR55Gmjr8yIyq9bKrZOe60u5lJIvHJj9VTUM1_0t9ugLRVuTAtsjMBCwgDyy81-1G33Zxa6Eg4Nu2zd2GA2gLUZ1IpkECMrxe3rMdCeGkjUYD-Y1fgfIPRgpA3AaW9Xb5aajZAPZ2kHCG022XcSf7_FaRP0lkHLV4euJiSCFxe-qPYA9HJoU7UNSj-aPesJnSKg12XLIC3xePSb8Nv7kocUzT4pQyIIa9RaBwCemT2GyVBXVN70BIIdegYkyzU'
  },
  {
    id: 'e5',
    name: 'Rina Wati, S.Farm.',
    role: 'Admin',
    location: 'Cabang Utama',
    shift: 'Shift Pagi',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDDuaG0HX9KCZuu7UJeWt3M2N-GXZdYftDVQ7ZLYDyyswdGm1icLDHVMCD_4HwImpiFzWNZv-L2e76lAFEr3P56STA5a7HIB_ZUW0f9NGrRfIST_LP-_yLPH1S7phNXg2CfS80LINBttHCDoaDVKKZ8KY8vnwZryowXmGIt2ZtnB23l3-IndFJhOJcV1Nx9HHtbpp8y4ixKo50em7NfbcGhKGDQOoNh-lT4G6AByFKZ9EkMurKV4M77MRoBgRySd2EW7eaUh2Gm20'
  }
];

export const services: Service[] = [
  {
    id: 's1',
    name: 'Cek Gula Darah',
    description: 'Pemeriksaan kadar glukosa dalam darah secara cepat dan akurat menggunakan alat tes digital standar medis.',
    price: 'Rp 25.000',
    status: 'Tersedia',
    icon: 'droplet'
  },
  {
    id: 's2',
    name: 'Konsultasi Apoteker',
    description: 'Sesi tanya jawab langsung dengan apoteker berlisensi mengenai penggunaan obat, interaksi, dan efek samping.',
    price: 'Gratis',
    status: 'Tersedia',
    icon: 'headset'
  },
  {
    id: 's3',
    name: 'Cek Kolesterol',
    description: 'Pengecekan profil lipid dasar untuk memantau kadar kolesterol total dalam darah sebagai langkah pencegahan.',
    price: 'Rp 35.000',
    status: 'Tersedia',
    icon: 'activity'
  },
  {
    id: 's4',
    name: 'Pengantaran Obat',
    description: 'Layanan antar obat resep maupun bebas langsung ke alamat rumah pasien dalam radius 5km dari apotek.',
    price: 'Mulai Rp 10.000',
    status: 'Tersedia',
    icon: 'truck'
  },
  {
    id: 's5',
    name: 'Home Care',
    description: 'Kunjungan tenaga kesehatan ke rumah untuk perawatan luka ringan, ganti perban, atau pengecekan vital sign rutin.',
    price: 'Mulai Rp 150.000',
    status: 'Sesuai Jadwal',
    icon: 'home'
  }
];
