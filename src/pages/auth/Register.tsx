import { Button } from "@heroui/react";
import { useState } from "react";

import RegisterMember from "@/components/auth/register";
import HeaderContent from "@/components/layouts/landing/header-content";
import DialogSuccess from "@/components/auth/dialog-success";
import { ICreateMember } from "@/interface/IUser";

export default function RegisterPage() {
  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState<ICreateMember>();

  return (
    <div className="bg-primary-50">
      <DialogSuccess data={data!} isOpen={isOpen} setOpen={setOpen} />
      <HeaderContent title="Pendaftaran Anggota Baru" />
      <div className="flex w-full flex-col items-center justify-center gap-4 p-10">
        <RegisterMember
          action={
            <div className="flex justify-end gap-2">
              <Button
                color="secondary"
                variant="shadow"
                onPress={() => setOpen(!isOpen)}
              >
                Batal
              </Button>
              <Button color="primary" type="submit" variant="shadow">
                Ajukan Pendaftaran
              </Button>
            </div>
          }
          isAdmin={false}
          onSuccess={(data) => {
            setData(data);
            setOpen(true);
          }}
        />
      </div>
    </div>
  );
}
