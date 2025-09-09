"use client";
import {Image} from "@heroui/react"; 
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa"

export default function Footer() {
    return (
        <>
        <div className="px-6 container mx-auto flex-grow pt-10">
            <div className="">
                <div className="flex flex-row mb-5">
                    <div className="mr-auto">
                        <div className="flex flex-row">
                            <Image
                            alt="Logo STTI"
                            src="ERD.png"
                            width={50}
                            />
                            <h1 className="ml-2">Sekolah Tinggi Teknologi Indonesia <br />Tanjungpinang</h1>
                        </div>
                    <p className="text-sm mt-4">Website Seputar Prodi Kampus & Mahasiswa <br />STTI Tanjungpinang</p>
                    <div className="flex flex-row gap-4 text-2xl mt-4">
                        <a href=""><FaInstagram /></a>
                        <a href=""><FaFacebook /></a>
                        <a href=""><FaSquareXTwitter /></a>
                        <a href=""><FaWhatsapp /></a>
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

        <div className="w-screen relative left-1/2 -translate-x-1/2 bg-black h-0.5"></div>
        <p className="text-center mt-3 text-sm mr-auto pb-3">© 2025 STTI Tanjungpinang. All rights reserved.</p>
        </div>
        </div>
        </>
    );
}