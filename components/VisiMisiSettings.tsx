"use client"
import React from "react";
import { useState, useEffect, ChangeEvent, FormEvent } from "react"; 

interface Prop {
  id: number;
  visi_si: string;
  misi_si: string;
  visi_if: string;
  misi_if: string;
  default_logo: string;
  white_logo: string;
  email: string;
  no_telp: string;
  instagram_url: string;
  whatsapp_url: string;
  facebook_url: string;
  x_url: string;
}

const BACKEND_URL = "http://localhost:8000";

const Spinner = () => <div className="w-5 h-5 border-2 border-dashed border-white rounded-full animate-spin"></div>;

export default function VisiMisiSettings() {
  const [formData, setFormData] = useState({
    visi_si: "",
    misi_si: "",
    visi_if: "",
    misi_if: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/settings`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        const jsonData: Prop = await response.json();
        setFormData({
            visi_si: jsonData.visi_si,
            misi_si: jsonData.misi_si,
            visi_if: jsonData.visi_if,
            misi_if: jsonData.misi_if,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 
    if (!confirm("Simpan perubahan visi & misi?")) return;
    setIsSubmitting(true);

    const data = new FormData();
    data.append('visi_si', formData.visi_si);
    data.append('misi_si', formData.misi_si);
    data.append('visi_if', formData.visi_if);
    data.append('misi_if', formData.misi_if);
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/settings`, {
          method: 'POST', 
          body: data,
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menyimpan data.");
      }

      alert('Pengaturan Visi & Misi berhasil diperbarui!');

    } catch (err: any) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full p-5 bg-white rounded-lg text-center">
        <p>Memuat data pengaturan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-5 bg-red-100 text-red-700 rounded-lg text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full p-5 bg-white rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Edit Visi & Misi</h2>
        
        <fieldset className="border border-gray-300 p-4 rounded-lg">
          <legend className="text-lg font-semibold px-2">Sistem Informasi (SI)</legend>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="visi_si">Visi SI</label>
            <textarea 
              id="visi_si"
              name="visi_si" 
              value={formData.visi_si} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-lg" 
              rows={4}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="misi_si">Misi SI</label>
            <textarea 
              id="misi_si"
              name="misi_si"
              value={formData.misi_si}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg" 
              rows={8}
            ></textarea>
          </div>
        </fieldset>
        
        <fieldset className="border border-gray-300 p-4 rounded-lg mt-6">
          <legend className="text-lg font-semibold px-2">Teknik Informatika (IF)</legend>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="visi_if">Visi IF</label>
            <textarea 
              id="visi_if"
              name="visi_if"
              value={formData.visi_if}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg" 
              rows={4}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="misi_if">Misi IF</label>
            <textarea 
              id="misi_if"
              name="misi_if"
              value={formData.misi_if}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg" 
              rows={8}
            ></textarea>
          </div>
        </fieldset>
        
        <button 
          type="submit" 
          className="flex items-center justify-center gap-2 mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  );
}