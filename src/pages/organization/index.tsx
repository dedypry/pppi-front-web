import { Card, CardBody, Spinner } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { Tree } from "react-organizational-chart";

import CardItemOrg from "./card-item";
import Item from "./item";

import HeaderContent from "@/components/layouts/landing/header-content";
import { IOrganizations } from "@/interface/IOrganization";
import { http } from "@/config/axios";
import { notifyError } from "@/utils/helpers/notify";

export default function OrganizationPage() {
  const [data, setData] = useState<IOrganizations[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    http
      .get("/organizations")
      .then(({ data: res }) => {
        setData(res || []);
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
        subtitle="Struktur organisasi PPPI dari pusat hingga unit di bawahnya."
        title="Struktur Organisasi"
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
                Belum ada data struktur organisasi.
              </p>
            ) : (
              <Tree
                label={<CardItemOrg title="PPPI" />}
                lineBorderRadius="10px"
                lineColor="#15980d"
                lineWidth="1px"
              >
                {data.map((e) => (
                  <Item key={e.id} item={e} />
                ))}
              </Tree>
            )}
          </CardBody>
        </Card>
      </section>
    </>
  );
}
