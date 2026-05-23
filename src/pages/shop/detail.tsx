import { Button, Card, CardBody, Chip, Image, Input } from "@heroui/react";
import { MinusIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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

export default function ShopDetailPage() {
  const { id } = useParams();
  const route = useNavigate();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (!id) return;

    http
      .get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch((err) => {
        notifyError(err);
        route("/shop");
      });
  }, [id]);

  if (!product) {
    return (
      <>
        <HeaderContent subtitle="Memuat detail produk..." title="Detail Produk" />
        <div className="container mx-auto px-5 md:px-10 py-10">
          <Card>
            <CardBody className="py-10 text-center text-gray-500">
              Memuat data produk...
            </CardBody>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderContent subtitle="Detail produk pilihan Anda." title={product.name} />
      <section className="container mx-auto px-5 md:px-10 py-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card>
            <CardBody>
              {product.image ? (
                <Image
                  alt={product.name}
                  className="h-[350px] w-full rounded-lg object-cover"
                  src={product.image}
                />
              ) : (
                <div className="flex h-[350px] w-full items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                  No Image
                </div>
              )}
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-col gap-4">
              <div>
                <p className="text-2xl font-bold text-gray-700">{product.name}</p>
                <div
                  className="prose prose-sm max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: product.description || "<p>-</p>",
                  }}
                />
              </div>
              <Chip color="primary" variant="flat">
                Stok tersedia: {product.stock}{" "}
                {product.uom?.code || product.unit || "pcs"}
              </Chip>
              <p className="text-2xl font-bold text-primary">
                {formatRupiah(Number(product.price))}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  isDisabled={qty <= 1}
                  variant="flat"
                  onPress={() => setQty((val) => val - 1)}
                >
                  <MinusIcon size={15} />
                </Button>
                <Input
                  className="w-24"
                  color="primary"
                  value={String(qty)}
                  onValueChange={(val) => {
                    const parsed = Number(val || 1);
                    if (parsed > 0) {
                      setQty(Math.min(parsed, product.stock));
                    }
                  }}
                />
                <Button
                  isIconOnly
                  isDisabled={qty >= product.stock}
                  variant="flat"
                  onPress={() => setQty((val) => val + 1)}
                >
                  <PlusIcon size={15} />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button as={Link} fullWidth to="/shop" variant="light">
                  Kembali
                </Button>
                <Button
                  as={Link}
                  fullWidth
                  color="primary"
                  startContent={<ShoppingBagIcon size={16} />}
                  to={`/shop/checkout?productId=${product.id}&qty=${qty}`}
                >
                  Checkout
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}
