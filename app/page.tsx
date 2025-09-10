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
import "../styles/globals.css";
import { Banner } from "@/components/Banner";
import { FaUserGraduate, FaMedal, FaMoneyBillWave } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

//table data

export default function Home() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const defaultContent2 =
    "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <div className="container">
      <Tabs
        className="w-full max-w-8xl mx-auto"
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
              <strong className="text-xl underline underline-offset-10">Sistem Informasi</strong>
              <p className="mt-2 text-justify indent-8">
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
                  <p className="mt-1 text-lg">Liza Safitri, S.T., M.Kom.</p>
                  <p className="mt-2">
                    <strong>NUPTK: </strong>
                    <br />
                    123456789
                  </p>
                  <p className="mt-4">
                    <strong>Alamat Kantor:</strong>
                    <br />
                    Jalan Pompa Air No. 28, Kec. Bukit Bestari, Kel. Tanjungpinang Timur -29122
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Tab>

        {/* Tab 2: Prospek Kerja */}
        <Tab key="prospek-kerja" title="Prospek Kerja">
          <Card className="mainColor text-white">
            {/* Menggunakan flexbox untuk membuat layout 2 kolom */}
            <CardBody className="flex flex-row gap-4 justify-center items-center p-6">
              {" "}
              {/* Menambahkan 'gap-4' untuk memberi jarak antar kolom */}
              {/* Bagian Kiri: Accordion */}
              <div className="flex-1">
                {" "}
                {/* Kolom ini mengambil 2/3 lebar */}
                <h1 className="text-4xl font-bold text-center underline underline-offset-15">Prospek kerja</h1>
                <p className="mt-10 text-justify indent-8">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta dolorem, voluptates at consequuntur nam asperiores ex
                  architecto, illum minus placeat voluptatibus voluptatum ab delectus autem dolor non quasi incidunt.
                </p>
                <p className="mt-4 text-justify indent-8">
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

        {/* Tab 3: Program Pendidikan */}
        <Tab key="programPendidikan" title="Program Pendidikan">
          <Card className="mainColor text-white mt-2">
            <CardBody className="p-6">
              <h1 className="text-center underline underline-offset-10 pt-2 text-2xl">Program Pendidikan</h1>
              <div className="flex flex-wrap justify-evenly items-center pt-10">
                <Card className="flex justify-center h-30 w-40">
                  <CardBody className="flex flex-col justify-center items-center text-center">
                    <FaUserGraduate className="text-3xl pb-2" />
                    <h2>Gelar Lulusan</h2>
                    <h3 className="font-bold">S.Kom.</h3>
                  </CardBody>
                </Card>
                <Card className="flex justify-center h-30 w-40">
                  <CardBody className="flex flex-col justify-center items-center text-center">
                    <FaMedal className="text-3xl pb-2" />
                    <h2>Akreditasi Prodi</h2>
                    <h3 className="font-bold">Baik Sekali</h3>
                  </CardBody>
                </Card>
                <Card className="flex justify-center h-30 w-40">
                  <CardBody className="flex flex-col justify-center items-center text-center">
                    <MdAccessTimeFilled className="text-3xl pb-2" />
                    <h2 className="leading-none">Jumlah Semester</h2>
                    <h3 className="font-bold">8 Semester</h3>
                  </CardBody>
                </Card>
                <Card className="flex justify-center h-30 w-40">
                  <CardBody className="flex flex-col justify-center items-center text-center">
                    <FaMoneyBillWave className="text-3xl pb-2" />
                    <h2>Informasi Biaya</h2>
                    <a href="#" className="font-bold underline underline-offset-2">
                      Klik Disini
                    </a>
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
                    cursor: "w-full h-1 bg-white ",
                    // Anda bisa ganti bg-primary dengan warna lain, mis: bg-blue-500

                    // Menyesuaikan padding pada setiap tab jika perlu
                    tab: " h-12",

                    // Mengubah warna teks dari tab yang aktif
                    tabContent: "group-data-[selected=true]:text-white",
                  }}
                >
                  <Tab key="photos" title="Deskripsi Program" className="pb-0 ps-0">
                    <Card>
                      <CardBody className=" text-justify indent-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Fugit vero facilis voluptates ut alias, hic repellendus assumenda quis quasi, sequi, eum
                        nostrum veritatis! Aspernatur excepturi tempore esse labore quaerat necessitatibus.
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="videos" title="Keunggulan Prodi" className="pb-0 ps-0">
                    <Card>
                      <CardBody className=" text-justify indent-8">
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

        {/* Tab 4: Kerja Sama */}
        <Tab key="kerjaSama" title="Kerja Sama Prodi">
          <Card className="mainColor mt-2">
            <h1 className="text-white text-center text-3xl p-5 underline underline-offset-10">Kerja Sama</h1>
            <CardBody className="pt-0">
              <div className="flex flex-wrap gap-11 justify-center mt-5 mb-5">
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

      <svg className="w-screen relative left-1/2 -translate-x-1/2 -mb-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0A0950"
          fillOpacity="1"
          d="M0,192L60,181.3C120,171,240,149,360,160C480,171,600,213,720,213.3C840,213,960,171,1080,170.7C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>

      <div id="Visi-Misi" className="w-screen relative left-1/2 -translate-x-1/2 h-200 mainColor">
        <div className="w-screen relative left-1/2 -translate-x-1/2 h-200 mainColor ">
          <div className="container mx-auto px-6 h-full flex justify-between items-center">
            <div className="">
              <div className="mb-5">
                <div className="text-white font-bold text-2xl text-center rounded-lg bg-blue-800 w-30 p-2 my-2 hover justify-self-start">Misi</div>

                <div className="bg-white rounded-lg w-auto p-5 justify-content text-justify indent-8 ">
                  Menjadikan Program studi Sistem Informasi STT Indonesia Tanjungpinang berkualitas dan unggul pada tahun 2025 dalam pengajaran,
                  penelitian, dan pengabdian masyarakat bidang Big Data dan Data Science di Kepulauan Riau.
                </div>
              </div>

              <div className="">
                <div className="text-white font-bold text-2xl text-center rounded-lg bg-blue-800 w-30 p-2 mt-5 mb-2 hover justify-self-end">Visi</div>
                <div className="bg-white rounded-lg w-auto">
                  <ul className="p-10 justify-content list-disc text-justify mb-5">
                    <li>
                      Menyelenggarakan pendidikan dan pengajaran yang berkualitas dengan terus mengikuti perkembangan ilmu dan teknologi khususnya di
                      bidang Big Data dan Data Science.
                    </li>
                    <li>
                      Menyiapkan mahasiswa untuk memasuki dunia kerja yang mampu bersaing baik lokal maupun nasional, mandiri dalam bidang Big Data
                      dan Data Science, memiliki etos kerja tinggi, beretika, dan dapat bekerjasama dalam tim kerja.
                    </li>
                    <li>
                      Menyelenggarakan penelitian yang dapat memberikan kontribusi terhadap masyarakat dan pengembangan dalam bidang Big Data dan Data
                      Science serta Blockchain.
                    </li>
                    <li>
                      Menyelenggarakan pengabdian kepada masyarakat sebagai kepedulian insan akademik dalam membantu meningkatkan kualitas masyarakat
                      dalam bidang Big Data dan Data Science.
                    </li>
                    <li>Mengembangkan proses pembelajaran yang berkualitas berlandaskan Outcome Based Education (OBE).</li>
                    <li>
                      Menjalin kerjasama dalam pengembangan sumber daya manusia untuk menjembatani implementasi Big Data dan Data Science dalam konsep
                      Smart City di Provinsi Kepulauan Riau.
                    </li>
                    <li>
                      Mengembangkan kualitas SDM untuk memberikan layanan yang prima dalam bidang Big Data dan Data Science dan untuk menjadi seorang
                      ilmuwan data.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-300 rounded-2xl w-80 h-75 pr-5 ml-25 hover">
              <div className="bg-gray-400 rounded-2xl w-80 h-75 p-5 -mt-5 -ml-5">
                <Image alt="Img" src="/mentahan.png" className="-mt-15  " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
