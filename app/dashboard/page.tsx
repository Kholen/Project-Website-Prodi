"use client"
import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import DashboardClient from "./DashboardClient";
import {Input, Button, Image} from "@heroui/react";
import { RiEdit2Line } from "react-icons/ri";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ImageUrl {
  id: number;
  url: string;
}

interface Dosen {
  id: number;
  image_url: ImageUrl[];
  nama: string;
  NUPTK: string;
}

export default function PageDataDosen() {

  // --- LANGKAH 1: PERBARUI STATE ---
  const [searchTerm, setSearchTerm] = useState(''); // State untuk teks pencarian
  const [allDosen, setAllDosen] = useState<Dosen[]>([]); // State untuk menyimpan semua data asli
  const [filteredDosen, setFilteredDosen] = useState<Dosen[]>([]); // State untuk data yang akan ditampilkan
  
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  // useEffect untuk mengambil data awal (hanya sekali)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/api/dosen");
        if (!response.ok) {
          throw new Error(`Gagal mengambil data dari server`);
        }
        const data = await response.json();
        setAllDosen(data); // Simpan data asli ke allDosen
        setFilteredDosen(data); // Tampilkan semua data pada awalnya
      } catch (err: any) {
        setError(err.message); 
      } finally {
        setIsLoading(false); 
      }
    }
    fetchData(); 
  }, []);

  // --- LANGKAH 3: LOGIKA FILTER ---
  // useEffect ini akan berjalan setiap kali 'searchTerm' atau 'allDosen' berubah
  useEffect(() => {
    const results = allDosen.filter(dosen =>
      dosen.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dosen.NUPTK.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDosen(results);
  }, [searchTerm, allDosen]);

  const handleDelete = async (id: number, nama: string) => {
  // Langkah 1: Minta konfirmasi
  if (!window.confirm(`Apakah Anda yakin ingin menghapus data dosen: ${nama}?`)) {
    return; // Berhenti jika pengguna menekan "Batal"
  }

  try {
    // Langkah 2: Kirim request DELETE ke API
    const response = await fetch(`http://localhost:8000/api/dosen/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal menghapus data.');
    }

    // Langkah 3: Update state untuk menghapus item dari UI
    setAllDosen(prevDosen => prevDosen.filter(d => d.id !== id));
    // State filteredDosen akan otomatis ter-update oleh useEffect yang sudah ada

    alert('Data berhasil dihapus.');

  } catch (err: any) {
    alert(`Error: ${err.message}`);
  }
};

  return (
    <>
      <DashboardClient /> 
      
      <div className="w-full p-4 bg-[#0a0950] text-white rounded-lg mb-10 text-center">
        <h1 className="text-2xl">Daftar Dosen STTI Tanjungpinang</h1> 
      </div>
    
      <div className="w-full p-4 bg-[#0a0950] rounded-lg flex flex-row items-center mb-5">
        <h1 className="text-white mr-4">Cari Dosen:</h1>
        {/* --- LANGKAH 2: HUBUNGKAN INPUT DENGAN STATE --- */}
        <Input
          isClearable
          className="flex-1"
          classNames={{
            input: ["bg-white", "text-black/90"],
            inputWrapper: ["shadow-sm", "!cursor-text"],
          }}
          placeholder="Ketik nama atau NUPTK..."
          radius="lg"
          startContent={<FaSearch className="text-slate-400 pointer-events-none" />}
          value={searchTerm}
          onValueChange={setSearchTerm} // Cara mudah untuk onChange di HeroUI/NextUI
          onClear={() => setSearchTerm('')}
        />
        {/* Tombol Cari sekarang opsional karena pencarian berjalan otomatis */}
      </div>
      
      <div className="w-full p-5 bg-[#0a0950] rounded-lg text-white">
        <div className="flex flex-row justify-between items-center mb-5">   
          <h1 className="text-xl">Data Dosen:</h1>
          <Link href="/dashboard/tambah">
            <Button color="primary" endContent={<FaPlus />}>Tambah Dosen</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {isLoading && <p className="col-span-full text-center">Loading data dosen...</p>}
          {error && <p className="col-span-full text-center text-red-500">Error: {error}</p>}

          {/* --- LANGKAH 4: TAMPILKAN DATA YANG SUDAH DIFILTER --- */}
          {!isLoading && !error && filteredDosen.map((dosen) => (
            <div key={dosen.NUPTK} className="h-24 bg-white rounded-lg flex items-center p-3 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full flex flex-shrink-0 items-center justify-center bg-[#20307e] overflow-hidden">
                   {dosen.image_url && dosen.image_url.length > 0 ? (
                      // JIKA ADA GAMBAR, tampilkan komponen Image
                      <Image
                        alt={`Foto ${dosen.nama}`}
                        src={dosen.image_url[0].url}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      // JIKA TIDAK ADA GAMBAR, tampilkan placeholder
                      // (Anda bisa meletakkan ikon atau SVG di sini)
                      <div className="">
                        <VscAccount className="w-14 h-14"/>
                      </div>
                    )}
                </div>
                <div className="flex flex-col">
                  <div className="text-black font-semibold text-sm">{dosen.nama}</div>
                  <div className="text-gray-500 text-xs">{dosen.NUPTK}</div>
                </div>
              </div>

              <div className="flex flex-row gap-2 ml-10">
                <div className="w-10 h-10 bg-[#0a0950] rounded-md flex items-center justify-center">
                  <Link className="cursor-pointer" href={`/dashboard/${dosen.id}`} ><RiEdit2Line className="w-8 h-8 text-white"/></Link>
                </div>
                <div className="w-10 h-10 bg-red-900 rounded-md flex items-center justify-center">
                  <button onClick={() => handleDelete(dosen.id, dosen.nama)} aria-label={`Hapus ${dosen.nama}`}  className="cursor-pointer"><RiDeleteBin6Line className="w-8 h-8 text-white"/></button>
                </div> 
              </div>

            </div>
          ))}

          {/* Tambahkan pesan jika hasil pencarian kosong */}
          {!isLoading && !error && filteredDosen.length === 0 && (
            <p className="col-span-full text-center text-gray-400">Dosen tidak ditemukan.</p>
          )}
        </div>
      </div>
    </>
  );
}