"use client";
import { Api } from "@/_lib/api/api";
import { useMutation } from "@tanstack/react-query";
import { validateCoupon } from "../_quires/coupon.api";

export const useApplyCoupon = () => {
  return useMutation({
    mutationKey: [Api.routes.site.coupon],
    mutationFn: async ({ code }: { code: string }) => {
      return validateCoupon(code);
    },
  });
};
