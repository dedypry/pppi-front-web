import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { ICreateMember } from "@/interface/IUser";

interface Props {
  isOpen: boolean;
  setOpen: CallableFunction;
  data?: ICreateMember;
}
export default function DialogSuccess({ isOpen, setOpen, data }: Props) {
  const route = useNavigate();

  return (
    <Modal
      backdrop="blur"
      closeButton={false}
      isDismissable={false}
      isOpen={isOpen}
      size="xl"
      onClose={() => route("/")}
      onOpenChange={() => setOpen(!isOpen)}
    >
      <ModalContent className="py-10">
        <ModalBody>
          <p className="text-center text-5xl font-semibold text-secondary-800 mb-10">
            Terimakasih sudah mendaftar
          </p>
          <p className="text-center text-xl font-semibold">
            Pengajuan anda akan kami proses
          </p>
          <p className="text-center text-xl font-semibold">
            Kami akan mengirim peberitahuan melalui Email {data?.email} / No. Wa
            {data?.phone}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            fullWidth
            color="primary"
            variant="shadow"
            onPress={() => route("/")}
          >
            Lanjutkan Ke Halaman Beranda
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
