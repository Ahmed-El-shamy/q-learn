import { CartItem } from "@/_types/cart.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useRef } from "react";
import { useCartApi } from "./useCartApi";
import { Api } from "@/_lib/api/api";
import { toast } from "sonner";

const showToast = (type: "success" | "error", message: string) => {
  if (type === "success") toast.success(message);
  else toast.error(message);
};

export const useCartMutations = (
  items: CartItem[],
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
) => {
  const queryClient = useQueryClient();
  const { addToCart, removeFromCart, clearCart } = useCartApi();

  const invalidateCart = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [Api.routes.cart] });
  }, [queryClient]);

  const addMutation = useMutation({
    mutationFn: (courses: { course_id: string }[]) => addToCart(courses),

    onMutate: async (courses) => {
      await queryClient.cancelQueries({ queryKey: [Api.routes.cart] });
      const previous = items;

      const newItem: CartItem = {
        id: courses[0].course_id,
        course_id: courses[0].course_id,
        title: "",
        description: "",
        image: "",
        instructor: "",
        category: "",
        price: 0,
        has_discount: false,
        sale_price: 0,
        is_in_wishlist: false,
        isLoading: false,
      };

      setItems((prev) => [...prev, newItem]);
      return { previous };
    },

    onError: (e, _, context) => {
      if (context?.previous) setItems(context.previous);
      showToast("error", "Faild to add course");
    },

    onSettled: invalidateCart,
  });

  const removeMutation = useMutation({
    mutationFn: (course_id: string) => removeFromCart(course_id),

    onMutate: async (course_id) => {
      await queryClient.cancelQueries({ queryKey: [Api.routes.cart] });
      const previous = items;
      setItems((prev) => prev.filter((i) => i.course_id !== course_id));
      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous) setItems(context.previous);
      showToast("error", "Failed to remove course");
    },

    onSettled: invalidateCart,
  });

  const clearMutation = useMutation({
    mutationFn: clearCart,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [Api.routes.cart] });
      const previous = items;
      setItems([]);
      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous) setItems(context.previous);
      showToast("error", "Failed to clear cart");
    },

    onSuccess: () => showToast("success", "Cart cleared"),
    onSettled: invalidateCart,
  });
  return { addMutation, removeMutation, clearMutation };
};
