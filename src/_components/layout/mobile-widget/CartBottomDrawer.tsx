"use client";

import { useCart } from "@/store/CartProvider";
import { CartItem } from "@/types/cart.types";
import { X, ShoppingBag, Trash2, ImageIcon } from "lucide-react";
import { useRouter, Link } from "@/i18n/navigation";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { useState, useEffect } from "react";

interface CartBottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartBottomDrawer = ({ isOpen, onClose }: CartBottomDrawerProps) => {
  const { items, total, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const t = useTranslations("cart");
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Reset image errors when items change
  useEffect(() => {
    setImageErrors({});
  }, [items]);

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  const handleClearCart = () => {
    clearCart();
    onClose();
  };

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
  };

  const handleImageError = (itemId: number) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={onClose}
        />
      )}

      {/* Bottom Drawer */}
      <div
        className={clsx(
          "fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl transition-transform duration-300 ease-out max-h-[80vh] flex flex-col",
          isOpen ? "translate-y-0 pointer-events-auto" : "translate-y-full pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-[#202e3b]">
            {t("shoppingCart")} ({items.length})
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t("closeCart")}
          >
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 px-4">
              <ShoppingBag size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">
                {t("there is no courses in cart")}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {items.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex gap-3">
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded overflow-hidden shrink-0 bg-green-100 flex items-center justify-center">
                      {item.course?.image && !imageErrors[item.id] ? (
                        <img
                          src={item.course.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(item.id)}
                        />
                      ) : (
                        <ImageIcon className="text-green-600 w-8 h-8" />
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/courses/${item.course?.id || item.item_id}`}>
                        <h3 className="font-semibold text-sm text-[#202e3b] line-clamp-2 hover:text-green-600 transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.type === "course" ? t("courseType") : t("learningPathType")}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-bold text-green-600">
                          ${item.price}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                          aria-label={t("removeFromCart")}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Buttons */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#202e3b]">{t("total")}:</span>
              <span className="text-xl font-bold text-green-600">
                ${total}
              </span>
            </div>

            <div className="space-y-2">
              <MainBtn
                onClick={handleCheckout}
                containerClassName="w-full"
                variant="main"
              >
                {t("checkout")}
              </MainBtn>

              <MainBtn
                onClick={handleClearCart}
                containerClassName="w-full"
                variant="secondary"
              >
                {t("clearCart")}
              </MainBtn>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartBottomDrawer;
