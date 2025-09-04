"use client";
import { useState } from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
import { CloseIcon } from "./CloseIcon";
import styles from "./CardDrop.module.css";

function MyCard() {
  const [expanded, setExpanded] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // Saat expand, langsung tampilkan detail
  // Saat collapse, tunggu transisi selesai baru hilangkan detail
  const handleExpand = () => {
    setExpanded(true);
    setShowDetail(true);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setTimeout(() => setShowDetail(false), 500); // 700ms sesuai transition
  };

  return (
    <div
      className={`${styles.cardContainer} ${expanded ? styles.expanded : ""}`}
      onClick={() => !expanded && handleExpand()}
      style={{ cursor: "pointer" }}
    >
      <Card
        className="w-[200px] h-auto overflow-hidden"
        style={{
          maxHeight: expanded ? 500 : 240,
          transition: "max-height 0.5s",
        }}
      >
        <CardHeader className="flex-col pt-5 relative">
          {expanded && (
            <Button
              isIconOnly
              variant="light"
              className="absolute top-2 left-2 size-10 text-gray-500 rounded-full z-10"
              aria-label="Tutup"
              onClick={(e) => {
                e.stopPropagation();
                handleCollapse();
              }}
            >
              <CloseIcon />
            </Button>
          )}
          <div className="flex w-full justify-center">
            <div className="group relative rounded-full bg-primary p-1 overflow-hidden">
              <Image
                alt="Card background"
                className="rounded-full w-24 h-24 object-cover transition-transform duration-300 ease-in-out group-hover:scale-120"
                src="https://heroui.com/images/hero-card-complete.jpeg"
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex-col items-center pt-1 overflow-hidden">
          <h3 className="font-bold text-large pb-2 break-words text-center">Nama</h3>
          <p className="text-tiny pb-2 break-words text-center">Detail Pekerjaan</p>
          <p className="text-tiny text-default-500 pb-2 break-words text-center">tempat tinggal</p>
          {showDetail && (
            <div className="mt-2 w-full px-2">
              <h2 className="mb-1">Expert In:</h2>
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                <span className="px-3 py-1 rounded-full border text-xs">Backend Dev</span>
                <span className="px-3 py-1 rounded-full border text-xs">React</span>
                <span className="px-3 py-1 rounded-full border text-xs">Dosen STTI</span>
                <span className="px-3 py-1 rounded-full border text-xs">Database Engineer</span>
                <span className="px-3 py-1 rounded-full border text-xs">ksdck</span>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex items-start justify-center w-full">
      <MyCard />
    </div>
  );
}
