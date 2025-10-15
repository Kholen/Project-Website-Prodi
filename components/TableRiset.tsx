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

// --- Tipe Data ---
type Riset = {
  id: number;
  judul: string;
  nama_ketua: string;
  tahun: number;
  journal_name: string;
  url_riset: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
};

// --- Konfigurasi Kolom ---
const columns = [
  { name: "NO", uid: "no" },
  { name: "JUDUL RISET", uid: "judul" },
  { name: "NAMA KETUA", uid: "nama_ketua" },
  { name: "TAHUN", uid: "tahun" },
  { name: "AKSI", uid: "actions" },
];

// --- Komponen Utama ---
export default function RisetTable({ initialData }: { initialData: Riset[] }) {
  const router = useRouter();
  
  // --- State Management ---
  const [risetData, setRisetData] = useState<Riset[]>(initialData);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // --- Logika Hapus Data ---
  const handleDelete = async (id: number, judul: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus riset: "${judul}"?`)) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/riset/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Gagal menghapus data dari server.');
      }
      // Hapus item dari state untuk memperbarui UI tanpa refresh
      setRisetData(prevData => prevData.filter(item => item.id !== id));
      alert('Data riset berhasil dihapus.');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menghapus data.');
    }
  };
  
  // --- Memoized Logic untuk Filtering dan Paginasi ---
  const filteredItems = useMemo(() => {
    let filteredRiset = [...risetData];
    if (filterValue) {
      filteredRiset = filteredRiset.filter(
        (riset) =>
          riset.judul.toLowerCase().includes(filterValue.toLowerCase()) ||
          riset.nama_ketua.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredRiset;
  }, [risetData, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const paginatedItems = useMemo(() => {
  // 1. Lakukan sorting pada data yang sudah difilter
  // Kita urutkan berdasarkan 'id' secara descending (terbaru di atas)
  const sortedItems = [...filteredItems].sort((a, b) => a.id - b.id);
  
  // 2. Lakukan paginasi pada data yang sudah diurutkan
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

  // --- Render Functions ---
  const renderCell = useCallback((riset: Riset, columnKey: React.Key) => {
    const cellValue = riset[columnKey as keyof Riset];
    switch (columnKey) {
      case "no":
      // Membuat nomor urut berdasarkan halaman dan posisi di halaman
      const index = paginatedItems.findIndex(item => item.id === riset.id);
      // Hitung nomor urut global berdasarkan halaman
      const rowNumber = (page - 1) * rowsPerPage + index + 1;
      return <span className="font-semibold text-gray-800">{rowNumber}</span>;
      case "judul":
        return (
          <div>
            <p className="font-medium text-gray-900">{riset.judul}</p>
            <p className="text-gray-500 text-xs mt-1">{riset.journal_name}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit riset" color="warning" className="text-white">
              {/* Link ke halaman edit dinamis */}
              <Link href={`/dashboard/data-riset/${riset.id}`}>
                <Button isIconOnly variant="light" size="sm" color="warning">
                  <FiEdit className="text-lg text-warning" />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Hapus riset">
              {/* Tombol hapus memanggil handleDelete */}
              <Button isIconOnly variant="light" size="sm" color="danger" onPress={() => handleDelete(riset.id, riset.judul)}>
                <RiDeleteBin6Line className="text-lg text-danger" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [handleDelete]);

  // --- Konten Atas dan Bawah Tabel ---
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
            placeholder="Cari berdasarkan judul atau nama ketua..."
            size="sm"
            startContent={<IoSearchSharp className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <Link href="/dashboard/data-riset/tambah">
            <Button color="primary" endContent={<FaPlus />}>
              Tambah Baru
            </Button>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {risetData.length} riset</span>
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
  }, [filterValue, onSearchChange, onRowsPerPageChange, risetData.length, rowsPerPage, onClear]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          classNames={{ cursor: "bg-foreground text-background" }}
          color="default"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);

  // --- Return JSX Utama ---
  return (
    <Table
      aria-label="Tabel data riset"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Tidak ada riset ditemukan"} items={paginatedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}