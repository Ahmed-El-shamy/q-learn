"use client";
import MainBtn from "@/_components/common/buttons/MainBtn";
import Image from "next/image";
import CouponInput from "./CouponInput";
import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  FaAward,
  FaBookOpen,
  FaCertificate,
  FaGlobeAmericas,
  FaInfinity,
  FaQuestionCircle,
  FaRegClock,
  FaSignal,
  FaTags,
  FaUserFriends,
} from "react-icons/fa";
import { useEffect, useRef } from "react";
import { Facebook, Twitter, Linkedin, MessageCircle, Send, Share2 } from "lucide-react";

const socialMediaLinksConfig = [
    {
        Icon: Facebook,
        label: "Share on Facebook",
        getHref: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
        Icon: Twitter,
        label: "Share on Twitter",
        getHref: (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
        Icon: Linkedin,
        label: "Share on LinkedIn",
        getHref: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
        Icon: MessageCircle,
        label: "Share on WhatsApp",
        getHref: (url: string) => `https://wa.me/?text=${encodeURIComponent(url)}`,
    },
    {
        Icon: Send,
        label: "Share on Telegram",
        getHref: (url: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}`,
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

const courseProperties: { icon: IconType; label: string; value: string }[] = [
  { icon: FaRegClock, label: "Duration", value: "23 Min" },
  { icon: FaBookOpen, label: "Lectures", value: "7 lessons" },
  { icon: FaUserFriends, label: "Enrolled", value: "1 students" },
  { icon: FaTags, label: "Category", value: "Business" },
  { icon: FaQuestionCircle, label: "Quizzes", value: "1 Quizzes" },
  { icon: FaGlobeAmericas, label: "Language", value: "English" },
  { icon: FaSignal, label: "Skill Level", value: "Beginner" },
  { icon: FaCertificate, label: "Certificate", value: "Certificate of Completion" },
  { icon: FaInfinity, label: "Access", value: "Full lifetime access" },
  { icon: FaAward, label: "Extras", value: "Course perks included" },
];

const CourseStickyContent = () => {
    const t = useTranslations("courses");
    const imageContainer = useRef<HTMLDivElement>(null);
    const isCollapsed = useRef(false);

    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const socialMediaLinks = socialMediaLinksConfig.map((link) => ({
        ...link,
        href: link.getHref(currentUrl),
    }));

    useEffect(() => {
        const container = imageContainer.current;
        if (!container) return;

        // set initial max height so animation has a starting point
        container.style.maxHeight = "1000px";

        const animateCollapse = () => {
            if (!container || isCollapsed.current) return;
            isCollapsed.current = true;
            container.animate(
                [{ maxHeight: "1000px" }, { maxHeight: "0px" }],
                {
                    duration: 500,
                    easing: "linear",
                    fill: "forwards",
                    delay: 0
                }
            );
        };

        const animateExpand = () => {
            if (!container || !isCollapsed.current) return;
            isCollapsed.current = false;
            container.animate(
                [{ maxHeight: "0px" }, { maxHeight: "1000px" }],
                {
                    duration: 500,
                    easing: "linear",
                    fill: "forwards",
                    delay: 0
                }
            );
        };

        const handleScroll = () => {
                const scrolled = window.scrollY;
                if(window.innerWidth > 1024) {
                    if (scrolled > 100) {
                        animateCollapse();
                    } else {
                        animateExpand();
                    }
                }
        };

        function handleResize() {
            if(window.innerWidth < 1024 && isCollapsed.current) {
                animateExpand();
            } else if(window.innerWidth > 1024 && window.scrollY > 100) {
                animateCollapse();
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);
        if(window.scrollY > 100 && window.innerWidth > 1024) {
            animateCollapse();
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <div className="lg:w-fit w-full">
            <div className="max-h-[1000px] overflow-hidden" ref={imageContainer} >
                <div className="h-[300px] w-full md:h-[500px] lg:h-[200px] min-w-[280px] xl:min-w-none xl:h-[270px] xl:w-[380px] relative overflow-hidden">
                    <Image
                        fill
                        src="/images/600x600.jpg"
                        alt="course-preview-image"
                    />
                </div>
            </div>
            <div className="px-2 xl:px-8">
                <div className="flex items-end gap-2 sm:gap-4 py-2 xl:py-6">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                        6$
                    </p>
                    <p className="line-through text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl">
                        500$
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <MainBtn>
                        Add to Cart 
                    </MainBtn>
                    <MainBtn variant="outlined">
                        Buy now
                    </MainBtn>
                </div> 
                <div className="flex flex-col gap-2 sm:gap-3 py-3 sm:py-4">
                    {courseProperties.map((item) => (
                        <div key={item.label} className="flex items-center gap-2 sm:gap-3">
                            <item.icon className="text-purple-500 w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
                            <span className="text-gray-800 text-xs sm:text-sm md:text-base">
                                {item.label}: {item.value}
                            </span>
                        </div>
                    ))}
                </div>
                <CouponInput />
                <p className="pt-3 sm:pt-4 text-sm sm:text-base md:text-lg font-bold">
                    {t("share")}
                </p>
                <div className="flex items-center gap-2 py-4">
                    {socialMediaLinks.map(({ Icon, href, label, onClick: onClickHandler }) => (
                        <a
                            key={label}
                            href={href}
                            onClick={onClickHandler ? (e) => onClickHandler(e, currentUrl) : undefined}
                            aria-label={label}
                            className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-purple-500 transition-colors duration-200"
                            target={onClickHandler ? undefined : "_blank"}
                            rel={onClickHandler ? undefined : "noopener noreferrer"}
                        >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CourseStickyContent;