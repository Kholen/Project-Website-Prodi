import { title } from "@/components/primitives";
import { Image } from "@heroui/image";

export default function TentangMhs() {
  const pageContent = [
    {
      title: "Organisasi Mahasiswa",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi corrupti fugit excepturi aut rerum. Excepturi culpa, dolorem quam laboriosam tempora molestiae numquam quasi repudiandae explicabo suscipit vel laudantium laborum itaque. Lorem ipsum dolor, sit amet consectetur." , 
      img: "/example.jpg"
    },
    {
      title: "Organisasi Mahasiswa",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi corrupti fugit excepturi aut rerum. Excepturi culpa, dolorem quam laboriosam tempora molestiae numquam quasi repudiandae explicabo suscipit vel laudantium laborum itaque. Lorem ipsum dolor, sit amet consectetur." , 
      img: "/example.jpg"
    },
    {
      title: "Organisasi Mahasiswa",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi corrupti fugit excepturi aut rerum. Excepturi culpa, dolorem quam laboriosam tempora molestiae numquam quasi repudiandae explicabo suscipit vel laudantium laborum itaque. Lorem ipsum dolor, sit amet consectetur." , 
      img: "/example.jpg"
    },
  ];

  const mainPage = [
    {
      title: "Organisasi Mahasiswa",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quae ab consequatur veritatis,",
      content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi corrupti fugit excepturi aut rerum. Excepturi culpa, dolorem quam laboriosam tempora molestiae numquam quasi repudiandae explicabo suscipit vel laudantium laborum itaque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae enim quo porro et aspernatur velit ex, hic soluta dicta, at ab mollitia dolores numquam! Natus impedit reprehenderit saepe aut est? Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus debitis magnam ducimus a necessitatibus consequuntur sapiente expedita, modi, ratione eos vero magni libero soluta ullam odio accusantium dignissimos reiciendis inventore.",
      img: "/example.jpg"
    },
  ]
  return (
    <div className="flex flex-wrap gap-8">
      {/* Card Utama */}
      {mainPage.map((item, index) => (
        <div key={index} className="relative h-96 w-full overflow-hidden rounded-xl shadow-lg group">
        <img
          src={item.img}
          alt="Mahasiswa Berdiskusi"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-end p-6 text-white">
          <h3 className="text-xl font-bold mb-2 transform transition-transform duration-500 ease-in-out group-hover:-translate-y-20">
            {item.title}
          </h3>
          <p className="text-sm opacity-90 mb-4 transform transition-transform duration-500 ease-in-out delay-75 group-hover:-translate-y-20">
            {item.description}
          </p>
          <div className="transform transition-all duration-500 ease-in-out delay-150 opacity-0 invisible h-0 group-hover:opacity-100 group-hover:visible group-hover:-translate-y-20">
            <p className="text-xs">
              {item.content}
            </p>
          </div>
        </div>
      </div>
      ))}

      {/* Card Kecil */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {pageContent.map((item, index) => ( 
          <div key={index} className="relative h-96 w-auto overflow-hidden rounded-xl shadow-lg group">
          <img
            src={item.img}
            alt="Mahasiswa Berdiskusi"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="relative h-full flex flex-col justify-end p-6 text-white">
            <h3 className="text-xl font-bold mb-2 transform transition-transform duration-500 ease-in-out group-hover:-translate-y-20">
              {item.title}
            </h3>
            <p className="text-sm opacity-90 mb-4 transform transition-transform duration-500 ease-in-out delay-75 group-hover:-translate-y-20">
              {item.description}
            </p>
            <div className="transform transition-all duration-500 ease-in-out delay-150 opacity-0 invisible h-0 group-hover:opacity-100 group-hover:visible group-hover:-translate-y-20">
              <p className="text-xs">
               {item.content}
              </p>
            </div>
          </div>
        </div>
        ))}

      </div>

    </div>
  );
}
