import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@heroui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { apps } from "@/config/app";
import InputPassword from "@/components/form/input-password";
import { http } from "@/config/axios";
import { notify, notifyError } from "@/utils/helpers/notify";

type FormValues = {
  new_password: string;
  confirm_password: string;
  token: string;
};

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const route = useNavigate();
  const { token } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      new_password: "",
      confirm_password: "",
      token: "",
    },
  });

  useEffect(() => {
    if (token) {
      setValue("token", token);
    } else {
      route("/login");
    }
  }, [token]);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (data.new_password != data.confirm_password) {
      notify("Password tidak sama", "error");

      return;
    }

    setIsLoading(true);

    http
      .post("/auth/reset-password", data)
      .then(({ data }) => {
        notify(data.message);
        route("/login");
      })
      .catch((err) => notifyError(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="w-full max-w-md px-5" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full md:p-5 p-2">
        <CardHeader className="flex justify-center gap-3">
          <Image alt="Logo" height={50} src={apps.logo} width={50} />
          <h1 className="text-[30px] font-bold">{apps?.short_name}</h1>
        </CardHeader>
        <CardHeader className="flex justify-center">
          <h5>Reset Password</h5>
        </CardHeader>
        <CardBody className="flex flex-col gap-5">
          <Controller
            control={control}
            name="new_password"
            render={({ field }) => (
              <InputPassword
                {...field}
                label="New Password"
                {...(errors.confirm_password && {
                  isInvalid: true,
                  errorMessage: "Password tidak boleh kosong",
                })}
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            control={control}
            name="confirm_password"
            render={({ field }) => (
              <InputPassword
                {...field}
                label="Konfirmasi Password"
                {...(errors.confirm_password && {
                  isInvalid: true,
                  errorMessage: "Password tidak boleh kosong",
                })}
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
