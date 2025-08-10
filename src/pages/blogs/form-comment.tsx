/* eslint-disable no-console */
import { Button, Textarea } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

import { useAppSelector } from "@/stores/hooks";
import CustomInput from "@/components/custom-input";

interface IForm {
  content: string;
  name: string;
  email: string;
  website: string;
}
export default function FormComment() {
  const { user } = useAppSelector((state) => state.user);
  const [processing, setProcessing] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      content: "",
      name: "",
      email: "",
      website: "",
    },
  });

  function onSubmit(data: IForm) {
    setProcessing(true);
    console.log("data", data);

    setTimeout(() => setProcessing(false), 5000);
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <Textarea
                {...field}
                isRequired
                errorMessage={
                  errors.content?.message || "Commentar tidak boleh kosong"
                }
                isInvalid={!!errors.content}
                label="Comentar"
                placeholder="berikan komentar terbaik anda"
              />
            )}
          />
        </div>
        {!user && (
          <>
            <div className="col-span-6">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    isRequired
                    errorMessage={
                      errors.name?.message || "Nama Tidak Boleh Kosong"
                    }
                    isInvalid={!!errors.name}
                    label="Nama"
                    placeholder="masukan nama samaran atau nama asli"
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="col-span-6">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    isRequired
                    errorMessage={
                      errors.email?.message || "Email tidak boleh kosong"
                    }
                    isInvalid={!!errors.email}
                    label="Email"
                    placeholder="Masukan Email Aktif"
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="col-span-12">
              <Controller
                control={control}
                name="website"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Website"
                    placeholder="isi jika anda punya"
                  />
                )}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          color="primary"
          isLoading={processing}
          radius="full"
          size="sm"
          type="submit"
          variant="bordered"
        >
          Simpan Komentar
        </Button>
      </div>
    </form>
  );
}
