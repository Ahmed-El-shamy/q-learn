"use client";
import { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import {
  BadgeDollarSign,
  BookOpenText,
  Heart,
  Icon,
  LogOut,
  LucideIcon,
  Settings,
  Star,
  UserRoundPen,
} from "lucide-react";

export interface ProfileTabsProps {
  title: string;
  link: string;
  icon: LucideIcon;
}

export interface ProfileLayoutProps {
  children: ReactNode;
  tabs: ProfileTabsProps[];
}

const tapsData = [
  {
    title: "Profile",
    link: "profile",
    icon: UserRoundPen,
  },
  {
    title: "Courses",
    link: "courses",
    icon: BookOpenText,
  },
  {
    title: "Favourite",
    link: "favourite",
    icon: Heart,
  },
  {
    title: "Reviews",
    link: "reviews",
    icon: Star,
  },
  {
    title: "Payment Methods",
    link: "payment-methods",
    icon: BadgeDollarSign,
  },
  {
    title: "Logout",
    link: "logout",
    icon: LogOut,
  },
];

const ProfileLayout = ({ children, tabs }: ProfileLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row containerr py-10 gap-10 text-[#373737]">
      <div className="flex-1 h-fit bg-gray-100 rounded-xl">
        <div className="flex-column py-10 px-5">
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2">
            {tapsData.map((tab, i) => {
              const isActive = pathname === `/${tab.link}`;
              return (
                <li key={i}>
                  <Link
                    href={`/${tab.link}`}
                    className={`
                      p-3 hover:px-7 group rounded flex items-center gap-2 duration-500
                      ${
                        isActive
                          ? "main-background text-white px-7"
                          : "hover:bg-linear-to-r from-[#660afb] via-[#b633ff] to-[#660afb] hover:text-white"
                      }
                    `}
                  >
                    <tab.icon size={20} />
                    <span>{tab.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex-2">{children}</div>
    </div>
  );
};

export default ProfileLayout;
