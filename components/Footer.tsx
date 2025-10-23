"use client";
import { Image } from "@heroui/react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import {useState, useEffect} from "react";

const BACKEND_URL = "http://localhost:8000";

interface Prop {
  id: number;
  visi: string;
  misi: string;
  default_logo: string;
  white_logo: string;
  email: string;
  no_telp: string;
  instagram_url: string;
  whatsapp_url: string;
  facebook_url: string;
  x_url: string;
}

export default function Footer() {
  const pathname = usePathname();
  const textColor = pathname !== "/" ? "text-white" : "";

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

  return (
    <div>
      { pathname !== "/" ? (<svg className="w-screen relative left-1/2 -translate-x-1/2 -mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0A0950"
          fillOpacity="1"
          d="M0,192L60,181.3C120,171,240,149,360,160C480,171,600,213,720,213.3C840,213,960,171,1080,170.7C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>) : null }
      
      <div className={`w-screen relative left-1/2 -translate-x-1/2 ${pathname === "/" ? "bg-white" : "mainColor"}`}>
        <div className= {`px-6 ${textColor} container mx-auto flex-grow pt-5`}>
          <div className="">
            <div className="flex flex-row mb-5">
              <div className="mr-auto">
                <div className="flex flex-row">
                  <Image alt="Logo STTI" src={pathname === "/" ? `${BACKEND_URL}${data?.default_logo}` : `${BACKEND_URL}${data?.white_logo}`} width={50} />
                  <h1 className="ml-2">
                    Sekolah Tinggi Teknologi Indonesia <br />
                    Tanjung Pinang
                  </h1>
                </div>
                <p className="text-sm mt-4">
                  Website resmi Program Studi<br/>
                  STTI Tanjung Pinang
                </p>
                <div className="flex flex-row gap-4 text-2xl mt-4">
                  <a href={data?.instagram_url || ""}>
                    <FaInstagram />
                  </a>
                  <a href={data?.facebook_url || ""}>
                    <FaFacebook />
                  </a>
                  <a href={data?.x_url || ""}>
                    <FaSquareXTwitter />
                  </a>
                  <a href={data?.whatsapp_url || ""}>
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
              <div className="mx-auto">
                <h1 className="pb-4 text-xl underline underline-offset-4">Get In Touch</h1>
                <div className="">
                  <p className="my-3">{data?.email}</p>
                  <p className="my-3">{data?.no_telp}</p>
                  <p>Jl. Pompa Air No.28 (Kampus)</p>
                </div>
              </div>
              <div className="ml-auto jutify-end">
                <h1 className="pb-4 text-xl underline underline-offset-4">Resources</h1>
                <div className="">
                  <p className="my-3">Program Studi</p>
                  <p className="my-3">Mahasiswa</p>
                  <p>Penelitian</p>
                </div>
              </div>
            </div>

            <div className={`w-screen relative left-1/2 -translate-x-1/2 ${pathname !== "/" ? "bg-white" : "bg-black"} h-0.5`}></div>
            <p className="text-center mt-3 text-sm mr-auto pb-3">© 2025 STTI Tanjungpinang. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
