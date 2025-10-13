"use client";
import { Image } from "@heroui/react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      {" "}
      <svg className="w-screen relative left-1/2 -translate-x-1/2 -mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0A0950"
          fillOpacity="1"
          d="M0,192L60,181.3C120,171,240,149,360,160C480,171,600,213,720,213.3C840,213,960,171,1080,170.7C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <div className="w-screen relative left-1/2 -translate-x-1/2 mainColor">
        <div className="px-6 text-white container mx-auto flex-grow pt-5">
          <div className="">
            <div className="flex flex-row mb-5">
              <div className="mr-auto">
                <div className="flex flex-row">
                  <Image alt="Logo STTI" src="logo-white.png" width={50} />
                  <h1 className="ml-2">
                    Sekolah Tinggi Teknologi Indonesia <br />
                    Tanjungpinang
                  </h1>
                </div>
                <p className="text-sm mt-4">
                  Website Seputar Prodi Kampus & Mahasiswa <br />
                  STTI Tanjungpinang
                </p>
                <div className="flex flex-row gap-4 text-2xl mt-4">
                  <a href="">
                    <FaInstagram />
                  </a>
                  <a href="">
                    <FaFacebook />
                  </a>
                  <a href="">
                    <FaSquareXTwitter />
                  </a>
                  <a href="">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
              <div className="mx-auto">
                <h1 className="pb-4 text-xl underline underline-offset-4">Get In Touch</h1>
                <div className="">
                  <p className="my-3">example@gmail.com</p>
                  <p className="my-3">+62 812 456 789</p>
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

            <div className="w-screen relative left-1/2 -translate-x-1/2 bg-white h-0.5"></div>
            <p className="text-center mt-3 text-sm mr-auto pb-3">© 2025 STTI Tanjungpinang. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
