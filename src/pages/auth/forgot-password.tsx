import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@heroui/react";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import CustomInput from "@/components/form/custom-input";
import { apps } from "@/config/app";
import { http } from "@/config/axios";
import { useAppDispatch } from "@/stores/hooks";
import { notify, notifyError } from "@/utils/helpers/notify";
type FormValues = {
  email: string;
};
export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const route = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setIsLoading(true);
    http
      .post("/auth/forgot-password", data)
      .then(({ data }) => {
        notify(data.message);
      })
      .catch((err) => notifyError(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="w-full max-w-md px-5" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full md:p-5 p-2">
        <CardHeader className="flex justify-center gap-3">
          <Image alt="Logo" height={50} src={apps.logo} width={50} />
          <h2 className="text-[30px] font-bold">{apps?.short_name}</h2>
        </CardHeader>
        <CardHeader className="flex justify-center">
          <h5>{apps?.full_name}</h5>
        </CardHeader>
        <CardBody className="flex flex-col gap-5">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Email / NIA"
                placeholder="Masukan Email atau NIA"
                {...(errors.email && {
                  isInvalid: true,
                  errorMessage: "Email / NIA tidak boleh kosong",
                })}
                description="Masukan Email/Nia yang terdaftar, jika ada kami akan mengirimkan link untuk reset password melalui email"
                startContent={
                  <MailIcon
                    className={
                      errors.email ? "text-danger" : "text-secondary-600"
                    }
                    size={20}
                  />
                }
              />
            )}
            rules={{ required: true }}
          />
        </CardBody>
        <CardFooter className="flex flex-col gap-3">
          <Button fullWidth color="primary" isLoading={isLoading} type="submit">
            Masuk
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
