"use client";
import React, { useState, useEffect } from "react";
import { ShieldUser, ShoppingCart, Star, Trash2, ImageIcon, Laptop, User, Clock3, Presentation } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/store/CartProvider";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CourseWishlistButton } from "./CourseWishlistButton";
import GradientIcon from "@/_components/common/icon/GradientIcon";
import { Course } from "../_types/course.types";
import HtmlContent from "@/_components/common/HtmlContent";
import Avatar from "@/_components/common/avatar/Avatar";

const CourseCard: React.FC<Course> = ({
  id,
  price,
  discount_price_sar,
  level,
  title,
  description,
  image,
  total_enrollments,
  is_enrolled = false,
  average_rating,
  is_free = false,
  mode,
  instructor,
  total_hours,
  content,
}) => {
  const { addToCart, removeFromCart, isInCart, items } = useCart();
  const t = useTranslations("courseCard");
  const tCommon = useTranslations();
  const [isImageError, setIsImageError] = useState(false);

  // Reset image error state when image changes
  useEffect(() => {
    setIsImageError(false);
  }, [image]);

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
      price: (discount_price_sar != null && discount_price_sar !== "" ? discount_price_sar : price?.sar)?.toString(),
      course: { image },
    });
  };

  return (
    <div className="border border-[#d1d1d1] overflow-hidden group">
      <div className="w-full h-[250px] relative overflow-hidden">
        <Link href={`/courses/${id}`} className="block w-full h-full">
          <p className="bg-[#00C950]/70 text-white py-1 px-5 absolute top-5 start-5 z-10">
            {level}
          </p>

          {isImageError || !image ? (
            <div className="w-full h-full flex items-center justify-center bg-green-100">
              <ImageIcon className="text-green-600 w-12 h-12" />
            </div>
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setIsImageError(true)}
            />
          )}
        </Link>

        <CourseWishlistButton courseId={id} />
      </div>

      <div className="py-2 px-5">
        <div className="data">
          <Link href={`/courses/${id}`}>
            <h3 className="h-15 line-clamp-2 text-start leading-7 text-[#1f2b40] font-semibold transition-colors ease-linear duration-500 hover:text-[#007A33]">
              {title}
            </h3>
          </Link>
          <div className="justify-between mb-4 2 items-center flex">
            <div className="flex items-center gap-2">
              <div className="flex justify-center items-center rounded-full bg-gray-100 p-0.5 overflow-hidden shrink-0 w-8 h-8 sm:w-9 sm:h-9">
                {instructor.avatar ? (
                  <Avatar
                    src={instructor.avatar}
                    alt={instructor.user.name || "Instructor"}
                    size={32}
                    className="w-8 h-8 sm:w-9 sm:h-9"
                  />
                ) : (
                  <User className="text-gray-700" size={16} />
                )}
              </div>
              <p className="text-xs sm:text-sm md:text-base">{instructor.user.name}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star size={18} className="fill-green-600 stroke-green-600" />
              <span className="text-[#1f2b40] text-sm">
                {average_rating} {t("rating")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1 mb-4">
            <div className="flex items-center gap-1">
              <Laptop size={18} className="text-green-600" />
              <span className="text-[#1f2b40] text-sm">
                {tCommon(`mode.${mode}`)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock3 size={18} className="text-green-600" />
              <p className="text-xs sm:text-sm md:text-base">
                {tCommon("courses.duration.h", { hours: total_hours })}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Presentation size={18} className="text-green-600" />
              <p className="text-xs sm:text-sm md:text-base">
                {tCommon("courses.content_count", { count: content?.total_chapters || 0 })}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <ShieldUser size={18} className="text-green-600 stoke-green-600" />
              <span className="text-[#1f2b40] text-sm">
                {total_enrollments} {t("students")}
              </span>
            </div>
          </div>
          <div className="line-clamp-2! h-12! text-[#737887]! leading-relaxed!">
            <HtmlContent html={description} />
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-t-[#d1d1d1] mt-8 py-2">
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {is_free ? (
              <h4 className="font-bold text-xl gradient-background bg-clip-text text-transparent">
                {t("is_free")}
              </h4>
            ) : discount_price_sar != null && discount_price_sar !== "" && price?.sar && parseInt(discount_price_sar) > 0 ? (
              <>
                <span className="font-bold text-base text-gray-500 line-through">
                  {price.sar} {tCommon("currency.SAR")}
                </span>
                <h4 className="font-bold text-xl gradient-background bg-clip-text text-transparent">
                  {discount_price_sar} {tCommon("currency.SAR")}
                </h4>
              </>
            ) : (
              <h4 className="font-bold text-xl gradient-background bg-clip-text text-transparent">
                {price?.sar} {tCommon("currency.SAR")}
              </h4>
            )}
          </div>
          {is_enrolled ? null : (
            <GradientIcon
              Icon={isAlreadyInCart ? Trash2 : ShoppingCart}
              onClick={handleCartAction}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
