"use client";

import React, { useState, FormEvent, ChangeEvent, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardClient from "@/app/dashboard/DashboardClient";
import { Input, Button, Spinner } from "@heroui/react";
import RichTextEditor from "@/components/RichTextEditor";
import { isRichTextEmpty, normalizeRichText } from "@/lib/richText";
import { FiUpload } from "react-icons/fi";

type BeritaFormData = {
  judul: string;
  kepala_berita: string;
  tubuh_berita: string;
  ekor_berita: string;
  gambar_berita: File | null;
};

const backendBaseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000").replace(/\/$/, "");

export default function EditBeritaPage() {
  const router = useRouter();
  const params = useParams();
  const slugParam = useMemo(() => {
    const raw = params?.id;
    if (Array.isArray(raw)) {
      return raw[0] ?? "";
    }
    return typeof raw === "string" ? raw : "";
  }, [params]);

  const [formData, setFormData] = useState<BeritaFormData>({
    judul: "",
    kepala_berita: "",
    tubuh_berita: "",
    ekor_berita: "",
    gambar_berita: null,
  });

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [gambarPreview, setGambarPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("Tidak ada file baru dipilih");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slugParam) {
      setIsLoadingData(false);
      setError("Slug berita tidak ditemukan di URL.");
      return;
    }

    let isMounted = true;

    const fetchBerita = async () => {
      try {
        setIsLoadingData(true);
        const response = await fetch(`/api/berita/${slugParam}`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Gagal mengambil data berita.");
        }

        const data = await response.json();
        if (!isMounted) return;

        setFormData({
          judul: data.judul ?? "",
          kepala_berita: data.kepala_berita ?? "",
          tubuh_berita: data.tubuh_berita ?? "",
          ekor_berita: data.ekor_berita ?? "",
          gambar_berita: null,
        });

        const previewUrl =
          data.gambar_url ??
          (data.gambar_berita
            ? `${backendBaseUrl}/storage/${data.gambar_berita}`
            : null);

        setGambarPreview(previewUrl);
        setFileName(data.gambar_berita ?? "Tidak ada file baru dipilih");
      } catch (err: any) {
        if (!isMounted) return;
        const message = err?.message ?? "Terjadi kesalahan saat mengambil data.";
        setError(message);
        alert(`Error: ${message}`);
      } finally {
        if (isMounted) {
          setIsLoadingData(false);
        }
      }
    };

    fetchBerita();

    return () => {
      isMounted = false;
      setFormData({
        judul: "",
        kepala_berita: "",
        tubuh_berita: "",
        ekor_berita: "",
        gambar_berita: null,
      });
    };
  }, [slugParam]);

  useEffect(() => {
    return () => {
      if (gambarPreview && gambarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(gambarPreview);
      }
    };
  }, [gambarPreview]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRichTextChange = (field: keyof Pick<BeritaFormData, "kepala_berita" | "tubuh_berita" | "ekor_berita">) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (gambarPreview && gambarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(gambarPreview);
      }
      setFormData((prev) => ({ ...prev, gambar_berita: file }));
      setFileName(file.name);
      setGambarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!slugParam) {
      alert("Slug berita tidak ditemukan.");
      return;
    }

    if (!confirm("Simpan perubahan data berita?")) return;

    if (isRichTextEmpty(formData.tubuh_berita)) {
      alert("Isi tubuh berita tidak boleh kosong!");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append("judul", formData.judul);
    data.append("kepala_berita", normalizeRichText(formData.kepala_berita));
    data.append("tubuh_berita", normalizeRichText(formData.tubuh_berita));
    data.append("ekor_berita", normalizeRichText(formData.ekor_berita));
    data.append("_method", "PUT");

    if (formData.gambar_berita) {
      data.append("gambar_berita", formData.gambar_berita);
    }

    try {
      const response = await fetch(`/api/berita/${slugParam}`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type") ?? "";
        if (response.status === 422 && contentType.includes("application/json")) {
          const errorData = await response.json();
          const validationErrors = Object.values(errorData.errors || errorData)
            .flat()
            .join("\n");
          throw new Error(`Gagal validasi:\n${validationErrors}`);
        }

        const fallbackMessage = contentType.includes("application/json")
          ? (await response.json())?.message
          : await response.text();
        throw new Error(fallbackMessage || "Gagal menyimpan perubahan.");
      }

      alert("Data berita berhasil diperbarui!");
      router.push("/dashboard/berita-mahasiswa");
      router.refresh();
    } catch (err: any) {
      const message = err?.message ?? "Terjadi kesalahan saat menyimpan data.";
      setError(message);
      alert(`Error: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <DashboardClient />
      <div className="w-full p-4 bg-white rounded-lg text-black mb-10 text-center">
        <h1 className="text-2xl font-bold">Edit Data Berita</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded-lg text-black space-y-4">
        <div>
          <label className="font-bold">Judul Berita:</label>
          <Input
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            variant="bordered"
            isRequired
          />
        </div>
        <div>
          <label className="font-bold" htmlFor="kepala_berita">Kepala Berita:</label>
          <RichTextEditor
            id="kepala_berita"
            value={formData.kepala_berita}
            onChange={handleRichTextChange("kepala_berita")}
            placeholder="Tulis paragraf pembuka berita..."
            className="mt-2"
          />
        </div>
        <div>
          <label className="font-bold" htmlFor="tubuh_berita">Tubuh Berita:</label>
          <RichTextEditor
            id="tubuh_berita"
            value={formData.tubuh_berita}
            onChange={handleRichTextChange("tubuh_berita")}
            placeholder="Tulis isi utama berita..."
            className="mt-2"
          />
        </div>
        <div>
          <label className="font-bold" htmlFor="ekor_berita">Ekor Berita:</label>
          <RichTextEditor
            id="ekor_berita"
            value={formData.ekor_berita}
            onChange={handleRichTextChange("ekor_berita")}
            placeholder="Tulis penutup berita (opsional)..."
            className="mt-2"
          />
        </div>

        <div>
          <label className="font-bold">Gambar Berita:</label>
          {gambarPreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview Gambar:</p>
              <img
                src={gambarPreview}
                alt="Preview Gambar Berita"
                className="w-full max-w-sm h-auto rounded-lg object-cover"
              />
            </div>
          )}

          <div className="mt-4">
            <input
              type="file"
              id="gambar_berita_input"
              name="gambar_berita"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="gambar_berita_input"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors w-max"
            >
              <FiUpload />
              <span>Ganti Gambar...</span>
            </label>
            <p className="text-sm text-gray-500 mt-2">{fileName}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button color="primary" type="submit" className="font-bold" disabled={isSubmitting}>
            {isSubmitting ? <Spinner size="sm" color="white" /> : "Update Data"}
          </Button>
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </form>
    </>
  );
}
