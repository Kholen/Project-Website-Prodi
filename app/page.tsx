// app/prodi/page.tsx (SUDAH DIPERBAIKI)
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useProdi } from "@/app/context/ProdiContext";
import { Card, Image, Spinner, Tabs, Tab, CardBody, Accordion, AccordionItem } from "@heroui/react";
import { FaUserGraduate, FaMedal, FaMoneyBillWave } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import "../styles/globals.css";

// --- Tipe Data dari API (Sesuaikan dengan Model Anda) ---
interface SimpleRelasi {
  id: number;
  nama_jabatan: string; 
  [key: string]: any;
}

interface Kerjasama {
  id: number;
  link_url: string; 
}

interface ProspekKerja {
  id: number;
  nama_pekerjaan: string;
  deskripsi: string;
}

interface Dosen { // Tipe ini hanya dipakai untuk kepala_prodi
  id: number;
  nama: string;
  NUPTK: string;
  email: string;
  image: string | null; 
  jabatans: SimpleRelasi[]; // Ini mungkin tidak terkirim (tidak apa-apa)
}

// ▼▼▼ INTERFACE DIPERBAIKI (dosen[] dihapus) ▼▼▼
interface ProdiData {
  id: number;
  nama_prodi: string;
  visi: string;
  misi: string;
  desc_prodi: string;
  desc_prospek_kerja: string;
  desc_program: string;
  keunggulan: string;
  // dosen: Dosen[]; <-- DIHAPUS, karena sudah tidak ada di API
  kerjasama: Kerjasama[];
  prospek_kerja: ProspekKerja[];
  kepala_prodi: Dosen | null; // <-- INI YANG KITA PAKAI
}

const BACKEND_URL = "http://localhost:8000";

