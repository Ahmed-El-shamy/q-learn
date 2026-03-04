"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import applyCouponSchema, { ApplyCouponPayload } from "../_schemas/applyCouponSchema";
import api, { Api } from "@/_lib/api/api";
import { validateCoupon } from "../_quires/coupon.api";
import toastErrorMessage from "@/_lib/api/toastErrorMessage";

export const useApplyCopoun = () => {
  const queryClient = useQueryClient();
  const methods = useForm<ApplyCouponPayload>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(applyCouponSchema),
    defaultValues: {
      coupon_code: "",
    },
  });

  const applyCouponMutation = useMutation({
    mutationFn: async (payload: ApplyCouponPayload) => {
      // Validate coupon first
      await validateCoupon(payload.coupon_code);
      
      // If valid, fetch cart summary with coupon
      const response = await api.get(Api.routes.site.cartItemsSummary, {
        params: { coupon_code: payload.coupon_code },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Api.routes.site.cart] });
    },
    onError: (err: unknown) => {
      toastErrorMessage(err);
    },
  });

  const onSubmit = async (payload: ApplyCouponPayload) => {
    await applyCouponMutation.mutateAsync(payload);
  };

  return {
    submit: methods.handleSubmit(onSubmit),
    methods,
    applyCouponMutation
  };
};
