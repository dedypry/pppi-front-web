import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Input,
} from "@heroui/react";
import { useState } from "react";

import HeaderContent from "@/components/layouts/landing/header-content";
import { http } from "@/config/axios";
import { IShopOrder } from "@/interface/IEcommerce";
import { notifyError } from "@/utils/helpers/notify";

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function ShopOrderHistoryPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<IShopOrder[]>([]);

  function getHistory() {
    if (!email) return;

    setLoading(true);
    http
      .get(`/shop-orders/history?email=${encodeURIComponent(email)}`)
      .then(({ data }) => setOrders(data))
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <HeaderContent
        subtitle="Masukan email pemesan untuk melihat histori pesanan Anda."
        title="Histori Pesanan"
      />
      <section className="container mx-auto px-5 md:px-10 py-10">
        <Card>
          <CardHeader className="flex flex-col gap-2 md:flex-row">
            <Input
              color="primary"
              placeholder="Masukan email pemesan"
              value={email}
              variant="bordered"
              onValueChange={setEmail}
            />
            <Button color="primary" isLoading={loading} onPress={getHistory}>
              Cek Pesanan
            </Button>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            {orders.length === 0 ? (
              <p className="py-10 text-center text-gray-500">
                Belum ada data pesanan.
              </p>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="border border-gray-100 shadow-none">
                  <CardBody className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-gray-700">
                        Kode: {order.order_code}
                      </p>
                      <Chip color="warning" variant="flat">
                        {order.status}
                      </Chip>
                    </div>
                    <p className="text-sm text-gray-500">
                      Pemesan: {order.customer_name} - {order.customer_phone}
                    </p>
                    <p className="text-sm text-gray-500">
                      Alamat: {order.shipping_address}
                    </p>
                    <Divider />
                    <div className="space-y-1 text-sm">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-2"
                        >
                          <p>
                            {item.product_name} ({item.qty}x)
                          </p>
                          <p className="font-semibold">
                            {formatRupiah(Number(item.subtotal))}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Divider />
                    <div className="text-right font-bold text-primary">
                      Total: {formatRupiah(Number(order.total_amount))}
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </CardBody>
        </Card>
      </section>
    </>
  );
}
