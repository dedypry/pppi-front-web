import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Building2, MailCheckIcon, PhoneCall } from "lucide-react";

import ListSidebar from "./list-sidebar";

import CustomInput from "@/components/form/custom-input";
import CustomTextArea from "@/components/form/custom-textarea";
import HeaderContent from "@/components/layouts/landing/header-content";
import { apps } from "@/config/app";

export default function ContactPage() {
  return (
    <>
      <HeaderContent
        subtitle="Hubungi kami untuk informasi lebih lanjut, kerja sama, atau pertanyaan seputar keanggotaan."
        title="Kontak PPPI"
      />
      <div className="container mx-auto md:px-10 px-5">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-5">
          <div className="md:col-span-4">
            <Card>
              <CardBody className="flex flex-col gap-10 p-10">
                <ListSidebar
                  Icon={Building2}
                  subtitle={apps?.address}
                  title="Alamat Kantor"
                />
                <ListSidebar
                  Icon={PhoneCall}
                  subtitle={apps?.phone}
                  title="Telp"
                />
                <ListSidebar
                  Icon={MailCheckIcon}
                  subtitle={apps?.email}
                  title="Email"
                />
              </CardBody>
            </Card>
          </div>
          <div className="md:col-span-8">
            <Card className="p-3">
              <CardHeader className="text-[20px] font-bold text-primary">
                Kirim Pesan
              </CardHeader>
              <CardBody className="flex flex-col gap-5">
                <CustomInput label="Nama" placeholder="Masukan Nama" />
                <CustomInput label="Email" placeholder="Masukan Email" />
                <CustomInput label="Subject" placeholder="Masukan Subject" />
                <CustomTextArea label="Pesan" placeholder="Masukan Pesan" />
              </CardBody>
              <CardFooter className="flex justify-end">
                <Button color="primary">Kirim Pesan</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
