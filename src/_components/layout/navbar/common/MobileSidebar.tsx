"use client";
import { Menu, X } from "lucide-react";
import { useNavbar } from "../hooks/useNavbar";
import { NavLinks } from "../data/navbarLinks";
import { useEffect, type FC } from "react";
import type { NavbarProps } from "../types/navbar";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { useQuery } from "@tanstack/react-query";
import { settingsOptions } from "@/app/[locale]/auth/_queries/settingsOptions";
import Image from "next/image";
import { useSession } from "next-auth/react";

const MobileSidebar: FC<Omit<NavbarProps, "logoImg">> = ({
  links = [],
  logoText,
}) => {
  const { isOpen, toggleMenu } = useNavbar();
  const t = useTranslations("auth");
  const tNavbar = useTranslations("navbar");
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const { data } = useQuery({
    ...settingsOptions(),
    refetchOnMount: false
  });

  function handleDisableScroll() {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  useEffect(() => {
    handleDisableScroll();
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleDisableScroll);

    return () => window.removeEventListener("resize", handleDisableScroll);
  }, []);

  return (
    <div className="lg:hidden z-50">
      <button
        className="p-1 hover:bg-gray-100 rounded duration-100 cursor-pointer"
        onClick={toggleMenu}
      >
        <Menu />
      </button>
      <aside
        className={`z-10 bg-white border-l-primary w-2/3 py-4 flex flex-col max-w-lg h-screen overflow-y-auto fixed top-0 left-0 duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center border-b border-b-primary px-6 pb-2">
          <Link href="/" onClick={() => toggleMenu()}>
            <Image
              src={data?.site_logo || ""}
              alt="logo"
              height={20}
              width={20}
              className="size-[20px]"
            />
          </Link>
          <button
            onClick={toggleMenu}
            className="cursor-pointer p-1 hover:bg-gray-100 duration-100 rounded"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex flex-col px-6 py-4">
          {NavLinks.concat(links).map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="py-4 px-2 hover:bg-gray-100 capitalize rounded-lg duration-100 cursor-pointer"
              prefetch={false}
            >
              {tNavbar(`links.${link.label}`)}
            </Link>
          ))}
        </div>
        {
          !isAuthenticated && (
            <div className="flex flex-col w-full gap-2 mt-auto py-4 px-10 [&>button]:cursor-pointer">
              <Link href="/auth/login">
                <MainBtn containerClassName="w-full">{t("login.button")}</MainBtn>
              </Link>
              <Link href="/auth/register">
                <MainBtn containerClassName="w-full" variant="outlined">{t("signup")}</MainBtn>
              </Link>
            </div>
          )
        }
      </aside>
      {isOpen && (
        <>
          <div
            className="fixed top-0 start-0 duration-100 bg-black/30 h-full w-full"
            onClick={toggleMenu}
          />
        </>
      )}
    </div>
  );
};

export default MobileSidebar;
