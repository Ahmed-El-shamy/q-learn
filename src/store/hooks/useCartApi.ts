import api, { Api } from "@/_lib/api/api";
import { CartResponse } from "@/types/cart.types";

export const useCartApi = () => {
  const getCart = async (): Promise<CartResponse> => {
    const response = await api.get(Api.routes.site.cart);
    return response?.data as CartResponse;
  };

  const addToCart = async (course_id: number[]) => {
    const response = await api.post(Api.routes.site.cart, {
      course_id,
    });
    return response?.data;
  };

  const removeFromCart = async (id: number) => {
    const response = await api.delete(`${Api.routes.site.cart}/${id}`);
    return response?.data;
  };

  const clearCart = async () => {
    const response = await api.delete(Api.routes.site.cart);
    return response?.data;
  };

  return {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
