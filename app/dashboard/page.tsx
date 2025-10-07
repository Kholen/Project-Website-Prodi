"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaSearch } from "react-icons/fa";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { Input, Button, Image } from "@heroui/react";

import DashboardClient from "./DashboardClient";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [allDosen, setAllDosen] = useState<Dosen[]>([]);
  const [filteredDosen, setFilteredDosen] = useState<Dosen[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pastikan elemen tertentu baru dirender setelah proses hydration
  useEffect(() => { setIsHydrated(true); }, []);
  // useEffect untuk mengambil data awal (hanya sekali)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/api/dosen");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        const data = await response.json();
        setAllDosen(data);
        setFilteredDosen(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // --- LANGKAH 3: LOGIKA FILTER ---
  // useEffect ini akan berjalan setiap kali "searchTerm" atau "allDosen" berubah
  useEffect(() => {
    const search = searchTerm.trim().toLowerCase();
    const results = allDosen.filter((dosen) =>
      dosen.nama.toLowerCase().includes(search) || dosen.NUPTK.toLowerCase().includes(search)
    );
    setFilteredDosen(results);
  }, [searchTerm, allDosen]);

  const handleDelete = async (id: number, nama: string) => {
    // Langkah 1: Minta konfirmasi
    if (!window.confirm(`Apakah Anda yakin ingin menghapus data dosen: ${nama}?`)) {
      return;
    }

    try {
      // Langkah 2: Kirim request DELETE ke API
      const response = await fetch(`http://localhost:8000/api/dosen/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus data.");
      }

      // Langkah 3: Update state untuk menghapus item dari UI
      setAllDosen((prev) => prev.filter((dosen) => dosen.id !== id));
      alert("Data berhasil dihapus.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      alert(`Error: ${message}`);
    }
  };

  return (
    <>
      <DashboardClient />

      <div className="w-full p-4 bg-[#0a0950] text-white rounded-lg mb-10 text-center">
        <h1 className="text-2xl">Daftar Dosen STTI Tanjungpinang</h1>
      </div>

      <div className="w-full p-4 bg-[#0a0950] rounded-lg flex flex-col gap-3 sm:flex-row sm:items-center mb-5">
        <h1 className="text-white">Cari Dosen:</h1>
        {/* --- LANGKAH 2: HUBUNGKAN INPUT DENGAN STATE --- */}
        {isHydrated ? (
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
            onValueChange={setSearchTerm}
            onClear={() => setSearchTerm("")}
          />
        ) : (
          <div className="flex-1">
            <div className="shadow-sm flex items-center gap-3 rounded-lg bg-white px-3 py-2 text-black/90">
              <FaSearch className="text-slate-400 pointer-events-none" />
              <input
                className="flex-1 bg-transparent outline-none"
                placeholder="Ketik nama atau NUPTK..."
                value={searchTerm}
                readOnly
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-full p-5 bg-[#0a0950] rounded-lg text-white">
        <div className="flex flex-row justify-between items-center mb-5">
          <h2 className="text-xl">Data Dosen:</h2>
          <Link href="/dashboard/tambah">
            <Button color="primary" endContent={<FaPlus />}>
              Tambah Dosen
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading && <p className="col-span-full text-center">Loading data dosen...</p>}
          {error && <p className="col-span-full text-center text-red-500">Error: {error}</p>}

          {/* --- LANGKAH 4: TAMPILKAN DATA YANG SUDAH DIFILTER --- */}
          {!isLoading && !error &&
            filteredDosen.map((dosen) => (
              <div
                key={dosen.id}
                className="h-24 bg-white rounded-lg flex items-center p-3 justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full flex flex-shrink-0 items-center justify-center bg-[#20307e] overflow-hidden">
                    {dosen.image_url && dosen.image_url.length > 0 ? (
                      <Image
                        alt={`Foto ${dosen.nama}`}
                        src={dosen.image_url[0].url}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <VscAccount className="w-14 h-14" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black font-semibold text-sm">{dosen.nama}</span>
                    <span className="text-gray-500 text-xs">{dosen.NUPTK}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 ml-10">
                  <div className="w-10 h-10 bg-[#0a0950] rounded-md flex items-center justify-center">
                    <Link className="cursor-pointer" href={`/dashboard/${dosen.id}`}>
                      <RiEdit2Line className="w-8 h-8 text-white" />
                    </Link>
                  </div>
                  <div className="w-10 h-10 bg-red-900 rounded-md flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(dosen.id, dosen.nama)}
                      aria-label={`Hapus ${dosen.nama}`}
                      className="cursor-pointer"
                    >
                      <RiDeleteBin6Line className="w-8 h-8 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* Tambahkan pesan jika hasil pencarian kosong */}
          {!isLoading && !error && filteredDosen.length === 0 && (
            <p className="col-span-full text-center text-gray-400">
              Dosen tidak ditemukan.
            </p>
          )}
        </div>
      </div>
    </>
  );
}



