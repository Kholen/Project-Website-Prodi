import { Button } from "@heroui/button";
import { FiArrowLeft } from "react-icons/fi";
export  default function BeritaLayout() {
  return (
    <div className="container p-8">
      <Button className="mb-4 bg-[#0a0950] text-white"><FiArrowLeft/>Kembali</Button>
      <div className="bg-white p-8 rounded-lg">
        <div className="">
          <h1 className="text-3xl font-bold">
            Daftar Negara Akan Kirim Pasukan ke Gaza, RI hingga Turki 
          </h1>
          <p className="text-[#0a0950] font-semibold">AdminZ</p>
          <p className="text-tiny text-default-500 mb-1">Senin, 11 November 2025</p>
          <div className="h-80 p-auto bg-amber-800"></div>
          <br />
          <p>kepala berita:</p>
          <p className="indent-8 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, est recusandae accusantium illum dignissimos earum repudiandae provident
            consequuntur ipsa ipsam nam officiis atque minima quam possimus tempore iusto cupiditate repellat. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sit, est recusandae accusantium illum dignissimos earum repudiandae provident consequuntur ipsa ipsam nam officiis atque
            minima quam possimus tempore iusto cupiditate repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, est recusandae
            accusantium illum dignissimos earum repudiandae provident consequuntur ipsa ipsam nam officiis atque minima quam possimus tempore iusto
            cupiditate repellat.
          </p>
          <br />
          <p>tubuh berita:</p>
          <p className="indent-8 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, est recusandae accusantium illum dignissimos earum repudiandae provident
            consequuntur ipsa ipsam nam officiis atque minima quam possimus tempore iusto cupiditate repellat. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sit, est recusandae accusantium illum dignissimos earum repudiandae provident consequuntur ipsa ipsam nam officiis atque
            minima quam possimus tempore iusto cupiditate repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, est recusandae
            accusantium illum dignissimos earum repudiandae provident consequuntur ipsa ipsam nam officiis atque minima quam possimus tempore iusto
            cupiditate repellat.
          </p>
          <br />
          <p>ekor berita:</p>
          <p className="indent-8 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, est recusandae accusantium illum dignissimos earum repudiandae provident
            consequuntur ipsa ipsam nam officiis atque minima quam possimus tempore iusto cupiditate repellat. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sit, est recusandae accusantium illum dignissimos earum repudiandae provident consequuntur ipsa ipsam nam officiis atque
            minima quam possimus tempore iusto cupiditate repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, est recusandae
            accusantium illum dignissimos earum repudiandae provident consequuntur ipsa ipsam nam officiis atque minima quam possimus tempore iusto
            cupiditate repellat.
          </p>
        </div>
      </div>
    </div>
  );}