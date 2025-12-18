export interface CartItem {
  id: string;
  course_id: string;

  title: string;
  description?: string;
  image?: string;
  instructor?: string;
  category?: string;

  price?: number;
  has_discount?: boolean;
  sale_price?: number;

  is_in_wishlist?: boolean;
  isLoading?: boolean;

  details?: string;
  level?: string;
}

export interface CartResponse {
  items: CartItem[];
  total?: number;
  subTotal?: number;
  discount_amount?: string;
  coupon?: {
    code: string;
    value: string;
    type: string;
  };
  tax?: string;
  shipping?: string;
}
