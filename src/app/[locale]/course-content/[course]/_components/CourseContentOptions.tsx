"use client";

import MainBtn from "@/_components/common/buttons/MainBtn";
import DialogComponent from "@/_components/common/dialog/Dialog";
import { EllipsisVertical, Share2, Star } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

const CourseContentOptions = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("courses");

    useEffect(() => {
        function closeOnClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as HTMLElement)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            window.addEventListener("click", closeOnClick);
        }

        return () => window.removeEventListener("click", closeOnClick);
    }, [isOpen]);

    const handleShare = () => {
        // TODO: Implement share functionality
        console.log("Share clicked");
        setIsOpen(false);
    };

    const handleLeaveReview = () => {
        // TODO: Implement leave review functionality
        console.log("Leave review clicked");
        setIsOpen(false);
    };

    const shareButtonContent = (
        <button
            onClick={() => {
                setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors duration-100 text-left whitespace-nowrap"
        >
            <Share2 size={18} className="text-purple-500" />
            <span className="text-gray-800">{t("share")}</span>
        </button>
    );

    const reviewButtonContent = (
        <button
            onClick={() => {
                setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors duration-100 text-left whitespace-nowrap border-t border-gray-200"
        >
            <Star size={18} className="text-purple-500" />
            <span className="text-gray-800">{t("review-the-course")}</span>
        </button>
    );

    return (
        <div className="relative" ref={menuRef}>
            <MainBtn
                containerClassName="p-1 w-fit"
                onClick={() => setIsOpen(!isOpen)}
            >
                <EllipsisVertical />
            </MainBtn>
            
            {isOpen && (
                <div className="absolute top-full mt-2 end-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <DialogComponent
                        title="courses.share"
                        content={<div>Share content goes here</div>}
                        cancel={{
                            action: () => {
                                setIsOpen(false);
                            },
                        }}
                        onSuccess={() => {
                            setIsOpen(false);
                        }}
                        asChild={true}
                    >
                        {shareButtonContent}
                    </DialogComponent>
                    <DialogComponent
                        title="courses.review-the-course"
                        content={<div>Review content goes here</div>}
                        cancel={{
                            action: () => {
                                setIsOpen(false);
                            },
                        }}
                        onSuccess={() => {
                            setIsOpen(false);
                        }}
                        asChild={true}
                    >
                        {reviewButtonContent}
                    </DialogComponent>
                </div>
            )}
        </div>
    );
}

export default CourseContentOptions;