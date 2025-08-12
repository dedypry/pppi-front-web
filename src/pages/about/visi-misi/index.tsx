import { Card, CardBody } from "@heroui/react";

import HeaderContent from "@/components/layouts/landing/header-content";

export default function VisiMisiPage() {
  return (
    <>
      <HeaderContent
        subtitle="Menelusuri perjalanan dan dedikasi PPPI dalam memajukan profesi keperawatan di Indonesia."
        title="Visi Misi PPPI"
      />

      <div className="container mx-auto md:px-10 px-5 my-10">
        <Card className="md:px-10 p-2">
          <CardBody>
            <section className="mb-5">
              <h2>Visi</h2>
              <p>
                Sebagai pionir pembaharuan keperawatan Indonesia dengan
                bersinergi bersama pemerintah demi wujudkan masyarakat sehat dan
                sejahtera
              </p>
            </section>
            <hr className="py-5" />

            <section className="mb-5">
              <h2>Misi</h2>
              <ol className="list-decimal pl-6">
                <li>
                  Mengayomi perawat dengan menjunjung tinggi kesejawatan,
                  martabat dan etik profesi.
                </li>
                <li>
                  Meningkatkan mutu penyelenggaraan Upaya Kesehatan melalui
                  Asuhan Keperawatan profesional untuk wujudkan Indonesia sehat
                  dan sejahtera.
                </li>
                <li>
                  Mendorong kebijakan dan inovasi dibidang kesehatan serta
                  bersinergi bersama pemerintah untuk meningkatkan taraf hidup
                  dan kesejahteraan perawat.
                </li>
              </ol>
            </section>

            <hr className="py-5" />

            <section>
              <h2>Kemanfaatan Bagi Anggota PPPI/P3I</h2>
              <ol className="list-decimal pl-6">
                <li>Tidak ada biaya iuran tahunan.</li>
                <li>
                  Peluang dan penyerapan kerja di tingkat Nasional dan
                  Internasional
                </li>
                <li>Perlindungan hukum</li>
                <li>
                  Peningkatan kompetensi profesi dan inovasi di bidang
                  keperawatan dan atau kesehatan.
                </li>
              </ol>

              <p className="mt-10">
                Kantor Dewan Pengurus Nasional Perkumpulan Perawat Pembaharuan
                Indonesia (PPPI) Building Genpro Rukan Permata, Jl. Bekasi Timur
                XI No. 17/05 Jatinegara Jakarta Timur Provinsi DKI Jakarta
              </p>
            </section>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
