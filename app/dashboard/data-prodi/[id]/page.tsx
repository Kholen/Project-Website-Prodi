"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import { Input, Textarea, Button, Spinner } from "@heroui/react";
import { FaTrash, FaPlus } from "react-icons/fa"; 

interface ProdiData {
  nama_prodi: string;
  visi: string;
  misi: string;
  desc_prodi: string;
  desc_prospek_kerja:string;
  desc_program:string;
  keunggulan:string;
}

interface ProspekField {
  temp_id: number; 
  id: number | null; 
  nama_pekerjaan: string;
  deskripsi: string;
}

const BACKEND_URL = "http://localhost:8000";

export default function EditProdiPage() {
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState<Partial<ProdiData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [prospekFields, setProspekFields] = useState<ProspekField[]>([]);

  useEffect(() => {
    if (!id) return;
    async function fetchProdiData() {
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/prodi/${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data prodi");
        
        const data = await response.json();
        setFormData(data);
        
        if (data.prospek_kerja) {
          const formattedProspek = data.prospek_kerja.map((p: any, index: number) => ({
            temp_id: index,
            id: p.id,
            nama_pekerjaan: p.nama_pekerjaan,
            deskripsi: p.deskripsi,
          }));
          setProspekFields(formattedProspek);
        }
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProdiData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler prospek kerja
  const handleProspekChange = (temp_id: number, field: 'nama_pekerjaan' | 'deskripsi', value: string) => {
    setProspekFields(prevFields => 
      prevFields?.map(fieldObj => 
        fieldObj.temp_id === temp_id ? { ...fieldObj, [field]: value } : fieldObj
      )
    );
  };

  // Handler untuk nambah prospek kerja baru
  const addProspekField = () => {
    if (prospekFields.length < 7) {
      setProspekFields(prevFields => [
        ...prevFields,
        {
          temp_id: Date.now(), 
          id: null,
          nama_pekerjaan: "",
          deskripsi: "",
        }
      ]);
    } else {
      alert("Maksimal 7 prospek kerja.");
    }
  };

  const removeProspekField = (temp_id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      setProspekFields(prevFields => 
        prevFields.filter(fieldObj => fieldObj.temp_id !== temp_id)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataToSubmit = {
      ...formData,
      prospek_list: prospekFields?.map(({ temp_id, ...rest }) => rest) 
    };

    try {
      const response = await fetch(`${BACKEND_URL}/api/prodi/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Gagal menyimpan data");
      }

      alert("Data berhasil disimpan!");
      const updatedData = await response.json();
      setFormData(updatedData);
      const formattedProspek = updatedData.prospek_kerja.map((p: any, index: number) => ({
        temp_id: index,
        id: p.id,
        nama_pekerjaan: p.nama_pekerjaan,
        deskripsi: p.deskripsi,
      }));
      setProspekFields(formattedProspek);
      
    } catch (err: any) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.nama_prodi) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Edit Prodi: {formData.nama_prodi}</h1>
      
      <div>
        <label>Visi</label>
        <Textarea name="visi" value={formData.visi || ''} onChange={handleChange} rows={5} />
      </div>
      <div>
        <label>Misi</label>
        <Textarea name="misi" value={formData.misi || ''} onChange={handleChange} rows={10} />
      </div>
       <div>
        <label>Deskripsi Prodi</label>
        <Textarea name="desc_prodi" value={formData.desc_prodi || ''} onChange={handleChange} rows={5} />
      </div>
      <div>
        <label>Deskripsi Prospek Kerja (Paragraf)</label>
        <Textarea name="desc_prospek_kerja" value={formData.desc_prospek_kerja || ''} onChange={handleChange} rows={5} />
      </div>
       <div>
        <label>Deskripsi Program</label>
        <Textarea name="desc_program" value={formData.desc_program || ''} onChange={handleChange} rows={5} />
      </div>
       <div>
        <label>Keunggulan</label>
        <Textarea name="keunggulan" value={formData.keunggulan || ''} onChange={handleChange} rows={5} />
      </div>
      
      <hr className="my-6" />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Item Prospek Kerja (Maksimal 7)</h2>
           {prospekFields.length < 7 && (
            <Button 
              type="button" 
              onClick={addProspekField}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <FaPlus className="mr-2" /> Tambah
            </Button>
          )}
        </div>
        
        <div className="space-y-4 mt-2">
          {prospekFields?.map((field) => (
            <div key={field.temp_id} className="p-4 border rounded-lg relative bg-white shadow-sm">
              <Button 
                type="button" 
                onClick={() => removeProspekField(field.temp_id)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full h-8 w-8"
                aria-label="Hapus"
              >
                <FaTrash size={12} />
              </Button>
              
              <div className="mb-2">
                <label className="text-sm font-medium">Nama Pekerjaan</label>
                <Input 
                  value={field.nama_pekerjaan}
                  onChange={(e) => handleProspekChange(field.temp_id, 'nama_pekerjaan', e.target.value)}
                  placeholder="Contoh: Web Developer"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Deskripsi</label>
                <Textarea 
                  value={field.deskripsi}
                  onChange={(e) => handleProspekChange(field.temp_id, 'deskripsi', e.target.value)}
                  placeholder="Deskripsi singkat pekerjaan..."
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      <hr className="my-6" />

      <Button type="submit" disabled={loading} className="w-full text-lg p-3 bg-blue-600 hover:bg-blue-700 text-white">
        {loading ? "Menyimpan..." : "Simpan Semua Perubahan"}
      </Button>
    </form>
  );
}