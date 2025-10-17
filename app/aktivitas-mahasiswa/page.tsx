"use client";

import { useEffect, useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Spinner } from "@heroui/react";
import { extractPlainText } from "@/lib/richText";

interface BeritaMhsItem {
  nomor: number;
  title: string;
  link: string;
  tanggal: string;
  gambar: string;
  kepalaBerita: string;
  isiBerita: string;
  ekorBerita: string;
}
interface ApiBerita {
  id: number;
  judul: string;
  slug: string;
  gambar_berita: string;
  kepala_berita: string;
  tubuh_berita: string;
  ekor_berita: string;
  created_at: string;
}

function BeritaMhsCard({ item }: { item: BeritaMhsItem }) {
  return (
    <div className="group relative aspect-[19/20] w-full overflow-hidden rounded-2xl shadow-lg">
      <img
        src={item.gambar ? `http://localhost:8000/storage/${item.gambar}` : "/default-image.jpg"}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-4 text-white">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-3">
          <p className="text-sm opacity-90">{item.tanggal}</p>
          <h3 className="text-xl font-bold leading-tight mt-1">{item.title}</h3>
        </div>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
          <div className="flex translate-y-3 transform flex-col gap-3 overflow-hidden text-sm leading-relaxed opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <p className="indent-8 text-justify">{item.kepalaBerita}</p>
            <a
              href={item.link}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors duration-300 hover:text-blue-400"
            >
              <span>Baca Selengkapnya</span>
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AktivitasMhs() {
  const [pageContent, setPageContent] = useState<BeritaMhsItem[]>([]);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    let active = true;
    async function fetchData() {
      try {
        const response = await fetch("/api/berita", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }

        const data: ApiBerita[] = await response.json();

        if (!active) {
          return;
        }

        const mapped = data.map((item) => ({
          nomor: item.id,
          title: item.judul,
          link: `/aktivitas-mahasiswa/berita/${item.slug}`,
          tanggal: new Date(item.created_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          gambar: item.gambar_berita,
          kepalaBerita: extractPlainText(item.kepala_berita),
          isiBerita: item.tubuh_berita,
          ekorBerita: item.ekor_berita,
        }));
        setPageContent(mapped);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Terjadi kesalahan tak terduga.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!api) return;

    const updateIndex = () => setCurrentIndex(api.selectedScrollSnap());

    updateIndex();
    api.on("select", updateIndex);
    api.on("reInit", updateIndex);

    return () => {
      api.off("select", updateIndex);
      api.off("reInit", updateIndex);
    };
  }, [api]);

  const snapCount = pageContent.length;
  const indicators = useMemo(() => Math.max(1, Math.max(0, snapCount - 2)), [snapCount]);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Spinner variant="dots" label="Memuat Informasi Aktivitas Mahasiswa..." classNames={{ label: "mt-4 text-[#0a0950]", dots: "!bg-[#0a0950]" }} />
      </div>
    );

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="container space-y-6 px-6 py-10">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Aktivitas Mahasiswa</h2>
        <p className="text-sm text-neutral-500">Sorotan Aktivitas dan Berita terbaru mahasiswa STTI Tanjungpinang.</p>
      </div>

      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="">
          {pageContent.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <BeritaMhsCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 hidden sm:flex" />
        <CarouselNext className="right-3 hidden sm:flex" />
      </Carousel>

      <div className="flex justify-center gap-2">
        {Array.from({ length: indicators }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={cn("h-2 rounded-full transition-all", currentIndex === index ? "w-5 bg-[#0a0950]" : "w-2 bg-neutral-300 dark:bg-neutral-700")}
            aria-label={`Slide ${index + 1}`}
            aria-current={currentIndex === index}
          />
        ))}
      </div>
    </section>
  );
}
