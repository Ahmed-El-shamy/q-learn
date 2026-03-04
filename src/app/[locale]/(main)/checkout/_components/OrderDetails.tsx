"use client";
import { useCart } from "@/store/CartProvider";
import { useTranslations } from "next-intl";
import Image from "next/image";
import MainBtn from "@/_components/common/buttons/MainBtn";
import OrderSkelton from "./OrderSkelton";
import Coupon from "./Coupon";
import useCheckout from "../_quires/useCheckout";

const OrderDetails = () => {
  const { items, subtotal, total, isLoading, cartQuery } = useCart();
  const { isPending, mutateAsync } = useCheckout();
  const t = useTranslations("checkout");
  const tCommon = useTranslations();

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
    <div className="w-full md:max-w-2xl mx-auto rounded-lg p-8 space-y-6">
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
                  src={i.course?.image || "/images/courses/1.jpg"}
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


      {/* Coupon Code */}
      <Coupon />

      {/* Discount and Total - Invoice Style */}
      <div className="space-y-2">
        <div className="flex-between">
          <p className="text-[#515051] text-sm">
            {t("subtotal")}
          </p>
          <p className="text-[#373737] text-sm font-semibold">
            {subtotal} {tCommon("currency.SAR")}
          </p>
        </div>
        {cartQuery.data?.cart?.discount && (
          <div className="flex-between">
            <p className="text-[#515051] text-sm">
              {t("discount")}
            </p>
            <p className="text-[#00C950] text-sm font-semibold">
              - {cartQuery.data.cart.discount} {tCommon("currency.SAR")}
            </p>
          </div>
        )}
        <div className="flex-between pt-3 border-t border-t-[#d1d1d1]">
          <h2 className="text-xl text-[#1f2b40] font-bold">
            {t("payable amount")}
          </h2>
          <p className="text-xl text-[#1f2b40] font-bold">
            {total} {tCommon("currency.SAR")}
          </p>
        </div>
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
