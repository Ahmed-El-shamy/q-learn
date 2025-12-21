"use client";

import { Link } from "@/i18n/navigation";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import useSignout from "@/app/[locale]/auth/_hooks/useSignout";
import Loader from "@/_components/common/loaders/spinner/Loader";
import clsx from "clsx";

const UserIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    mutate: signout,
    isPending: signoutPending
  } = useSignout();

  const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    function closeOnClick(e: MouseEvent) {
        if(menuRef.current && !menuRef.current.contains(e.target as HTMLElement)) {
            setIsOpen(false);
        }
    }

    window.addEventListener("click", closeOnClick);

    return () => window.removeEventListener("click", closeOnClick);
  }, []);

  return (
    <div
      className="relative"
      onClick={toggleOpen}
      ref={menuRef}
    >
      <div className="relative rounded-full border p-1 hover:bg-gray-100 duration-100">
        <User size={25} className="cursor-pointer" />
      </div>
      {
        isOpen && (
            <div
                className={`
                    absolute z-50 start-1/2 -translate-x-1/2 w-fit flex flex-col bg-white shadow-md shadow-gray-300 border border-gray-200 top-[110%]
                    *:px-8 *:py-2 *:hover:bg-gray-100 *:duration-100 *:cursor-pointer 
                    ${
                    isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <Link href="/user" className="text-nowrap">
                    {t("common.my-profile")}
                </Link>
                <button 
                    onClick={() => signout()}
                    className={clsx({
                        "pointer-events-none": signoutPending 
                    })}
                >
                    {
                        signoutPending ?
                        <div className="flex justify-center items-center">
                            <Loader />
                        </div>
                        :
                        t("auth.logout")
                    }
                </button>
            </div>
        )
      }

    </div>
  );
};

export default UserIcon;