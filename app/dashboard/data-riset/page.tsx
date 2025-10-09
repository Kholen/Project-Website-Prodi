// app/dashboard/riset/page.tsx

import RisetTable from "@/components/TableRiset"; // Path ke komponen client yang akan kita buat

// Tipe Data Riset
type Riset = {
  id: number;
  nama_ketua: string;
  judul: string;
  journal_name: string;
  url_riset: string | null;
  published_at: string;
  tahun: number;
  created_at: string;
  updated_at: string;
};

// Fungsi untuk mengambil data di server
async function getRisetData(): Promise<Riset[]> {
  try {
    const response = await fetch('http://localhost:8000/api/riset', {
      cache: 'no-store' // Data selalu baru setiap request
    });
    if (!response.ok) {
      // Di Server Component, lebih baik melempar error agar ditangkap oleh error boundary Next.js
      throw new Error('Gagal mengambil data dari API');
    }
    return response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return []; // Kembalikan array kosong jika gagal
  }
}

// Halaman ini adalah Server Component (tidak ada 'use client')
export default async function RisetPage() {
  // Ambil data langsung di server
  const initialRisetData = await getRisetData();

  return (
    <section className="">
      <div className="w-full p-4 bg-white text-black rounded-lg mb-10 text-center shadow-xl">
        <h1 className="text-2xl font-bold">Daftar Riset STTI Tanjungpinang</h1>
      </div>
      
      {/* Teruskan data awal sebagai prop ke komponen client */}
      <RisetTable initialData={initialRisetData} />
    </section>
  );
}