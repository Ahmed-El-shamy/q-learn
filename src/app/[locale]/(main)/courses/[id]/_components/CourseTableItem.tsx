"use client";

import { Star, ShoppingCart, User, ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Course } from "../../_types/course.types";
import { useCart } from "@/store/CartProvider";

interface CourseTableItemProps {
  course: Course;
}

const CourseTableItem = ({ course }: CourseTableItemProps) => {
  const t = useTranslations("courses");
  const tCommon = useTranslations();
  const [imgError, setImgError] = useState(false);
  const { addToCart, removeFromCart, isInCart, items, isLoading } = useCart();

  const isAlreadyInCart = isInCart(course.id as number);

  const handleCartAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAlreadyInCart) {
      const cartItem = items.find((item) => item.item_id === course.id);
      if (cartItem) {
        removeFromCart(cartItem.id);
      }
      return;
    }

    addToCart({
      id: course.id as number,
      item_id: course.id as number,
      title: course.title,
      price: (course.discount_price_sar != null && course.discount_price_sar !== "" ? course.discount_price_sar : course.price?.sar)?.toString(),
      course: { image: course.image },
    });
  };

  return (
    <div
      key={course.id}
      className="border flex flex-col sm:flex-row border-gray-200 w-full hover:bg-gray-50 transition-colors"
    >
      <div className="flex gap-2 p-2 w-full sm:w-[60%] sm:border-e sm:border-e-gray-200">
        {imgError ? (
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] shrink-0 bg-green-100 flex items-center justify-center rounded">
            <ImageIcon size={24} className="text-green-600" />
          </div>
        ) : (
          <Image
            src={course.image || "/"}
            alt="course-image"
            height={70}
            width={70}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] shrink-0"
            onError={() => setImgError(true)}
          />
        )}
        <div className="text-xs sm:text-sm flex-1 min-w-0">
          <Link 
            href={`/courses/${course.id}`}
            className="line-clamp-2 sm:line-clamp-1 font-semibold hover:text-green-600 transition-colors block"
          >
            {course.title}
          </Link>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center mt-1 sm:mt-2">
            <div className="bg-primary text-white p-0.5 sm:p-1 text-xs">
              {course.level}
            </div>
            <p className="text-xs sm:text-sm">
              {course.content?.total_chapters} {t("lectures")}
            </p>
            <p className="text-xs sm:text-sm">•</p>
            <p className="text-xs sm:text-sm">{course.total_hours}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col w-full sm:w-[25%] [&>div]:py-1 [&>div]:px-2 sm:[&>div]:px-4 md:[&>div]:px-8 [&>div]:flex-1 [&>div]:gap-1.5 sm:[&>div]:gap-2 [&>div]:flex [&>div]:justify-center [&>div]:items-center sm:border-e sm:border-e-gray-200 border-t sm:border-t-0 border-t-gray-200">
        <div className="border-r sm:border-r-0 sm:border-b sm:border-b-gray-200 border-r-gray-200">
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <Star
              size={12}
              className="sm:w-4 sm:h-4 text-green-600"
              fill="rgba(0,201,80, 0.4)"
            />{" "}
            {course.average_rating} <p>{t("ratings")}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <User
              size={12}
              className="sm:w-4 sm:h-4 text-green-600"
              fill="rgba(0,201,80, 0.4)"
            />{" "}
            {course.total_enrollments} <p>{t("students")}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col w-full sm:w-[15%] px-3 sm:px-4 md:px-5 py-2 items-center justify-between sm:justify-center sm:border-e sm:border-e-gray-200 border-t sm:border-t-0 border-t-gray-200">
        {course.discount_price_sar &&
        course.discount_price_sar !== "" &&
        course.price?.sar &&
        parseInt(course.discount_price_sar) > 0 ? (
          <>
            <p className="line-through text-nowrap font-bold text-gray-500 text-sm">
              {course.price.sar} {tCommon("currency.SAR")}
            </p>
            <p className="text-base text-nowrap font-bold text-gray-800">
              {course.discount_price_sar} {tCommon("currency.SAR")}
            </p>
          </>
        ) : (
          <p className="text-base text-nowrap font-bold text-gray-800">
            {course.price?.sar} {tCommon("currency.SAR")}
          </p>
        )}
      </div>
      <div className="w-full sm:w-[10%] flex justify-center items-center py-2 sm:py-0 border-t sm:border-t-0 border-t-gray-200">
        <button
          onClick={handleCartAction}
          disabled={isLoading}
          className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label={isAlreadyInCart ? "Remove from cart" : "Add to cart"}
        >
          {isAlreadyInCart ? (
            <Trash2
              size={20}
              className="sm:w-6 sm:h-6 text-green-600"
            />
          ) : (
            <ShoppingCart
              size={20}
              className="sm:w-6 sm:h-6 text-green-600"
              fill="#00C950"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseTableItem;
