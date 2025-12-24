"use client";

import { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import {
  BadgeDollarSign,
  BookOpenText,
  BookCheck,
  Heart,
  LogOut,
  ShieldCheck,
  Star,
  UserRoundPen,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

type Tab = { title: string; link: string; icon: LucideIcon };

const tabsData: Tab[] = [
  { title: "Dashboard", link: "user", icon: LayoutDashboard },
  { title: "Profile", link: "user/profile", icon: UserRoundPen },
  { title: "Courses", link: "user/courses", icon: BookOpenText },
  { title: "Assignments", link: "user/assignments", icon: BookCheck },
  { title: "Certificates", link: "user/certificates", icon: ShieldCheck },
  { title: "Favourite", link: "user/favourite", icon: Heart },
  { title: "Reviews", link: "user/reviews", icon: Star },
  {
    title: "Payment Methods",
    link: "user/payment-methods",
    icon: BadgeDollarSign,
  },
  { title: "Logout", link: "logout", icon: LogOut },
];

const normalize = (s: string) => (s === "/" ? "/" : s.replace(/\/$/, ""));

const isActiveTab = (pathname: string, link: string) => {
  const p = normalize(pathname);
  const href = normalize(`/${link}`);

  // ✅ Dashboard لازم يكون exact فقط
  if (link === "user") return p === href;

  // ✅ باقي التابات exact أو sub-routes
  return p === href || p.startsWith(`${href}/`);
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="containerr py-4 sm:py-6 md:py-10 text-[#373737]">
      {/* ✅ Mobile tabs bar (sticky) */}
      <div className="md:hidden sticky top-0 z-30 -mx-4 px-4 bg-white/95 backdrop-blur shadow-2xl">
        <div className="py-3 flex items-center">
          <ul
            className="
              flex gap-2 overflow-x-auto
              snap-x snap-mandatory
              [-webkit-overflow-scrolling:touch]
              no-scrollbar pb-3 md:pb-0
            "
          >
            {tabsData.map((tab) => {
              const active = isActiveTab(pathname, tab.link);
              const Icon = tab.icon;

              return (
                <li key={tab.link} className="shrink-0 snap-start">
                  <Link
                    href={`/${tab.link}`}
                    className={`
                      inline-flex items-center gap-2
                      h-10 px-3 rounded-full border
                      text-sm font-medium whitespace-nowrap
                      transition
                      ${
                        active
                          ? "main-background text-white border-transparent shadow-sm"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }
                    `}
                  >
                    <Icon size={16} />
                    <span>{tab.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ✅ Layout grid */}
      <div className="grid gap-4 sm:gap-6 md:gap-10 md:grid-cols-[280px_minmax(0,1fr)]">
        {/* ✅ Desktop sidebar */}
        <aside className="hidden md:block">
          <div className="sticky top-6">
            <div className="rounded-2xl border bg-gray-50 shadow-sm overflow-hidden">
              <div className="p-3">
                <ul className="flex flex-col gap-1">
                  {tabsData.map((tab) => {
                    const active = isActiveTab(pathname, tab.link);
                    const Icon = tab.icon;

                    return (
                      <li key={tab.link}>
                        <Link
                          href={`/${tab.link}`}
                          className={`
                            group flex items-center gap-3
                            px-3 py-2 rounded-xl
                            text-sm font-medium
                            transition
                            ${
                              active
                                ? "main-background text-white"
                                : "hover:bg-linear-to-r from-[#660afb] via-[#b633ff] to-[#660afb] hover:text-white"
                            }
                          `}
                        >
                          <Icon size={18} />
                          <span>{tab.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* ✅ Content */}
        <main className="min-w-0 w-full mt-8 md:mt-0">{children}</main>
      </div>
    </div>
  );
}
