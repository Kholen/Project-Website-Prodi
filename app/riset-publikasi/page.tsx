"use client";

import { useEffect, useMemo, useState } from "react";
import { Pagination, Spinner, Link} from "@heroui/react";
interface RisetRecord {
  id: number;
  nama_ketua: string | null;
  judul: string;
  journal_name: string | null;
  url_riset: string | null;
  published_at: string | null;
  tahun: number | null;
}

const ITEMS_PER_PAGE = 10;

const formatPublishedAt = (value: string | null, fallbackYear: number | null): string => {
  if (value) {
    const date = new Date(`${value}T00:00:00`);

    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    }
  }

  if (fallbackYear) {
    return fallbackYear.toString();
  }

  return "Tidak tersedia";
};

export default function RisetPublikasiPage() {
  const [records, setRecords] = useState<RisetRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchRiset() {
      try {
        const response = await fetch("/api/riset", { cache: "no-store" });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => null);
          throw new Error(errorBody?.detail ?? errorBody?.details ?? "Gagal memuat data riset");
        }

        const data: RisetRecord[] = await response.json();
        setRecords(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Terjadi kesalahan tak terduga.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchRiset();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [records.length]);

  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      const dateA = a.published_at ? new Date(`${a.published_at}T00:00:00`).getTime() : 0;
      const dateB = b.published_at ? new Date(`${b.published_at}T00:00:00`).getTime() : 0;

      if (dateA !== dateB) {
        return dateB - dateA;
      }

      const yearA = a.tahun ?? 0;
      const yearB = b.tahun ?? 0;

      if (yearA !== yearB) {
        return yearB - yearA;
      }

      return a.judul.localeCompare(b.judul);
    });
  }, [records]);

  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecords = sortedRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  if (loading)   return (
        <div className="flex justify-center py-10">
          <Spinner variant="dots" label="Memuat data Riset dan Publikasi..." classNames={{ label: "mt-4 text-[#0a0950]", dots: "!bg-[#0a0950]" }} />
        </div>
      );
  

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!sortedRecords.length) {
    return <p className="text-center">Belum ada data riset yang tersedia.</p>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-md bg-white">
      <table className="w-full text-sm text-left text-gray-600 border border-gray-200 border-collapse">
        <thead className="text-xs text-white uppercase mainColor">
          <tr className="text-center">
            <th scope="col" className="px-4 py-3 border border-gray-200">
              No
            </th>
            <th scope="col" className="px-4 py-3 text-left border border-gray-200">
              Judul Artikel
            </th>
            <th scope="col" className="px-4 py-3 border border-gray-200">
              Tanggal Publish
            </th>
            <th scope="col" className="px-4 py-3 border border-gray-200">
              Nama Jurnal
            </th>
            <th scope="col" className="px-4 py-3 border border-gray-200">
              Nama Ketua Peneliti
            </th>
            <th scope="col" className="px-4 py-3 text-center border border-gray-200">
              URL Publikasi
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedRecords.map((item, index) => (
            <tr key={`${item.id}-${index}`} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-3 font-medium align-top border border-gray-200">{startIndex + index + 1}</td>
              <td className="px-4 py-3 font-medium text-gray-900 align-top border border-gray-200" scope="row">
                {item.judul}
              </td>
              <td className="px-4 py-3 align-top border border-gray-200">{formatPublishedAt(item.published_at, item.tahun)}</td>
              <td className="px-4 py-3 align-top border border-gray-200">{item.journal_name ?? "Tidak tersedia"}</td>
              <td className="px-4 py-3 align-top border border-gray-200">{item.nama_ketua ?? "Tidak tersedia"}</td>
              <td className="px-4 py-3 text-center align-center border border-gray-200">
                {item.url_riset ? (
                  <Link className="text-primary" href={item.url_riset} rel="noopener noreferrer" target="_blank">
                    Lihat
                  </Link>
                ) : (
                  <span className="text-gray-400">Tidak tersedia</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center px-4 py-4 border border-t-0 border-gray-200">
          <Pagination
            showControls
            page={currentPage}
            total={totalPages}
            onChange={setPage}
            classNames={{
              cursor: "!bg-[#0a0950]",
            }}
          />
        </div>
      )}
    </div>
  );
}







