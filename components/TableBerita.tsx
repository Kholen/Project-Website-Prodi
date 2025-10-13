"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Tooltip,
} from "@heroui/react"; 
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

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

const columns = [
  { name: "NO", uid: "no" },
  { name: "JUDUL BERITA", uid: "judul" },
  { name: "TANGGAL PUBLIKASI", uid: "created_at" }, 
  { name: "AKSI", uid: "actions" },
];

export default function BeritaTable({ initialData }: { initialData: Berita[] }) {
  const router = useRouter();

  const [beritaData, setBeritaData] = useState<Berita[]>(initialData);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);


  // LOGIKA HAPUS DATA -- BELUM SELESAI
  const handleDelete = async (id: number, judul: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus berita: "${judul}"?`)) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/berita/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Gagal menghapus data dari server.');
      }
      setBeritaData(prevData => prevData.filter(item => item.id !== id));
      alert('Data berita berhasil dihapus.');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menghapus data.');
    }
  };
  
  const filteredItems = useMemo(() => {
    let filteredBerita = [...beritaData];
    if (filterValue) {
      filteredBerita = filteredBerita.filter(
        (berita) =>
          berita.judul.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredBerita;
  }, [beritaData, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const paginatedItems = useMemo(() => {
    // Urutkan berdasarkan 'id' secara descending (terbaru di atas)
    const sortedItems = [...filteredItems].sort((a, b) => b.id - a.id);
    
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    
    return sortedItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // --- Handlers untuk Interaksi UI ---
  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);
  
  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value || "");
    setPage(1);
  }, []);
  
  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const renderCell = useCallback((berita: Berita, columnKey: React.Key) => {
    const cellValue = berita[columnKey as keyof Berita];
    switch (columnKey) {
      case "no":
        const index = paginatedItems.findIndex(item => item.id === berita.id);
        const rowNumber = (page - 1) * rowsPerPage + index + 1;
        return <span className="font-semibold text-gray-800">{rowNumber}</span>;
      case "judul":
        return (
          <div>
            <p className="font-medium text-gray-900">{berita.judul}</p>
            <p className="text-gray-500 text-xs mt-1">{berita.kepala_berita}</p>
          </div>
        );
      case "created_at":
        // Format tanggal agar lebih mudah dibaca
        return new Date(berita.created_at).toLocaleDateString("id-ID", {
          year: 'numeric', month: 'long', day: 'numeric'
        });
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit berita">
              {/* Tautan ke halaman edit berita */}
              <Link href={`/dashboard/data-berita/${berita.id}`}>
                <Button isIconOnly variant="light" size="sm">
                  <FiEdit className="text-lg text-default-500" />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Hapus berita">
              <Button isIconOnly variant="light" size="sm" color="danger" onPress={() => handleDelete(berita.id, berita.judul)}>
                <RiDeleteBin6Line className="text-lg text-danger" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [paginatedItems, page, rowsPerPage]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Cari berdasarkan judul berita..."
            size="sm"
            startContent={<IoSearchSharp className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <Link href="/dashboard/berita-mahasiswa/tambah">
            <Button color="primary" endContent={<FaPlus />}>
              Tambah Baru
            </Button>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {beritaData.length} berita</span>
          <label className="flex items-center text-default-400 text-small">
            Baris per halaman:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onRowsPerPageChange, beritaData.length, rowsPerPage, onClear]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);

  return (
    <Table
      aria-label="Tabel data berita"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column:any) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Tidak ada berita ditemukan"} items={paginatedItems}>
        {(item:any) => (
          <TableRow key={item.id}>
            {(columnKey:any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}