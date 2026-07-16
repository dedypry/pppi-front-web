import { Alert, Button, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

import RegisterMember from "@/components/auth/register";
import HeaderContent from "@/components/layouts/landing/header-content";
import { http } from "@/config/axios";
import { ICreateMember, IUser } from "@/interface/IUser";
import { notify, notifyError } from "@/utils/helpers/notify";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const route = useNavigate();
  const token = searchParams.get("token") || "";

  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Link verifikasi tidak valid");
      setLoading(false);

      return;
    }

    http
      .get(`/users/verify-email?token=${encodeURIComponent(token)}`)
      .then(({ data }) => {
        setUser(data.data || data);
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            "Link verifikasi tidak valid atau sudah kadaluarsa",
        );
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSubmit(data: ICreateMember) {
    setProcessing(true);
    try {
      const { data: res } = await http.post("/users/verify-email", {
        ...data,
        token,
        date_birth: dayjs(data.date_birth).add(1, "d").toDate(),
        is_member_payment: data.is_member_payment === "yes",
      });

      notify(res.message || "Data verifikasi berhasil dikirim");
      setSubmitted(true);
    } catch (err) {
      notifyError(err as any);
      throw err;
    } finally {
      setProcessing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner color="primary" label="Memuat data verifikasi..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-primary-50">
        <HeaderContent title="Verifikasi Data Anggota" />
        <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
          <p className="text-danger">{error}</p>
          <Button color="primary" onPress={() => route("/")}>
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-primary-50">
        <HeaderContent title="Verifikasi Data Anggota" />
        <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
          <p className="text-success font-semibold">
            Data verifikasi berhasil dikirim.
          </p>
          <p className="text-default-600 max-w-lg">
            Tim admin akan meninjau data Anda. Setelah disetujui, status
            verifikasi akan aktif.
          </p>
          <Button color="primary" onPress={() => route("/login")}>
            Ke Halaman Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-50">
      <HeaderContent title="Verifikasi Data Anggota PPPI" />
      <div className="flex w-full flex-col items-center justify-center gap-4 p-10">
        {user?.verification_note && (
          <Alert
            className="max-w-3xl w-full"
            color={
              user.verification_status === "rejected" ? "danger" : "warning"
            }
            description={user.verification_note}
            title="Catatan dari Admin"
          />
        )}
        <p className="text-default-600 max-w-2xl text-center text-sm">
          Mohon periksa dan lengkapi data Anda di bawah ini, lalu kirim untuk
          diverifikasi oleh admin. Anda tidak perlu login.
        </p>
        <RegisterMember
          forceMemberPayment
          action={
            <div className="flex justify-end gap-2">
              <Button
                color="primary"
                isLoading={processing}
                type="submit"
                variant="shadow"
              >
                Kirim Verifikasi
              </Button>
            </div>
          }
          customSubmit={handleSubmit}
          isAdmin={false}
          user={user}
          onSuccess={() => setSubmitted(true)}
        />
      </div>
    </div>
  );
}
