// "use client";
// import { ReactNode } from "react";
// import { Link, usePathname } from "@/i18n/navigation";
// import {
//   BadgeDollarSign,
//   BookOpenText,
//   Heart,
//   Icon,
//   LogOut,
//   LucideIcon,
//   Settings,
//   Star,
//   UserRoundPen,
//   LayoutDashboard,
//   BookCheck,
//   ShieldCheck,
// } from "lucide-react";

// export interface ProfileTabsProps {
//   title: string;
//   link: string;
//   icon: LucideIcon;
// }

// export interface ProfileLayoutProps {
//   children: ReactNode;
//   tabs: ProfileTabsProps[];
// }

// const tapsData = [
//   {
//     title: "dashboard",
//     link: "dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Profile",
//     link: "profile",
//     icon: UserRoundPen,
//   },
//   {
//     title: "Courses",
//     link: "courses",
//     icon: BookOpenText,
//   },
//   {
//     title: "assignments",
//     link: "assignments",
//     icon: BookCheck,
//   },
//   {
//     title: "certificates",
//     link: "certificates",
//     icon: ShieldCheck,
//   },
//   {
//     title: "Favourite",
//     link: "favourite",
//     icon: Heart,
//   },
//   {
//     title: "Reviews",
//     link: "reviews",
//     icon: Star,
//   },
//   {
//     title: "Payment Methods",
//     link: "payment-methods",
//     icon: BadgeDollarSign,
//   },

//   {
//     title: "Logout",
//     link: "logout",
//     icon: LogOut,
//   },
// ];

// const ProfileLayout = ({ children, tabs }: ProfileLayoutProps) => {
//   const pathname = usePathname();

//   return (
//     <div className="flex flex-col md:flex-row containerr py-10 gap-10 text-[#373737]">
//       <div className="flex-1 h-fit bg-gray-100 rounded-xl border shadow-lg">
//         <div className="flex-column py-10 px-5">
//           <ul className="flex-column gap-2">
//             {tapsData.map((tab, i) => {
//               const isActive = pathname === `/${tab.link}`;
//               return (
//                 <li key={i}>
//                   <Link
//                     href={`/${tab.link}`}
//                     className={`
//                       p-3 hover:px-7 group rounded flex items-center gap-2 duration-500
//                       ${
//                         isActive
//                           ? "main-background text-white px-7"
//                           : "hover:bg-linear-to-r from-[#660afb] via-[#b633ff] to-[#660afb] hover:text-white"
//                       }
//                     `}
//                   >
//                     <tab.icon size={20} />
//                     <span>{tab.title}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//       <div className="flex-2">{children}</div>
//     </div>
//   );
// };

// export default ProfileLayout;
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
  { title: "Dashboard", link: "dashboard", icon: LayoutDashboard },
  { title: "Profile", link: "profile", icon: UserRoundPen },
  { title: "Courses", link: "courses", icon: BookOpenText },
  { title: "Assignments", link: "assignments", icon: BookCheck },
  { title: "Certificates", link: "certificates", icon: ShieldCheck },
  { title: "Favourite", link: "favourite", icon: Heart },
  { title: "Reviews", link: "reviews", icon: Star },
  { title: "Payment Methods", link: "payment-methods", icon: BadgeDollarSign },
  { title: "Logout", link: "logout", icon: LogOut },
];

const isActiveTab = (pathname: string, link: string) => {
  const p = pathname.replace(/\/$/, "");
  return p === `/${link}` || p.startsWith(`/${link}/`);
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="containerr py-4 sm:py-6 md:py-10 text-[#373737]">
      {/* ✅ Mobile tabs bar (sticky) */}
      <div className="md:hidden sticky top-0 z-30 -mx-4 px-4 bg-white/95 backdrop-blur border-b ">
        <div className="py-3">
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
        <main className="min-w-0 w-full">{children}</main>
      </div>
    </div>
  );
}
