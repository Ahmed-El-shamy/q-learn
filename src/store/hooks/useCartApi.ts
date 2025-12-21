import api from "@/_lib/api/api";
import { CartResponse } from "@/types/cart.types";

export const useCartApi = () => {
  // Get Cart
  const getCart = async (): Promise<CartResponse> => {
    const response = await api.get<CartResponse>("/cart");
    return response?.data || { items: [] };
  };

  const addToCart = async (courses: { course_id: string }[]) => {
    const response = await api.post("/cart/add", { courses });
    return response;
  };

  const removeFromCart = async (course_id: string) => {
    const response = await api.delete(`/cart/remove/${course_id}`);
    return response;
  };

  const clearCart = async () => {
    const response = await api.delete("/cart/clear");
  };

  const getCartTotal = async () => {
    const response = await api.get("/cart/total");
    return response;
  };

  return {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
  };
};
