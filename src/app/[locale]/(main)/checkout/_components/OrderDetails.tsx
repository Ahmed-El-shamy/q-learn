"use client";
import { useCart } from "@/store/CartProvider";
import { useTranslations } from "next-intl";
import Image from "next/image";
import OrderSkelton from "./OrderSkelton";
import Coupon from "./Coupon";
import { useEffect } from "react";

const OrderDetails = () => {
  const { items, subtotal, total, isLoading } = useCart();

  const t = useTranslations("checkout");
  return (
    <div className="w-full md:max-w-2xl mx-auto border border-[#d1d1d1] rounded-lg p-8 space-y-6">
      <h2 className="text-xl text-[#1f2b40] font-semibold">
        {t("your order")}
      </h2>

      {/* Courses details */}
      {isLoading
        ? Array(3)
            .fill(0)
            .map((_, idx) => <OrderSkelton key={idx} />)
        : items.map((i) => (
            <div key={i.title} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image
                  src={i.course?.thumbnail || "/images/courses/1.jpg"}
                  alt={t(i.title) || t("course image")}
                  width={100}
                  height={100}
                  className="rounded-lg h-16 w-20 object-cover"
                />
                <h3 className="text-[#515051] line-clamp-1 w-3/4">{i.title}</h3>
              </div>
              <p className="text-[#373737] text-sm w-28">
                {i.price} {t("currency")}
              </p>
            </div>
          ))}

      {/* Subtotal */}
      <div className="flex-between border-y border-y-[#d1d1d1] py-5">
        <h2 className="text-lg text-[#1f2b40] font-semibold">
          {t("subtotal")}
        </h2>
        <p className="text-[#373737] text-sm font-semibold">
          {subtotal} {t("currency")}
        </p>
      </div>

      {/* Coupon Code */}
      <Coupon />

      {/* Payable */}
      <div className="flex-between">
        <h2 className="text-lg text-[#1f2b40] font-semibold">
          {t("payable amount")}
        </h2>
        <p className="text-[#373737] text-sm font-semibold">
          {total} {t("currency")}
        </p>
      </div>

      {/* <div
        className={`flex-center mt-10 ${
          !receipt ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <MainBtn type="button" disabled={!receipt}>
          {" "}
          {t("place an order")}{" "}
        </MainBtn>
      </div> */}
    </div>
  );
};

export default OrderDetails;
