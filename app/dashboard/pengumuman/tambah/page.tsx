"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
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

export default function TambahPengumumanPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<PengumumanForm>({
    judul: "",
    kepala_pengumuman: "",
    isi_pengumuman: "",
    ekor_pengumuman: "",
    gambar: null,
  });

  const [fileName, setFileName] = useState("Tidak ada file dipilih");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRichTextChange = (field: keyof Pick<PengumumanForm, "kepala_pengumuman" | "isi_pengumuman" | "ekor_pengumuman">) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, gambar: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirm("Simpan data pengumuman baru?")) return;

    if (!formData.gambar) {
      alert("Gambar pengumuman wajib diisi!");
      return;
    }

    if (isRichTextEmpty(formData.isi_pengumuman)) {
      alert("Isi pengumuman tidak boleh kosong!");
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append("judul", formData.judul);
    data.append("kepala_pengumuman", normalizeRichText(formData.kepala_pengumuman));
    data.append("isi_pengumuman", normalizeRichText(formData.isi_pengumuman));
    data.append("ekor_pengumuman", normalizeRichText(formData.ekor_pengumuman));
    data.append("gambar", formData.gambar);

    try {
      const response = await fetch(`/api/pengumuman`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
          const validationErrors = Object.values(errorData.errors || errorData)
            .flat()
            .join("\n");
          throw new Error(`Gagal validasi:\n${validationErrors}`);
        }
        throw new Error(errorData.message || "Gagal menyimpan data.");
      }

      alert("Data pengumuman berhasil ditambahkan!");
      router.push("/dashboard/pengumuman");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan data.";
      alert(`Error: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DashboardClient />
      <div className="w-full p-4 bg-white rounded-lg text-black mb-10 text-center">
        <h1 className="text-2xl font-bold">Tambah Pengumuman Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded-lg text-black space-y-4">
        <div>
          <label className="font-bold">Judul Pengumuman:</label>
          <Input
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            variant="bordered"
            isRequired
            placeholder="Tulis judul pengumuman..."
          />
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
            {isSubmitting ? <Spinner size="sm" color="white" /> : "Simpan Data"}
          </Button>
        </div>
      </form>
    </>
  );
}
