"use client";

import { Button } from "@heroui/button";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "@heroui/react";
import { useRouter, useParams } from "next/navigation";

interface ApiPengumumanDetail {
  id: number;
  judul: string;
  gambar: string | null;
  kepala_pengumuman: string | null;
  isi_pengumuman: string;
  ekor_pengumuman: string | null;
  created_at: string;
  author?: string | null;
}

const backendBaseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000").replace(/\/$/, "");

export default function DetailPengumuman() {
  const router = useRouter();
  const params = useParams<{ id: string | string[] }>();
  const idParam = params?.id;
  const pengumumanId = useMemo(() => (Array.isArray(idParam) ? idParam[0] : idParam ?? ""), [idParam]);

  const [data, setData] = useState<ApiPengumumanDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pengumumanId) {
      return;
    }

    let active = true;

    async function fetchDetail() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/pengumuman/${pengumumanId}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          const message = response.status === 404 ? "Pengumuman tidak ditemukan" : "Gagal mengambil data dari server";
          throw new Error(message);
        }

        const detail: ApiPengumumanDetail = await response.json();

        if (!active) {
          return;
        }

        setData(detail);
      } catch (err) {
        if (!active) {
          return;
        }
        const message = err instanceof Error ? err.message : "Terjadi kesalahan tak terduga.";
        setError(message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchDetail();

    return () => {
      active = false;
    };
  }, [pengumumanId]);

  const tanggalTerbit = useMemo(() => {
    if (!data?.created_at) return "";
    return new Date(data.created_at).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [data?.created_at]);

  if (!pengumumanId) {
    return <section className="container px-4 py-10 text-center text-sm text-red-500">ID pengumuman tidak valid.</section>;
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner variant="dots" label="Memuat Pengumuman..." classNames={{ label: "mt-4 text-[#0a0950]", dots: "!bg-[#0a0950]" }} />
      </div>
    );
  }

  if (error) {
    return (
      <section className="container px-4 py-10 text-center">
        <p className="text-sm text-red-500">{error}</p>
        <Button className="mx-auto mt-4 bg-[#0a0950] text-white" onPress={() => router.push("/aktivitas-mahasiswa")}>
          <FiArrowLeft />
          Kembali
        </Button>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const imageUrl = data.gambar ? `${backendBaseUrl}/storage/${data.gambar}` : "/default-image.jpg";

  return (
    <section className="container p-8">
      <Button className="mb-8 bg-[#0a0950] text-white" onPress={() => router.back()}>
        <FiArrowLeft />
        Kembali
      </Button>
      <article className="bg-white p-8 rounded-lg">
        <header>
          <h1 className="text-3xl font-bold">{data.judul}</h1>
          <p className="text-[#0a0950] font-semibold">{data.author ?? "Admin"}</p>
          <p className="text-tiny text-default-500 mb-1">{tanggalTerbit}</p>
          <figure className="overflow-hidden rounded-xl mb-4 mt-2">
            <img src={imageUrl} alt={data.judul} className="h-80 w-full object-cover" />
          </figure>
        </header>

        {data.kepala_pengumuman && (
          <div
            className="rich-text-content indent-8 text-justify leading-relaxed mb-2"
            dangerouslySetInnerHTML={{ __html: data.kepala_pengumuman }}
          />
        )}
        {data.isi_pengumuman && (
          <div
            className="rich-text-content indent-8 text-justify leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: data.isi_pengumuman }}
          />
        )}
        {data.ekor_pengumuman && (
          <div
            className="rich-text-content indent-8 text-justify leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: data.ekor_pengumuman }}
          />
        )}
      </article>
    </section>
  );
}
