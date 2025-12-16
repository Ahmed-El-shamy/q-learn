"use client";
import { useCallback, useMemo, useState } from "react";
import { IoHomeOutline, IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import IconBadge from "../icon/IconBadge";
import { useRouter } from "@/i18n/navigation";
const MobileWidget = () => {
  const router = useRouter();
  const [showCategoriesSidebar, setShowCategoriesSidebar] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const user = false;
  // ✅ memoize handlers
  const openCategoriesSidebar = useCallback(
    () => setShowCategoriesSidebar(true),
    []
  );
  const closeCategoriesSidebar = useCallback(
    () => setShowCategoriesSidebar(false),
    []
  );
  const openCartSidebar = useCallback(() => setShowCartSidebar(true), []);
  const closeCartSidebar = useCallback(() => setShowCartSidebar(false), []);

  const homeAction = useCallback(() => router.push("/"), []);

  const accountAction = useCallback(
    () => router.push(user ? "/my-profile" : "/auth/login"),
    [user]
  );

  // ✅ define icons config to avoid repetition
  const actions = useMemo(
    () => [
      { Icon: IoHomeOutline, title: "home", onClick: homeAction },

      { Icon: FaRegUser, title: "my account", onClick: accountAction },
    ],
    [homeAction, openCategoriesSidebar, openCartSidebar, accountAction]
  );

  return (
    <div className="lg:hidden">
      <nav
        className="fixed bottom-0 z-30 left-0 right-0 w-full main-background shadow-2xl px-2 py-4"
        role="navigation"
        aria-label="Mobile bottom navigation"
      >
        <div className="containerr">
          <ul className="flex justify-between flex-nowrap text-nowrap items-center gap-3 overflow-x-auto">
            {actions.map(({ Icon, title, onClick }) => (
              <li key={title} className="relative">
                <IconBadge Icon={Icon} title={title} onClick={onClick} />
                {/* {type && type === "cart" && (
                  <div className="absolute top-0 flex-center -left-2 w-5 h-5 bg-orangeColor rounded-[50%]">
                    <p>{items?.length}</p>
                  </div>
                )} */}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* {showCartSidebar && (
        <CartSidebar isOpen={showCartSidebar} onClose={closeCartSidebar} />
      )} */}
      {/* {showCategoriesSidebar && (
        <CategoriesSidebar
          isOpen={showCategoriesSidebar}
          onClose={closeCategoriesSidebar}
        />
      )} */}
    </div>
  );
};

export default MobileWidget;
