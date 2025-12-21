"use client";

import { CartItem } from "@/types/cart.types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCartApi } from "./hooks/useCartApi";
import { useCartMutations } from "./hooks/useCartMutations";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/_lib/api/api";
import { toast } from "sonner";

interface CartContextProps {
  items: CartItem[];
  subtotal: number;
  total: number;
  couponCode?: { code: string; value: string; type: string };
  setCouponCode: (code?: { code: string; value: string; type: string }) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (course_id: string) => void;
  clearCart: () => void;
  isInCart: (course_id: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);
const LOCAL_CART_KEY = "guest_cart_courses";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { getCart } = useCartApi();
  //   const { user } = useAuth();
  const user = null;
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<{
    code: string;
    value: string;
    type: string;
  }>();
  const { addMutation, removeMutation, clearMutation } = useCartMutations(
    items,
    setItems
  );

  const localSubtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price =
        item.has_discount && item.sale_price
          ? item.sale_price
          : Number(item.price || 0);
      return sum + price;
    }, 0);
  }, [items]);

  //   Guest: load local cart
  useEffect(() => {
    if (!user) {
      const local = localStorage.getItem(LOCAL_CART_KEY);
      if (local) setItems(JSON.parse(local));
      else setItems([]);
    }
  }, [user]);

  //   Logged user: fetch cart
  const cartQuery = useQuery({
    queryKey: [Api.routes.cart],
    queryFn: getCart,
    enabled: !!user,
  });

  const subtotal = user ? Number(cartQuery.data?.subTotal || 0) : localSubtotal;
  const total = user ? Number(cartQuery.data?.total || 0) : localSubtotal;

  //   Merge guest cart after login
  useEffect(() => {
    if (!user) return;

    const local = localStorage.getItem(LOCAL_CART_KEY);
    if (!local) return;

    const guestItems: CartItem[] = JSON.parse(local);
    if (!guestItems.length) return;

    const courses = guestItems.map((item) => ({
      course_id: item.course_id,
    }));

    addMutation.mutate(courses, {
      onSuccess: () => {
        localStorage.removeItem(LOCAL_CART_KEY);
        if (cartQuery.data?.coupon) {
          setCouponCode(cartQuery.data.coupon);
        }
      },
    });
  }, [user]);

  //   Sync server cart
  useEffect(() => {
    if (cartQuery.data?.items) {
      setItems(cartQuery.data.items);
    }
  }, [cartQuery.data]);

  //   Helpers
  const presistGuestCart = (updated: CartItem[]) => {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updated));
  };

  //   Actions
  const addToCart = useCallback(
    (course: CartItem) => {
      if (!user) {
        if (items.some((i) => i.course_id === course.course_id)) {
          console.log("Course already in cart");
          return toast.info("Course already in cart");
        }
        const updated = [...items, course];
        setItems(updated);
        presistGuestCart(updated);
      } else {
        addMutation.mutate([{ course_id: course.course_id }], {
          onSuccess: () => {
            toast.success("Added to cart");
            console.log("Added to cart");
          },
        });
      }
    },
    [user, items, addMutation]
  );

  const removeFromCart = useCallback(
    (course_id: string) => {
      if (!user) {
        const updated = items.filter((i) => i.course_id !== course_id);
        setItems(updated);
        presistGuestCart(updated);
      } else {
        removeMutation.mutate(course_id, {
          onSuccess: () => {
            toast.success("Removed from cart");
            console.log("Removed from cart");
          },
        });
      }
    },
    [user, items, removeMutation]
  );

  const clearCart = useCallback(() => {
    if (!user) {
      setItems([]);
      localStorage.removeItem(LOCAL_CART_KEY);
    } else {
      clearMutation.mutate();
    }
  }, [user, clearMutation]);

  const isInCart = useCallback(
    (course_id: string) => items.find((item) => item.course_id === course_id),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      subtotal,
      total,
      couponCode,
      setCouponCode,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
    }),
    [
      items,
      subtotal,
      total,
      couponCode,
      setCouponCode,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
