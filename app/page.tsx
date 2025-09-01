"use client";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Card, CardFooter, Image, Button, User } from "@heroui/react";

import CardDrop from "@/components/CardDrop";
import { useState } from "react";
import { Tabs, Tab, CardBody, CardHeader } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
import "@/styles/globals.css";
//table data

export default function Home() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const defaultContent2 =
    "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    // <>
    <div className="container-fluid">
      <Tabs
        className="w-full max-w-8xl mx-auto "
        aria-label="Dynamic tabs"
        placement="top"
        classNames={{
          tabList: "w-full p-2 mainColor",
          tab: "w-full text-center px-3 py-5 font-bold",
          tabContent: "text-white group-data-[selected=true]:text-black hover:text-white",
        }}
      >
        {/* Tab 1: Tentang */}

        <Tab key="tentang" title="Tentang">
          <Card className="mainColor text-white mt-2">
            <div className="p-6">
              <strong className="text-xl">Sistem Informasi</strong>
              <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid perferendis hic quisquam alias velit, porro deserunt reprehenderit ab
                facilis at inventore quo voluptatum veniam obcaecati! At, dolorum eos? Expedita, accusantium!
              </p>

              <div className="w-full mt-2 flex items-center">
                <Image
                  alt="Foto Kepala Prodi"
                  src="https://heroui.com/images/hero-card-complete.jpeg"
                  width={200}
                  height={240}
                  className="rounded-lg object-cover"
                />
                <div className="ml-4 self-start">
                  <h3 className="text-xl font-bold">Kepala Prodi</h3>
                  <p className="mt-1 text-lg">Dr. Sigid Suseno, S.H.,M.Hum.</p>
                  <p className="mt-4">
                    <strong>Alamat Kantor:</strong>
                    <br />
                    Kampus Unpad Jatinangor, Jln. Raya Bandung-Sumedang Km. 21 Jatinangor, Sumedang 45363.
                  </p>
                  <p className="mt-2 text-gray-500">
                    <strong>LHKPN:</strong> –
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Tab>

        {/* Tab 2: Visi & Misi */}
        <Tab key="prospek-kerja" title="Prospek Kerja">
          <Card className="mainColor text-white mt-2">
            {/* Menggunakan flexbox untuk membuat layout 2 kolom */}
            <CardBody className="flex flex-row gap-4 justify-center items-center">
              {" "}
              {/* Menambahkan 'gap-4' untuk memberi jarak antar kolom */}
              {/* Bagian Kiri: Accordion */}
              <div className="flex-1">
                {" "}
                {/* Kolom ini mengambil 2/3 lebar */}
                <h1 className="text-4xl font-bold text-center">Prospek kerja</h1>
                <p className="mt-4 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta dolorem, voluptates at consequuntur nam asperiores ex
                  architecto, illum minus placeat voluptatibus voluptatum ab delectus autem dolor non quasi incidunt.
                </p>
                <p className="mt-4 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta dolorem, voluptates at consequuntur nam asperiores ex
                  architecto, illum minus placeat voluptatibus voluptatum ab delectus autem dolor non quasi incidunt.
                </p>
              </div>
              {/* Bagian Kanan: Judul H1 */}
              {/* Bagian Kanan: Judul H1 */}
              <div className="flex-1">
                <Accordion className="" itemClasses={{ title: "text-white", base: "border-b border-white" }}>
                  <AccordionItem key="1" aria-label="Accordion 1" className="overflow-hidden" title="Pengembang Web(Web Developer)">
                    {defaultContent}
                  </AccordionItem>
                  <AccordionItem key="2" aria-label="Accordion 2" className="overflow-hidden" title="Analisis Sistem(Sistem Analyst)">
                    {defaultContent2}
                  </AccordionItem>
                  <AccordionItem key="3" aria-label="Accordion 3" className="overflow-hidden" title="Manajer Proyek TI(IT Project Manager)">
                    {defaultContent}
                  </AccordionItem>
                  <AccordionItem
                    key="4"
                    aria-label="Accordion 4"
                    className="overflow-hidden"
                    title="Desainer UI/UX(User Interface/User Experience Designer)"
                  >
                    {defaultContent}
                  </AccordionItem>
                  <AccordionItem
                    key="5"
                    aria-label="Accordion 5"
                    className="overflow-hidden"
                    title="Pengembang Perangkat Lunak(Software Developer)ilai-Nilai Perusahaan"
                  >
                    {defaultContent}
                  </AccordionItem>
                  <AccordionItem
                    key="6"
                    aria-label="Accordion 6"
                    className="overflow-hidden"
                    title="Analis Data (Data Analyst) dan Ilmuwan Data (Data Scientist)"
                  >
                    {defaultContent}
                  </AccordionItem>
                </Accordion>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Tab 3: Kurikulum */}
        <Tab key="programPendidikan" title="Program Pendidikan">
          <Card className="mainColor text-white mt-2">
            <CardBody>
              <h1 className="text-center underline underline-offset-10">Program Pendidikan</h1>
              <div className="flex flex-wrap justify-between pt-5">
                <Card className="m-3 py-2 bg-zinc-700">
                  <CardBody className="m-2 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large pb-4">Sistem Informasi</h4>
                    <h2>Gelar Lulusan</h2>
                    <h3 className="font-bold">S.Si.</h3>
                  </CardBody>
                </Card>
                <Card className="m-3 py-2 bg-zinc-700">
                  <CardBody className="m-2 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large pb-4">Sistem Informasi</h4>
                    <h2>Akreditasi</h2>
                    <h3 className="font-bold">A (BAN-PT)</h3>
                  </CardBody>
                </Card>
                <Card className="m-3 py-2 bg-zinc-700">
                  <CardBody className="m-2 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large pb-4">Sistem Informasi</h4>
                    <h2>Durasi Semester</h2>
                    <h3 className="font-bold">8 Semester</h3>
                  </CardBody>
                </Card>
                <Card className="m-3 py-2 bg-zinc-700">
                  <CardBody className="m-2 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large pb-4">Sistem Informasi</h4>
                    <h2>Gelar Lulusan</h2>
                    <h3 className="font-bold">S.Si.</h3>
                  </CardBody>
                </Card>
              </div>

              <div className="flex w-full flex-col pt-4">
                <Tabs
                  aria-label="Options"
                  className="w-full max-w-8xl mx-auto line-bawah"
                  classNames={{
                    // Menghapus latar belakang abu-abu dan menambahkan garis batas bawah

                    tabList: "relative w-full p-0 bg-white-500/10 rounded-none",

                    // Ini adalah kunci utamanya: menata 'cursor' sebagai garis bawah
                    cursor: "w-full h-1 bg-zinc-1000 ",
                    // Anda bisa ganti bg-primary dengan warna lain, mis: bg-blue-500

                    // Menyesuaikan padding pada setiap tab jika perlu
                    tab: " h-12",

                    // Mengubah warna teks dari tab yang aktif
                    tabContent: "group-data-[selected=true]:text-white",
                  }}
                >
                  <Tab key="photos" title="Deskripsi Program">
                    <Card>
                      <CardBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Fugit vero facilis voluptates ut alias, hic repellendus assumenda quis quasi, sequi, eum
                        nostrum veritatis! Aspernatur excepturi tempore esse labore quaerat necessitatibus.
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="videos" title="Keunggulan Prodi">
                    <Card>
                      <CardBody>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Quos, odio nostrum officiis excepturi doloribus iure unde atque molestias
                        ratione, officia delectus non esse tempore expedita repellat. Sunt consequuntur earum dolore.
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Tab 4: Dosen */}
        <Tab key="kerjaSama" title="Kerja Sama Prodi">
          <Card className="mainColor mt-2">
            <CardBody>
              <div className="flex flex-wrap gap-9.5 justify-center mt-5 mb-5 ">
                <Image alt="HeroUI hero Image" src="https://heroui.com/images/hero-card-complete.jpeg" width={200} height={250} />
                <Image alt="HeroUI hero Image" src="https://heroui.com/images/hero-card-complete.jpeg" width={200} height={250} />
                <Image alt="HeroUI hero Image" src="https://heroui.com/images/hero-card-complete.jpeg" width={200} height={250} />
                <Image alt="HeroUI hero Image" src="https://heroui.com/images/hero-card-complete.jpeg" width={200} height={250} />
                <Image alt="HeroUI hero Image" src="https://heroui.com/images/hero-card-complete.jpeg" width={200} height={250} />
                <Image alt="HeroUI hero Image" src="https://heroui.com/images/hero-card-complete.jpeg" width={200} height={250} />
                <Image alt="HeroUI hero Image" src="https://heroui.com/images/hero-card-complete.jpeg" width={200} height={250} />
                <Image alt="HeroUI hero Image" src="https://heroui.com/images/hero-card-complete.jpeg" width={200} height={250} />
                <Image alt="HeroUI hero Image" src="https://heroui.com/images/hero-card-complete.jpeg" width={200} height={250} />
                <Image alt="HeroUI hero Image" src="https://heroui.com/images/hero-card-complete.jpeg" width={200} height={250} />
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
