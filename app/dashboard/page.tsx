"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Image, Spinner } from "@heroui/react";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import React, { useState, useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import DashboardClient from "./DashboardClient";
import Searchbar from "@/components/Searchbar";
import { VscAccount } from "react-icons/vsc";
import Link from "next/link";
import type { Selection } from "@heroui/react";

interface ImageUrl {
  id: number;
  url: string;
}

interface RelasiProdi {
  id: number;
  nama_prodi?: string;
}

interface Dosen {
  id: number;
  image_url: ImageUrl[];
  nama: string;
  NUPTK: string;
  prodis?: RelasiProdi[];
}

export default function PageDataDosen() {
  // --- LANGKAH 1: PERBARUI STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [allDosen, setAllDosen] = useState<Dosen[]>([]);
  const [filteredDosen, setFilteredDosen] = useState<Dosen[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["ALL"]));
  const selectedValue = useMemo(() => Array.from(selectedKeys).join(", ").replace(/_/g, ""), [selectedKeys]);

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
    const selectedProdi = Array.from(selectedKeys)[0]?.toString() ?? "ALL";

    const results = allDosen.filter((dosen) => {
      const nama = dosen.nama?.toLowerCase() ?? "";
      const nuptk = dosen.NUPTK?.toLowerCase() ?? "";
      const matchesSearch = nama.includes(search) || nuptk.includes(search);

      const prodiList = (dosen.prodis ?? []).map((prodi) => prodi.nama_prodi?.toLowerCase() ?? "");
      const matchesProdi =
        selectedProdi === "ALL" ||
        (selectedProdi === "IF" && prodiList.some((prodi) => prodi.includes("teknik informatika"))) ||
        (selectedProdi === "SI" && prodiList.some((prodi) => prodi.includes("sistem informasi")));

      return matchesSearch && matchesProdi;
    });

    setFilteredDosen(results);
  }, [searchTerm, allDosen, selectedKeys]);

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

      <div className="w-full p-4 bg-white text-black rounded-lg mb-10 text-center shadow-xl">
        <h1 className="text-2xl font-bold">Daftar Dosen STTI Tanjungpinang</h1>
      </div>

      <div className="grid grid-cols-[auto_78px] gap-3 mt-6 mb-6">
        {/* searchbar */}
        <Searchbar value={searchTerm} onValueChange={setSearchTerm} onClear={() => setSearchTerm("")} isClearable placeholder="Cari nama dosen?" />

        {/* filter menggunakan dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button className="capitalize text-white mainColor h-auto" variant="bordered">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Single selection"
            selectedKeys={selectedKeys}
            selectionMode="single"
            variant="flat"
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="ALL">Semua Prodi</DropdownItem>
            <DropdownItem key="IF">Teknik Informatika</DropdownItem>
            <DropdownItem key="SI">Sistem Informasi</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="w-full p-5 bg-white rounded-lg text-white shadow-xl">
        <div className="flex flex-row justify-between items-center mb-5">
          <h2 className="text-xl text-black">Data Dosen:</h2>
          <Link href="/dashboard/tambah">
            <Button color="primary" endContent={<FaPlus />}>
              Tambah Dosen
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading && (
            <Spinner variant="dots" label="Memuat data Riset dan Publikasi..." classNames={{ label: "mt-4 text-[#0a0950]", dots: "!bg-[#0a0950]" }} />
          )}
          {error && <p className="col-span-full text-center text-red-500">Error: {error}</p>}

          {/* --- LANGKAH 4: TAMPILKAN DATA YANG SUDAH DIFILTER --- */}
          {!isLoading &&
            !error &&
            filteredDosen.map((dosen) => (
              <div
                key={dosen.id}
                className="h-24 bg-gray-200 rounded-lg flex items-center p-3 justify-between object-cover transition-all duration-300 ease-in-out shadow-lg hover:shadow-gray-500/50 hover:scale-102"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full flex flex-shrink-0 items-center justify-center bg-gray-200 overflow-hidden">
                    {dosen.image_url && dosen.image_url.length > 0 ? (
                      <Image alt={`Foto ${dosen.nama}`} src={dosen.image_url[0].url} width={64} height={64} className="object-cover w-full h-full" />
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
                  <div className="w-10 h-10 bg-warning rounded-md flex items-center justify-center">
                    <Link className="cursor-pointer" href={`/dashboard/${dosen.id}`}>
                      <RiEdit2Line className="w-5 h-5 text-white" />
                    </Link>
                  </div>
                  <div className="w-10 h-10 bg-red-900 rounded-md flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(dosen.id, dosen.nama)}
                      aria-label={`Hapus ${dosen.nama}`}
                      className="cursor-pointer"
                    >
                      <RiDeleteBin6Line className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* Tambahkan pesan jika hasil pencarian kosong */}
          {!isLoading && !error && filteredDosen.length === 0 && <p className="col-span-full text-center text-gray-400">Dosen tidak ditemukan.</p>}
        </div>
      </div>
    </>
  );
}
