import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  scrolled: boolean;
}
export default function InformationButton({ scrolled }: Props) {
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
            className={`link-anim cursor-pointer ${scrolled ? "text-gray-800" : "text-white"}`}
          >
            Informasi
          </p>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            key={"blog"}
            color="primary"
            onClick={() => route("/blogs")}
          >
            Blogs
          </DropdownItem>
          <DropdownItem key={"galesy"} color="primary" onClick={() => {}}>
            Gallery
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
