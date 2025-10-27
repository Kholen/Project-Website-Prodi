"use client"
import {Button, Accordion, AccordionItem} from "@heroui/react";
import {FiEdit} from "react-icons/fi";
import Link from "next/link";
export default function EditProdi() {
    return (
    <div className="flex flex-row gap-4">

        <div className="w-1/2">
            <div className="bg-white rounded-lg">
                <h1 className="text-center">Teknik Informatika</h1>
                <p>Visi</p>
                <p>Misi</p>
                <p>Deskripsi</p>
                <p>Keunggulan</p>
                <Link href={`/dashboard/data-prodi/${1}`}>
                    <Button color="primary">Edit</Button>
                </Link>  
            </div>
        </div>

        <div className="w-1/2">
          <div className="bg-white rounded-lg">
            <h1 className="text-center">Sistem Informasi</h1>
            <p>Visi</p>
            <p>Misi</p>
            <p>Deskripsi</p>
            <p>Keunggulan</p>
            <Link href={`/dashboard/data-prodi/${2}`}>
                <Button color="primary">Edit</Button>
            </Link>            
          </div>
        </div>

    </div>
    )
}