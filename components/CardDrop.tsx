"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card, CardBody, CardHeader, Image, Spinner } from "@heroui/react";

import { CloseIcon } from "./CloseIcon";
import styles from "./CardDrop.module.css";
import { MovingBorderDemo } from "./MovingBorderDemo";

interface SimpleRelation {
  id: number;
  nama_skill?: string;
  nama_jabatan?: string;
  nama_prodi?: string;
}

interface ApiDosenData {
  id: number;
  nama: string;
  NUPTK: string;
  email: string | null;
  prodis: SimpleRelation[];
  skills: SimpleRelation[];
  jabatans: SimpleRelation[];
  image: string;
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
          maxHeight: expanded ? 500 : 300,
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
          <h3 className="font-bold text-large break-words text-center leading-[1.2] flex items-center justify-center">{person.name}</h3>
          <p className="text-medium break-words text-center">{person.nuptk}</p>
          <p className="break-words text-center">{person.prodi}</p>
          <p className="text-tiny break-words text-center">{person.job || ""}</p>
          <p className="text-tiny text-default-500 break-words text-center">{person.contact}</p>
          <div className={`${styles.detailWrapper} ${showDetail && expanded ? styles.detailVisible : ""}`}>
            <div className="mt-5 w-full px-2">
              <h2 className="mb-2">Expert In:</h2>
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                <MovingBorderDemo skills={person.skills} />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default function CardDrop({ value, searchTerm = "" }: { value: string; searchTerm?: string }) {
  const [dosenData, setDosenData] = useState<PersonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prodiMap: Record<string, string> = {
    all: "",
    if: "teknik informatika",
    si: "sistem informasi",
  };

  const normalisasiSearch = searchTerm.trim().toLowerCase();

  const filteredList = useMemo(() => {
    return dosenData.filter((person) => {
      const matchesSearch = !normalisasiSearch || person.name.toLowerCase().includes(normalisasiSearch);

      if (value === "ALL") {
        return matchesSearch;
      }

      const selectedProdi = prodiMap[value.toLowerCase()];
      if (!selectedProdi) {
        return matchesSearch;
      }

      return matchesSearch && person.prodi.toLowerCase() === selectedProdi;
    });
  }, [dosenData, normalisasiSearch, value]);

  useEffect(() => {
    let active = true;

    async function fetchData() {
      try {
        const response = await fetch("/api/dosen", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }

        const apiData: ApiDosenData[] = await response.json();

        if (!active) {
          return;
        }

        const transformed: PersonData[] = apiData.map((dosen) => {
          const prodiName = dosen.prodis?.[0]?.nama_prodi ?? "";
          const jobs = (dosen.jabatans ?? [])
            .map((jabatan) => jabatan.nama_jabatan)
            .filter(Boolean)
            .join(", ");
          const skills = (dosen.skills ?? [])
            .map((skill) => skill.nama_skill)
            .filter((skill): skill is string => Boolean(skill));

          return {
            name: dosen.nama,
            nuptk: dosen.NUPTK,
            prodi: prodiName,
            job: jobs,
            contact: dosen.email ?? "Tidak tersedia",
            imageUrl: dosen.image || "/logo-white.png",
            skills,
          };
        });

        setDosenData(transformed);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner variant="dots" label="Memuat data Dosen..." classNames={{ label: "mt-4 text-[#0a0950]", dots: "!bg-[#0a0950]" }} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!filteredList.length) {
    return <p className="text-center">Tidak ada dosen yang cocok dengan filter.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 items-start gap-5 justify-items-stretch">
      {filteredList.map((person) => (
        <MyCard key={`${person.nuptk}-${person.name}`} person={person} />
      ))}
    </div>
  );
}
