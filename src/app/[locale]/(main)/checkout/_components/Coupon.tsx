"use client";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useApplyCopoun } from "../_hooks/useApplyCoupon";
import { toast } from "sonner";

const Coupon = () => {
  const [isApplied, setIsApplied] = useState(false);
  const t = useTranslations("checkout.coupon");

  const { submit, methods, applyCouponMutation: {isPending} } = useApplyCopoun();
  const { watch, setValue } = methods;
  const coupon = watch("coupon_code");

  const handleApplyCoupon = async () => {
    try {
      await submit();
      setIsApplied(true);
      toast.success(t("coupon applied successfully"));
    } catch (error: any) {
      setIsApplied(false);
      console.log(error);
    }
  };

  return (
    <div className="flex-between border-b border-b-[#d1d1d1] pb-5">
      <input
        type="text"
        value={coupon}
        onChange={(e) => {
          setValue("coupon_code", e.target.value);
          setIsApplied(false);
        }}
        placeholder={t("enter coupon code")}
        className="outline-0 border border-[#d1d1d1] rounded p-3 placeholder:text-[#515051] text-[#515051] w-1/2 md:w-3/4 lg:w-1/2 xl:w-3/4"
      />
      <div
        className={` transition-opacity ${
          !coupon.trim() || isPending || isApplied
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        <MainBtn
          isLoading={isPending}
          disabled={!coupon.trim() || isPending || isApplied}
          onClick={handleApplyCoupon}
        >
          {t("apply")}
        </MainBtn>
      </div>
    </div>
  );
};

export default Coupon;
