"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import DashboardClient from "@/app/dashboard/DashboardClient";
import { Input, Button, Spinner, Textarea } from "@heroui/react"; // Sesuaikan library UI Anda
import { FiUpload } from "react-icons/fi";

// # Perbaikan 1: Tipe data form disesuaikan untuk file
type BeritaFormData = {
  judul: string;
  kepala_berita: string;
  tubuh_berita: string;
  ekor_berita: string;
  gambar_berita: File | null; // Tipe diubah menjadi File atau null
};

export default function TambahBeritaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<BeritaFormData>({
    judul: '',
    kepala_berita: '',
    tubuh_berita: '',
    ekor_berita: '',
    gambar_berita: null, // Dimulai dengan null
  });

  const [fileName, setFileName] = useState("Tidak ada file dipilih");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handler untuk input teks biasa
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // # Perbaikan 2: Handler KHUSUS untuk input file
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, gambar_berita: file }));
      setFileName(file.name);
    }
  };

  // # Perbaikan 3: Logic Submit menggunakan FormData
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirm("Simpan data berita baru?")) return;

    setIsSubmitting(true);
    setError(null);

    // Buat objek FormData untuk mengirim file
    const data = new FormData();
    data.append('judul', formData.judul);
    data.append('kepala_berita', formData.kepala_berita);
    data.append('tubuh_berita', formData.tubuh_berita);
    data.append('ekor_berita', formData.ekor_berita);
    if (formData.gambar_berita) {
      data.append('gambar_berita', formData.gambar_berita);
    } else {
        alert("Gambar berita wajib diisi!");
        setIsSubmitting(false);
        return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/berita`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
            const validationErrors = Object.values(errorData.errors || errorData).flat().join('\n');
            throw new Error(`Gagal validasi:\n${validationErrors}`);
        }
        throw new Error(errorData.message || "Gagal menyimpan data.");
      }

      alert("Data berita berhasil ditambahkan!");
      router.push("/dashboard/berita-mahasiswa"); 

    } catch (err: any) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DashboardClient />
      <div className="w-full p-4 bg-white rounded-lg text-black mb-10 text-center">
        <h1 className="text-2xl font-bold">Tambah Data Berita Baru</h1>
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
          <div className="mt-2">
            <input 
              type="file" 
              id="gambar_berita_input"
              name="gambar_berita" 
              onChange={handleFileChange} 
              className="hidden"
            />
            <label 
              htmlFor="gambar_berita_input"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors w-max"
            >
              <FiUpload />
              <span>Pilih Gambar...</span>
            </label>
            <p className="text-sm text-gray-500 mt-2">{fileName}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button color="primary" type="submit" className="font-bold" disabled={isSubmitting}>
            {isSubmitting ? <Spinner size="sm" color="white" /> : 'Simpan Data'}
          </Button>
        </div>
      </form>
    </>
  );
}