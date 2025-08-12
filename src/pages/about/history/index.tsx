import { Card, CardBody } from "@heroui/react";

import HeaderContent from "@/components/layouts/landing/header-content";

export default function HistoryPage() {
  return (
    <>
    
      <HeaderContent
        subtitle="Menelusuri perjalanan dan dedikasi PPPI dalam memajukan profesi keperawatan di Indonesia."
        title="Sejarah PPPI"
      />

      <div className="container mx-auto md:px-10 px-5 my-10">
        <Card className="md:px-10 p-2">
          <CardBody>
            <section className="mb-5">
              <h2>Masa Penjajahan Belanda (1812 - 1942)</h2>
              <p>
                Sejarah keperawatan di Indonesia dimulai pada masa penjajahan
                Belanda. Pada tahun 1812, Dr. H. F. J. Heijman mendirikan
                sekolah keperawatan pertama di Batavia (sekarang Jakarta) yang
                dikenal dengan nama{" "}
                <strong>&quot;Verpleger School&quot;</strong>. Sekolah ini
                bertujuan untuk mendidik tenaga perawat lokal untuk membantu
                tugas-tugas medis di rumah sakit dan pelayanan kesehatan
                kolonial.
              </p>
              <p>
                Pada masa ini, perawat sering disebut sebagai{" "}
                <em>&quot;juru rawat&quot;</em>. Pendidikan keperawatan masih
                sangat sederhana dan lebih berfokus pada praktik klinis dasar.
                Sebagian besar perawat berasal dari kalangan pribumi yang
                mendapatkan pelatihan singkat.
              </p>
            </section>
            <hr className="py-5" />

            <section className="mb-5">
              <h2>Masa Pendudukan Jepang (1942 - 1945)</h2>
              <p>
                Selama pendudukan Jepang, perkembangan keperawatan di Indonesia
                mengalami kemunduran. Banyak fasilitas kesehatan yang ditutup
                atau dialihfungsikan untuk kepentingan militer. Pendidikan
                keperawatan hampir tidak berjalan dan tenaga perawat yang ada
                sangat terbatas.
              </p>
              <p>
                Pada periode ini, fokus utama adalah pelayanan darurat dan
                perawatan korban perang. Namun, semangat para perawat untuk
                melayani masyarakat tetap membara meskipun dalam kondisi yang
                serba sulit.
              </p>
            </section>

            <hr className="py-5" />

            <section>
              <h2>Masa Kemerdekaan dan Era Modern (1945 - Sekarang)</h2>
              <p>
                Setelah Indonesia merdeka, dunia keperawatan mulai bangkit
                kembali. Pemerintah Indonesia menyadari pentingnya peran perawat
                dalam membangun kesehatan bangsa.
              </p>
              <ul>
                <li>
                  <strong>1950-an:</strong> Berdirinya berbagai sekolah perawat
                  di beberapa kota besar. Pendidikan keperawatan mulai
                  distandarisasi.
                </li>
                <li>
                  <strong>1960-an:</strong> Berdirinya akademi perawat (Akper)
                  yang menawarkan program pendidikan lebih formal.
                </li>
                <li>
                  <strong>1980-an:</strong> Pendidikan keperawatan mulai
                  memasuki jenjang diploma, yang dikenal sebagai Pendidikan
                  Tinggi Ilmu Keperawatan (PTIK).
                </li>
                <li>
                  <strong>1990-an:</strong> Berdirinya Fakultas Ilmu Keperawatan
                  (FIK) di universitas-universitas terkemuka, seperti
                  Universitas Indonesia, yang menandai dimulainya pendidikan
                  keperawatan setingkat sarjana.
                </li>
              </ul>
              <p>
                Saat ini, profesi perawat di Indonesia telah diakui dan diatur
                oleh undang-undang. Organisasi profesi seperti{" "}
                <strong>
                  Perkumpulan Perawat Pembaharuan Indonesia (PPPI)
                </strong>{" "}
                berperan penting dalam meningkatkan kualitas dan profesionalisme
                perawat.
              </p>
            </section>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
