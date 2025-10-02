"use client";
import CardDrop from "@/components/CardDrop";
import Searchbar from "@/components/Searchbar";
import { useState } from "react";
import type { Selection } from "@heroui/react";
import "@/styles/globals.css";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

export default function DaftarDosenPage() {
  //state untuk menyimpan nilai filter
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["ALL"]));

  const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(", ").replace(/_/g, ""), [selectedKeys]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center">Daftar Dosen</h1>

      <div className="grid grid-cols-[auto_78px] justify-stretch mt-6 mb-6">
        {/* searchbar */}
        <Searchbar />

        {/* filter menggunakan dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button className="capitalize text-white mainColor h-auto" variant="bordered">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Single selection"
            selectedKeys={selectedKeys}
            selectionMode="single"
            variant="flat"
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="ALL">Semua Prodi</DropdownItem>
            <DropdownItem key="IF">Teknik Informatika</DropdownItem>
            <DropdownItem key="SI">Sistem Informasi</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <CardDrop value={selectedValue} />
    </div>
  );
}
