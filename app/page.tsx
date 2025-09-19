"use client";
import { useEffect, useState } from "react";

import "../styles/globals.css";
import HomeIf from "@/components/HomeIf";
import HomeSi from "@/components/HomeSi";
import { HoverBorderSI } from "@/components/HoverBorderSI";
import { HoverBorderIF } from "@/components/HoverBorderIF";
import { useProdi } from "./context/ProdiContext";
//table data

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;

    const handleScroll = () => {
      if (hash) {
        const id = hash.substring(1);
        const element = document.getElementById(id);

        if (element) {
          const navbarOffset = 80; // Adjust this value to your navbar's height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    // A timeout to ensure the page has rendered before scrolling
    const timer = setTimeout(handleScroll, 100);

    return () => clearTimeout(timer);
  }, []);

  // //mengatur isi accordion/content
  // const defaultContent = [
  //   {
  //     judul: "Analis Sistem (System Analyst)",
  //     penjelasan: (
  //       <div className="text-justify">
  //         <p className="indent-8">
  //           Seorang analis sistem bertanggung jawab untuk menganalisis kebutuhan pengguna dan bisnis, lalu merancang solusi sistem informasi yang sesuai.
  //           Mereka adalah 'penerjemah' antara tim bisnis dan tim teknis (programmer).
  //         </p>
  //         <p className="indent-8 mt-2">
  //           Tugas utama: Menganalisis masalah, merancang sistem baru, dan memastikan sistem yang dikembangkan sesuai dengan kebutuhan bisnis.
  //         </p>
  //       </div>
  //     ),
  //   },
  //   {
  //     judul: "Konsultan TI (IT Consultant)",
  //     penjelasan: (
  //       <div className="text-justify">
  //         <p className="indent-8">
  //           Konsultan TI memberikan saran ahli kepada perusahaan tentang cara terbaik memanfaatkan teknologi untuk mencapai tujuan bisnis mereka. Peran ini
  //           membutuhkan pemahaman mendalam tentang teknologi dan strategi bisnis.
  //         </p>
  //         <p className="indent-8 mt-2">
  //           Tugas utama: Mengevaluasi sistem TI yang ada, mengidentifikasi masalah, dan merekomendasikan perbaikan atau implementasi teknologi baru.
  //         </p>
  //       </div>
  //     ),
  //   },
  //   {
  //     judul: "Pengembang Perangkat Lunak/Web (Software/Web Developer)",
  //     penjelasan: (
  //       <div className="text-justify">
  //         <p className="indent-8">
  //           Meskipun tidak sekode-intensif lulusan Teknik Informatika, banyak lulusan SI yang memiliki kemampuan coding yang kuat dan bekerja sebagai
  //           pengembang. Keunggulan mereka adalah pemahaman konteks bisnis dari aplikasi yang mereka buat.
  //         </p>
  //         <p className="indent-8 mt-2">
  //           Tugas utama: Merancang, membangun, dan memelihara aplikasi perangkat lunak atau situs web sesuai kebutuhan klien atau perusahaan.
  //         </p>
  //       </div>
  //     ),
  //   },
  //   {
  //     judul: "Spesialis Basis Data (Database Administrator/Specialist)",
  //     penjelasan: (
  //       <div className="text-justify">
  //         <p className="indent-8">
  //           Bertanggung jawab untuk merancang, mengimplementasikan, mengelola, dan memelihara database perusahaan. Mereka memastikan data tersimpan
  //           dengan aman, terorganisir, dan mudah diakses.
  //         </p>
  //         <p className="indent-8 mt-2">
  //           Tugas utama: Mengelola keamanan data, melakukan pencadangan (backup), dan mengoptimalkan kinerja database.
  //         </p>
  //       </div>
  //     ),
  //   },
  //   {
  //     judul: "Pengelola Data (Data Steward / Data Governor)",
  //     penjelasan: (
  //       <div className="text-justify">
  //         <p className="indent-8">
  //           Peran ini sangat cocok untuk lulusan SI yang kuat dalam pemahaman proses dan manajemen. Seorang Data Steward bertanggung jawab atas kualitas,
  //           keamanan, dan kebijakan penggunaan aset data perusahaan. Mereka adalah 'penjaga' data.
  //         </p>
  //         <p className="indent-8 mt-2">
  //           Tugas utama: Menetapkan standar dan kebijakan data, memastikan kepatuhan terhadap regulasi (misalnya privasi data), dan bekerja sama dengan
  //           berbagai departemen untuk menjaga kualitas data di seluruh organisasi.
  //         </p>
  //       </div>
  //     ),
  //   },
  //   {
  //     judul: "Ilmuwan Data (Data Scientist)",
  //     penjelasan: (
  //       <div className="text-justify">
  //         <p className="indent-8">
  //           Meskipun peran Data Scientist murni sering membutuhkan latar belakang statistika yang kuat, lulusan SI sangat cocok untuk posisi Data
  //           Scientist yang berorientasi pada bisnis. Mereka unggul dalam mengidentifikasi masalah bisnis yang bisa dipecahkan dengan data dan
  //           menafsirkan hasil model prediktif menjadi strategi nyata.
  //         </p>
  //         <p className="indent-8 mt-2">
  //           Tugas utama: Menerapkan teknik statistik dan machine learning untuk membuat model prediksi, melakukan analisis mendalam untuk menjawab
  //           pertanyaan bisnis yang kompleks, dan mengkomunikasikan hasil temuannya kepada stakeholder.
  //         </p>
  //       </div>
  //     ),
  //   },
  //   {
  //     judul: "Analis Business Intelligence (BI Analyst)",
  //     penjelasan: (
  //       <div className="text-justify">
  //         <p className="indent-8">
  //           Peran ini sangat selaras dengan keahlian inti SI. Seorang Analis BI fokus pada penggunaan tools dan teknik untuk menyajikan data historis dan
  //           saat ini dalam format yang mudah dipahami oleh manajemen. Mereka membantu perusahaan 'bercermin' pada datanya sendiri.
  //         </p>
  //         <p className="indent-8 mt-2">
  //           Tugas utama: Merancang dan mengembangkan solusi BI (seperti dashboard interaktif), mengelola data warehouse, dan memastikan para pengambil
  //           keputusan memiliki akses ke informasi yang akurat dan tepat waktu.
  //         </p>
  //       </div>
  //     ),
  //   },
  // ];

  //fungsi untuk mengganti IF dengan SI
   const { prodi } = useProdi();
  return (
    <div>
        {prodi === "IF" ? <HomeIf /> : <HomeSi />}
    </div>
  );
}
