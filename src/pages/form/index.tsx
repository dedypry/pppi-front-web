import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";

import TypeComponents from "./type-components";

import { http } from "@/config/axios";
import { notifyError } from "@/utils/helpers/notify";
import HeaderContent from "@/components/layouts/landing/header-content";
import Loading from "@/components/loading/Loading";
import { IFormList } from "@/interface/IForm";
import CustomInput from "@/components/form/custom-input";
import { confirmSweet } from "@/utils/helpers/confirm";

export default function FormPage() {
  const [loading, setLoading] = useState(false);
  const [formList, setForm] = useState<IFormList>();

  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const route = useNavigate();

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      getForm(slug);
    }
  }, [slug]);

  function getForm(data: string) {
    http
      .get(`/form/${data}`)
      .then(({ data }) => {
        setForm(data);
      })
      .catch((err) => notifyError(err));
  }

  if (!formList) return <Loading />;

  function handleSetForm(index: string, value: any) {
    setFormData((val: any) => ({ ...val, [index]: value }) as any);
  }

  function handleSubmit() {
    let isClean = true;

    const formHeaders = [...formList?.form_headers!];

    if (formList?.member_required) {
      formHeaders.push({
        form_id: formList.id,
        title: "Nia",
        key: "nia",
        required: true,
      } as any);
    }

    for (const item of formHeaders) {
      if (item.required) {
        if (!formData[item.key]) {
          setErrors((val: any) => ({
            ...val,
            [item.key]: `${item.key} tidak boleh kosong`,
          }));
          isClean = false;
        }
      }
    }

    if (!isClean) {
      return;
    } else {
      setErrors({});
    }

    setLoading(true);
    http
      .post("/form/result", {
        form_id: formList?.id,
        nia: formData?.nia,
        value: formData,
      })
      .then(({ data }) => {
        // notify(data.message);
        setFormData({});
        route("/");
        confirmSweet(() => route("/"), {
          title: "Berhasil",
          icon: "success",
          text: data.message,
          showCancelButton: false,
          confirmButtonText: "Kembali ke halaman utama",
          confirmButtonColor: "#15980d",
        });
      })
      .catch((err) => {
        if ((err?.response?.data as any)?.message == "signup") {
          confirmSweet(() => route("/register"), {
            title: "Nia Tidak Valid",
            text: "Anda belum terdaftar sebagai anggota di PPPI",
            confirmButtonText: "Daftar Anggota",
          });
        } else {
          notifyError(err);
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <HeaderContent subtitle="Isi Form Dibawah ini" title={formList.title} />

      <div className="container mx-auto my-10 px-10">
        <div className="flex gap-2 flex-col md:flex-row">
          <Card className="p-2 w-full order-2 md:order-1">
            <CardHeader as="h4">
              {formList.member_required
                ? "Wajib Menjadi Anggota"
                : "Tidak Wajib Menjadi Anggota"}
            </CardHeader>
            <CardBody className="flex flex-col gap-5">
              {formList.member_required && (
                <CustomInput
                  description="Jika anda belum ada NIA, silahkan registrasi anggota baru"
                  errorMessage={errors.nia}
                  isInvalid={!!errors.nia}
                  label="Nia"
                  labelPlacement="inside"
                  placeholder={`Masukan No. Nia`}
                  value={formData.nia}
                  onValueChange={(val) => handleSetForm("nia", val)}
                />
              )}
              {(formList?.form_headers || []).map((item) => (
                <TypeComponents
                  key={item.id}
                  data={item}
                  error={errors[item.key]}
                  setValue={(val) => handleSetForm(item.key, val)}
                  value={formData[item.key]}
                />
              ))}
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button
                color="primary"
                isLoading={loading}
                onPress={handleSubmit}
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
          {formList.description && (
            <Card className="md:w-lg p-2 w-full order-1 md:order-2">
              <CardHeader as="h4">Keterangan</CardHeader>
              <CardBody>
                <div
                  dangerouslySetInnerHTML={{ __html: formList.description }}
                />
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
