export default function BlogPage() {
  const isiTable = [
    {
      judul:
        "Penelitian tentang Lorem ipsum dolor, sit amet consectetur adipisicing",
      namaKP: "Muhammad Yuri Ferdinand Adinata",
      tahun: "2025",
      url: "https://forum.upbatam.ac.id/index.php/prosiding/article/view/5202",
    },
    {
      judul:
        "Penelitian tentang Lorem ipsum dolor, sit amet consectetur adipisicing",
      namaKP: "Ahmed",
      tahun: "2025",
      url: "https://forum.upbatam.ac.id/index.php/prosiding/article/view/5202",
    },
  ];

  return (
    <>
      <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-500">
          <thead
            className="text-xs text-white uppercase"
            style={{ backgroundColor: "#4A5568" }}
          >
            <tr>
              <th className="py-3 px-6" scope="col">
                No
              </th>
              <th className="py-3 px-6" scope="col">
                Judul
              </th>
              <th className="py-3 px-6" scope="col">
                Nama Ketua Panitia
              </th>
              <th className="py-3 px-6" scope="col">
                Tahun
              </th>
              <th className="py-3 px-6" scope="col">
                URL Publikasi
              </th>
            </tr>
          </thead>

          <tbody>
            {isiTable.map((item, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                {/* Kolom untuk Nomor Urut */}
                <td className="py-4 px-6 font-medium">{index + 1}</td>

                {/* Kolom untuk Judul, menggunakan <td> bukan <th> */}
                <td className="py-4 px-6 font-medium text-gray-900" scope="row">
                  {item.judul}
                </td>

                {/* Kolom untuk Nama Ketua Panitia (diperbaiki dari isi.judul menjadi isi.namaKP) */}
                <td className="py-4 px-6">{item.namaKP}</td>

                {/* Kolom untuk Tahun */}
                <td className="py-4 px-6">{item.tahun}</td>

                {/* Kolom untuk URL */}
                <td className="py-4 px-6">
                  <a
                    className="text-blue-600 hover:underline"
                    href={item.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Lihat Publikasi
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
