"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardClient from "@/app/dashboard/DashboardClient";
import { Input, Button, Image, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection, Spinner } from "@heroui/react";
import { FiUpload } from "react-icons/fi";

// Tipe Data
interface ImageUrl {
  id: number;
  url: string;
}
interface SimpleRelasi {
  id: number;
  [key: string]: any;
}
interface Dosen {
  id: number;
  nama: string;
  NUPTK: string;
  email: string;
  images: ImageUrl[];
  prodis: SimpleRelasi[];
  jabatans: SimpleRelasi[];
  skills: SimpleRelasi[];
}

const BACKEND_URL = "http://localhost:8000";

// --- Komponen Halaman Update Dosen ---
export default function UpdateDosenPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // State
  const [formData, setFormData] = useState({ nama: "", NUPTK: "", email: "" });
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [fileName, setFileName] = useState("Pilih gambar baru (opsional)...");
  
  const [selectedJabatans, setSelectedJabatans] = useState<SimpleRelasi[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SimpleRelasi[]>([]);
  const [selectedProdiIds, setSelectedProdiIds] = useState<number[]>([]);

  const [allJabatans, setAllJabatans] = useState<SimpleRelasi[]>([]);
  const [allSkills, setAllSkills] = useState<SimpleRelasi[]>([]);
  const [allProdis, setAllProdis] = useState<SimpleRelasi[]>([]);
  const [currentJabatanId, setCurrentJabatanId] = useState<string>("");
  const [currentSkillId, setCurrentSkillId] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Data Awal
  useEffect(() => {
    if (!id) return;
    async function fetchAllData() {
      try {
        const [dosenRes, jabatansRes, skillsRes, prodisRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/dosen/${id}`),
          fetch(`${BACKEND_URL}/api/jabatans`),
          fetch(`${BACKEND_URL}/api/skills`),
          fetch(`${BACKEND_URL}/api/prodi`),
        ]);

        if (!dosenRes.ok || !jabatansRes.ok || !skillsRes.ok || !prodisRes.ok) {
          throw new Error(`Gagal mengambil data`);
        }

        const dosenData: Dosen = await dosenRes.json();
        setFormData({ nama: dosenData.nama, NUPTK: dosenData.NUPTK, email: dosenData.email });
        
        setSelectedJabatans(dosenData.jabatans || []);
        setSelectedSkills(dosenData.skills || []);
        setSelectedProdiIds(dosenData.prodis?.map(p => p.id) || []);
        
        const initialImageUrl = dosenData.images?.[0]?.url;
        if (initialImageUrl) {
          setImagePreview(initialImageUrl.startsWith('http') ? initialImageUrl : `${BACKEND_URL}${initialImageUrl}`);
        }
        
        setAllJabatans(await jabatansRes.json());
        setAllSkills(await skillsRes.json());
        setAllProdis(await prodisRes.json());

      } catch (err: any) { setError(err.message); } 
      finally { setIsLoading(false); }
    }
    fetchAllData();
  }, [id]);

  // Handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file);
      setFileName(file.name);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleAddJabatan = () => {
    if (!currentJabatanId) return;
    const jabatanToAdd = allJabatans.find((j) => j.id === parseInt(currentJabatanId));
    if (jabatanToAdd && !selectedJabatans.some((j) => j.id === jabatanToAdd.id)) {
      setSelectedJabatans((prev) => [...prev, jabatanToAdd]);
    }
    setCurrentJabatanId("");
  };
  const handleRemoveJabatan = (idToRemove: number) => {
    setSelectedJabatans((prev) => prev.filter((j) => j.id !== idToRemove));
  };
  const handleAddSkill = () => {
    if (!currentSkillId) return;
    const skillToAdd = allSkills.find((s) => s.id === parseInt(currentSkillId));
    if (skillToAdd && !selectedSkills.some((s) => s.id === skillToAdd.id)) {
      setSelectedSkills((prev) => [...prev, skillToAdd]);
    }
    setCurrentSkillId("");
  };
  const handleRemoveSkill = (idToRemove: number) => {
    setSelectedSkills((prev) => prev.filter((s) => s.id !== idToRemove));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirm("Simpan perubahan data dosen?")) return;
    setIsSubmitting(true);

    const data = new FormData();
    data.append("nama", formData.nama);
    data.append("NUPTK", formData.NUPTK);
    data.append("email", formData.email);
    data.append("_method", "PUT");

    if (newImageFile) {
      data.append("image", newImageFile);
    }
    
    selectedProdiIds.forEach(id => data.append('prodi_ids[]', String(id)));
    selectedJabatans.forEach(j => data.append('jabatan_ids[]', String(j.id)));
    selectedSkills.forEach(s => data.append('skill_ids[]', String(s.id)));

    try {
      const response = await fetch(`${BACKEND_URL}/api/dosen/${id}`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal memperbarui data.");
      }

      alert("Data berhasil diperbarui!");
      router.push("/dashboard");
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Spinner label="Memuat data..." /></div>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const selectedJabatanName = allJabatans.find((j) => j.id === parseInt(currentJabatanId))?.nama_jabatan || "Pilih Jabatan";
  const selectedSkillName = allSkills.find((s) => s.id === parseInt(currentSkillId))?.nama_skill || "Pilih Skill";
  const selectedProdiName = allProdis.find((p) => p.id === selectedProdiIds[0])?.nama_prodi || "Pilih Program Studi";

  return (
    <>
      <DashboardClient />
      <div className="w-full p-4 bg-white rounded-lg text-black mb-10 text-center">
        <h1 className="text-2xl font-bold">Update Data Dosen: {formData.nama}</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full p-5 bg-white rounded-lg text-black space-y-4">
        {/* Input Data Utama */}
        <div>
          <label className="font-bold">Nama Lengkap:</label>
          <Input name="nama" value={formData.nama} onChange={handleChange} variant="bordered" placeholder="Contoh: Budi Santoso, S.Kom., M.Kom" isRequired/>
        </div>
        <div>
          <label className="font-bold">NUPTK:</label>
          <Input name="NUPTK" value={formData.NUPTK} onChange={handleChange} variant="bordered" placeholder="Masukkan 16 digit NUPTK" isRequired/>
        </div>
        <div>
          <label className="font-bold">Email:</label>
          <Input name="email" type="email" value={formData.email} onChange={handleChange} variant="bordered" placeholder="contoh@sttindonesia.ac.id" isRequired/>
        </div>

        {/* Dropdown Prodi */}
        <div>
          <label className="font-bold">Program Studi</label>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize w-full justify-start">
                {selectedProdiName}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Pilih Program Studi"
              selectionMode="single"
              selectedKeys={new Set(selectedProdiIds.map(String))}
              onSelectionChange={(keys: Selection) => {
                const selectedId = Number(Array.from(keys)[0]);
                setSelectedProdiIds([selectedId]);
              }}
            >
              {allProdis.map((prodi) => (
                <DropdownItem key={prodi.id}>{prodi.nama_prodi}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Relasi Jabatan */}
        <div>
          <label className="font-bold">Jabatan</label>
          <div className="flex items-center gap-2 mt-1">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize w-full justify-start">
                  {selectedJabatanName}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Pilih Jabatan"
                selectionMode="single"
                onSelectionChange={(keys: Selection) => setCurrentJabatanId(String(Array.from(keys)[0]))}
              >
                {allJabatans.map((jabatan) => (
                  <DropdownItem key={jabatan.id}>{jabatan.nama_jabatan}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button type="button" color="primary" onClick={handleAddJabatan}>Tambah</Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedJabatans.map((jabatan) => (
              <div key={jabatan.id} className="bg-blue-100 text-primary text-sm font-medium px-2.5 py-0.5 rounded flex items-center gap-2">
                {jabatan.nama_jabatan}
                <button type="button" onClick={() => handleRemoveJabatan(jabatan.id)} className="text-primary font-bold">x</button>
              </div>
            ))}
          </div>
        </div>

        {/* Relasi Skill */}
        <div>
          <label className="font-bold">Skill</label>
          <div className="flex items-center gap-2 mt-1">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize w-full justify-start">
                  {selectedSkillName}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Pilih Skill"
                selectionMode="single"
                onSelectionChange={(keys: Selection) => setCurrentSkillId(String(Array.from(keys)[0]))}
              >
                {allSkills.map((skill) => (
                  <DropdownItem key={skill.id}>{skill.nama_skill}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button type="button" color="primary" onClick={handleAddSkill}>Tambah</Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <div key={skill.id} className="bg-green-100 text-success text-sm font-medium px-2.5 py-0.5 rounded flex items-center gap-2">
                {skill.nama_skill}
                <button type="button" onClick={() => handleRemoveSkill(skill.id)} className="text-green-700 font-bold">x</button>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-4" />
        
        {/* Input File Gambar */}
        <div>
          <label className="font-bold">Ganti Foto Dosen:</label>
          <div className="mt-2">
            <input type="file" id="image_input" name="image" onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/jpg, image/gif"/>
            <label htmlFor="image_input" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 w-max">
              <FiUpload />
              <span>{fileName}</span>
            </label>
          </div>
        </div>

        {imagePreview && (
          <div className="mt-4">
            <p className="font-bold mb-2">Preview:</p>
            <Image src={imagePreview} alt="Preview Dosen" width={200} className="rounded-lg object-cover" />
          </div>
        )}
        
        <div className="mt-8 flex justify-end">
          <Button color="success" type="submit" className="font-bold text-white" disabled={isSubmitting}>
            {isSubmitting ? <Spinner size="sm" color="white" /> : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </>
  );
}

