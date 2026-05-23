import { Button, Card, CardBody, Image } from "@heroui/react";
import { GlobeIcon } from "lucide-react";
import { useEffect } from "react";

import HeaderContent from "@/components/layouts/landing/header-content";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getPartners } from "@/stores/features/partners/action";

export default function PartnerPage() {
  const dispatch = useAppDispatch();
  const { partners } = useAppSelector((state) => state.partners);

  useEffect(() => {
    dispatch(getPartners());
  }, []);

  return (
    <>
      <HeaderContent
        subtitle="Daftar mitra yang telah berkolaborasi bersama PPPI."
        title="Partner PPPI"
      />

      <section className="container mx-auto px-5 md:px-10 py-10">
        {partners.length === 0 ? (
          <Card>
            <CardBody className="py-10 text-center text-gray-500">
              Belum ada data partner.
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {partners.map((item) => (
              <Card key={item.id} className="shadow-md">
                <CardBody className="flex flex-col gap-4">
                  {item.logo ? (
                    <Image
                      alt={item.name}
                      className="h-40 w-full object-contain bg-gray-50 rounded-lg"
                      src={item.logo}
                    />
                  ) : (
                    <div className="h-40 w-full rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center text-sm">
                      No Logo
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-bold text-gray-700">{item.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.description || "-"}
                    </p>
                  </div>
                  {item.website && (
                    <div>
                      <Button
                        as="a"
                        color="primary"
                        href={item.website}
                        rel="noreferrer"
                        size="sm"
                        startContent={<GlobeIcon size={16} />}
                        target="_blank"
                        variant="flat"
                      >
                        Kunjungi Website
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
