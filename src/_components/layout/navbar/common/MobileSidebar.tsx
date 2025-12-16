"use client";
import { Menu, X } from "lucide-react";
import { useNavbar } from "../hooks/useNavbar";
import { NavLinks } from "../data/navbarLinks";
import { useEffect, type FC } from "react";
import type { NavbarProps } from "../types/navbar";
import Link from "next/link";

const MobileSidebar: FC<Omit<NavbarProps, "logoImg">> = ({
  links = [],
  logoText,
}) => {
  const { isOpen, toggleMenu } = useNavbar();

  function handleDisableScroll() {
    if (isOpen && window.innerWidth < 768) {
      console.log("hello there");
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
        className={`z-10 bg-white border-l-primary w-2/3 py-4 flex flex-col max-w-lg h-screen overflow-y-auto fixed top-0 left-0 duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center border-b border-b-primary px-6 pb-2">
          <p className="text-xl">{logoText}</p>
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
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 items-center mt-auto py-4 px-10 [&>button]:cursor-pointer">
          <button className="bg-primary text-white font-bold w-full rounded-lg py-2 duration-100 hover:bg-primary/90">
            Log in
          </button>
          <button className="bg-white/40 text-black backdrop-blur-lg border border-primary hover:bg-gray-100 duration-100 font-bold w-full rounded-lg py-2">
            Create an account
          </button>
        </div>
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
