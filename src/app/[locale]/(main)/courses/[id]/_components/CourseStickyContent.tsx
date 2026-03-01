"use client";

import MainBtn from "@/_components/common/buttons/MainBtn";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCart } from "@/store/CartProvider";
import { useRouter } from "@/i18n/navigation";
import type { IconType } from "react-icons";
import {
  FaCertificate,
  FaRegClock,
  FaSignal,
  FaTags,
  FaUserFriends,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Send,
  Share2,
  ImageIcon,
  Play,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CourseDetailsQuery from "../_data/CourseDetailsQuery";
import VideoDialog from "./VideoDialog";
import { toast } from "sonner";

const socialMediaLinksConfig = [
  {
    Icon: Facebook,
    label: "Share on Facebook",
    getHref: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    Icon: Twitter,
    label: "Share on Twitter",
    getHref: (url: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    Icon: Linkedin,
    label: "Share on LinkedIn",
    getHref: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    Icon: MessageCircle,
    label: "Share on WhatsApp",
    getHref: (url: string) => `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    Icon: Send,
    label: "Share on Telegram",
    getHref: (url: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}`,
  },
  {
    Icon: Share2,
    label: "Copy link",
    getHref: () => "#",
    onClick: (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
      e.preventDefault();
      if (typeof window !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(url);
      }
    },
  },
];

// Course properties will be dynamically generated from course data

const CourseStickyContent = () => {
  const t = useTranslations("courses");
  const tCart = useTranslations("cart");
  const { addToCart, removeFromCart, isInCart, items, isLoading } = useCart();
  const router = useRouter();
  const imageContainer = useRef<HTMLDivElement>(null);
  const isCollapsed = useRef(false);
  const [isImageError, setIsImageError] = useState(false);
  const params: { id: string } = useParams();
  const query = useQuery({
    ...CourseDetailsQuery(params.id),
    refetchOnMount: false,
  });
  const course = query.data;

  const courseId = course?.id != null ? Number(course.id) : null;
  const isAlreadyInCart = courseId != null && isInCart(courseId);

  const addCurrentCourseToCart = () => {
    if (!course || courseId == null) return;
    addToCart({
      id: courseId,
      item_id: courseId,
      title: course.title ?? "",
      price: course.price?.sar ?? course.price?.usd ?? course.price?.egp ?? "0",
      course: { thumbnail: course.thumbnail ?? undefined },
    });
  };

  const handleCartClick = () => {
    if (!course || courseId == null) return;
    if (isAlreadyInCart) {
      const cartItem = items.find((item) => item.item_id === courseId);
      if (cartItem) removeFromCart(cartItem.id);
    } else {
      addCurrentCourseToCart();
    }
  };

  const handleBuyNowClick = () => {
    if (!course || courseId == null) return;
    if (!isAlreadyInCart) {
      addCurrentCourseToCart();
    }
    router.push("/checkout");
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const socialMediaLinks = socialMediaLinksConfig.map((link) => ({
    ...link,
    href: link.getHref(currentUrl),
  }));

  // Reset image error state when course changes
  useEffect(() => {
    setIsImageError(false);
  }, [course?.id]);

  // Build course properties dynamically from course data
  const courseProperties: { icon: IconType; label: string; value: string }[] =
    [];

  if (course) {
    if (course.total_hours) {
      courseProperties.push({
        icon: FaRegClock,
        label: t("Duration"),
        value: `${course.total_hours} ${t(course.total_hours === 1 ? "hour" : "hour")}`,
      });
    }

    if (
      course.total_enrollments !== undefined &&
      course.total_enrollments !== null &&
      course.total_enrollments >= 0
    ) {
      courseProperties.push({
        icon: FaUserFriends,
        label: t("Enrolled students"),
        value: `${course.total_enrollments} ${course.total_enrollments === 1 ? t("student") : t("student")}`,
      });
    }

    if (course.category?.name) {
      courseProperties.push({
        icon: FaTags,
        label: t("category"),
        value: course.category.name,
      });
    }

    if (course.level) {
      courseProperties.push({
        icon: FaSignal,
        label: t("Skill Level"),
        value: course.level,
      });
    }

    // Show certificate status (whether course includes a certificate)
    courseProperties.push({
      icon: FaCertificate,
      label: t("Certificate included"),
      value: course.accrediting_organization
        ? t("Certificate")
        : t("No certificate"),
    });
  }

  useEffect(() => {
    const container = imageContainer.current;
    if (!container) return;

    // set initial max height so animation has a starting point
    container.style.maxHeight = "1000px";

    const animateCollapse = () => {
      if (!container || isCollapsed.current) return;
      isCollapsed.current = true;
      container.animate([{ maxHeight: "1000px" }, { maxHeight: "0px" }], {
        duration: 500,
        easing: "linear",
        fill: "forwards",
        delay: 0,
      });
    };

    const animateExpand = () => {
      if (!container || !isCollapsed.current) return;
      isCollapsed.current = false;
      container.animate([{ maxHeight: "0px" }, { maxHeight: "1000px" }], {
        duration: 500,
        easing: "linear",
        fill: "forwards",
        delay: 0,
      });
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (window.innerWidth > 1024) {
        if (scrolled > 100) {
          animateCollapse();
        } else {
          animateExpand();
        }
      }
    };

    function handleResize() {
      if (window.innerWidth < 1024 && isCollapsed.current) {
        animateExpand();
      } else if (window.innerWidth > 1024 && window.scrollY > 100) {
        animateCollapse();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    if (window.scrollY > 100 && window.innerWidth > 1024) {
      animateCollapse();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="lg:w-fit w-full">
      <div className="max-h-[1000px] overflow-hidden" ref={imageContainer}>
        <div className="h-[300px] w-full md:h-[500px] lg:h-[200px] min-w-[280px] xl:min-w-none xl:h-[270px] xl:w-[380px] relative overflow-hidden bg-gray-300">
          {isImageError || !course?.thumbnail ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <ImageIcon className="text-gray-600 w-16 h-16" />
            </div>
          ) : (
            <Image
              fill
              src={course.thumbnail}
              alt={course.title || "course-preview-image"}
              className="object-cover"
              onError={() => setIsImageError(true)}
            />
          )}
          {course?.preview_video && (
            <VideoDialog videoUrl={course.preview_video}>
              <MainBtn containerClassName="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 md:w-20 md:h-20 p-0 flex items-center justify-center bg-white/90 hover:bg-white border-none shadow-lg">
                <Play
                  className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                  fill="currentColor"
                />
              </MainBtn>
            </VideoDialog>
          )}
        </div>
      </div>

      <div className="px-2 xl:px-8">
        {course && (
          <div className="flex items-end gap-2 sm:gap-4 py-2 xl:py-6">
            {course.is_free ? (
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">Free</p>
            ) : (
              <>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {course.price?.usd
                    ? `$${course.price.usd}`
                    : course.price?.egp
                      ? `${course.price.egp} EGP`
                      : course.price?.sar
                        ? `${course.price.sar} SAR`
                        : "N/A"}
                </p>
                {/* Add original price display if discount exists */}
              </>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          {course && (
            <MainBtn
              variant={isAlreadyInCart ? "outlined" : undefined}
              onClick={handleCartClick}
              disabled={isLoading}
            >
              {isAlreadyInCart ? tCart("removeFromCart") : tCart("addToCart")}
            </MainBtn>
          )}
          <MainBtn
            variant="outlined"
            onClick={handleBuyNowClick}
            disabled={isLoading}
          >
            {tCart("buyNow")}
          </MainBtn>
        </div>
        <div className="flex flex-col gap-2 sm:gap-3 py-3 sm:py-4">
          {courseProperties.map((item) => (
            <div key={item.label} className="flex items-center gap-2 sm:gap-3">
              <item.icon
                className="text-purple-500 w-4 h-4 sm:w-5 sm:h-5"
                aria-hidden
              />
              <span className="text-gray-800 text-xs sm:text-sm md:text-base">
                {item.label}: {item.value}
              </span>
            </div>
          ))}
        </div>
        <p className="pt-3 sm:pt-4 text-sm sm:text-base md:text-lg font-bold">
          {t("share")}
        </p>
        <div className="flex items-center gap-2 py-4">
          {socialMediaLinks.map(
            ({ Icon, href, label, onClick: onClickHandler }) => (
              <a
                key={label}
                href={href}
                onClick={
                  onClickHandler
                    ? (e) => {
                        onClickHandler(e, currentUrl);
                        toast.success(t("linkCopiedSuccess"));
                      }
                    : undefined
                }
                aria-label={label}
                className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-purple-500 transition-colors duration-200"
                target={onClickHandler ? undefined : "_blank"}
                rel={onClickHandler ? undefined : "noopener noreferrer"}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </a>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseStickyContent;
