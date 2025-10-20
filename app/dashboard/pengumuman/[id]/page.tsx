"use client";

import React, { useState, FormEvent, ChangeEvent, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardClient from "@/app/dashboard/DashboardClient";
import { Input, Button, Spinner } from "@heroui/react";
import RichTextEditor from "@/components/RichTextEditor";
import { isRichTextEmpty, normalizeRichText } from "@/lib/richText";
import { FiUpload } from "react-icons/fi";

type PengumumanForm = {
  judul: string;
  kepala_pengumuman: string;
  isi_pengumuman: string;
  ekor_pengumuman: string;
  gambar: File | null;
};

const backendBaseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000").replace(/\/$/, "");

export default function EditPengumumanPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = useMemo(() => {
    const raw = params?.id;
    if (Array.isArray(raw)) {
      return raw[0] ?? "";
    }
    return typeof raw === "string" ? raw : "";
  }, [params]);

  const [formData, setFormData] = useState<PengumumanForm>({
    judul: "",
    kepala_pengumuman: "",
    isi_pengumuman: "",
    ekor_pengumuman: "",
    gambar: null,
  });

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [gambarPreview, setGambarPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("Tidak ada file baru dipilih");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idParam) {
      setIsLoadingData(false);
      setError("ID pengumuman tidak ditemukan di URL.");
      return;
    }

    let isMounted = true;

    const fetchPengumuman = async () => {
      try {
        setIsLoadingData(true);
        const response = await fetch(`/api/pengumuman/${idParam}`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Gagal mengambil data pengumuman.");
        }

        const data = await response.json();
        if (!isMounted) return;

        setFormData({
          judul: data.judul ?? "",
          kepala_pengumuman: data.kepala_pengumuman ?? "",
          isi_pengumuman: data.isi_pengumuman ?? "",
          ekor_pengumuman: data.ekor_pengumuman ?? "",
          gambar: null,
        });

        const previewUrl = data.gambar ? `${backendBaseUrl}/storage/${data.gambar}` : null;
        setGambarPreview(previewUrl);
        setFileName(data.gambar ?? "Tidak ada file baru dipilih");
      } catch (err: unknown) {
        if (!isMounted) return;
        const message = err instanceof Error ? err.message : "Terjadi kesalahan saat mengambil data.";
        setError(message);
        alert(`Error: ${message}`);
      } finally {
        if (isMounted) {
          setIsLoadingData(false);
        }
      }
    };

    fetchPengumuman();

    return () => {
      isMounted = false;
      setFormData({
        judul: "",
        kepala_pengumuman: "",
        isi_pengumuman: "",
        ekor_pengumuman: "",
        gambar: null,
      });
    };
  }, [idParam]);

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

  const handleRichTextChange = (field: keyof Pick<PengumumanForm, "kepala_pengumuman" | "isi_pengumuman" | "ekor_pengumuman">) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (gambarPreview && gambarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(gambarPreview);
      }
      setFormData((prev) => ({ ...prev, gambar: file }));
      setFileName(file.name);
      setGambarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!idParam) {
      alert("ID pengumuman tidak ditemukan.");
      return;
    }

    if (!confirm("Simpan perubahan pengumuman?")) return;

    if (isRichTextEmpty(formData.isi_pengumuman)) {
      alert("Isi pengumuman tidak boleh kosong!");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append("judul", formData.judul);
    data.append("kepala_pengumuman", normalizeRichText(formData.kepala_pengumuman));
    data.append("isi_pengumuman", normalizeRichText(formData.isi_pengumuman));
    data.append("ekor_pengumuman", normalizeRichText(formData.ekor_pengumuman));
    data.append("_method", "PUT");

    if (formData.gambar) {
      data.append("gambar", formData.gambar);
    }

    try {
      const response = await fetch(`/api/pengumuman/${idParam}`, {
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

        const fallbackMessage = contentType.includes("application/json") ? (await response.json())?.message : await response.text();
        throw new Error(fallbackMessage || "Gagal menyimpan perubahan.");
      }

      alert("Pengumuman berhasil diperbarui!");
      router.push("/dashboard/pengumuman");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan data.";
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

  if (error) {
    return (
      <section className="w-full p-6 bg-white rounded-lg text-black">
        <p className="text-red-500">{error}</p>
        <Button className="mt-4" onPress={() => router.push("/dashboard/pengumuman")}>Kembali</Button>
      </section>
    );
  }

  return (
    <>
      <DashboardClient />
      <div className="w-full p-4 bg-white rounded-lg text-black mb-10 text-center">
        <h1 className="text-2xl font-bold">Edit Pengumuman</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded-lg text-black space-y-4">
        <div>
          <label className="font-bold">Judul Pengumuman:</label>
          <Input name="judul" value={formData.judul} onChange={handleChange} variant="bordered" isRequired />
        </div>

        <div>
          <label className="font-bold" htmlFor="kepala_pengumuman">
            Kepala Pengumuman:
          </label>
          <RichTextEditor
            id="kepala_pengumuman"
            value={formData.kepala_pengumuman}
            onChange={handleRichTextChange("kepala_pengumuman")}
            placeholder="Tulis paragraf pembuka..."
            className="mt-2"
          />
        </div>

        <div>
          <label className="font-bold" htmlFor="isi_pengumuman">
            Isi Pengumuman:
          </label>
          <RichTextEditor
            id="isi_pengumuman"
            value={formData.isi_pengumuman}
            onChange={handleRichTextChange("isi_pengumuman")}
            placeholder="Tulis isi utama pengumuman..."
            className="mt-2"
          />
        </div>

        <div>
          <label className="font-bold" htmlFor="ekor_pengumuman">
            Ekor Pengumuman:
          </label>
          <RichTextEditor
            id="ekor_pengumuman"
            value={formData.ekor_pengumuman}
            onChange={handleRichTextChange("ekor_pengumuman")}
            placeholder="Tulis penutup atau informasi tambahan..."
            className="mt-2"
          />
        </div>

        <div>
          <label className="font-bold">Gambar Pengumuman:</label>
          {gambarPreview && (
            <div className="mt-2">
              <img src={gambarPreview} alt="Preview" className="w-full max-w-md rounded-lg" />
            </div>
          )}
          <div className="mt-2">
            <input type="file" id="gambar_input" name="gambar" onChange={handleFileChange} className="hidden" />
            <label
              htmlFor="gambar_input"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors w-max"
            >
              <FiUpload />
              <span>Pilih Gambar...</span>
            </label>
            <p className="text-sm text-gray-500 mt-2">{fileName}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button color="primary" type="submit" className="font-bold" disabled={isSubmitting}>
            {isSubmitting ? <Spinner size="sm" color="white" /> : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </>
  );
}
