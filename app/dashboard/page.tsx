"use client";

import type { SVGProps } from "react";
import type { Selection, SortDescriptor } from "@heroui/react";
import { Tooltip } from "@heroui/react";
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Spinner,
} from "@heroui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DashboardClient from "./DashboardClient";

const BACKEND_URL = "http://localhost:8000";

interface RelasiProdi {
  id: number;
  nama_prodi?: string;
}

interface Dosen {
  id: number;
  image: string;
  nama: string;
  NUPTK: string;
  prodis?: RelasiProdi[];
}

type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type ColumnKey = "name" | "nuptk" | "prodi" | "actions";

type ColumnDefinition = {
  name: string;
  uid: ColumnKey;
  sortable?: boolean;
};

const columns: ColumnDefinition[] = [
  { name: "Nama", uid: "name", sortable: true },
  { name: "NUPTK", uid: "nuptk", sortable: true },
  { name: "Program Studi", uid: "prodi" },
  { name: "Aksi", uid: "actions" },
];

type DosenRow = {
  id: number;
  name: string;
  nuptk: string;
  prodi: string[];
  dosen: Dosen;
  imageDosen: string;
};

const INITIAL_VISIBLE_COLUMNS: ColumnKey[] = ["name", "nuptk", "prodi", "actions"];

const prodiOptions = [
  { name: "Semua Prodi", uid: "ALL" },
  { name: "Teknik Informatika", uid: "IF" },
  { name: "Sistem Informasi", uid: "SI" },
];

const PlusIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

const SearchIcon = (props: IconSvgProps) => {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...props}>
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
};

