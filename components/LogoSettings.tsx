"use client"
import React from "react";
import { useState, useEffect, ChangeEvent, FormEvent } from "react"; 

// Tipe Data
interface Prop {
  id: number;
  visi_si: string;
  misi_si: string;
  visi_if: string;
  misi_if: string;
  default_logo: string | null; // Bisa jadi null
  white_logo: string | null; // Bisa jadi null
  email: string;
  no_telp: string;
  instagram_url: string;
  whatsapp_url: string;
  facebook_url: string;
  x_url: string;
}

const BACKEND_URL = "http://localhost:8000";

// Komponen Spinner sederhana
const Spinner = () => <div className="w-5 h-5 border-2 border-dashed border-white rounded-full animate-spin"></div>;

export default function LogoSettings() {
  // State untuk file BARU yang akan diupload
  const [defaultLogoFile, setDefaultLogoFile] = useState<File | null>(null);
  const [whiteLogoFile, setWhiteLogoFile] = useState<File | null>(null);

  // State untuk NAMA file yang tampil di tombol
  const [defaultLogoName, setDefaultLogoName] = useState("Pilih Logo Default Baru...");
  const [whiteLogoName, setWhiteLogoName] = useState("Pilih Logo Putih Baru...");

  // State untuk PREVIEW gambar (menampilkan gambar lama atau baru)
  const [defaultLogoPreview, setDefaultLogoPreview] = useState<string>("");
  const [whiteLogoPreview, setWhiteLogoPreview] = useState<string>("");

  const [loading, setLoading] = useState(true);   
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch data pengaturan yang ada untuk ditampilkan sebagai preview
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/settings`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        const jsonData: Prop = await response.json();
        
        // Atur preview awal menggunakan gambar dari database
        if (jsonData.default_logo) {
          setDefaultLogoPreview(jsonData.default_logo.startsWith('http') ? jsonData.default_logo : `${BACKEND_URL}${jsonData.default_logo}`);
        }
        if (jsonData.white_logo) {
          setWhiteLogoPreview(jsonData.white_logo.startsWith('http') ? jsonData.white_logo : `${BACKEND_URL}${jsonData.white_logo}`);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); // <-- [] array kosong ini PENTING

  // 2. Handler untuk masing-masing input file
  const handleDefaultLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDefaultLogoFile(file);
      setDefaultLogoName(file.name);
      if (defaultLogoPreview) URL.revokeObjectURL(defaultLogoPreview);
      setDefaultLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleWhiteLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setWhiteLogoFile(file);
      setWhiteLogoName(file.name);
      if (whiteLogoPreview) URL.revokeObjectURL(whiteLogoPreview);
      setWhiteLogoPreview(URL.createObjectURL(file));
    }
  };

  // 3. Handler untuk submit (hanya mengirim file)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 
    if (!defaultLogoFile && !whiteLogoFile) {
        alert("Pilih setidaknya satu file gambar untuk diubah.");
        return;
    }
    if (!confirm("Simpan perubahan logo?")) return;
    setIsSubmitting(true);

    const data = new FormData();
    
    // Hanya tambahkan file ke FormData JIKA pengguna memilih file baru
    if (defaultLogoFile) {
      data.append('default_logo_file', defaultLogoFile);
    }
    if (whiteLogoFile) {
      data.append('white_logo_file', whiteLogoFile);
    }
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/settings`, {
          method: 'POST', 
          body: data,
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menyimpan data.");
      }

      alert('Logo berhasil diperbarui!');

    } catch (err: any) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // 4. Tampilan Form UI
  return (
    <div className="w-full p-5 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Logo Website</h2>
        
        {/* --- Bagian Logo Default --- */}
        <fieldset className="border border-gray-300 p-4 rounded-lg">
          <legend className="text-lg font-semibold px-2">Logo Default (Warna)</legend>
          <div className="mt-2">
            <input type="file" id="default_logo_input" onChange={handleDefaultLogoChange} className="hidden" accept="image/*"/>
            <label htmlFor="default_logo_input" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 w-max">
              {/* Ganti dengan <FiUpload /> jika Anda mengimpornya */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              <span>{defaultLogoName}</span>
            </label>
          </div>
          {defaultLogoPreview && (
            <div className="mt-4">
              <p className="font-bold mb-2 text-gray-700">Preview Logo Default:</p>
              <img src={defaultLogoPreview} alt="Preview" className="h-20 rounded-lg object-contain border p-2 shadow-sm"/>
            </div>
          )}
        </fieldset>

        {/* --- Bagian Logo Putih --- */}
        <fieldset className="border border-gray-300 p-4 rounded-lg">
          <legend className="text-lg font-semibold px-2">Logo Putih (Untuk Footer)</legend>
           <div className="mt-2">
            <input type="file" id="white_logo_input" onChange={handleWhiteLogoChange} className="hidden" accept="image/*"/>
            <label htmlFor="white_logo_input" className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-800 w-max">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              <span>{whiteLogoName}</span>
            </label>
          </div>
          {whiteLogoPreview && (
            <div>

              <p className="font-bold mt-4 text-bold">Preview Logo Putih:</p>
            <div className="mt-4 bg-gray-800 p-2 rounded-lg inline-block">
              <img src={whiteLogoPreview} alt="Preview" className="h-20 rounded-lg object-contain shadow-sm"/>
            </div>
            </div>
          )}
        </fieldset>
        
        <button 
          type="submit" 
          className="flex items-center justify-center gap-2 mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : 'Simpan Perubahan Logo'}
        </button>
      </form>
    </div>
  );
}