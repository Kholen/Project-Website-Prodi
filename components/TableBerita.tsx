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

type Berita = {
  id: number;
  judul: string;
  slug: string;
  gambar_berita: string;
  gambar_url?: string | null;
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

  useEffect(() => {
    setBeritaData(initialData);
  }, [initialData]);

  const handleDelete = useCallback(
    async (slug: string, judul: string) => {
      if (!window.confirm(`Apakah Anda yakin ingin menghapus berita: "${judul}"?`)) {
        return;
      }

      try {
        const response = await fetch(`/api/berita/${slug}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const contentType = response.headers.get("content-type") ?? "";
          const message = contentType.includes("application/json") ? (await response.json())?.message : await response.text();
          throw new Error(message || "Gagal menghapus data dari server.");
        }

        setBeritaData((prevData) => prevData.filter((item) => item.slug !== slug));
        alert("Data berita berhasil dihapus.");
        router.refresh();
      } catch (error: any) {
        const message = error?.message ?? "Terjadi kesalahan saat menghapus data.";
        console.error(message);
        alert(message);
      }
    },
    [router]
  );

  const filteredItems = useMemo(() => {
    if (!filterValue) {
      return beritaData;
    }

    const keyword = filterValue.toLowerCase();
    return beritaData.filter((berita) => berita.judul.toLowerCase().includes(keyword));
  }, [beritaData, filterValue]);

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
    (berita: Berita, columnKey: React.Key) => {
      switch (columnKey) {
        case "no": {
          const index = paginatedItems.findIndex((item) => item.slug === berita.slug);
          const rowNumber = (page - 1) * rowsPerPage + index + 1;
          return <span className="font-semibold text-gray-800">{rowNumber}</span>;
        }
        case "judul": {
          const preview = extractPlainText(berita.kepala_berita);
          return (
            <div>
              <p className="font-medium text-gray-900">{berita.judul}</p>
              {preview && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{preview}</p>}
            </div>
          );
        }
        case "created_at":
          return new Date(berita.created_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="warning" content="Edit berita" className="text-white">
                <Link href={`/dashboard/berita-program-studi/${berita.slug}`}>
                  <Button isIconOnly variant="light" size="sm" color="warning">
                    <FiEdit className="text-lg text-warning" />
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip color="danger" content="Hapus berita">
                <Button isIconOnly variant="light" size="sm" color="danger" onPress={() => handleDelete(berita.slug, berita.judul)}>
                  <RiDeleteBin6Line className="text-lg text-danger" />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return berita[columnKey as keyof Berita];
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
            placeholder="Cari berdasarkan judul berita..."
            size="sm"
            startContent={<IoSearchSharp className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <Link href="/dashboard/berita-program-studi/tambah">
            <Button color="primary" endContent={<FaPlus />}>
              Tambah Baru
            </Button>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {filteredItems.length} berita</span>
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
      aria-label="Tabel data berita"
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
      <TableBody emptyContent="Tidak ada berita ditemukan" items={paginatedItems}>
        {(item: any) => <TableRow key={item.slug}>{(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
      </TableBody>
    </Table>
  );
}
