"use client";
import React from "react";
import { Card, CardFooter, Image, Button, User } from "@heroui/react";
import { Tabs, Tab, CardBody, CardHeader } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
import "../styles/globals.css";
import { FaUserGraduate, FaMedal, FaMoneyBillWave } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

//mengatur isi accordion/content
const defaultContent = [
  {
    judul: "Analis Sistem (System Analyst)",
    penjelasan: (
      <div className="text-justify">
        <p className="indent-8">
          Seorang analis sistem bertanggung jawab untuk menganalisis kebutuhan pengguna dan bisnis, lalu merancang solusi sistem informasi yang
          sesuai. Mereka adalah 'penerjemah' antara tim bisnis dan tim teknis (programmer).
        </p>
        <p className="indent-8 mt-2">
          Tugas utama: Menganalisis masalah, merancang sistem baru, dan memastikan sistem yang dikembangkan sesuai dengan kebutuhan bisnis.
        </p>
      </div>
    ),
  },
  {
    judul: "Konsultan TI (IT Consultant)",
    penjelasan: (
      <div className="text-justify">
        <p className="indent-8">
          Konsultan TI memberikan saran ahli kepada perusahaan tentang cara terbaik memanfaatkan teknologi untuk mencapai tujuan bisnis mereka. Peran
          ini membutuhkan pemahaman mendalam tentang teknologi dan strategi bisnis.
        </p>
        <p className="indent-8 mt-2">
          Tugas utama: Mengevaluasi sistem TI yang ada, mengidentifikasi masalah, dan merekomendasikan perbaikan atau implementasi teknologi baru.
        </p>
      </div>
    ),
  },
  {
    judul: "Pengembang Perangkat Lunak/Web (Software/Web Developer)",
    penjelasan: (
      <div className="text-justify">
        <p className="indent-8">
          Meskipun tidak sekode-intensif lulusan Teknik Informatika, banyak lulusan SI yang memiliki kemampuan coding yang kuat dan bekerja sebagai
          pengembang. Keunggulan mereka adalah pemahaman konteks bisnis dari aplikasi yang mereka buat.
        </p>
        <p className="indent-8 mt-2">
          Tugas utama: Merancang, membangun, dan memelihara aplikasi perangkat lunak atau situs web sesuai kebutuhan klien atau perusahaan.
        </p>
      </div>
    ),
  },
  {
    judul: "Spesialis Basis Data (Database Administrator/Specialist)",
    penjelasan: (
      <div className="text-justify">
        <p className="indent-8">
          Bertanggung jawab untuk merancang, mengimplementasikan, mengelola, dan memelihara database perusahaan. Mereka memastikan data tersimpan
          dengan aman, terorganisir, dan mudah diakses.
        </p>
        <p className="indent-8 mt-2">Tugas utama: Mengelola keamanan data, melakukan pencadangan (backup), dan mengoptimalkan kinerja database.</p>
      </div>
    ),
  },
  {
    judul: "Pengelola Data (Data Steward / Data Governor)",
    penjelasan: (
      <div className="text-justify">
        <p className="indent-8">
          Peran ini sangat cocok untuk lulusan SI yang kuat dalam pemahaman proses dan manajemen. Seorang Data Steward bertanggung jawab atas
          kualitas, keamanan, dan kebijakan penggunaan aset data perusahaan. Mereka adalah 'penjaga' data.
        </p>
        <p className="indent-8 mt-2">
          Tugas utama: Menetapkan standar dan kebijakan data, memastikan kepatuhan terhadap regulasi (misalnya privasi data), dan bekerja sama dengan
          berbagai departemen untuk menjaga kualitas data di seluruh organisasi.
        </p>
      </div>
    ),
  },
  {
    judul: "Ilmuwan Data (Data Scientist)",
    penjelasan: (
      <div className="text-justify">
        <p className="indent-8">
          Meskipun peran Data Scientist murni sering membutuhkan latar belakang statistika yang kuat, lulusan SI sangat cocok untuk posisi Data
          Scientist yang berorientasi pada bisnis. Mereka unggul dalam mengidentifikasi masalah bisnis yang bisa dipecahkan dengan data dan
          menafsirkan hasil model prediktif menjadi strategi nyata.
        </p>
        <p className="indent-8 mt-2">
          Tugas utama: Menerapkan teknik statistik dan machine learning untuk membuat model prediksi, melakukan analisis mendalam untuk menjawab
          pertanyaan bisnis yang kompleks, dan mengkomunikasikan hasil temuannya kepada stakeholder.
        </p>
      </div>
    ),
  },
  {
    judul: "Analis Business Intelligence (BI Analyst)",
    penjelasan: (
      <div className="text-justify">
        <p className="indent-8">
          Peran ini sangat selaras dengan keahlian inti SI. Seorang Analis BI fokus pada penggunaan tools dan teknik untuk menyajikan data historis
          dan saat ini dalam format yang mudah dipahami oleh manajemen. Mereka membantu perusahaan 'bercermin' pada datanya sendiri.
        </p>
        <p className="indent-8 mt-2">
          Tugas utama: Merancang dan mengembangkan solusi BI (seperti dashboard interaktif), mengelola data warehouse, dan memastikan para pengambil
          keputusan memiliki akses ke informasi yang akurat dan tepat waktu.
        </p>
      </div>
    ),
  },
];

