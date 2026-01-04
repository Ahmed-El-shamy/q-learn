"use client";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useApplyCoupon } from "../_hooks/useApplyCoupon";
import { toast } from "sonner";

const Coupon = () => {
  const [coupon, setCoupon] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const t = useTranslations("checkout.coupon");

  const { mutate, isPending } = useApplyCoupon();
  const handleApplyCoupon = () => {
    mutate(
      { code: coupon },
      {
        onSuccess: () => {
          setIsApplied(true);
          toast.success(t("coupon applied successfully"));
        },
        onError: (error: any) => {
          setIsApplied(false);
          toast.error(t("invalid coupon"));
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="flex-between border-b border-b-[#d1d1d1] pb-5">
      <input
        type="text"
        value={coupon}
        onChange={(e) => {
          setCoupon(e.target.value);
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
