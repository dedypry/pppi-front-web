import { useState, ReactNode, useEffect } from "react";
import { Drawer, DrawerContent } from "@heroui/react";
import { Outlet } from "react-router-dom";

import SidebarMenu from "./partials/sidebar-menu";
import NavbarComponent from "./partials/navbar";

import AuthGuard from "@/guards/AuthGuard";

interface Props {
  children?: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const isMobile = useMediaQuery("(max-width: 1023px)");

  console.log(isMobile);

  useEffect(() => {
    setIsOpen(false);
  }, [isMobile]);

  function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);

      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);

      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
  }

  return (
    <AuthGuard>
      {isMobile ? (
        <Drawer
          className="bg-primary pl-4"
          isOpen={isOpen}
          placement="left"
          size="xs"
          onClose={() => setIsOpen(false)}
        >
          <DrawerContent>{() => <SidebarMenu />}</DrawerContent>
        </Drawer>
      ) : (
        <aside
          className={`z-50 translation-all fixed h-screen w-[266px] transform bg-gradient-to-tr from-primary-900 to-primary-600 pl-3 shadow-lg shadow-primary-200 duration-300 ease-in-out ${
            !isOpen ? "-translate-x-full" : "translate-x-0"
          } ${isMobile && "-translate-x-full"} `}
        >
          <SidebarMenu />
        </aside>
      )}
      <div
        className={`${!isOpen ? "pl-0" : "lg:pl-[266px]"} translation-all duration-300 ease-in-out`}
      >
        <main className="px-5 pt-1">
          <NavbarComponent isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="py-5">
            <Outlet />
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
