import { Card, CardBody, Spinner } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { Tree } from "react-organizational-chart";

import KepengurusanItem from "./item";

import HeaderContent from "@/components/layouts/landing/header-content";
import { IKepengurusanNode } from "@/interface/IKepengurusan";
import { http } from "@/config/axios";
import { notifyError } from "@/utils/helpers/notify";

export default function KepengurusanPage() {
  const [data, setData] = useState<IKepengurusanNode[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <HeaderContent
        subtitle="Struktur kepengurusan PPPI per wilayah, pengurus, dan anggota."
        title="Kepengurusan"
      />

      <section className="container mx-auto px-5 py-10 md:px-10">
        <Card>
          <CardBody className="overflow-x-auto pb-8">
            {loading ? (
              <div className="flex justify-center py-16">
                <Spinner color="primary" />
              </div>
            ) : data.length === 0 ? (
              <p className="py-12 text-center text-sm text-gray-500">
                Belum ada data kepengurusan.
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
                {data.map((node) => (
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
