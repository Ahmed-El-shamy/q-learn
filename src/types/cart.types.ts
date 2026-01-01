import { Coupon } from "@/app/[locale]/(main)/checkout/_types/coupon.types";
import { Course } from "@/app/[locale]/(main)/courses/_types/courses.types";

export interface LocalizedString {
  en: string;
  ar: string;
}
export interface CartItem {
  id: number;
  item_id: number;
  type?: string;
  title: string;
  price: string;
  subtotal?: string;
  currency?: string;
  course?: Partial<Course>;
  learning_path?: any | null;
  created_at?: string;
}

export interface CartResponse {
  cart: {
    id: number;
    status: string;
    items_count: number;
    is_empty: boolean;
    subtotal: string;
    discount: string;
    total: string;
    currency: string;
    coupon_code: string | null;
    expires_at?: string;
    items: CartItem[];
    created_at?: string;
  };
  items: CartItem[];
}

export interface CartContextProps {
  items: CartItem[];
  subtotal: string;
  total: string;
  isLoading: boolean;
  couponCode: Coupon | null;
  setCouponCode: React.Dispatch<React.SetStateAction<Coupon | null>>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  isInCart: (course_id: number) => boolean;
}
