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

export default function UrlMedsosSettings() {
    const [formData, setFormData] = useState({
        email: "",
        no_telp: "",
        instagram_url: "",
        whatsapp_url: "",
        facebook_url: "",
        x_url: "",
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
            email: jsonData.email,
            no_telp: jsonData.no_telp,
            instagram_url: jsonData.instagram_url,
            whatsapp_url: jsonData.whatsapp_url,
            facebook_url: jsonData.facebook_url,
            x_url: jsonData.x_url,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
};

 const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 
    if (!confirm("Simpan perubahan Ini?")) return;
    setIsSubmitting(true);

    const data = new FormData();
    data.append('email', formData.email);
    data.append('no_telp', formData.no_telp);
    data.append('instagram_url', formData.instagram_url);
    data.append('whatsapp_url', formData.whatsapp_url);
    data.append('facebook_url', formData.facebook_url);
    data.append('x_url', formData.x_url);
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/settings`, {
          method: 'POST', 
          body: data,
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menyimpan data.");
      }

      alert('Pengaturan Contact berhasil diperbarui!');

    } catch (err: any) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
       <div className="w-full ">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Kontak & Media Sosial</h2>
        
        {/* --- Bagian Kontak --- */}
        <fieldset className="border border-gray-300 p-4 rounded-lg">
          <legend className="text-lg font-semibold px-2">Info Kontak</legend>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">Email Kampus</label>
              <input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg" 
                placeholder="contoh@sttindonesia.ac.id"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="no_telp">No. Telepon / WhatsApp</label>
              <input 
                id="no_telp"
                name="no_telp"
                type="tel"
                value={formData.no_telp}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg" 
                placeholder="08123456789"
              />
            </div>
          </div>
        </fieldset>

        {/* --- Bagian Media Sosial --- */}
        <fieldset className="border border-gray-300 p-4 rounded-lg">
          <legend className="text-lg font-semibold px-2">Media Sosial (URL Lengkap)</legend>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="instagram_url">Instagram</label>
              <input 
                id="instagram_url"
                name="instagram_url"
                type="url"
                value={formData.instagram_url}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg" 
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="whatsapp_url">WhatsApp (Link WA.me)</label>
              <input 
                id="whatsapp_url"
                name="whatsapp_url"
                type="url"
                value={formData.whatsapp_url}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg" 
                placeholder="https://wa.me/628..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="facebook_url">Facebook</label>
              <input 
                id="facebook_url"
                name="facebook_url"
                type="url"
                value={formData.facebook_url}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg" 
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="x_url">X (Twitter)</label>
              <input 
                id="x_url"
                name="x_url"
                type="url"
                value={formData.x_url}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg" 
                placeholder="https://x.com/..."
              />
            </div>
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
    )
}