const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }: IconSvgProps) => {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...otherProps}>
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function PageDataDosen() {
  const [allDosen, setAllDosen] = useState<Dosen[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [prodiFilter, setProdiFilter] = useState<Selection>(new Set(["ALL"]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setError(null);
        const response = await fetch("/api/dosen");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        const data = await response.json();
        if (isMounted) {
          setAllDosen(data);
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "Terjadi kesalahan";
          setError(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = useCallback(async (id: number, nama: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus data dosen: ${nama}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/dosen/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus data.");
      }

      setAllDosen((prev) => prev.filter((dosen) => dosen.id !== id));
      alert("Data berhasil dihapus.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      alert(`Error: ${message}`);
    }
  }, []);

  const selectedProdiKey = useMemo(() => {
    if (prodiFilter === "all") {
      return "ALL";
    }

    const keys = Array.from(prodiFilter);
    return keys[0]?.toString() ?? "ALL";
  }, [prodiFilter]);

  const filteredDosen = useMemo(() => {
    const search = filterValue.trim().toLowerCase();

    return allDosen.filter((dosen) => {
      const nama = dosen.nama?.toLowerCase() ?? "";
      const nuptk = dosen.NUPTK?.toLowerCase() ?? "";
      const matchesSearch = !search || nama.includes(search) || nuptk.includes(search);

      const prodiList = (dosen.prodis ?? []).map((prodi) => prodi.nama_prodi?.toLowerCase() ?? "");
      const matchesProdi =
        selectedProdiKey === "ALL" ||
        (selectedProdiKey === "IF" && prodiList.some((prodi) => prodi.includes("teknik informatika"))) ||
        (selectedProdiKey === "SI" && prodiList.some((prodi) => prodi.includes("sistem informasi")));

      return matchesSearch && matchesProdi;
    });
  }, [allDosen, filterValue, selectedProdiKey]);

  const pages = Math.max(1, Math.ceil(filteredDosen.length / rowsPerPage));

  useEffect(() => {
    if (page > pages) {
      setPage(pages);
    }
  }, [page, pages]);

  const sortedDosen = useMemo(() => {
    if (!sortDescriptor.column) {
      return filteredDosen;
    }

    const column = sortDescriptor.column as ColumnKey;
    if (!column || column === "actions") {
      return filteredDosen;
    }

    return [...filteredDosen].sort((a, b) => {
      const getValue = (dosen: Dosen): string => {
        switch (column) {
          case "name":
            return dosen.nama ?? "";
          case "nuptk":
            return dosen.NUPTK ?? "";
          case "prodi":
            return (dosen.prodis ?? [])
              .map((prodi) => prodi.nama_prodi ?? "")
              .filter(Boolean)
              .join(", ");
          default:
            return "";
        }
      };

      const firstValue = getValue(a).toLocaleLowerCase("id");
      const secondValue = getValue(b).toLocaleLowerCase("id");
      const cmp = firstValue.localeCompare(secondValue, "id", { sensitivity: "base" });

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredDosen, sortDescriptor]);

  const paginatedDosen = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedDosen.slice(start, end);
  }, [sortedDosen, page, rowsPerPage]);

  const tableItems = useMemo(() => {
    return paginatedDosen.map((dosen) => ({
      id: dosen.id,
      name: dosen.nama ?? "-",
      nuptk: dosen.NUPTK ?? "-",
      imageDosen: dosen.image,
      prodi: (dosen.prodis ?? []).map((prodi) => prodi.nama_prodi ?? "").filter((name) => name.trim().length > 0),
      dosen,
    }));
  }, [paginatedDosen]);

  const headerColumns = useMemo((): ColumnDefinition[] => {
    if (visibleColumns === "all") {
      return [...columns];
    }

    const columnSet = new Set(Array.from(visibleColumns, (key) => key.toString()));
    return columns.filter((column) => columnSet.has(column.uid));
  }, [visibleColumns]);

  const prodiDropdownItems = useMemo(
    () =>
      prodiOptions.map((option) => (
        <DropdownItem key={option.uid} className="capitalize">
          {option.name}
        </DropdownItem>
      )),
    []
  );

  const columnDropdownItems = useMemo(
    () =>
      columns.map((column) => (
        <DropdownItem key={column.uid} className="capitalize">
          {column.name}
        </DropdownItem>
      )),
    []
  );

  const prodiLabel = useMemo(() => {
    if (prodiFilter === "all") {
      return "Semua Prodi";
    }

    const keys = Array.from(prodiFilter);
    const selected = prodiOptions.find((option) => option.uid === keys[0]);
    return selected?.name ?? "Semua Prodi";
  }, [prodiFilter]);

  const onRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value ?? "");
    setPage(1);
  }, []);

  const onProdiSelectionChange = useCallback((keys: Selection) => {
    if (keys === "all" || Array.from(keys).length === 0) {
      setProdiFilter(new Set(["ALL"]));
    } else {
      setProdiFilter(keys);
    }
    setPage(1);
  }, []);

  const renderCell = useCallback(
    (item: DosenRow, columnKey: React.Key): React.ReactNode => {
      const key = columnKey as ColumnKey;

      switch (key) {
        case "name":
          const imageUrl = item.imageDosen;
          const fullImageUrl = imageUrl ? `${BACKEND_URL}${imageUrl}` : undefined;
          return (
            <User
              avatarProps={{
                radius: "full",
                size: "sm",
                src: fullImageUrl,
              }}
              classNames={{ description: "text-default-500" }}
              description={item.nuptk || "-"}
              name={item.name}
            >
              {item.nuptk || "-"}
            </User>
          );
        case "nuptk":
          return <span className="text-small text-default-600">{item.nuptk || "-"}</span>;
        case "prodi":
          if (item.prodi.length === 0) {
            return <span className="text-default-400 text-small">-</span>;
          }

          return (
            <div className="flex flex-wrap gap-1">
              {item.prodi.map((prodiName: string) => (
                <Chip key={`${item.id}-${prodiName}`} size="sm" variant="flat" className="capitalize">
                  {prodiName}
                </Chip>
              ))}
            </div>
          );
        case "actions":
          return (
            <div className="flex justify-end gap-2">
              <Tooltip color="warning" content="Edit berita" className="text-white">
                <Button color="warning" as={Link} href={`/dashboard/${item.id}`} isIconOnly size="sm" variant="light">
                  <FiEdit className="h-4 w-4" />
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Hapus berita">
                <Button color="danger" isIconOnly size="sm" variant="light" onPress={() => handleDelete(item.id, item.name)}>
                  <FiTrash2 className="h-4 w-4" />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    [handleDelete]
  );

  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[600px]", "overflow-auto"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "first:group-data-[first=true]/tr:before:rounded-none",
        "last:group-data-[first=true]/tr:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "first:group-data-[last=true]/tr:before:rounded-none",
        "last:group-data-[last=true]/tr:before:rounded-none",
      ],
    }),
    []
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Cari nama atau NUPTK..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => onSearchChange("")}
            onValueChange={onSearchChange}
          />
          <div className="flex flex-wrap gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                  {prodiLabel}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Filter Program Studi"
                disallowEmptySelection
                selectedKeys={prodiFilter}
                selectionMode="single"
                onSelectionChange={onProdiSelectionChange}
              >
                {prodiDropdownItems}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                  Kolom
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Kolom tabel"
                closeOnSelect={false}
                disallowEmptySelection
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columnDropdownItems}
              </DropdownMenu>
            </Dropdown>
            <Button as={Link} className="bg-primary  text-white" endContent={<PlusIcon className="text-small" />} href="/dashboard/tambah" size="sm">
              Tambah Dosen
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-default-400 text-small">Total {filteredDosen.length} data dosen</span>
          <label className="flex items-center gap-2 text-default-400 text-small">
            Baris per halaman:
            <select
              className="bg-transparent text-default-400 outline-solid outline-transparent text-small"
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    prodiLabel,
    prodiFilter,
    visibleColumns,
    filteredDosen.length,
    rowsPerPage,
    onSearchChange,
    onRowsPerPageChange,
    onProdiSelectionChange,
    prodiDropdownItems,
    columnDropdownItems,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center px-2 py-2">
        <Pagination
          showControls
          classNames={{ cursor: "bg-foreground text-background" }}
          color="default"
          isDisabled={pages <= 1 || tableItems.length === 0}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [tableItems.length, page, pages]);

  return (
    <>
      <DashboardClient />

      {error && <p className="mb-4 text-center text-red-500">Error: {error}</p>}

      <div className="w-full p-5 bg-white rounded-lg text-black">
        <div className="w-full mb-5 text-black rounded-lg text-center">
          <h1 className="text-2xl font-bold">Daftar Dosen STTI Tanjungpinang</h1>
        </div>
        <Table
          aria-label="Tabel data dosen"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={classNames}
          isCompact
          removeWrapper
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} allowsSorting={Boolean(column.sortable)}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={
              isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner size="sm" />
                  <span className="text-small text-default-500">Memuat data dosen...</span>
                </div>
              ) : (
                "Data dosen tidak ditemukan"
              )
            }
            items={tableItems}
          >
            {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
