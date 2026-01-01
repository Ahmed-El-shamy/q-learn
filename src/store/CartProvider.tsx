"use client";

import { CartContextProps, CartItem } from "@/types/cart.types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCartMutations } from "./hooks/useCartMutations";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Api } from "@/_lib/api/api";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { getCart } from "./_quires/cart.api";

const CartContext = createContext<CartContextProps | undefined>(undefined);
const LOCAL_CART_KEY = "guest_cart_courses";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { status } = useSession();
  const t = useTranslations("cart");

  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  const isMerging = useRef(false);
  const { addMutation, removeMutation, clearMutation } = useCartMutations(
    items,
    setItems,
    isMerging
  );

  const localSubtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = parseFloat(String(item.price || 0));
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
  }, [items]);

  //   Guest: load local cart
  useEffect(() => {
    if (typeof window !== "undefined" && status === "unauthenticated") {
      const local = localStorage.getItem(LOCAL_CART_KEY);
      if (local) {
        try {
          setItems(JSON.parse(local));
        } catch (e) {
          console.log("Error parsing cart data", e);
          setItems([]);
        }
      }
    }
  }, [status]);

  //   Logged user: fetch cart
  const cartQuery = useQuery({
    queryKey: [Api.routes.site.cart],
    queryFn: getCart,
    enabled: status === "authenticated",
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (status === "authenticated") {
      cartQuery.refetch().then(({ data }) => {
        if (data?.cart?.items) {
          setItems(data.cart.items);
        }
      });
    }
  }, [status]);

  const subtotal = useMemo(() => {
    if (status === "authenticated" && cartQuery.data?.cart.subtotal) {
      return Number(cartQuery.data.cart.subtotal);
    }
    return localSubtotal;
  }, [status, cartQuery.data, localSubtotal]);

  const total = useMemo(() => {
    if (status === "authenticated" && cartQuery.data?.cart?.total) {
      return Number(cartQuery.data.cart.total);
    }
    return localSubtotal;
  }, [status, cartQuery.data, localSubtotal]);

  //   Merge guest cart after login
  useEffect(() => {
    if (status !== "authenticated" || isMerging.current) return;

    const local = localStorage.getItem(LOCAL_CART_KEY);
    if (!local) return;

    try {
      const guestItems: CartItem[] = JSON.parse(local);
      if (guestItems.length === 0) return;

      const courseIds = guestItems.map((item) => item.item_id).filter(Boolean);

      isMerging.current = true;

      addMutation.mutate(courseIds as number[], {
        onSuccess: (data: any) => {
          localStorage.removeItem(LOCAL_CART_KEY);
          queryClient.invalidateQueries({ queryKey: [Api.routes.site.cart] });

          setItems((prev) => {
            const serverItems = data?.data?.cart?.items || [];
            const merged = [
              ...prev.filter(
                (p) => !serverItems.find((s: any) => s.item_id === p.item_id)
              ),
              ...serverItems,
            ];
            return merged;
          });
        },
        onSettled: () => {
          isMerging.current = false;
        },
      });
    } catch (e) {
      console.log("Merge Faild", e);
      isMerging.current = false;
    }
  }, [status, addMutation, queryClient]);

  //   Sync server cart
  useEffect(() => {
    if (status === "authenticated" && cartQuery.data) {
      const data = cartQuery.data;
      if (data.cart?.items) {
        setItems(data?.cart?.items);
      }
    }
  }, [cartQuery.data, status]);

  //   Helpers
  const presistGuestCart = (updated: CartItem[]) => {
    if (typeof window !== "undefined" && status === "unauthenticated") {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updated));
    }
  };

  //   Actions
  const addToCart = useCallback(
    (item: CartItem) => {
      if (status === "loading") return;
      const courseId = item.item_id ?? item.course?.id ?? (item as any).id;
      if (!courseId) return;

      if (status === "unauthenticated") {
        const exists = items.some((i) => i.item_id === courseId);

        if (exists) {
          toast.info(t("course already in cart"));
          return;
        }

        const newItem = { ...item, item_id: courseId };
        const updated = [...items, newItem];

        setItems(updated);
        presistGuestCart(updated);
        toast.success(t("added to cart"));
      } else {
        const exists = items.some((i) => i.item_id === courseId);
        if (exists) {
          toast.info(t("course already in cart"));
          return;
        }

        addMutation.mutate([courseId as number], {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Api.routes.site.cart] });
          },
        });
      }
    },
    [status, items, addMutation, presistGuestCart]
  );

  const removeFromCart = useCallback(
    (id: number) => {
      if (status === "loading") return;

      if (status === "unauthenticated") {
        const updated = items.filter((i) => i.id !== id);
        setItems(updated);
        presistGuestCart(updated);
        toast.success(t("item removed from cart"));
      } else {
        removeMutation.mutate(id);
      }
    },
    [status, items, removeMutation]
  );

  const clearCart = useCallback(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      setItems([]);
      localStorage.removeItem(LOCAL_CART_KEY);
      toast.success(t("cart cleared"));
    } else {
      clearMutation.mutate();
    }
  }, [status, clearMutation]);

  const isInCart = useCallback(
    (courseId: number) => {
      return items.some((item) => {
        const idInCart = item.item_id;
        return idInCart === courseId;
      });
    },
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      subtotal: String(subtotal),
      total: String(total),
      couponCode,
      isLoading:
        cartQuery.isLoading ||
        addMutation.isPending ||
        removeMutation.isPending ||
        clearMutation.isPending,
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
      cartQuery.isLoading,
      addMutation.isPending,
      removeMutation.isPending,
      clearMutation.isPending,
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
