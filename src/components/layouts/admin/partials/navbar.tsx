import {
  Navbar,
  NavbarContent,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { MenuIcon, Bell, UserIcon, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { confirmSweet } from "@/utils/helpers/confirm";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { http } from "@/config/axios";
import { notifyError } from "@/utils/helpers/notify";
import { setToken } from "@/stores/features/auth/authSlice";

interface Props {
  isOpen: boolean;
  setIsOpen: CallableFunction;
}
export default function NavbarComponent({ isOpen, setIsOpen }: Props) {
  const { user } = useAppSelector((state) => state.user);
  const route = useNavigate();
  const dispatch = useAppDispatch();

  function handleLogout() {
    http
      .delete("/auth/logout")
      .then(() => {
        dispatch(setToken(null));
        route("/login");
      })
      .catch((err) => notifyError(err));
  }

  return (
    <Navbar
      isBordered
      className="sticky top-1 h-[50px] rounded-md border shadow-md"
      isBlurred={false}
      maxWidth="full"
    >
      <NavbarContent>
        <Button
          isIconOnly
          className="text-primary"
          radius="full"
          size="sm"
          variant="light"
          onPress={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </Button>
        <p className="font-bold text-primary">PPPI</p>
      </NavbarContent>
      <NavbarContent justify="end">
        <Button
          isIconOnly
          className="text-sm font-bold text-black"
          radius="full"
          size="sm"
          variant="light"
        >
          <Bell />
        </Button>
        <Dropdown showArrow offset={15} placement="bottom-end">
          <DropdownTrigger>
            <Avatar size="sm" src={user?.profile?.photo} />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key={1}
              startContent={<UserIcon />}
              onClick={() => route("/member/profile")}
            >
              My Profile
            </DropdownItem>
            <DropdownItem
              key={2}
              startContent={<Settings />}
              onClick={() => {}}
            >
              Settings
            </DropdownItem>
            <DropdownItem
              key={3}
              startContent={<LogOut />}
              onClick={() =>
                confirmSweet(handleLogout, {
                  confirmButtonText: "Ya, Keluar",
                })
              }
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
