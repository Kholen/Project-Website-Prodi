// app/dashboard/berita/page.tsx  <-- Ganti nama folder dan file jika perlu

import BeritaTable from "@/components/TableBerita"; // Path ke komponen yang sudah diubah

// Tipe Data Berita
type Berita = {
  id: number;
  judul: string;
  slug: string;
  gambar_berita: string;
  kepala_berita: string | null;
  tubuh_berita: string;
  ekor_berita: string | null;
  created_at: string;
  updated_at: string;
};

// Fungsi untuk mengambil data di server
async function getBeritaData(): Promise<Berita[]> { // Nama fungsi disesuaikan
  try {
    const response = await fetch('http://localhost:8000/api/berita', {
      cache: 'no-store' 
    });
    if (!response.ok) {
      throw new Error('Gagal mengambil data dari API');
    }
    const data = await response.json();
    return data; // Langsung return data yang sudah di-parse
  } catch (error) {
    console.error("Fetch Error:", error);
    return []; 
  }
}

// Halaman ini adalah Server Component
export default async function BeritaPage() { // Nama halaman disesuaikan
  // Ambil data langsung di server
  const initialBeritaData = await getBeritaData(); // Nama variabel disesuaikan

  return (
    <section className="">
      <div className="w-full p-4 bg-white text-black rounded-lg mb-10 text-center shadow-xl">
        <h1 className="text-2xl font-bold mb-5">Daftar Berita STTI Tanjungpinang</h1>
      
        {/* Teruskan data awal sebagai prop ke komponen client */}
        <BeritaTable initialData={initialBeritaData} />
      </div>
    </section>
  );
}