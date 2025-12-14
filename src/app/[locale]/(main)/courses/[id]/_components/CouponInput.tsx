"use client";

import MainBtn from "@/_components/common/buttons/MainBtn";
import { useTranslations } from "next-intl";
import { useState } from "react";

const CouponInput = () => {
    const t = useTranslations("courses");
    const [coupon, setCoupon] = useState("");

    return (
        <>
            <p className="text-xs sm:text-sm md:text-base">
                {t("enter-your-coupon")}
            </p>
            <div className="w-full bg-purple-500/20 flex gap-1 py-px px-1 border-purple-500 border">
                <input className="appearance-none flex-1 px-1 outline-none text-xs sm:text-sm md:text-base" value={coupon} onChange={(e) => setCoupon(e.target.value)}/>
                <MainBtn className="w-fit" size={"small"}>
                {t("apply")} 
                </MainBtn>
            </div>
        </>
    );
}

export default CouponInput;