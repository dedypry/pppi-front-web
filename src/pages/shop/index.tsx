import { Button, Card, CardBody, Image } from "@heroui/react";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HeaderContent from "@/components/layouts/landing/header-content";
import { http } from "@/config/axios";
import { IProduct } from "@/interface/IEcommerce";
import { notifyError } from "@/utils/helpers/notify";

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function ShopPage() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    http
      .get("/products")
      .then(({ data }) => setProducts(data))
      .catch((err) => notifyError(err));
  }, []);

  return (
    <>
      <HeaderContent
        subtitle="Temukan produk PPPI dan lakukan pemesanan secara online."
        title="E-Commerce PPPI"
      />
      <section className="container mx-auto px-5 md:px-10 py-10">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">Total Produk: {products.length}</p>
          <Button as={Link} color="primary" to="/shop/orders" variant="flat">
            Cek Pesanan Saya
          </Button>
        </div>

        {products.length === 0 ? (
          <Card>
            <CardBody className="py-10 text-center text-gray-500">
              Produk belum tersedia.
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.map((item) => (
              <Card key={item.id} className="shadow-md">
                <CardBody className="flex flex-col gap-3">
                  {item.image ? (
                    <Image
                      alt={item.name}
                      className="h-40 w-full rounded-lg bg-gray-50 object-cover"
                      src={item.image}
                    />
                  ) : (
                    <div className="flex h-40 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-500">
                      No Image
                    </div>
                  )}
                  <div>
                    <p className="line-clamp-1 text-base font-semibold text-gray-700">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Stok: {item.stock} {item.uom?.code || item.unit || "pcs"}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    {formatRupiah(Number(item.price))}
                  </p>
                  <Button
                    as={Link}
                    color="primary"
                    startContent={<ShoppingCartIcon size={16} />}
                    to={`/shop/${item.id}`}
                  >
                    Lihat Detail
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