// --- Komponen Halaman Prodi (Menggantikan HomeIf/HomeSi) ---
export default function ProdiPage() {
  const { prodi } = useProdi(); // 'IF' atau 'SI'
  const [data, setData] = useState<ProdiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data setiap kali 'prodi' dari context berubah
  useEffect(() => {
    async function fetchData(prodiId: number) {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await fetch(`${BACKEND_URL}/api/prodi/${prodiId}`);
        if (!response.ok) {
          throw new Error(`Data untuk prodi ID ${prodiId} tidak ditemukan`);
        }
        const responseData = await response.json();
        setData(responseData); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // ▼▼▼ KESALAHAN 1 DIPERBAIKI (Logika ID dibalik) ▼▼▼
    // ID 1 = Teknik Informatika (IF)
    // ID 2 = Sistem Informasi (SI)
    const prodiId = prodi === 'IF' ? 1 : 2; 
    
    fetchData(prodiId);

  }, [prodi]); // Dependensi: Berjalan ulang saat 'prodi' berubah

  // ▼▼▼ KESALAHAN 2 DIPERBAIKI (Blok useMemo dihapus) ▼▼▼
  // Ambil data kaprodi langsung dari API
  const kepalaProdi = data?.kepala_prodi;

  // Render Misi dengan format yang benar
  const MisiDisplay = ({ misiString }: { misiString: string | undefined }) => {
    if (!misiString) return <p>Misi belum tersedia.</p>;
    const daftarMisi = misiString.split(/\r?\n/).filter(poin => poin.trim() !== '');
    return (
      <ul className="p-10 justify-content list-disc text-justify mb-5">
        {daftarMisi.map((poin, index) => (
          <li key={index}>{poin}</li>
        ))}
      </ul>
    );
  };
  
  // Tampilan Loading
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner variant="dots" label="Memuat data prodi..." classNames={{ label: "mt-4 text-[#0a0950]", dots: "!bg-[#0a0950]" }} />
      </div>
    );
  }

  // Tampilan Error
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Tampilan jika data tidak ada
  if (!data) return <p className="text-center">Data prodi tidak ditemukan.</p>;

  // Render UI dinamis menggunakan data dari state 'data'
  return (
    <div className="container px-6 mx-auto">
      <Tabs
        className="w-full"
        aria-label="Dynamic tabs"
        placement="top"
        classNames={{
          tabList: "w-full p-2 mainColor",
          tab: "flex-1 text-center px-3 py-5 font-bold",
          tabContent: "text-white group-data-[selected=true]:text-black",
          panel: "w-full",
        }}
      >
        
        {/* Tab 1: Tentang */}
        <Tab key="tentang" title="Tentang" className="w-full">
          <Card className="mainColor text-white mt-2 w-full">
            <div className="p-6">
              <strong className="flex text-3xl underline underline-offset-10 justify-center">{data.nama_prodi}</strong>
              <div className="mt-8 flex flex-col lg:flex-row">
                <div className="flex items-center w-full lg:w-1/2">
                  {/* Logika ini sekarang akan bekerja karena 'kepalaProdi' diambil dari API */}
                  {kepalaProdi ? (
                    <>
                      <Image
                        alt={`Foto ${kepalaProdi.nama}`}
                        // API Anda mengirim URL lengkap, jadi BACKEND_URL tidak perlu
                        src={kepalaProdi.image ? kepalaProdi.image : "/placeholder.jpg"}
                        width={200}
                        height={240}
                        className="rounded-lg object-cover"
                      />
                      <div className="ml-4 self-start">
                        <h3 className="text-xl font-bold">Kepala Prodi</h3>
                        <p className="mt-1 text-lg">{kepalaProdi.nama}</p>
                        <p className="mt-2"><strong>NUPTK: </strong><br />{kepalaProdi.NUPTK}</p>
                        {/* Catatan: 'jabatans' mungkin tidak ada di data 'kepala_prodi'.
                          Jika tidak ada, Anda bisa tampilkan nama prodinya saja, 
                          atau tambahkan 'jabatans' di kueri 'kepala_prodi' Anda di backend.
                          Untuk saat ini, kita tampilkan saja nama prodinya.
                        */}
                        <p className="mt-2"><strong>Jabatan: </strong><br />Kepala Prodi {data.nama_prodi}</p>
                        <p className="mt-4"><strong>email:</strong><br />{kepalaProdi.email ?? "Tidak tersedia"}</p>
                      </div>
                    </>
                  ) : (
                    <p className="mt-4">Data kepala prodi belum tersedia.</p>
                  )}
                </div>
                <div className="flex-1 mt-4 lg:mt-0 lg:ml-4">
                  <p className="text-justify indent-8">{data.desc_prodi || "Deskripsi prodi belum tersedia."}</p>
                </div>
              </div>
            </div>
          </Card>
        </Tab>

        {/* Tab 2: Prospek Kerja */}
        <Tab key="prospek-kerja" title="Prospek Kerja" className="w-full">
          <Card className="mainColor text-white w-full">
            <CardBody className="flex flex-col lg:flex-row gap-4 justify-center items-center p-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-center underline underline-offset-10">Prospek Kerja</h1>
                <p className="mt-6 text-justify indent-8">{data.desc_prospek_kerja || "Deskripsi prospek kerja belum tersedia."}</p>
              </div>
              <div className="flex-1 w-full mt-4 lg:mt-0">
                <Accordion className="" itemClasses={{ title: "text-white", base: "border-b border-white" }}>
                  {data.prospek_kerja && data.prospek_kerja.length > 0 ? (
                    data.prospek_kerja.map((item) => (
                      <AccordionItem key={item.id} aria-label={item.nama_pekerjaan} className="overflow-hidden" title={item.nama_pekerjaan}>
                        {/* Ini sudah benar menggunakan item.deskripsi */}
                        <div className="text-justify p-2">{item.deskripsi}</div>
                      </AccordionItem>
                    ))
                  ) : (
                     <AccordionItem key="empty" aria-label="Kosong" className="overflow-hidden" title="Data Tidak Tersedia">
                       <div className="text-justify p-2">Daftar prospek kerja belum tersedia.</div>
                     </AccordionItem>
                  )}
                </Accordion>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Tab 3: Program Pendidikan */}
        <Tab key="programPendidikan" title="Program Pendidikan" className="w-full">
           <Card className="mainColor text-white mt-2 w-full">
             <CardBody className="p-6">
               <h1 className="text-center underline underline-offset-10 text-3xl">Program Pendidikan</h1>
               <div className="flex flex-wrap justify-evenly items-center pt-6">
                   {/* UI Statis Anda (Gelar, Akreditasi, dll.) */}
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
                           <a href="#" className="font-bold underline underline-offset-2">Klik Disini</a>
                       </CardBody>
                   </Card>
               </div>
               <div className="flex w-full flex-col pt-4">
                 <Tabs
                   aria-label="Options"
                   className="w-full line-bawah"
                   classNames={{
                     tabList: "relative w-full p-0 bg-white-500/10 rounded-none",
                     cursor: "w-full h-1 bg-white ",
                     tab: "h-12 flex-1",
                     tabContent: "group-data-[selected=true]:text-white",
                     panel: "w-full",
                   }}
                 >
                   <Tab key="desc" title="Deskripsi Program" className="pb-0 ps-0 w-full">
                     <Card className="w-full">
                       <CardBody className=" text-justify indent-8">
                         <p>{data.desc_program || "Deskripsi program belum tersedia."}</p>
                       </CardBody>
                     </Card>
                   </Tab>
                   <Tab key="keunggulan" title="Keunggulan Prodi" className="pb-0 ps-0 w-full">
                     <Card className="w-full">
                       <CardBody className=" text-justify indent-8">
                           <p>{data.keunggulan || "Keunggulan prodi belum tersedia."}</p>
                       </CardBody>
                     </Card>
                   </Tab>
                 </Tabs>
               </div>
             </CardBody>
           </Card>
        </Tab>

        {/* Tab 4: Kerja Sama */}
        <Tab key="kerjaSama" title="Kerja Sama Prodi" className="w-full">
          <Card className="mainColor mt-2 w-full">
            <h1 className="text-white text-center text-3xl p-6 underline underline-offset-10">Kerja Sama</h1>
            <CardBody className="pt-0">
              {data.kerjasama.length === 0 ? (
                <p className="text-white text-center pb-6">Belum ada data kerjasama yang dapat ditampilkan.</p>
              ) : (
                <div className="flex flex-wrap justify-evenly gap-4 mb-5">
                  {data.kerjasama.map((item) => (
                    <Image
                      key={item.id}
                      alt={`Mitra Kerjasama ${item.id}`} 
                      src={item.link_url} // Ini sudah benar
                      width={221}
                      height={334}
                      className="object-cover rounded-xl"
                    />
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      
      {/* Visi Misi Section (di luar Tabs) */}
      <svg className="w-screen relative left-1/2 -translate-x-1/2 -mb-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#0A0950" fillOpacity="1" d="M0,192L60,181.3C120,171,240,149,360,160C480,171,600,213,720,213.3C840,213,960,171,1080,170.7C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
      <div id="Visi-Misi" className="w-screen relative left-1/2 -translate-x-1/2 h-200 mainColor">
        <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row justify-between items-center py-10">
          <div className="">
            <div className="mb-5">
              <div className="text-white font-bold text-2xl text-center rounded-lg bg-blue-800 w-30 p-2 my-2 hover justify-self-start">Visi</div>
              <div className="bg-white rounded-lg w-auto p-5 justify-content text-justify indent-8">
                {data.visi || "Visi belum tersedia."}
              </div>
            </div>
            <div className="">
              <div className="text-white font-bold text-2xl text-center rounded-lg bg-blue-800 w-30 p-2 mt-5 mb-2 hover justify-self-end">Misi</div>
              <div className="bg-white rounded-lg w-auto">
                <MisiDisplay misiString={data.misi} />
              </div>
            </div>
          </div>
          <div className="hidden lg:block bg-gray-300 rounded-2xl w-80 h-75 pr-5 ml-25 hover mt-10 lg:mt-0">
            <div className="bg-gray-400 rounded-2xl w-80 h-75 p-5 -mt-5 -ml-5">
              <Image alt="Img" src="/mentahan.png" className="-mt-15" />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}