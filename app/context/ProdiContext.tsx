// src/context/ProdiContext.tsx

'use client';

import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

// Tipe untuk state
type Prodi = 'IF' | 'SI';

// Tipe untuk nilai yang akan disediakan oleh Context
interface ProdiContextType {
  prodi: Prodi;
  setProdi: Dispatch<SetStateAction<Prodi>>;
}

// Buat Context
const ProdiContext = createContext<ProdiContextType | undefined>(undefined);

// Buat Komponen Provider yang akan membungkus aplikasi kita
export function ProdiProvider({ children }: { children: ReactNode }) {
  const [prodi, setProdi] = useState<Prodi>('IF');

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