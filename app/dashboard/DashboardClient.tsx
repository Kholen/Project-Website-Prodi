"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const router = useRouter();
  // Tambahkan loading state untuk mencegah "kedipan" konten
  const [isLoading, setIsLoading] = useState(true);

  // 2. Pindahkan semua logika side-effect ke dalam useEffect
  useEffect(() => {
    // Kode di sini hanya berjalan di browser, setelah render awal
    const token = localStorage.getItem("authToken");

    if (!token) {
      // Jika tidak ada token, lakukan redirect
      router.replace("/sign-in");
    } else {
      // Jika ada token, komponen siap ditampilkan
      setIsLoading(false);
    }
    // [] berarti efek ini hanya berjalan sekali saat komponen pertama kali dimuat
  }, [router]);

  // Selama pengecekan, tampilkan pesan loading atau null
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return null;
}
