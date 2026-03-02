"use client";
import { useCart } from "@/store/CartProvider";
import { useTranslations } from "next-intl";
import Image from "next/image";
import MainBtn from "@/_components/common/buttons/MainBtn";
import OrderSkelton from "./OrderSkelton";
import Coupon from "./Coupon";
import useCheckout from "../_quires/useCheckout";

const OrderDetails = () => {
  const { items, subtotal, total, isLoading } = useCart();
  const { isPending, mutateAsync } = useCheckout();
  const t = useTranslations("checkout");

  const handlePay = async () => {
    if (!items.length) return;
    const payload = {
      courses: items.map((item) => ({ course_id: String(item.id) })),
    };
    try {
      const res = await mutateAsync(payload);
      window.location.href = (res as { payment_url: string }).payment_url;
    } catch (err) {
      console.error("Checkout failed", err);
    }
  };

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
                  alt={t("course image")}
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

      <div className="w-full mt-10">
        <MainBtn
          type="button"
          isLoading={isPending}
          disabled={isPending || !items.length}
          onClick={handlePay}
          containerClassName="w-full"
        >
          {t("proceedToPayment")}
        </MainBtn>
      </div>
    </div>
  );
};

export default OrderDetails;
