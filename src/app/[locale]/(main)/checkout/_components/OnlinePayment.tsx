"use client";

import MainBtn from "@/_components/common/buttons/MainBtn";
import { useCart } from "@/store/CartProvider";
import useCheckout from "../_quires/useCheckout";
const OnlinePayment = () => {
  const { isPending, mutateAsync } = useCheckout();
  const { items } = useCart();

  const handlePay = async () => {
    if (!items.length) return;

    const payload = {
      courses: items.map((item) => ({
        course_id: String(item.id),
      })),
      //   is_free_access: "0",
      // coupon_code: coupon,
      // guest_token,
      // learning_path_id,
    };

    try {
      const res = await mutateAsync(payload);
      console.log("res from payment", res);
      window.location.href = (res as { payment_url: string }).payment_url;
    } catch (err) {
      console.error("Checkout failed", err);
    }
  };

  return (
    <div className="border rounded-xl p-6 bg-gray-50 space-y-4">
      <h3 className="font-semibold text-lg">Pay Online</h3>
      <p className="text-sm text-gray-600">
        You will be redirected to our secure payment provider to complete your
        purchase.
      </p>

      <MainBtn
        isLoading={isPending}
        disabled={isPending}
        onClick={handlePay}
        className="w-full"
      >
        Proceed to Payment
      </MainBtn>
    </div>
  );
};

export default OnlinePayment;
