"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

const AutoNext = () => {
    const t = useTranslations("courses");
    const [active, setActive] = useState(false);
    return (
        <div className="flex flex-col text-xs gap-0 md:flex-row md:gap-2 md:text-sm items-center">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-linear-to-r peer-checked:from-[#660afb] peer-checked:to-[#b633ff]"></div>
            </label>
            <p>
                {t("auto-next")}
            </p>
        </div>
    );
}

export default AutoNext;