// src/context/ProdiContext.tsx

'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Tipe untuk state
type Prodi = 'IF' | 'SI';

// Tipe untuk nilai yang akan disediakan oleh Context
interface ProdiContextType {
  prodi: Prodi;
  setProdi: (prodi: Prodi) => void; // Mengubah tipe setProdi
}

// Buat Context
const ProdiContext = createContext<ProdiContextType | undefined>(undefined);

// Buat Komponen Provider yang akan membungkus aplikasi kita
export function ProdiProvider({ children }: { children: ReactNode }) {
  const [prodi, setProdiState] = useState<Prodi>('IF');

  // Efek untuk memuat state dari localStorage saat komponen dimuat di client
  useEffect(() => {
    try {
      const savedProdi = window.localStorage.getItem('prodi') as Prodi;
      if (savedProdi && ['IF', 'SI'].includes(savedProdi)) {
        setProdiState(savedProdi);
      }
    } catch (error) {
      console.error("Failed to read 'prodi' from localStorage", error);
    }
  }, []);

  // Fungsi untuk mengubah state dan menyimpannya ke localStorage
  const setProdi = (newProdi: Prodi) => {
    try {
      setProdiState(newProdi);
      window.localStorage.setItem('prodi', newProdi);
    } catch (error) {
      console.error("Failed to save 'prodi' to localStorage", error);
    }
  };

  return (
    <ProdiContext.Provider value={{ prodi, setProdi }}>
      {children}
    </ProdiContext.Provider>
  );
}

// Buat Custom Hook untuk mempermudah penggunaan context di komponen lain
export function useProdi() {
  const context = useContext(ProdiContext);
  if (context === undefined) {
    throw new Error('useProdi harus digunakan di dalam ProdiProvider');
  }
  return context;
}