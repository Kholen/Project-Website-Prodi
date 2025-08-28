"use client";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Card, CardFooter, Image, Button, User } from "@heroui/react";
import HeroCard from "@/components/HeroCard";
import CardDrop from "@/components/CardDrop";
import { useState } from "react";
//table data

export default function Home() {
  return (
    // <>
    <div className="container-fluid">
      <div className="grid grid-cols-5 items-start gap-13 justify-center">
        <CardDrop />

        <CardDrop />

        <CardDrop />

        <CardDrop />

        <CardDrop />

        <CardDrop />

        <CardDrop />

        <CardDrop />

        <CardDrop />

        <CardDrop />

        <CardDrop />

        <CardDrop />
      </div>
    </div>
    //   {/* <p>{isOpen ? "terbuka" : "tertutup"}</p>
    // //   <button onClick={() => setIsOpen((prev) => !isOpen)}>klik</button>
    // //   {isOpen && <></>}
    // // </> */}
  );
}
