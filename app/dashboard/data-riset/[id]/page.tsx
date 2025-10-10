"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardClient from "@/app/dashboard/DashboardClient"; // Sesuaikan path jika perlu
import { Input, Button, Spinner } from "@heroui/react";

// Tipe Data untuk Riset
interface Riset {
  id: number;
  judul: string;
  nama_ketua: string;
  anggota_penulis?: string;
  tahun: number;
  journal_name: string;
  url_riset: string | null;
  published_at: string;
}

// --- Komponen Halaman ---
export default function EditRisetPage() {
  const router = useRouter();
  const params = useParams();

  // State untuk data form, diinisialisasi dengan string kosong
  const [formData, setFormData] = useState<Partial<Riset>>({
    judul: '',
    nama_ketua: '',
    tahun: new Date().getFullYear(), // Default ke tahun sekarang
    journal_name: '',
    url_riset: '',
    published_at: '',
    anggota_penulis: '',
  });

  // State untuk loading dan error
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch Data Awal ---
  useEffect(() => {
    const id = params.id as string;
    if (!id) return;

    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8000/api/riset/${id}`);
        if (!response.ok) {
          throw new Error(`Gagal mengambil data riset`);
        }
        const data: Riset = await response.json();
        
        // Mengisi form dengan data dari API
        setFormData({
            judul: data.judul,
            nama_ketua: data.nama_ketua,
            anggota_penulis: data.anggota_penulis || '',
            tahun: data.tahun,
            journal_name: data.journal_name,
            url_riset: data.url_riset || '',
            // Format tanggal agar sesuai dengan input type="date" (YYYY-MM-DD)
            published_at: data.published_at ? new Date(data.published_at).toISOString().split('T')[0] : '',
        });

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  // --- Event Handler (Sama persis seperti di form Dosen) ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // --- Submit Logic ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirm("Simpan perubahan data riset?")) return;

    try {
      // Mengirim semua data dari formData
      const response = await fetch(`http://localhost:8000/api/riset/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal memperbarui data.");
      }

      alert("Data riset berhasil diperbarui!");
      // Arahkan kembali ke halaman daftar riset
      router.push("/dashboard/data-riset");

    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center gap-2 py-6 min-h-screen">
        <Spinner size="sm" />
        <span className="text-small text-default-500">Memuat data riset...</span>
      </div>
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
      <DashboardClient />
      <div className="w-full p-4 bg-white text-black rounded-lg mb-10 text-center">
        <h1 className="text-2xl font-bold">Update Data Riset</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded-lg text-black space-y-4">
        <div>
          <label className="font-bold">Judul Riset:</label>
          <Input name="judul" value={formData.judul ?? ''} onChange={handleChange} variant="bordered" />
        </div>
        <div>
          <label className="font-bold">Nama Ketua Peneliti:</label>
          <Input name="nama_ketua" value={formData.nama_ketua ?? ''} onChange={handleChange} variant="bordered" />
        </div>
        <div>
          <label className="font-bold">Nama Anggota Penulis:</label>
          <Input name="anggota_penulis" value={formData.anggota_penulis ?? ''} onChange={handleChange} variant="bordered" />
        </div>
        <div>
          <label className="font-bold">Tahun:</label>
          <Input type="number" name="tahun" value={String(formData.tahun ?? '')} onChange={handleChange} variant="bordered" />
        </div>
        <div>
          <label className="font-bold">Nama Jurnal:</label>
          <Input name="journal_name" value={formData.journal_name ?? ''} onChange={handleChange} variant="bordered" />
        </div>
        <div>
          <label className="font-bold">URL Publikasi:</label>
          <Input name="url_riset" value={formData.url_riset ?? ''} onChange={handleChange} variant="bordered" placeholder="https://..." />
        </div>
        <div>
          <label className="font-bold">Tanggal Publikasi:</label>
          <Input type="date" name="published_at" value={formData.published_at ?? ''} onChange={handleChange} variant="bordered" />
        </div>

        <div className="mt-8 flex justify-end">
          <Button color="success" type="submit" className="font-bold text-white">
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </>
  );
}