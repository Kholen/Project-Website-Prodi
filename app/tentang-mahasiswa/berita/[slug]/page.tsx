"use client";
import { Button } from "@heroui/button";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "@heroui/react";
import { useRouter, useParams } from "next/navigation";

interface ApiBeritaDetail {
  id: number;
  judul: string;
  slug: string;
  gambar_berita: string;
  kepala_berita: string;
  tubuh_berita: string;
  ekor_berita: string;
  created_at: string;
  author?: string | null;
}

export default function TentangMhsDetail() {
  const router = useRouter();
  const params = useParams<{ slug: string | string[] }>();
  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : (slugParam ?? "");

  const [data, setData] = useState<ApiBeritaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      return;
    }

    let active = true;

    async function fetchDetail() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:8000/api/berita/${slug}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          const message = response.status === 404 ? "Berita tidak ditemukan" : "gagal mengambil data dari server";
          throw new Error(message);
        }

        const detail: ApiBeritaDetail = await response.json();

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
  }, [slug]);

  const tanggalTerbit = useMemo(() => {
    if (!data?.created_at) return "";
    return new Date(data.created_at).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [data?.created_at]);

  if (!slug) {
    return <section className="container px-4 py-10 text-center text-sm text-red-500">Slug tidak valid.</section>;
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner variant="dots" label="Memuat Informasi Tentang Mahasiswa..." classNames={{ label: "mt-4 text-[#0a0950]", dots: "!bg-[#0a0950]" }} />
      </div>
    );
  }

  if (error) {
    return (
      <section className="container px-4 py-10 text-center">
        <p className="text-sm text-red-500">{error}</p>
        <Button className="mx-auto mt-4 bg-[#0a0950] text-white" onPress={() => router.push("/tentang-mahasiswa")}>
          <FiArrowLeft />
          Kembali
        </Button>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section className="container p-8">
      <Button className="mb-4 bg-[#0a0950] text-white" onPress={() => router.back()}>
        <FiArrowLeft />
        Kembali
      </Button>
      <article className="bg-white p-8 rounded-lg">
        <header className="">
          <h1 className="text-3xl font-bold">{data.judul}</h1>
          <p className="text-[#0a0950] font-semibold">{data.author ?? "Admin"}</p>
          <p className="text-tiny text-default-500 mb-1">{tanggalTerbit}</p>
          <figure className="overflow-hidden rounded-xl mb-4 mt-2">
            <img
              src={data.gambar_berita ? `http://localhost:8000/storage/${data.gambar_berita}` : "/default-image.jpg"}
              alt={data.judul}
              className="h-80 w-full object-cover"
            />
          </figure>

          {data.kepala_berita && <p className="indent-8 text-justify leading-relaxed">{data.kepala_berita}</p>}
          {data.tubuh_berita && <p className="indent-8 text-justify leading-relaxed">{data.tubuh_berita}</p>}
          {data.ekor_berita && <p className="indent-8 text-justify leading-relaxed">{data.ekor_berita}</p>}
        </header>
      </article>
    </section>
  );
}
