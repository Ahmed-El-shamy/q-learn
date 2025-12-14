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
            if (scrolled > 100) {
                animateCollapse();
            } else {
                animateExpand();
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <div className="w-fit">
            <div className="max-h-[1000px] overflow-hidden" ref={imageContainer} >
                <div className="h-[270px] w-[380px] relative overflow-hidden">
                    <Image
                        fill
                        src="/images/600x600.jpg"
                        alt="course-preview-image"
                    />
                </div>
            </div>
            <div className="px-8">
                <div className="flex items-end gap-4 py-6 text-3xl font-bold">
                    <p>
                        6$
                    </p>
                    <p className="line-through text-gray-400 text-2xl">
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
                <div className="flex flex-col gap-3 py-4">
                    {courseProperties.map((item) => (
                        <div key={item.label} className="flex items-center gap-3 text-sm">
                            <item.icon className="text-purple-500" aria-hidden />
                            <span className="text-gray-800">
                                {item.label}: {item.value}
                            </span>
                        </div>
                    ))}
                </div>
                <CouponInput />
                <p className="mt-4 font-bold">
                    {t("share")}
                </p>
                <div className="flex items-center gap-2">

                </div>
            </div>
        </div>
    )
}

export default CourseStickyContent;