import TablePengumuman from "@/components/TablePengumuman";

type Pengumuman = {
  id: number;
  judul: string;
  gambar: string | null;
  kepala_pengumuman: string | null;
  isi_pengumuman: string;
  ekor_pengumuman: string | null;
  created_at: string;
  updated_at: string;
};

async function getPengumuman(): Promise<Pengumuman[]> {
  try {
    const response = await fetch("http://localhost:8000/api/pengumuman", {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data pengumuman");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch Error (dashboard/pengumuman):", error);
    return [];
  }
}

export default async function PengumumanPage() {
  const initialPengumuman = await getPengumuman();

  return (
    <section>
      <div className="w-full p-4 bg-white text-black rounded-lg mb-10 text-center shadow-xl">
        <h1 className="text-2xl font-bold mb-5">Daftar Pengumuman STTI Tanjungpinang</h1>
        <TablePengumuman initialData={initialPengumuman} />
      </div>
    </section>
  );
}
