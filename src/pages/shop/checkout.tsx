import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import HeaderContent from "@/components/layouts/landing/header-content";
import CustomInput from "@/components/form/custom-input";
import CustomTextArea from "@/components/form/custom-textarea";
import { http } from "@/config/axios";
import { IProduct } from "@/interface/IEcommerce";
import { notifyError } from "@/utils/helpers/notify";

interface IForm {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  note: string;
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function ShopCheckoutPage() {
  const route = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [successCode, setSuccessCode] = useState("");
  const [product, setProduct] = useState<IProduct | null>(null);
  const productId = searchParams.get("productId");
  const qty = Number(searchParams.get("qty") || 1);

  const total = useMemo(() => {
    if (!product) return 0;
    return Number(product.price) * qty;
  }, [product, qty]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      shipping_address: "",
      note: "",
    },
  });

  useEffect(() => {
    if (!productId) {
      route("/shop");
      return;
    }

    http
      .get(`/products/${productId}`)
      .then(({ data }) => setProduct(data))
      .catch((err) => {
        notifyError(err);
        route("/shop");
      });
  }, [productId]);

  const onSubmit: SubmitHandler<IForm> = (data) => {
    if (!product) return;
    setLoading(true);

    http
      .post("/shop-orders", {
        ...data,
        items: [
          {
            product_id: product.id,
            qty,
          },
        ],
      })
      .then(({ data }) => {
        setSuccessCode(data.order_code);
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <HeaderContent
        subtitle="Lengkapi identitas dan alamat pengiriman Anda."
        title="Checkout Produk"
      />
      <section className="container mx-auto px-5 md:px-10 py-10">
        {successCode ? (
          <Card>
            <CardBody className="flex flex-col gap-3 py-10 text-center">
              <p className="text-2xl font-bold text-success">
                Checkout Berhasil
              </p>
              <p className="text-gray-600">Kode Pesanan Anda: {successCode}</p>
              <div className="flex justify-center gap-2">
                <Button as={Link} color="primary" to="/shop">
                  Belanja Lagi
                </Button>
                <Button as={Link} to="/shop/orders" variant="flat">
                  Lihat Pesanan Saya
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card>
              <CardHeader>Ringkasan Produk</CardHeader>
              <CardBody className="text-sm">
                {product ? (
                  <div className="space-y-2">
                    <p>
                      Produk: <span className="font-semibold">{product.name}</span>
                    </p>
                    <p>
                      Harga:{" "}
                      <span className="font-semibold">
                        {formatRupiah(Number(product.price))}
                      </span>
                    </p>
                    <p>
                      Qty: <span className="font-semibold">{qty}</span>
                    </p>
                    <p>
                      Total:{" "}
                      <span className="text-base font-bold text-primary">
                        {formatRupiah(total)}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">Memuat data produk...</p>
                )}
              </CardBody>
            </Card>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>Data Pemesan</CardHeader>
                <CardBody className="flex flex-col gap-4">
                  <Controller
                    control={control}
                    name="customer_name"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        errorMessage={errors.customer_name?.message || "Nama wajib diisi"}
                        isInvalid={!!errors.customer_name}
                        label="Nama Lengkap"
                        placeholder="Masukan nama lengkap"
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    control={control}
                    name="customer_email"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        errorMessage={errors.customer_email?.message || "Email wajib diisi"}
                        isInvalid={!!errors.customer_email}
                        label="Email"
                        placeholder="Masukan email"
                        type="email"
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    control={control}
                    name="customer_phone"
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        errorMessage={errors.customer_phone?.message || "No. telepon wajib diisi"}
                        isInvalid={!!errors.customer_phone}
                        label="No. Telepon"
                        placeholder="Masukan no. telepon"
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    control={control}
                    name="shipping_address"
                    render={({ field }) => (
                      <CustomTextArea
                        {...field}
                        errorMessage={
                          errors.shipping_address?.message || "Alamat pengiriman wajib diisi"
                        }
                        isInvalid={!!errors.shipping_address}
                        label="Alamat Pengiriman"
                        placeholder="Masukan alamat lengkap"
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    control={control}
                    name="note"
                    render={({ field }) => (
                      <CustomTextArea
                        {...field}
                        label="Catatan (Opsional)"
                        placeholder="Catatan tambahan"
                      />
                    )}
                  />
                </CardBody>
                <CardFooter className="flex justify-end gap-2">
                  <Button as={Link} to="/shop" variant="light">
                    Batal
                  </Button>
                  <Button color="primary" isLoading={loading} type="submit">
                    Proses Checkout
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        )}
      </section>
    </>
  );
}
