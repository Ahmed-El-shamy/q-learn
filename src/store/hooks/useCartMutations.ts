"use client";
import { CartItem } from "@/types/cart.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useRef } from "react";
import { useCartApi } from "./useCartApi";
import { Api } from "@/_lib/api/api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const showToast = (type: "success" | "error", message: string) => {
  if (type === "success") toast.success(message);
  else toast.error(message);
};

export const useCartMutations = (
  items: CartItem[],
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
  isMerging: React.MutableRefObject<boolean>
) => {
  const queryClient = useQueryClient();
  const { addToCart, removeFromCart, clearCart } = useCartApi();
  const t = useTranslations("cart");

  const invalidateCart = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [Api.routes.site.cart] });
  }, [queryClient]);

  const addMutation = useMutation({
    mutationFn: (course_id: number[]) => {
      return addToCart(course_id);
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [Api.routes.site.cart] });
      const previous = items;

      return { previous };
    },

    onSuccess: () => {
      if (isMerging.current) {
        toast.success(t("items added to cart successfully"));
      } else {
        toast.success(t("added to cart"));
      }
    },

    onError: (_, __, context) => {
      if (context?.previous) setItems(context.previous);
      showToast("error", t("failed to add course"));
    },

    onSettled: invalidateCart,
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => removeFromCart(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [Api.routes.site.cart] });
      const previous = items;
      setItems((prev) => prev.filter((i) => i.id !== id));
      return { previous };
    },
    onSuccess: () => {
      toast.success(t("item removed from cart"));
    },

    onError: (_, __, context) => {
      if (context?.previous) setItems(context.previous);
      showToast("error", t("failed to remove course"));
    },

    onSettled: invalidateCart,
  });

  const clearMutation = useMutation({
    mutationFn: clearCart,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [Api.routes.site.cart] });
      const previous = items;
      setItems([]);
      return { previous };
    },

    onSuccess: () => {
      toast.success(t("cart cleared"));
    },

    onError: (_, __, context) => {
      if (context?.previous) setItems(context.previous);
      showToast("error", t("failed to clear cart"));
    },

    onSettled: invalidateCart,
  });
  return { addMutation, removeMutation, clearMutation };
};
