"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";

import { CloseIcon } from "./CloseIcon";
import styles from "./CardDrop.module.css";
import { MovingBorderDemo } from "./MovingBorderDemo";

// --- TIPE DATA BARU YANG SUDAH DIPERBAIKI ---
interface SimpleRelasi {
  id: number;
  nama_skill?: string;
  nama_jabatan?: string;
}

interface ImageUrl {
  id: number;
  url: string;
}

interface ApiDosenData {
  id: number;
  nama: string;
  NUPTK: string;
  kontak: string;
  nama_prodi: string;
  skills: SimpleRelasi[];
  jabatans: SimpleRelasi[];
  image_url: ImageUrl[];
}

interface PersonData {
  name: string;
  nuptk: string;
  prodi: string;
  job: string;
  contact: string;
  imageUrl: string;
  skills: string[];
}
// ---------------------------------------------

function MyCard({ person }: { person: PersonData }) {
  const [expanded, setExpanded] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleExpand = () => {
    setExpanded(true);
    setShowDetail(true);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setShowDetail(false);
  };

  return (
    <div
      className={`${styles.cardContainer} ${expanded ? styles.expanded : ""}`}
      style={{ cursor: "pointer" }}
      onClick={() => !expanded && handleExpand()}
    >
      <Card
        className="w-[300px] h-auto overflow-hidden"
        style={{
          maxHeight: expanded ? 500 : 310,
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        <CardHeader className="flex-col pt-5 relative">
          {expanded && (
            <Button
              isIconOnly
              aria-label="Tutup"
              className="absolute top-2 left-2 size-10 text-gray-500 rounded-full z-10"
              variant="light"
              onClick={(e) => {
                e.stopPropagation();
                handleCollapse();
              }}
            >
              <CloseIcon />
            </Button>
          )}
          <div className="flex w-full justify-center">
            <div className="group relative rounded-full mainColor p-1 overflow-hidden">
              <Image
                alt={person.name}
                className="rounded-full w-24 h-24 object-cover transition-transform duration-300 ease-in-out group-hover:scale-120"
                src={person.imageUrl}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex-col items-center pt-1 overflow-hidden">
          <h3 className="font-bold text-large break-words text-center leading-[1.2] min-h-14 flex items-center justify-center">{person.name}</h3>
          <p className="pb-1 text-medium break-words text-center">{person.nuptk}</p>
          <p className="pb-1 break-words text-center">{person.prodi}</p>
          <p className="pb-2 text-tiny break-words text-center">{person.job}</p>
          <p className="text-tiny text-default-500 pb-2 break-words text-center">{person.contact}</p>
          <div className={`${styles.detailWrapper} ${showDetail && expanded ? styles.detailVisible : ''}`}>
            <div className="mt-5 w-full px-2">
              <h2 className="mb-2">Expert In:</h2>
              <div className="flex flex-wrap gap-2 justify-center mb-5">
                <MovingBorderDemo skills={person.skills} />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default function CardDrop() {
  const [dosenData, setDosenData] = useState<PersonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Alamat API sekarang menggunakan URL lengkap
        const response = await fetch('http://localhost:8000/api/dosen');
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        const apiData: ApiDosenData[] = await response.json();

        // ▼▼▼ LOGIKA TRANSFORMASI YANG SUDAH DIPERBAIKI ▼▼▼
        const transformedData: PersonData[] = apiData.map(dosen => ({
          name: dosen.nama,
          nuptk: dosen.NUPTK,
          prodi: dosen.nama_prodi,
          job: dosen.jabatans.map(j => j.nama_jabatan).join(', '),
          contact: dosen.kontak,
          imageUrl: dosen.image_url?.[0]?.url ?? '', 
          skills: dosen.skills.map(s => s.nama_skill ?? ''),
        }));
        
        setDosenData(transformedData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Memuat data dosen...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-start gap-5 justify-center">
      {dosenData.map((p, index) => (
        <MyCard key={index} person={p} />
      ))}
    </div>
  );
}