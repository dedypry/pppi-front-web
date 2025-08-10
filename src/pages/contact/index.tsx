import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Building2, MailCheckIcon, PhoneCall } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

import ListSidebar from "./list-sidebar";

import CustomInput from "@/components/form/custom-input";
import CustomTextArea from "@/components/form/custom-textarea";
import HeaderContent from "@/components/layouts/landing/header-content";
import { apps } from "@/config/app";
import { http } from "@/config/axios";
import { notify, notifyError } from "@/utils/helpers/notify";

interface IForm {
  name: string;
  email: string;
  subject: string;
  content: string;
}
export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      content: "",
    },
  });

  function onSubmit(data: IForm) {
    setLoading(true);

    http
      .post("/messages", data)
      .then(({ data }) => {
        notify(data.message);
        reset();
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <HeaderContent
        subtitle="Hubungi kami untuk informasi lebih lanjut, kerja sama, atau pertanyaan seputar keanggotaan."
        title="Kontak PPPI"
      />
      <div className="container mx-auto lg:px-10 px-5 py-10">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-5">
          <div className="lg:col-span-4">
            <Card>
              <CardBody className="flex flex-col gap-10 p-10">
                <ListSidebar
                  Icon={Building2}
                  subtitle={apps?.address}
                  title="Alamat Kantor"
                />
                <div className="flex items-center gap-10 rounded-lg border border-primary-200 p-5 shadow-md">
                  <PhoneCall className="text-primary" size={60} />
                  <div>
                    <p className="text-[20px] font-semibold text-gray-700">
                      Telp
                    </p>
                    <p className="text-[15px] text-gray-500">{apps.phone}</p>
                    <p className="text-[15px] text-gray-500">{apps.phone2}</p>
                  </div>
                </div>
                <ListSidebar
                  Icon={MailCheckIcon}
                  subtitle={apps?.email}
                  title="Email"
                />
              </CardBody>
            </Card>
          </div>
          <form className="lg:col-span-8" onSubmit={handleSubmit(onSubmit)}>
            <Card className="p-3">
              <CardHeader className="text-[20px] font-bold text-primary">
                Kirim Pesan
              </CardHeader>
              <CardBody className="flex flex-col gap-5">
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      errorMessage={
                        errors.name?.message || "Nama Tidak Boleh Kosong"
                      }
                      isInvalid={!!errors.name}
                      label="Nama"
                      placeholder="Masukan Nama"
                    />
                  )}
                  rules={{ required: true }}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      errorMessage={
                        errors.email?.message || "Email Tidak Boleh Kosong"
                      }
                      isInvalid={!!errors.email}
                      label="Email"
                      placeholder="Masukan Email"
                    />
                  )}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Format email tidak valid",
                    },
                  }}
                />
                <Controller
                  control={control}
                  name="subject"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      errorMessage={
                        errors.subject?.message || "Subject Tidak Boleh Kosong"
                      }
                      isInvalid={!!errors.subject}
                      label="Subject"
                      placeholder="Masukan Subject"
                    />
                  )}
                  rules={{ required: true }}
                />
                <Controller
                  control={control}
                  name="content"
                  render={({ field }) => (
                    <CustomTextArea
                      {...field}
                      errorMessage={
                        errors.content?.message || "Pesan Tidak Boleh Kosong"
                      }
                      isInvalid={!!errors.content}
                      label="Pesan"
                      placeholder="Masukan Pesan"
                    />
                  )}
                  rules={{ required: true }}
                />
              </CardBody>
              <CardFooter className="flex justify-end">
                <Button color="primary" isLoading={loading} type="submit">
                  Kirim Pesan
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
}