export default function HomeSI() {
return (
  <div className="container">
    <Tabs
      className="w-full max-w-8xl mx-auto"
      aria-label="Dynamic tabs"
      placement="top"
      classNames={{
        tabList: "w-full p-2 mainColor",
        tab: "w-full text-center px-3 py-5 font-bold",
        tabContent: "text-white group-data-[selected=true]:text-black",
      }}
    >
      {/* Tab 1: Tentang */}
      <Tab key="tentang" title="Tentang">
        <Card className="mainColor text-white mt-2">
          <div className="p-6">
            <strong className="text-3xl underline underline-offset-10">Sistem Informasi</strong>
            <p className="mt-6 text-justify indent-8">
              Sistem informasi adalah gabungan terorganisir dari manusia, perangkat keras, perangkat lunak, jaringan komunikasi, dan sumber data yang
              mengumpulkan, mengubah, dan menyebarkan informasi dalam suatu organisasi. Pada dasarnya, sistem ini dirancang untuk mengubah data mentah
              menjadi informasi yang berguna dan dapat dipahami untuk mendukung pengambilan keputusan.
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
              <h1 className="text-3xl font-bold text-center underline underline-offset-10">Prospek kerja</h1>
              <p className="mt-6 text-justify indent-8">
                Lulusan Sistem Informasi memiliki prospek kerja yang sangat cerah dan luas. Hal ini karena mereka dibekali kemampuan unik yang
                menjembatani dunia teknologi informasi (TI) dan bisnis. Mereka tidak hanya paham tentang teknologi seperti software, database, dan
                jaringan, tetapi juga mengerti bagaimana teknologi tersebut dapat digunakan untuk memecahkan masalah bisnis dan meningkatkan efisiensi
                perusahaan.
              </p>
              <p className="text-justify indent-8 mt-2">
                Singkatnya, prospek kerjanya sangat menjanjikan karena hampir semua industri di era digital ini membutuhkan ahli yang bisa
                menyelaraskan teknologi dengan tujuan bisnis.
              </p>
            </div>
            {/* Bagian Kanan: Judul H1 */}
            <div className="flex-1">
              <Accordion className="" itemClasses={{ title: "text-white", base: "border-b border-white" }}>
                {defaultContent.map((item, index) => (
                  <AccordionItem key={index} aria-label={item.judul} className="overflow-hidden" title={item.judul}>
                    {item.penjelasan}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardBody>
        </Card>
      </Tab>

      {/* Tab 3: Program Pendidikan */}
      <Tab key="programPendidikan" title="Program Pendidikan">
        <Card className="mainColor text-white mt-2">
          <CardBody className="p-6">
            <h1 className="text-center underline underline-offset-10 text-3xl">Program Pendidikan</h1>
            <div className="flex flex-wrap justify-evenly items-center pt-6">
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
                      <p>
                        Program studi ini dirancang untuk mencetak para ahli dan pemimpin masa depan di era ekonomi digital yang berfokus pada
                        <b>b Data dan Data Science</b>. Kami berkomitmen untuk menghasilkan lulusan yang tidak hanya unggul secara teknis, tetapi juga
                        memiliki relevansi tinggi dengan kebutuhan industri serta mampu berkontribusi secara nyata pada pembangunan daerah, khususnya
                        dalam mendukung implementasi konsep <b>Smart City di Kepulauan Riau</b>.
                      </p>
                      <p className="mt-2">
                        Melalui pendekatan kurikulum modern <b>Outcome-Based Education (OBE)</b>, proses pembelajaran kami memastikan setiap mahasiswa
                        mencapai kompetensi yang telah ditetapkan, selaras dengan perkembangan teknologi terkini.
                      </p>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="videos" title="Keunggulan Prodi" className="pb-0 ps-0">
                  <Card>
                    <CardBody className=" text-justify">
                      <p className="indent-8">
                        Keunggulan utama program studi ini terletak pada <b>kurikulumnya yang sangat terfokus </b>pada bidang paling dicari saat ini,
                        yaitu Big Data dan Data Science. Kurikulum modern ini tidak hanya bersifat teoretis, tetapi juga dihubungkan langsung dengan
                        penerapan praktis melalui keterlibatan aktif dalam pengembangan proyek <b>Smart City di Kepulauan Riau</b>, memastikan
                        mahasiswa mendapatkan pengalaman proyek yang nyata sebelum lulus.
                      </p>
                      <p className="indent-8 mt-2">
                        Lebih dari itu, program ini dirancang untuk membentuk lulusan yang komplet. Selain menguasai{" "}
                        <b>keahlian teknis (hardskills)</b>
                        yang mendalam, mahasiswa juga dibekali <b>keterampilan wirausaha (softskills) </b>untuk mendorong mereka menjadi inovator,
                        bukan sekadar pekerja.
                      </p>
                      <p className="indent-8 mt-2">
                        Sebagai pelengkap, <b>jaringan kemitraan yang kuat</b> dengan berbagai industri dan pemerintah membuka akses luas untuk magang
                        berkualitas dan peluang karir. Kombinasi inilah yang memastikan lulusan tidak hanya unggul secara akademis, tetapi juga{" "}
                        <b>siap kerja dan berdaya saing tinggi</b> di tingkat lokal maupun nasional.
                      </p>
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
          <h1 className="text-white text-center text-3xl p-6 underline underline-offset-10">Kerja Sama</h1>
          <CardBody className="pt-0">
            <div className="flex flex-wrap justify-evenly mb-5">
              <Image alt="Kerja Sama Prodi" src="https://heroui.com/images/hero-card-complete.jpeg" width={221} height={334} />
              <Image alt="Kerja Sama Prodi" src="https://heroui.com/images/hero-card-complete.jpeg" width={221} height={334} />
              <Image alt="Kerja Sama Prodi" src="https://heroui.com/images/hero-card-complete.jpeg" width={221} height={334} />
              <Image alt="Kerja Sama Prodi" src="https://heroui.com/images/hero-card-complete.jpeg" width={221} height={334} />
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
                Menjadikan Program studi Sistem Informasi STT Indonesia Tanjungpinang <b>berkualitas dan unggul</b> pada tahun 2025 dalam pengajaran,
                penelitian, dan pengabdian masyarakat bidang <b>Big Data dan Data Science</b> di Kepulauan Riau.
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
                    Menyiapkan mahasiswa untuk memasuki dunia kerja yang mampu bersaing baik lokal maupun nasional, mandiri dalam bidang Big Data dan
                    Data Science, memiliki etos kerja tinggi, beretika, dan dapat bekerjasama dalam tim kerja.
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