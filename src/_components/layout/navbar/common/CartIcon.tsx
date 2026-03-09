"use client";

import MainBtn from "@/_components/common/buttons/MainBtn";
import { ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useCart } from "@/store/CartProvider";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Link, useRouter } from "@/i18n/navigation";

const CartIcon = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { items, total, removeFromCart, clearCart } = useCart();
  const { status } = useSession();
  const router = useRouter();
  const t = useTranslations("cart");
  const tCommon = useTranslations();

  const handleCartEnter = useCallback(() => {
    setCartOpen(true);
  }, []);

  const handleCartLeave = useCallback(() => {
    setCartOpen(false);
  }, []);

  const handleClearCart = useCallback(() => {
    toast(t("are you sure you want to clear the cart"), {
      description: t("this action cannot be undone"),
      action: {
        label: t("clear"),
        onClick: () => {
          clearCart();
          setCartOpen(false);
        },
      },
      cancel: {
        label: t("cancel"),
        onClick: () => {
          console.log("Cancelled");
        },
      },
      duration: 5000,
    });
  }, [clearCart]);

  const handleCheckout = () => {
    if (status === "unauthenticated") {
      router.push("/auth/login?redirect_url=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleCartEnter}
      onMouseLeave={handleCartLeave}
    >
      <div className="relative">
        <ShoppingCart size={25} className="cursor-pointer" />

        {items.length > 0 && (
          <span className="absolute -top-2 start-4 w-5 h-5 flex items-center justify-center rounded-full main-background text-white text-xs font-bold">
            {items.length}
          </span>
        )}
      </div>

      <div
        className={`
            absolute z-100 -start-70 transition-all duratin-300 ease-out w-92 min-h-28
            max-h-140 pt-5
            ${
              cartOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }
        `}
      >
        <div className="py-4 bg-white shadow-xl rounded-xl border border-gray-100 flex flex-col">
          <div className="flex flex-col gap-4 overflow-y-auto max-h-100 px-4 divide-y divide-[#d1d1d1] min-h-24">
            {items.length === 0 ? (
              <p className="text-center text-lg py-8 text-[#737887]">
                {t("there is no courses in cart")}
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.item_id}
                  className="flex justify-between items-center pb-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-16 shrink-0">
                      <Image
                        src={item.course?.image || "/images/courses/10.jpg"}
                        alt={item.title || "Course 1"}
                        width={50}
                        height={100}
                        className="rounded-lg w-full h-full"
                      />
                    </div>

                    <div className="flex flex-col text-[#1f2b40] text-sm">
                      <Link
                        href={`/courses/${item.item_id}`}
                        className="font-semibold line-clamp-2 hover:text-green-800 hover:underline"
                        onClick={() => setCartOpen(false)}
                      >
                        {item.title}
                      </Link>
                      <p className="text-[#737887]">
                      </p>
                        {item.course?.instructor?.user?.name ||
                          item.course?.category?.name ||
                          tCommon(`levels.${item.course?.level}` || "")}
                      <p className="font-semibold">
                        {item.price} {t("currency")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Trash
                      size={22}
                      stroke="#FF0000"
                      className="cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="space-y-4 px-4 pt-4 mt-4 border-t border-t-[#d1d1d1]">
              <div className="flex items-center gap-2">
                <h2 className="text-xl text-[#1f2b40] font-semibold">
                  {t("total")}:{" "}
                </h2>
                <p className="text-[#737888]">
                  {Number(total).toFixed(2)} {t("currency")}
                </p>
              </div>

              {/* {couponCode && (
                <p className="text-green-600">
                  Coupon applied: {couponCode.code} - {couponCode.value}{" "}
                  {couponCode.type}
                </p>
              )} */}

              <div className="flex justify-between items-center">
                <MainBtn onClick={handleClearCart}>{t("clearCart")}</MainBtn>

                <MainBtn onClick={handleCheckout}>{t("checkout")}</MainBtn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartIcon;
