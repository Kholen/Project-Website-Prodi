"use client";
import { useState } from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";

import { CloseIcon } from "./CloseIcon";
import styles from "./CardDrop.module.css";
import { MovingBorderDemo } from "./MovingBorderDemo";

// Define a type for the person's data for better type-safety
interface PersonData {
  name: string;
  nuptk: string;
  prodi: string;
  job: string;
  contact: string;
  imageUrl: string;
  skills: string[];
}

// MyCard now accepts a 'person' object as a prop
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

//contoh
export default function App() {
  const person: PersonData[] = [{
    name: "ABDUL RAHMAD, M.Pd",
    prodi: "Sistem Informasi",
    nuptk: "123456789",
    job: "Dosen STTI",
    contact: "0812345678",
    imageUrl: "https://sttindonesia.ac.id/Files/fotodosen/abdul1x1.png",
    skills: ["Mengajar"],
  },
  {
    name: "AURORA ELSA S. FREDERICK, S.E., M.B.A",
    nuptk: "123456789",
    prodi: "Sistem Informasi",
    job: "Dosen STTI",
    contact: "0812345678",
    imageUrl: "https://sttindonesia.ac.id/Files/fotodosen/elsa1x1.png",
    skills: ["Mengajar", "Manajemen", "Bisnis", "Pemasaran"],
  },
  {
    name: "DARMAWAN MEGA PERMANA, S.Pi., M.M",
    nuptk: "123456789",
    prodi: "Sistem Informasi",
    job: "Dosen STTI",
    contact: "0812345678",
    imageUrl: "https://sttindonesia.ac.id/wp-content/uploads/2025/05/darmawan1x1.png",
    skills: ["Mengajar"],
  },
  {
    name: "DWI NURUL HUDA, S.T., M.Kom",
    nuptk: "123456789",
    prodi: "Sistem Informasi",
    job: "Dosen STTI",
    contact: "0812345678",
    imageUrl: "https://sttindonesia.ac.id/Files/fotodosen/dwi1x1.png",
    skills: ["Mengajar"],
  },
  {
    name: "ELVIANNA, M.M",
    nuptk: "123456789",
    prodi: "Sistem Informasi",
    job: "Dosen STTI",
    contact: "0812345678",
    imageUrl: "https://sttindonesia.ac.id/Files/fotodosen/elvi1x1.png",
    skills: ["Mengajar"],
  },
  {
    name: "HENDI SETIAWAN, M.Kom",
    nuptk: "123456789",
    prodi: "Sistem Informasi",
    job: "Dosen STTI",
    contact: "0812345678",
    imageUrl: "https://sttindonesia.ac.id/Files/fotodosen/hendi1x1.png",
    skills: ["Mengajar"],
  },
  {
    name: "ILIVIA, S.Kom., M.M",
    nuptk: "123456789",
    prodi: "Sistem Informasi",
    job: "Dosen STTI",
    contact: "0812345678",
    imageUrl: "https://sttindonesia.ac.id/Files/fotodosen/ilivia1x1.png",
    skills: ["Mengajar"],
  },
  {
    name: "LARASATI INDRIASTUTI, S.E., M.Ak",
    nuptk: "123456789",
    prodi: "Sistem Informasi",
    job: "Dosen STTI",
    contact: "0812345678",
    imageUrl: "https://sttindonesia.ac.id/Files/fotodosen/larasati1x1.png",
    skills: ["Mengajar"],
  },
  {
    name: "LEVA AFFRILLIANGGI FALIHAH, S.Kom., M.M",
    nuptk: "123456789",
    prodi: "Sistem Informasi",
    job: "Dosen STTI",
    contact: "0812345678",
    imageUrl: "https://sttindonesia.ac.id/wp-content/uploads/2025/05/leva2_1x1.png",
    skills: ["Mengajar"],
  },
  {
    name: "LISKEN SIRAIT, S.Sos., M.Pd",
    nuptk: "123456789",
    prodi: "Sistem Informasi",
    job: "Dosen STTI",
    contact: "0812345678",
    imageUrl: "https://sttindonesia.ac.id/Files/fotodosen/lisken1x1.png",
    skills: ["Mengajar"],
  },
  
];

  return (
    <div className="grid grid-cols-5 items-start gap-5 justify-center">
      {person.map((p, index) => (
        <MyCard key={index} person={p} />
      ))}
    </div>
  );
}
