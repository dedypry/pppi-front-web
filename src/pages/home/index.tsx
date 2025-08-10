import { Button, Card, Image } from "@heroui/react";
import { useEffect } from "react";

import ListBlogs from "./list-blogs";
import ListAgenda from "./list-agenda";

import Carousel from "@/components/Carousel";
import { apps, certificate } from "@/config/app";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getBanner } from "@/stores/features/banners/action";
import config from "@/config/api";
import { getBlogs } from "@/stores/features/blogs/actions";
import { getScheduler } from "@/stores/features/schedulers/action";

export default function HomePage() {
  const { banners } = useAppSelector((state) => state.banners);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBanner());
    dispatch(getBlogs({}));
    dispatch(getScheduler({ pageSize: 5 }));
  }, []);

  return (
    <div className="pb-10">
      <Carousel
        autoPlay={true}
        className="-mt-[60px]"
        contentCenter={
          <div className="flex h-full flex-col items-center justify-center px-10 text-center">
            <p className="text-[25px] font-bold text-white/70 md:text-[50px]">
              Jadilah Bagian dari Perjalanan Kami
            </p>
            <p className="text-[12px] font-semibold italic text-white/70 md:text-[20px]">
              Kami percaya, kemitraan hebat dimulai dari visi yang sama. <br />{" "}
              Ayo bergabung dan capai lebih banyak bersama
            </p>
            <Button
              className="mt-10 text-white"
              radius="full"
              variant="bordered"
            >
              🚀 Mulai Jadi Partner
            </Button>
          </div>
        }
      >
        {banners.map((item) => (
          <Card
            key={item.id}
            className="flex h-[500px] items-center justify-center rounded-none bg-slate-800"
          >
            <Image
              className="h-full w-screen object-cover"
              radius="none"
              src={item.url}
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 to-black/30" />
            {/* <div className="absolute inset-0 z-20 flex items-center justify-center">
                            <h2 className="text-center text-2xl font-bold text-white">Perawat Kepala Desa</h2>
                        </div> */}
          </Card>
        ))}
      </Carousel>

      <section className="section-home" id="content-left">
        <div className="md:col-span-8">
          <section className="mx-1 mb-10" id="title">
            <p className="text-header">Berita Terbaru</p>
            <p className="text-sub">
              Berita Terbaru Perkumpulan Perawat Pembaharuan Indonesia asdfasdf
            </p>
          </section>
          <ListBlogs />
        </div>
        <div className="md:col-span-4">
          <section className="mb-10" id="agenda">
            <p className="text-header">Agenda</p>
            <p className="text-sub">Agenda PPPI</p>
          </section>
          <ListAgenda />
        </div>
      </section>

      <div className="mt-10 h-[250px] w-full bg-[url('https://gallery.dpn-pppi.org/images/paralax/bg-1.jpg')] bg-cover bg-fixed bg-center bg-no-repeat shadow-lg md:h-[200px]">
        <div className="container mx-auto grid h-full grid-cols-1 gap-5 bg-black/50 px-5 py-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-8">
            <div className="text-white">
              <p className="pb-5 text-[20px] font-bold md:text-[30px]">
                💼 Gabung Sebagai Partner
              </p>
              <p className="border-l-2 border-white pl-5 text-[12px] md:text-[16px]">
                Bersama, kita bisa membangun ekosistem bisnis yang saling
                menguntungkan, memperluas jaringan, dan menciptakan pertumbuhan
                yang berkelanjutan dalam jangka panjang.
              </p>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="flex h-full items-center justify-center">
              <Button
                className="text-white shadow-lg"
                radius="full"
                variant="bordered"
              >
                Daftar Kemitraan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="section-home" id="compro">
        {/* Left: Video */}
        <div className="md:col-span-7">
          <Card className="shadow-lg">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-auto w-full rounded-xl"
              src="https://res.cloudinary.com/elefin-id/video/upload/assets/solutions/wbgncqwrg89c3iohm39d.mov"
            />
          </Card>
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col justify-center space-y-4 md:col-span-5">
          <h2 className="text-header">Company Profile</h2>
          <p className="text-sub">
            Mengenal lebih dekat siapa kami dan apa yang kami lakukan.
          </p>
          <p className="text-sm text-gray-500">
            Video company profile ini memberikan gambaran menyeluruh tentang
            visi, misi, dan nilai-nilai yang kami pegang. Pelajari bagaimana
            kami membangun solusi dan berkolaborasi untuk menciptakan dampak
            nyata di dunia bisnis.
          </p>
        </div>
      </section>

      <section className="section-home" id="sertivikasi">
        <div className="flex flex-col justify-center space-y-4 md:col-span-5">
          <h2 className="text-header">Sertifikat Akreditasi</h2>
          <p className="text-sub">
            Kami bangga telah terakreditasi oleh lembaga resmi yang memperkuat
            kepercayaan mitra dan pelanggan kami.
          </p>
          {/* <p className="text-sm text-gray-500">
                        Video company profile ini memberikan gambaran menyeluruh tentang visi, misi, dan nilai-nilai yang kami pegang. Pelajari
                        bagaimana kami membangun solusi dan berkolaborasi untuk menciptakan dampak nyata di dunia bisnis.
                    </p> */}
        </div>
        <div className="md:col-span-7">
          <Carousel autoPlay={true}>
            {certificate.map((item, i) => (
              <Card
                key={i}
                className="flex h-[450px] items-center justify-center bg-primary"
              >
                <Image
                  className="h-full w-screen object-cover object-center"
                  radius="none"
                  src={`${config.gallery}/${item}`}
                />
              </Card>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="my-10 bg-primary-50 py-16" id="proces_kerjasama">
        <div className="container mx-auto px-5 md:px-10">
          {/* Title */}
          <div className="mb-10 text-center">
            <h2 className="text-header">
              Proses Kerjasama dengan {apps.short_name}
            </h2>
            <p className="text-sub">
              Langkah-langkah mudah dan transparan untuk menjadi bagian dari
              ekosistem kami.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <Image
              alt="Proses Kerjasama"
              className="w-full rounded-xl shadow-md"
              radius="none"
              src={`${config.gallery}/images/PROSES_KERJASAMA.png`}
            />

            <div className="space-y-6">
              {[
                "Isi formulir pendaftaran kemitraan",
                "Tim kami akan menghubungi Anda untuk diskusi awal",
                "Tandatangani perjanjian kerjasama",
                "Mulai berkolaborasi bersama dalam proyek atau program",
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16" id="package">
        <div className="container mx-auto px-5 md:px-10">
          {/* Title */}
          <div className="mb-10 text-center">
            <h2 className="text-header">Paket Kemitraan</h2>
            <p className="text-sub">
              Pilih paket yang paling sesuai dengan kebutuhan dan skala bisnis
              Anda.
            </p>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "Gratis",
                benefits: [
                  "Akses Dasar",
                  "Newsletter Bulanan",
                  "Komunitas Mitra",
                ],
                highlight: false,
              },
              {
                name: "Professional",
                price: "Rp 499.000 / tahun",
                benefits: [
                  "Semua fitur Starter",
                  "Dashboard Mitra",
                  "Prioritas Bantuan",
                ],
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Hubungi Kami",
                benefits: [
                  "Fitur Kustom",
                  "Integrasi API",
                  "Akun Manajer Khusus",
                ],
                highlight: false,
              },
            ].map((pkg, index) => (
              <div
                key={index}
                className={`rounded-xl border p-6 shadow-md ${pkg.highlight ? "border-primary bg-white" : "bg-white"}`}
              >
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  {pkg.name}
                </h3>
                <p className="mb-4 text-lg font-semibold text-primary">
                  {pkg.price}
                </p>
                <ul className="mb-6 space-y-2 text-sm text-gray-600">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      ✅ {benefit}
                    </li>
                  ))}
                </ul>
                <button className="w-full rounded-full bg-primary px-4 py-2 text-white transition hover:bg-primary/90">
                  {pkg.price === "Gratis" ? "Mulai Sekarang" : "Pilih Paket"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
