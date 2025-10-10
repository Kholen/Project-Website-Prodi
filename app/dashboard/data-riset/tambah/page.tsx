"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import DashboardClient from "@/app/dashboard/DashboardClient"; // Sesuaikan path jika perlu
import { Input, Button, Spinner } from "@heroui/react";

// Tipe Data Parsial untuk state form
// Partial<T> membuat semua properti di T menjadi opsional
type PartialRiset = {
  judul?: string;
  nama_ketua?: string;
  anggota_penulis?: string;
  tahun?: number;
  journal_name?: string;
  url_riset?: string;
  published_at?: string;
};

// --- Komponen Halaman ---
export default function TambahRisetPage() {
  const router = useRouter();

  // State untuk form dimulai dalam keadaan kosong
  const [formData, setFormData] = useState<PartialRiset>({
    judul: '',
    nama_ketua: '',
    anggota_penulis: '',
    tahun: new Date().getFullYear(), // Default ke tahun sekarang
    journal_name: '',
    url_riset: '',
    published_at: '',
  });

  // State untuk loading saat submit dan error
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Event Handler ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // --- Submit Logic ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirm("Simpan data riset baru?")) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Mengirim data dari formData
      const response = await fetch(`http://localhost:8000/api/riset`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Menampilkan error validasi dari Laravel
        if (response.status === 422) {
            const validationErrors = Object.values(errorData.errors).flat().join('\n');
            throw new Error(`Gagal validasi:\n${validationErrors}`);
        }
        throw new Error(errorData.message || "Gagal menyimpan data.");
      }

      alert("Data riset berhasil ditambahkan!");
      router.push("/dashboard/data-riset"); 

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
        <h1 className="text-2xl font-bold">Tambah Data Riset Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded-lg text-black space-y-4">
        <div>
          <label className="font-bold">Judul Riset:</label>
          <Input name="judul" value={formData.judul ?? ''} onChange={handleChange} variant="bordered" isRequired />
        </div>
        <div>
          <label className="font-bold">Nama Ketua Peneliti:</label>
          <Input name="nama_ketua" value={formData.nama_ketua ?? ''} onChange={handleChange} variant="bordered" isRequired />
        </div>
        <div>
          <label className="font-bold">Anggota Penulis (pisahkan dengan koma):</label>
          <Input name="anggota_penulis" value={formData.anggota_penulis ?? ''} onChange={handleChange} variant="bordered" />
        </div>
        <div>
          <label className="font-bold">Tahun:</label>
          <Input type="number" name="tahun" value={String(formData.tahun ?? '')} onChange={handleChange} variant="bordered" isRequired />
        </div>
        <div>
          <label className="font-bold">Nama Jurnal:</label>
          <Input name="journal_name" value={formData.journal_name ?? ''} onChange={handleChange} variant="bordered" />
        </div>
        <div>
          <label className="font-bold">URL Publikasi:</label>
          <Input type="url" name="url_riset" value={formData.url_riset ?? ''} onChange={handleChange} variant="bordered" placeholder="https://..." />
        </div>
        <div>
          <label className="font-bold">Tanggal Publikasi:</label>
          <Input type="date" name="published_at" value={formData.published_at ?? ''} onChange={handleChange} variant="bordered" />
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            color="success" 
            type="submit" 
            className="font-bold text-white"
            disabled={isSubmitting} // Tombol dinonaktifkan saat proses submit
          >
            {isSubmitting ? <Spinner size="sm" /> : 'Simpan Data'}
          </Button>
        </div>
      </form>
    </>
  );
}