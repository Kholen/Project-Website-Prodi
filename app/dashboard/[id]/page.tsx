"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardClient from "@/app/dashboard/DashboardClient"; // Sesuaikan path jika perlu
import { 
    Input, 
    Button, 
    Image, 
    Dropdown, 
    DropdownItem, 
    DropdownMenu, 
    DropdownTrigger, 
    Selection 
} from "@heroui/react";
import { FaImage } from "react-icons/fa6";

interface ImageUrl {
  id: string;
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
  kontak: string;
  image_url: ImageUrl[];
  prodis: SimpleRelasi[];
  jabatans: SimpleRelasi[];
  skills: SimpleRelasi[];
}

// --- Komponen Halaman ---
export default function UpdateDosenPage() {
  const router = useRouter();
  const params = useParams();

  // State untuk data form utama
  const [formData, setFormData] = useState({ nama: '', NUPTK: '', kontak: '', image_url:'' });
  
  // State untuk mengelola daftar relasi yang sudah ditambahkan
  const [selectedJabatans, setSelectedJabatans] = useState<SimpleRelasi[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SimpleRelasi[]>([]);
  
  // State untuk menampung semua pilihan dari database
  const [allJabatans, setAllJabatans] = useState<SimpleRelasi[]>([]);
  const [allSkills, setAllSkills] = useState<SimpleRelasi[]>([]);

  // State untuk input dropdown saat ini
  const [currentJabatanId, setCurrentJabatanId] = useState<string>('');
  const [currentSkillId, setCurrentSkillId] = useState<string>('');
  
  // State untuk loading dan error
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch Data ---
  useEffect(() => {
    const id = params.id as string;
    if (!id) return;

    async function fetchAllData() {
      try {
        const [dosenRes, jabatansRes, skillsRes] = await Promise.all([
          fetch(`http://localhost:8000/api/dosen/${id}`),
          fetch(`http://localhost:8000/api/jabatans`),
          fetch(`http://localhost:8000/api/skills`),
        ]);

        if (!dosenRes.ok || !jabatansRes.ok || !skillsRes.ok) {
          throw new Error(`Gagal mengambil data`);
        }

        const dosenData: Dosen = await dosenRes.json();
        const jabatansData: SimpleRelasi[] = await jabatansRes.json();
        const skillsData: SimpleRelasi[] = await skillsRes.json();
        
        setFormData({ nama: dosenData.nama, NUPTK: dosenData.NUPTK, kontak: dosenData.kontak,  image_url: dosenData.image_url?.[0]?.url ?? '' });
        
        // ▼▼▼ PERBAIKAN: Pastikan state selalu array dengan fallback '|| []' ▼▼▼
        setSelectedJabatans(dosenData.jabatans || []);
        setSelectedSkills(dosenData.skills || []);
        
        setAllJabatans(jabatansData);
        setAllSkills(skillsData);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllData();
  }, [params.id]);

  // --- Event Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddJabatan = () => {
    if (!currentJabatanId) return;
    const jabatanToAdd = allJabatans.find(j => j.id === parseInt(currentJabatanId));
    if (jabatanToAdd && !selectedJabatans.some(j => j.id === jabatanToAdd.id)) {
      setSelectedJabatans(prev => [...prev, jabatanToAdd]);
    }
    setCurrentJabatanId('');
  };

  const handleRemoveJabatan = (idToRemove: number) => {
    setSelectedJabatans(prev => prev.filter(j => j.id !== idToRemove));
  };
  
  const handleAddSkill = () => {
    if (!currentSkillId) return;
    const skillToAdd = allSkills.find(s => s.id === parseInt(currentSkillId));
    if (skillToAdd && !selectedSkills.some(s => s.id === skillToAdd.id)) {
      setSelectedSkills(prev => [...prev, skillToAdd]);
    }
    setCurrentSkillId('');
  };

  const handleRemoveSkill = (idToRemove: number) => {
    setSelectedSkills(prev => prev.filter(s => s.id !== idToRemove));
  };
  
  // --- Submit Logic ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirm("Simpan perubahan?")) return;

    const payload = {
      ...formData,
      jabatan_ids: selectedJabatans.map(j => j.id),
      skill_ids: selectedSkills.map(s => s.id),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/dosen/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal memperbarui data.");
      }
      
      alert("Data berhasil diperbarui!");
      router.push('/dashboard');

    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Variabel untuk menampilkan nama di tombol dropdown
  const selectedJabatanName = allJabatans.find(j => j.id === parseInt(currentJabatanId))?.nama_jabatan || "Pilih Jabatan";
  const selectedSkillName = allSkills.find(s => s.id === parseInt(currentSkillId))?.nama_skill || "Pilih Skill";

  // --- Tampilan JSX ---
  return (
    <>
      <DashboardClient />
      <div className="w-full p-4 bg-[#0a0950] text-white rounded-lg mb-10 text-center">
        <h1 className="text-2xl">Update Data Dosen: {formData.nama}</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full p-5 bg-[#0a0950] rounded-lg text-white">
        <div className="w-full p-6 rounded-lg bg-white text-black space-y-4">

        <div className="mx-auto w-fit">
          {/* Gunakan ternary operator (if-else) */}
          {formData.image_url ? (
            // JIKA ADA URL, tampilkan gambar
            <Image
              alt={`Foto ${formData.nama}`}
              src={formData.image_url}
              width={300}
              className="rounded-lg object-cover"
            />
          ) : (
            // JIKA TIDAK ADA URL, tampilkan wadah kosong ini
            <div 
              className="w-[300px] h-[300px] bg-gray-200 rounded-lg flex items-center justify-center"
              aria-label="Placeholder gambar"
            >
              <FaImage className="w-35 h-35 text-gray-400" /> 
            </div>
          )}
        </div>
          
          <div>
            <label className="font-bold">Nama:</label>
            <Input name="nama" value={formData.nama} onChange={handleChange} variant="bordered" />
          </div>
          <div>
            <label className="font-bold">NUPTK:</label>
            <Input name="NUPTK" value={formData.NUPTK} onChange={handleChange} variant="bordered" />
          </div>
          <div>
            <label className="font-bold">Kontak:</label>
            <Input name="kontak" value={formData.kontak} onChange={handleChange} variant="bordered" />
          </div>
          <div>
            <label className="font-bold">Url Image Dosen:</label>
            <Input name="image_url" value={formData.image_url} onChange={handleChange} variant="bordered" />
          </div>

          <hr className="my-6"/>

          {/* Bagian Jabatan */}
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
              {/* ▼▼▼ PERBAIKAN: Render kondisional untuk mencegah error map ▼▼▼ */}
              {Array.isArray(selectedJabatans) && selectedJabatans.map(jabatan => (
                <div key={jabatan.id} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center gap-2">
                  {jabatan.nama_jabatan}
                  <button type="button" onClick={() => handleRemoveJabatan(jabatan.id)} className="text-blue-800 font-bold">x</button>
                </div>
              ))}
            </div>
          </div>

          {/* Bagian Skill */}
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
              {/* ▼▼▼ PERBAIKAN: Render kondisional untuk mencegah error map ▼▼▼ */}
              {Array.isArray(selectedSkills) && selectedSkills.map(skill => (
                <div key={skill.id} className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center gap-2">
                  {skill.nama_skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill.id)} className="text-green-800 font-bold">x</button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button color="success" type="submit" className="font-bold text-white">
              Simpan Perubahan
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}