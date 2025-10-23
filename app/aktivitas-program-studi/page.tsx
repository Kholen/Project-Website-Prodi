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

interface PengumumanItem {
  id: number;
  judul: string;
  tanggal: string;
  gambar: string | null;
  kepala: string;
  isi: string;
  ekor: string;
}

interface ApiPengumuman {
  id: number;
  judul: string;
  gambar: string | null;
  kepala_pengumuman: string | null;
  isi_pengumuman: string;
  ekor_pengumuman: string | null;
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

function PengumumanCard({ item }: { item: PengumumanItem }) {
  return (
    <div className="group relative aspect-[19/20] w-full overflow-hidden rounded-2xl shadow-lg">
      <img
        src={item.gambar ? `http://localhost:8000/storage/${item.gambar}` : "/default-image.jpg"}
        alt={item.judul}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-4 text-white">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-3">
          <p className="text-sm opacity-90">{item.tanggal}</p>
          <h3 className="text-xl font-bold leading-tight mt-1">{item.judul}</h3>
        </div>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
          <div className="flex translate-y-3 transform flex-col gap-3 overflow-hidden text-sm leading-relaxed opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <p className="indent-8 text-justify">{item.kepala}</p>
            <a
              href={`/aktivitas-program-studi/pengumuman/${item.id}`}
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
  const [beritaContent, setBeritaContent] = useState<BeritaMhsItem[]>([]);
  const [pengumumanContent, setPengumumanContent] = useState<PengumumanItem[]>([]);
  const [beritaApi, setBeritaApi] = useState<CarouselApi | null>(null);
  const [pengumumanApi, setPengumumanApi] = useState<CarouselApi | null>(null);
  const [beritaError, setBeritaError] = useState<string | null>(null);
  const [pengumumanError, setPengumumanError] = useState<string | null>(null);
  const [loadingBerita, setLoadingBerita] = useState(true);
  const [loadingPengumuman, setLoadingPengumuman] = useState(true);
  const [currentBeritaIndex, setCurrentBeritaIndex] = useState(0);
  const [currentPengumumanIndex, setCurrentPengumumanIndex] = useState(0);

  useEffect(() => {
    let active = true;

    async function fetchBerita() {
      try {
        setBeritaError(null);
        const response = await fetch("/api/berita", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Gagal mengambil data berita dari server");
        }
        const data: ApiBerita[] = await response.json();
        if (!active) {
          return;
        }
        const sortedBerita = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const mapped = sortedBerita.map((item) => ({
          nomor: item.id,
          title: item.judul,
          link: `/aktivitas-program-studi/berita/${item.slug}`,
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
        setBeritaContent(mapped);
      } catch (err) {
        if (!active) {
          return;
        }
        const message = err instanceof Error ? err.message : "Terjadi kesalahan saat memuat berita.";
        setBeritaError(message);
      } finally {
        if (active) {
          setLoadingBerita(false);
        }
      }
    }

    async function fetchPengumuman() {
      try {
        setPengumumanError(null);
        const response = await fetch("/api/pengumuman", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Gagal mengambil data pengumuman dari server");
        }
        const data: ApiPengumuman[] = await response.json();
        if (!active) {
          return;
        }
        const sortedPengumuman = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const mapped = sortedPengumuman.map((item) => ({
          id: item.id,
          judul: item.judul,
          tanggal: new Date(item.created_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          gambar: item.gambar,
          kepala: extractPlainText(item.kepala_pengumuman),
          isi: item.isi_pengumuman,
          ekor: item.ekor_pengumuman ?? "",
        }));
        setPengumumanContent(mapped);
      } catch (err) {
        if (!active) {
          return;
        }
        const message = err instanceof Error ? err.message : "Terjadi kesalahan saat memuat pengumuman.";
        setPengumumanError(message);
      } finally {
        if (active) {
          setLoadingPengumuman(false);
        }
      }
    }

    fetchBerita();
    fetchPengumuman();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!beritaApi) return;

    const updateIndex = () => setCurrentBeritaIndex(beritaApi.selectedScrollSnap());
    updateIndex();
    beritaApi.on("select", updateIndex);
    beritaApi.on("reInit", updateIndex);

    return () => {
      beritaApi.off("select", updateIndex);
      beritaApi.off("reInit", updateIndex);
    };
  }, [beritaApi]);

  useEffect(() => {
    if (!pengumumanApi) return;

    const updateIndex = () => setCurrentPengumumanIndex(pengumumanApi.selectedScrollSnap());
    updateIndex();
    pengumumanApi.on("select", updateIndex);
    pengumumanApi.on("reInit", updateIndex);

    return () => {
      pengumumanApi.off("select", updateIndex);
      pengumumanApi.off("reInit", updateIndex);
    };
  }, [pengumumanApi]);

  const beritaIndicators = useMemo(() => Math.max(1, Math.max(0, beritaContent.length - 2)), [beritaContent.length]);
  const pengumumanIndicators = useMemo(() => Math.max(1, Math.max(0, pengumumanContent.length - 2)), [pengumumanContent.length]);

  if (loadingBerita && loadingPengumuman) {
    return (
      <div className="flex justify-center py-10">
        <Spinner
          variant="dots"
          label="Memuat Informasi Aktivitas Program Studi..."
          classNames={{ label: "mt-4 text-[#0a0950]", dots: "!bg-[#0a0950]" }}
        />
      </div>
    );
  }

  return (
    <section className="container space-y-10 px-6 py-10">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Aktivitas Program Studi</h2>
        <p className="text-sm text-neutral-500">Sorotan terbaru berita dan pengumuman Program Studi STTI Tanjungpinang.</p>
      </div>

      <div className="space-y-6">
        <header className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-[#0a0950]">Pengumuman Terbaru</h3>
          {pengumumanError && <p className="text-sm text-red-500">{pengumumanError}</p>}
        </header>
        {pengumumanContent.length ? (
          <>
            <Carousel className="w-full" setApi={setPengumumanApi}>
              <CarouselContent>
                {pengumumanContent.map((item, index) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                    <PengumumanCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 hidden sm:flex" />
              <CarouselNext className="right-3 hidden sm:flex" />
            </Carousel>

            <div className="flex justify-center gap-2">
              {Array.from({ length: pengumumanIndicators }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => pengumumanApi?.scrollTo(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    currentPengumumanIndex === index ? "w-5 bg-[#0a0950]" : "w-2 bg-neutral-300 dark:bg-neutral-700"
                  )}
                  aria-label={`Slide pengumuman ${index + 1}`}
                  aria-current={currentPengumumanIndex === index}
                />
              ))}
            </div>
          </>
        ) : !loadingPengumuman && !pengumumanError ? (
          <p className="text-sm text-center text-neutral-500">Belum ada pengumuman.</p>
        ) : null}
      </div>

      <div className="space-y-6">
        <header className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-[#0a0950]">Berita Terbaru</h3>
          {beritaError && <p className="text-sm text-red-500">{beritaError}</p>}
        </header>
        {beritaContent.length ? (
          <>
            <Carousel className="w-full" setApi={setBeritaApi}>
              <CarouselContent>
                {beritaContent.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <BeritaMhsCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 hidden sm:flex" />
              <CarouselNext className="right-3 hidden sm:flex" />
            </Carousel>

            <div className="flex justify-center gap-2">
              {Array.from({ length: beritaIndicators }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => beritaApi?.scrollTo(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    currentBeritaIndex === index ? "w-5 bg-[#0a0950]" : "w-2 bg-neutral-300 dark:bg-neutral-700"
                  )}
                  aria-label={`Slide berita ${index + 1}`}
                  aria-current={currentBeritaIndex === index}
                />
              ))}
            </div>
          </>
        ) : !loadingBerita && !beritaError ? (
          <p className="text-sm text-center text-neutral-500">Belum ada data berita.</p>
        ) : null}
      </div>
    </section>
  );
}
