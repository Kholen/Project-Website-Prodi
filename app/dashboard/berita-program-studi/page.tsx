import BeritaTable from "@/components/TableBerita";

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

async function getBeritaData(): Promise<Berita[]> {
  try {
    const response = await fetch("http://localhost:8000/api/berita", {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data dari API");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch Error (dashboard/berita-program-studi):", error);
    return [];
  }
}

export default async function BeritaPage() {
  const initialBeritaData = await getBeritaData();

  return (
    <section>
      <div className="w-full p-4 bg-white text-black rounded-lg mb-10 text-center shadow-xl">
        <h1 className="text-2xl font-bold mb-5">Daftar Berita STTI Tanjungpinang</h1>
        <BeritaTable initialData={initialBeritaData} />
      </div>
    </section>
  );
}
