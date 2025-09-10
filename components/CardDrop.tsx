"use client";
import { useState } from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";

import { CloseIcon } from "./CloseIcon";
import styles from "./CardDrop.module.css";
import { MovingBorderDemo } from "./MovingBorderDemo";

// Define a type for the person's data for better type-safety
interface PersonData {
  name: string;
  job: string;
  location: string;
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
    setTimeout(() => setShowDetail(false), 500); // 700ms transition
  };

  return (
    <div
      className={`${styles.cardContainer} ${expanded ? styles.expanded : ""}`}
      style={{ cursor: "pointer" }}
      onClick={() => !expanded && handleExpand()}
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
            <div className="group relative rounded-full bg-primary p-1 overflow-hidden">
              <Image
                alt={person.name}
                className="rounded-full w-24 h-24 object-cover transition-transform duration-300 ease-in-out group-hover:scale-120"
                src={person.imageUrl}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex-col items-center pt-1 overflow-hidden">
          <h3 className="font-bold text-large pb-2 break-words text-center">{person.name}</h3>
          <p className="text-tiny pb-2 break-words text-center">{person.job}</p>
          <p className="text-tiny text-default-500 pb-2 break-words text-center">{person.location}</p>
          {showDetail && (
            <div className="mt-2 w-full px-2">
              <h2 className="mb-1">Expert In:</h2>
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                <MovingBorderDemo skills={person.skills} />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

//contoh
export default function App() {
  const person1: PersonData = {
    name: "Ahmad",
    job: "Backend Developer",
    location: "Tanjungpinang",
    imageUrl: "https://heroui.com/images/hero-card-complete.jpeg",
    skills: ["PHP", "Laravel", "MySQL", "Go"],
  };

  const person2: PersonData = {
    name: "Toni Sahroni",
    job: "Wakil ketua Komisi III",
    location: "Tanjung Priok",
    imageUrl: "https://nasdemjakarta.com/wp-content/uploads/2023/11/01.Ahmad-Sahroni-S.E.-M.I.Kom_.jpg", // Different image
    skills: ["Nyocot", "terjarah", "Mantan Ironman", "TypeScript"],
  };

  return (
    <div className="grid grid-cols-5 items-start gap-13 justify-center">
      <MyCard person={person1} />
      <MyCard person={person2} />
      <MyCard person={person1} />
      <MyCard person={person2} />
      <MyCard person={person1} />
      <MyCard person={person2} />
      <MyCard person={person1} />
      <MyCard person={person2} />
    </div>
  );
}
