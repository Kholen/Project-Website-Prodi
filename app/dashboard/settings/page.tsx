"use client";
import React, { useState, useEffect } from "react";
import { Image, Button, Tooltip, Accordion, AccordionItem } from "@heroui/react";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import ContactSettings from "@/components/ContactSettings";
import VisiMisiSettings from "@/components/VisiMisiSettings";
import LogoSettings from "@/components/LogoSettings";
import { LuBookText } from "react-icons/lu";
import { FaNfcSymbol } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";

const BACKEND_URL = "http://localhost:8000";

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

export default function SettingsEdit() {
  const [data, setData] = useState<Prop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/settings`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        
        const jsonData: Prop = await response.json();
        setData(jsonData);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); 

  if (loading) {
    return (
      <div className="w-full p-5 bg-white rounded-lg text-center">
        <p>Memuat data pengaturan...</p>
      </div>
    );
  }

  // Tampilkan status error
  if (error) {
    return (
      <div className="w-full p-5 bg-red-100 text-red-700 rounded-lg text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  const misi_if_lines = data?.misi_if.split('\n').map((line, index) => (
    <li key={index}>{line}</li>
  ));
  const misi_si_lines = data?.misi_si.split('\n').map((line, index) => (
    <li key={index}>{line}</li>
  ));

  return (
    <div className="w-full p-5 bg-white rounded-lg">
      <p className="text-2xl text-center">More Settings</p>
      <div className="mt-4">

      <Accordion variant="bordered" selectionMode="multiple">
      <AccordionItem key="1" aria-label="Visi & Misi" title="Visi & Misi" indicator={<LuBookText size={25} />}>
        <VisiMisiSettings />
      </AccordionItem>
      <AccordionItem key="2" aria-label="Logo" title="Logo" indicator={<FaNfcSymbol size={25} />}>
        <LogoSettings />
      </AccordionItem>
      <AccordionItem key="3" aria-label="Contact" title="Contact & Social Media" indicator={<FiMessageSquare size={25 } />}>
        <ContactSettings />
      </AccordionItem>
    </Accordion>
      </div>
    </div>
  );
}