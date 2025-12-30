"use client";
import React from "react";
import { CheckCircle, ShieldUser, ShoppingCart, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/store/CartProvider";
import { Course } from "@/app/[locale]/(main)/courses/_types/courses.types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CourseWishlistButton } from "./CourseWishlistButton";
import GradientIcon from "@/_components/common/icon/GradientIcon";

const CourseCard: React.FC<Course> = ({
  id,
  price,
  level,
  total_ratings,
  title,
  description,
  thumbnail,
  alt,
  total_enrollments,
}) => {
  const { addToCart, removeFromCart, isInCart, items } = useCart();
  const t = useTranslations("courseCard");

  const isAlreadyInCart = isInCart(id!);

  const handleCartAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAlreadyInCart) {
      const cartItem = items.find((item) => item.item_id === id);
      if (cartItem) {
        removeFromCart(cartItem.id);
      }
      return;
    }

    addToCart({
      id: id,
      item_id: id!,
      title,
      price: price?.sar?.toString(),
      course: { thumbnail },
    });
  };

  return (
    <div className="border border-[#d1d1d1] h-[530px] group overflow-hidden">
      <div className="w-full h-[45%] relative overflow-hidden">
        <Link href={`/courses/${id}`} className="block w-full h-full">
          <p className="bg-[#963ed0]/60 text-white py-1 px-5 absolute top-5 start-5 z-10">
            {level}
          </p>

          <Image
            src={thumbnail || "/images/courses/10.jpg"}
            alt={alt || title || t("alt")}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        <CourseWishlistButton courseId={id} />
      </div>

      <div className="p-5">
        <div className="data">
          <Link href={`/courses/${id}`}>
            <h3 className="h-15 line-clamp-2 leading-7 text-[#1f2b40] font-semibold transition-colors ease-linear duration-500 hover:text-[#660afb]">
              {title}
            </h3>
          </Link>

          <div className="flex items-center justify-between mt-1 mb-8">
            <div className="flex items-center gap-1">
              <Star size={18} fill="yellow" stroke="yellow" />
              <span className="text-[#1f2b40] text-sm">
                {total_ratings} {t("rating")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldUser size={18} />
              <span className="text-[#1f2b40] text-sm">
                {total_enrollments} {t("students")}
              </span>
            </div>
          </div>

          <p className="line-clamp-2 h-12 text-[#737887] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center border-t border-t-[#d1d1d1] mt-8 py-4">
          <div className="flex items-center justify-center gap-1">
            <h4 className="font-bold text-xl bg-linear-to-r from-[#660afb] to-[#b633ff] bg-clip-text text-transparent">
              {price?.sar} {t("currency")}
            </h4>
          </div>

          <GradientIcon
            Icon={isAlreadyInCart ? CheckCircle : ShoppingCart}
            onClick={handleCartAction}
            stroke={isAlreadyInCart ? "#3DD598 " : ""}
            fill={isAlreadyInCart ? "#FFF" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
