import { Button, Card, CardBody, Spinner } from "@heroui/react";
import { FileDownIcon, FileSpreadsheetIcon } from "lucide-react";
import { saveAs } from "file-saver";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Tree } from "react-organizational-chart";

import KepengurusanFilter from "./filter";
import KepengurusanItem from "./item";
import KepengurusanSummary from "./summary";
import {
  defaultKepengurusanFilters,
  filterKepengurusanTree,
  KepengurusanFilters,
} from "./utils";

import HeaderContent from "@/components/layouts/landing/header-content";
import { IKepengurusanNode } from "@/interface/IKepengurusan";
import { http } from "@/config/axios";
import { handleDownloadExcel } from "@/utils/helpers/global";
import { notify, notifyError } from "@/utils/helpers/notify";

export default function KepengurusanPage() {
  const [data, setData] = useState<IKepengurusanNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportingExcel, setExportingExcel] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [filters, setFilters] = useState<KepengurusanFilters>(
    defaultKepengurusanFilters,
  );

  const filteredData = useMemo(
    () => filterKepengurusanTree(data, filters),
    [data, filters],
  );

  const loadData = useCallback(() => {
    setLoading(true);
    http
      .get("/members/kepengurusan")
      .then(({ data: res }) => {
        setData(Array.isArray(res) ? res : []);
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function handleFilterChange(key: keyof KepengurusanFilters, value: string) {
    setFilters((prev) => ({
      ...prev,
      [key]: key === "q" ? value : value || "all",
    }));
  }

  function handleExportExcel() {
    handleDownloadExcel(
      "/members/kepengurusan/export",
      undefined,
      `kepengurusan-${new Date().toISOString().slice(0, 10)}`,
      setExportingExcel,
    );
  }

  async function handleExportPdf() {
    setExportingPdf(true);
    try {
      const response = await http.get("/members/kepengurusan/export-pdf", {
        responseType: "blob",
      });

      const contentDisposition = response.headers["content-disposition"];
      let filename = `kepengurusan-${new Date().toISOString().slice(0, 10)}.pdf`;

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/);

        if (match?.[1]) {
          filename = decodeURIComponent(match[1]);
        }
      }

      saveAs(response.data, filename);
    } catch (error) {
      console.error("Gagal mengunduh PDF:", error);
      notify("Gagal mengunduh PDF", "error");
    } finally {
      setExportingPdf(false);
    }
  }

  return (
    <>
      <HeaderContent
        subtitle="Struktur kepengurusan PPPI per wilayah, pengurus, dan anggota."
        title="Kepengurusan"
      />

      <section className="container mx-auto flex flex-col gap-5 px-5 py-10 md:px-10">
        <KepengurusanFilter
          data={data}
          filters={filters}
          onChange={handleFilterChange}
          onReset={() => setFilters(defaultKepengurusanFilters)}
        />

        <KepengurusanSummary data={filteredData} loading={loading} />

        <Card>
          <CardBody className="flex flex-col gap-4 overflow-x-auto pb-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="m-0 text-base font-semibold text-gray-800">
                  Struktur Kepengurusan
                </p>
                <p className="m-0 text-sm text-gray-500">
                  Wilayah → pengurus → anggota
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  color="success"
                  isLoading={exportingExcel}
                  size="sm"
                  startContent={<FileSpreadsheetIcon size={16} />}
                  variant="flat"
                  onPress={handleExportExcel}
                >
                  Download Excel
                </Button>
                <Button
                  color="danger"
                  isLoading={exportingPdf}
                  size="sm"
                  startContent={<FileDownIcon size={16} />}
                  variant="flat"
                  onPress={handleExportPdf}
                >
                  Download PDF
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <Spinner color="primary" />
              </div>
            ) : data.length === 0 ? (
              <p className="py-12 text-center text-sm text-gray-500">
                Belum ada data kepengurusan.
              </p>
            ) : filteredData.length === 0 ? (
              <p className="py-12 text-center text-sm text-gray-500">
                Tidak ada data yang cocok dengan filter.
              </p>
            ) : (
              <Tree
                label={
                  <div className="inline-block rounded-xl bg-gradient-to-br from-primary-700 to-primary-500 px-5 py-3 text-center text-white shadow-md">
                    <p className="m-0 text-xs uppercase tracking-widest text-white/80">
                      Struktur
                    </p>
                    <p className="m-0 text-lg font-semibold">PPPI</p>
                  </div>
                }
                lineBorderRadius="10px"
                lineColor="#15980d"
                lineWidth="1px"
              >
                {filteredData.map((node) => (
                  <KepengurusanItem key={node.id} node={node} />
                ))}
              </Tree>
            )}
          </CardBody>
        </Card>
      </section>
    </>
  );
}
