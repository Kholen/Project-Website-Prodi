"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Pagination, Tooltip } from "@heroui/react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { extractPlainText } from "@/lib/richText";

type Pengumuman = {
  id: number;
  judul: string;
  gambar: string | null;
  kepala_pengumuman: string | null;
  isi_pengumuman: string;
  ekor_pengumuman: string | null;
  created_at: string;
  updated_at: string;
};

const columns = [
  { name: "NO", uid: "no" },
  { name: "JUDUL PENGUMUMAN", uid: "judul" },
  { name: "TANGGAL PENGUMUMAN", uid: "created_at" },
  { name: "AKSI", uid: "actions" },
];

export default function TablePengumuman({ initialData }: { initialData: Pengumuman[] }) {
  const router = useRouter();

  const [pengumumanData, setPengumumanData] = useState<Pengumuman[]>(initialData);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPengumumanData(initialData);
  }, [initialData]);

  const handleDelete = useCallback(
    async (id: number, judul: string) => {
      if (!window.confirm("Apakah Anda yakin ingin menghapus pengumuman?")) {
        return;
      }

      try {
        const response = await fetch(`/api/pengumuman/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const contentType = response.headers.get("content-type") ?? "";
          const message = contentType.includes("application/json") ? (await response.json())?.message : await response.text();
          throw new Error(message || "Gagal menghapus data dari server.");
        }

        setPengumumanData((prevData) => prevData.filter((item) => item.id !== id));
        alert("Data pengumuman berhasil dihapus.");
        router.refresh();
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus data.";
        console.error(message);
        alert(message);
      }
    },
    [router]
  );

  const filteredItems = useMemo(() => {
    if (!filterValue) {
      return pengumumanData;
    }

    const keyword = filterValue.toLowerCase();
    return pengumumanData.filter((item) => item.judul.toLowerCase().includes(keyword));
  }, [pengumumanData, filterValue]);

  const pages = Math.max(1, Math.ceil(filteredItems.length / rowsPerPage));

  useEffect(() => {
    if (page > pages) {
      setPage(pages);
    }
  }, [page, pages]);

  const paginatedItems = useMemo(() => {
    const sortedItems = [...filteredItems].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA || b.id - a.id;
    });

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);

  const onRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value ?? "");
    setPage(1);
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const renderCell = useCallback(
    (pengumuman: Pengumuman, columnKey: React.Key) => {
      switch (columnKey) {
        case "no": {
          const index = paginatedItems.findIndex((item) => item.id === pengumuman.id);
          const rowNumber = (page - 1) * rowsPerPage + index + 1;
          return <span className="font-semibold text-gray-800">{rowNumber}</span>;
        }
        case "judul": {
          const preview = extractPlainText(pengumuman.kepala_pengumuman) || extractPlainText(pengumuman.isi_pengumuman);
          return (
            <div>
              <p className="font-medium text-gray-900">{pengumuman.judul}</p>
              {preview && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{preview}</p>}
            </div>
          );
        }
        case "created_at":
          return new Date(pengumuman.created_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="warning" content="Edit pengumuman" className="text-white">
                <Link href={`/dashboard/pengumuman/${pengumuman.id}`}>
                  <Button isIconOnly variant="light" size="sm" color="warning">
                    <FiEdit className="text-lg text-warning" />
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip color="danger" content="Hapus pengumuman">
                <Button isIconOnly variant="light" size="sm" color="danger" onPress={() => handleDelete(pengumuman.id, pengumuman.judul)}>
                  <RiDeleteBin6Line className="text-lg text-danger" />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return pengumuman[columnKey as keyof Pengumuman];
      }
    },
    [handleDelete, paginatedItems, page, rowsPerPage]
  );

  const topContent = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Cari berdasarkan judul pengumuman..."
            size="sm"
            startContent={<IoSearchSharp className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <Link href="/dashboard/pengumuman/tambah">
            <Button color="primary" endContent={<FaPlus />}>
              Tambah Baru
            </Button>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {filteredItems.length} pengumuman</span>
          <label className="flex items-center text-default-400 text-small">
            Baris per halaman:
            <select className="bg-transparent outline-none text-default-400 text-small ml-1" onChange={onRowsPerPageChange} value={rowsPerPage}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    ),
    [filterValue, filteredItems.length, onClear, onRowsPerPageChange, onSearchChange, rowsPerPage]
  );

  const bottomContent = useMemo(
    () => (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="default"
          page={page}
          total={pages}
          classNames={{ cursor: "bg-foreground text-background" }}
          onChange={setPage}
        />
      </div>
    ),
    [page, pages]
  );

  return (
    <Table
      aria-label="Tabel data pengumuman"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="Tidak ada pengumuman ditemukan" items={paginatedItems}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
