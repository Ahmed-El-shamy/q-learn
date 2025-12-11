import React, { ReactNode } from "react";
import Page from "./profile/page";
import { Link } from "@/i18n/navigation";
import {
  BadgeDollarSign,
  BookOpenText,
  Heart,
  Icon,
  LogOut,
  LucideIcon,
  Settings,
  Star,
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
    title: "Account Settings",
    link: "settings",
    icon: Settings,
  },
  {
    title: "Logout",
    link: "logout",
    icon: LogOut,
  },
];

const ProfileLayout = ({ children, tabs }: ProfileLayoutProps) => {
  return (
    <div className="flex containerr py-10 gap-10 text-[#373737]">
      <div className="flex-1 h-fit bg-gray-100 rounded-xl">
        <div className="flex-column py-10 px-5">
          <ul className="flex-column gap-2">
            {tapsData.map((tab, i) => (
              <li
                key={i}
                className="p-3 hover:bg-linear-to-r from-[#660afb] to-[#b633ff] hover:text-white cursor-pointer rounded flex items-center gap-2"
              >
                <tab.icon size={20} />
                <Link href={`/profile/${tab.link}`}>{tab.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-2">{children}</div>
    </div>
  );
};

export default ProfileLayout;
