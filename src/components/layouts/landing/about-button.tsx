import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  scrolled: boolean;
}
export default function AboutButton({ scrolled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const route = useNavigate();

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Dropdown isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DropdownTrigger>
          <p
            className={`link-anim cursor-pointer ${scrolled ? "text-gray-600" : "text-white"}`}
          >
            Tentang Kami
          </p>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            key={"about"}
            color="primary"
            onClick={() => route("/history")}
          >
            Sejarah PPPI
          </DropdownItem>
          <DropdownItem
            key={"visi"}
            color="primary"
            onClick={() => route("/visi-misi")}
          >
            Visi dan Misi
          </DropdownItem>
          <DropdownItem
            key={"struktur"}
            color="primary"
            onClick={() => route("/organization")}
          >
            Struktur Organisasi
          </DropdownItem>
          <DropdownItem
            key={"lpk"}
            color="primary"
            onClick={() => route("/lpk-pppi")}
          >
            LPK PPPI
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
