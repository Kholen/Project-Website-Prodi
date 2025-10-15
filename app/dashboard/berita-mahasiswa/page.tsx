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
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

  try {
    const response = await fetch(`${backendUrl}/api/berita`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Gagal mengambil data dari backend: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch Error (dashboard/berita-mahasiswa):", error);
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
