"use client";

import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardClient from "@/app/dashboard/DashboardClient";
import { Input, Button, Spinner, Textarea } from "@heroui/react"; // Sesuaikan library UI Anda
import { FiUpload } from "react-icons/fi";

// Tipe data form disesuaikan untuk file dan data awal
type BeritaFormData = {
  judul: string;
  kepala_berita: string;
  tubuh_berita: string;
  ekor_berita: string;
  gambar_berita: File | null; // Untuk file baru yang akan diupload
};

export default function EditBeritaPage() {
  const router = useRouter();
  const params = useParams(); // Hook untuk mendapatkan parameter dari URL
  const id = params.id; // Ambil ID berita dari URL

  const [formData, setFormData] = useState<BeritaFormData>({
    judul: '',
    kepala_berita: '',
    tubuh_berita: '',
    ekor_berita: '',
    gambar_berita: null,
  });

  const [isLoadingData, setIsLoadingData] = useState(true); // State untuk loading data awal
  const [gambarPreview, setGambarPreview] = useState<string | null>(null); // State untuk URL preview gambar
  const [fileName, setFileName] = useState("Tidak ada file baru dipilih");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // # Perbedaan 1: Mengambil data berita yang ada saat komponen dimuat
  useEffect(() => {
    if (!id) return;

    const fetchBerita = async () => {
      try {
        setIsLoadingData(true);
        const response = await fetch(`http://localhost:8000/api/berita/${id}`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data berita.");
        }
        const data = await response.json();
        
        // Isi form dengan data yang ada
        setFormData({
          judul: data.judul,
          kepala_berita: data.kepala_berita,
          tubuh_berita: data.tubuh_berita,
          ekor_berita: data.ekor_berita,
          gambar_berita: null, // Reset pilihan file
        });
        
        // Set URL gambar yang sudah ada untuk preview
        setGambarPreview(data.gambar_url); // Asumsi backend mengirim URL gambar

      } catch (err: any) {
        setError(err.message);
        alert(`Error: ${err.message}`);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchBerita();
  }, [id]); // Efek ini berjalan setiap kali 'id' berubah

  // Handler untuk input teks biasa
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // # Perbedaan 2: Handler file diubah untuk menampilkan preview gambar baru
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, gambar_berita: file }));
      setFileName(file.name);
      
      // Buat URL sementara untuk preview gambar yang baru dipilih
      setGambarPreview(URL.createObjectURL(file));
    }
  };

  // # Perbedaan 3: Logic Submit diubah untuk proses UPDATE
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirm("Simpan perubahan data berita?")) return;

    setIsSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append('judul', formData.judul);
    data.append('kepala_berita', formData.kepala_berita);
    data.append('tubuh_berita', formData.tubuh_berita);
    data.append('ekor_berita', formData.ekor_berita);
    
    // Kirim method PUT untuk Laravel
    data.append('_method', 'PUT'); 

    // HANYA kirim file gambar jika pengguna memilih file baru
    if (formData.gambar_berita) {
      data.append('gambar_berita', formData.gambar_berita);
    }

    try {
      // Kirim ke endpoint update dengan metode POST (karena FormData)
      const response = await fetch(`http://localhost:8000/api/berita/${id}`, {
        method: "POST", // Tetap POST, karena _method akan dihandle Laravel
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
            const validationErrors = Object.values(errorData.errors || errorData).flat().join('\n');
            throw new Error(`Gagal validasi:\n${validationErrors}`);
        }
        throw new Error(errorData.message || "Gagal menyimpan perubahan.");
      }

      alert("Data berita berhasil diperbarui!");
      router.push("/dashboard/berita-mahasiswa"); 

    } catch (err: any) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;
  }

  return (
    <>
      <DashboardClient />
      <div className="w-full p-4 bg-white rounded-lg text-black mb-10 text-center">
        <h1 className="text-2xl font-bold">Edit Data Berita</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded-lg text-black space-y-4">
        <div>
          <label className="font-bold">Judul Berita:</label>
          <Input name="judul" value={formData.judul} onChange={handleChange} variant="bordered" isRequired />
        </div>
        <div>
          <label className="font-bold">Kepala Berita:</label>
          <Input name="kepala_berita" value={formData.kepala_berita} onChange={handleChange} variant="bordered" />
        </div>
        <div>
          <label className="font-bold">Tubuh Berita:</label>
          <Textarea name="tubuh_berita" value={formData.tubuh_berita} onChange={handleChange} variant="bordered" isRequired />
        </div>
        <div>
          <label className="font-bold">Ekor Berita:</label>
          <Input name="ekor_berita" value={formData.ekor_berita} onChange={handleChange} variant="bordered" />
        </div>

        <div>
          <label className="font-bold">Gambar Berita:</label>
          
          {/* # Perbedaan 4: Menampilkan preview gambar */}
          {gambarPreview && (
            <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview Gambar:</p>
                
                <img src={gambarPreview} alt="Preview Gambar Berita" className="w-full max-w-sm h-auto rounded-lg object-cover" />
            </div>
          )}

          <div className="mt-4">
            <input 
              type="file" 
              id="gambar_berita_input"
              name="gambar_berita" 
              onChange={handleFileChange} 
              className="hidden"
              accept="image/*" // Batasi hanya file gambar
            />
            <label 
              htmlFor="gambar_berita_input"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors w-max"
            >
              <FiUpload />
              <span>Ganti Gambar...</span>
            </label>
            <p className="text-sm text-gray-500 mt-2">{fileName}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button color="primary" type="submit" className="font-bold" disabled={isSubmitting}>
            {isSubmitting ? <Spinner size="sm" color="white" /> : 'Update Data'}
          </Button>
        </div>
      </form>
    </>
  );
}