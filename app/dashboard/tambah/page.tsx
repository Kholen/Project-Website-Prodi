"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import DashboardClient from "@/app/dashboard/DashboardClient"; // Sesuaikan path jika perlu
import { 
    Input, 
    Button, 
    Dropdown, 
    DropdownItem, 
    DropdownMenu, 
    DropdownTrigger, 
    Selection 
} from "@heroui/react";

// Tipe Data (bisa ditaruh di file terpisah agar bisa di-import)
interface SimpleRelasi {
  id: number;
  [key: string]: any;
}

// --- Komponen Halaman ---
export default function TambahDosenPage() {
  const router = useRouter();

  // State untuk form dimulai dalam keadaan kosong
  const [formData, setFormData] = useState({
    nama: '',
    NUPTK: '',
    email: '',
    image_url: ''
  });
  
  // State untuk mengelola daftar relasi
  const [selectedJabatans, setSelectedJabatans] = useState<SimpleRelasi[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SimpleRelasi[]>([]);
  const [selectedProdiIds, setSelectedProdiIds] = useState<number[]>([]); // State untuk prodi
  
  // State untuk menampung semua pilihan dari database
  const [allJabatans, setAllJabatans] = useState<SimpleRelasi[]>([]);
  const [allSkills, setAllSkills] = useState<SimpleRelasi[]>([]);
  const [allProdis, setAllProdis] = useState<SimpleRelasi[]>([]); // State untuk semua prodi

  // State untuk input dropdown saat ini
  const [currentJabatanId, setCurrentJabatanId] = useState<string>('');
  const [currentSkillId, setCurrentSkillId] = useState<string>('');
  
  // State untuk loading dan error
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect untuk mengambil data master (jabatan, skill, prodi)
  useEffect(() => {
    async function fetchMasterData() {
      try {
        const [jabatansRes, skillsRes, prodisRes] = await Promise.all([
          fetch(`http://localhost:8000/api/jabatans`),
          fetch(`http://localhost:8000/api/skills`),
          fetch(`http://localhost:8000/api/prodi`) // Asumsi endpoint ini ada
        ]);

        if (!jabatansRes.ok || !skillsRes.ok || !prodisRes.ok) {
          throw new Error(`Gagal mengambil data master`);
        }

        const jabatansData = await jabatansRes.json();
        const skillsData = await skillsRes.json();
        const prodisData = await prodisRes.json();
        
        setAllJabatans(jabatansData);
        setAllSkills(skillsData);
        setAllProdis(prodisData);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMasterData();
  }, []);

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
    if (!confirm("Simpan data dosen baru?")) return;

    const payload = {
      ...formData,
      prodi_ids: selectedProdiIds,
      jabatan_ids: selectedJabatans.map(j => j.id),
      skill_ids: selectedSkills.map(s => s.id),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/dosen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Menampilkan error validasi dari Laravel
        if (response.status === 422) {
            const validationErrors = Object.values(errorData.errors).flat().join('\n');
            throw new Error(`Gagal validasi:\n${validationErrors}`);
        }
        throw new Error(errorData.message || "Gagal menyimpan data.");
      }
      
      alert("Dosen baru berhasil ditambahkan!");
      router.push('/dashboard'); // Sesuaikan dengan path halaman daftar Anda

    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (isLoading) return <p className="text-center">Memuat data...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Variabel untuk menampilkan nama di tombol dropdown
  const selectedJabatanName = allJabatans.find(j => j.id === parseInt(currentJabatanId))?.nama_jabatan || "Pilih Jabatan";
  const selectedSkillName = allSkills.find(s => s.id === parseInt(currentSkillId))?.nama_skill || "Pilih Skill";
  const selectedProdiName = allProdis.find(p => p.id === selectedProdiIds[0])?.nama_prodi || "Pilih Program Studi";

  // --- Tampilan JSX ---
  return (
    <>
      <DashboardClient />
      <div className="w-full p-4 bg-white rounded-lg text-black mb-10 text-center">
        <h1 className="text-2xl font-bold">Tambah Data Dosen Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full p-5 bg-white rounded-lg text-black">
        {/* Input Data Utama */}
        <div>
          <label className="font-bold">Nama Lengkap:</label>
          <Input name="nama" value={formData.nama} onChange={handleChange} variant="bordered" placeholder="Contoh: Budi Santoso, S.Kom., M.Kom" />
        </div>
        <div>
          <label className="font-bold">NUPTK:</label>
          <Input name="NUPTK" value={formData.NUPTK} onChange={handleChange} variant="bordered" placeholder="Masukkan 16 digit NUPTK" />
        </div>
        <div>
          <label className="font-bold">email:</label>
          <Input name="email" value={formData.email} onChange={handleChange} variant="bordered" placeholder="Contoh: 081234567890" />
        </div>
        <div>
          <label className="font-bold">Url Image Dosen:</label>
          <Input name="image_url" value={formData.image_url} onChange={handleChange} variant="bordered" placeholder="https://.../gambar.png" />
        </div>

        <hr className="my-4" />

        {/* Anda perlu menambahkan dropdown untuk Prodi di sini, contoh: */}
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
              selectedKeys={new Set(selectedProdiIds.map(String))} // Menandai item yang dipilih
              onSelectionChange={(keys: Selection) => {
                const selectedId = Number(Array.from(keys)[0]);
                setSelectedProdiIds([selectedId]); // Simpan sebagai array berisi satu ID
              }}
            >
              {allProdis.map((prodi) => (
                <DropdownItem key={prodi.id}>{prodi.nama_prodi}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

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
            <Button type="button" color="primary" onClick={handleAddJabatan}>
              Tambah
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedJabatans.map((jabatan) => (
              <div key={jabatan.id} className="bg-blue-100 text-primary text-sm font-medium px-2.5 py-0.5 rounded flex items-center gap-2">
                {jabatan.nama_jabatan}
                <button type="button" onClick={() => handleRemoveJabatan(jabatan.id)} className="text-primary font-bold">
                  x
                </button>
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
            <Button type="button" color="primary" onClick={handleAddSkill}>
              Tambah
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <div key={skill.id} className="bg-green-100 text-success text-sm font-medium px-2.5 py-0.5 rounded flex items-center gap-2">
                {skill.nama_skill}
                <button type="button" onClick={() => handleRemoveSkill(skill.id)} className="text-successYY font-bold">
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button color="success" type="submit" className="font-bold text-white">
            Simpan Data Dosen
          </Button>
        </div>
      </form>
    </>
  );
}