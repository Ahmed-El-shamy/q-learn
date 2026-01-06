"use client";

import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";

interface RateInputProps {
    value: number;
    onChange: (value: number) => void;
    size?: number;
    className?: string;
}

const RateInput = ({ value, onChange, size = 17, className }: RateInputProps) => {
    const [hoveredRate, setHoveredRate] = useState(0);

    const rateStars = useMemo(() => {
        return Array(5).fill(1).map((num, index) => num + index);
    }, []);

    return (
        <div
            className={clsx("flex justify-center items-center", className)}
            onMouseLeave={() => setHoveredRate(0)}
        >
            {rateStars.map((star) => {
                const isFilled = star <= value || star <= hoveredRate;
                return (
                    <div
                        className="px-1 cursor-pointer"
                        onMouseEnter={() => setHoveredRate(star)}
                        onClick={() => onChange(star)}
                        key={star}
                    >
                        <Star
                            size={size}
                            fill={isFilled ? "var(--color-purple-500)" : "var(--color-purple-100)"}
                            className={clsx("duration-100 cursor-pointer", {
                                "text-purple-500": isFilled,
                                "text-purple-100": !isFilled,
                                "opacity-60": star > hoveredRate && star <= value && hoveredRate != 0
                            })}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default RateInput;

