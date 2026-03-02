"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useCoursesFilters } from "../_services/CourseFilterProvider";
import { useTranslations } from "next-intl";

interface PriceFilterProps {
  initialMin?: number;
  initialMax?: number;
  step?: number;
  language?: "ar" | "en";
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  initialMin = 0,
  initialMax = 5000,
  step = 10,
  language = "en",
}) => {
  const { filters, handleChangeFilters } = useCoursesFilters();
  const t = useTranslations("filters");

  const [minVal, setMinVal] = useState<string>(
    filters.price_from || String(initialMin)
  );
  const [maxVal, setMaxVal] = useState<string>(
    filters.price_to || String(initialMax)
  );

  useEffect(() => {
    setMinVal(filters.price_from || String(initialMin));
    setMaxVal(filters.price_to || String(initialMax));
  }, [filters.price_from, filters.price_to, initialMin, initialMax]);

  const rangeRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) =>
      Math.round(((value - initialMin) / (initialMax - initialMin)) * 100),
    [initialMin, initialMax]
  );

  useEffect(() => {
    const minPercent = getPercent(Number(minVal));
    const maxPercent = getPercent(Number(maxVal));

    if (rangeRef.current) {
      rangeRef.current.style.insetInlineStart = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  return (
    <div className="border border-[#d1d1d1] p-4 flex flex-col">
      <h2 className="text-xl text-[#202e3b] shrink-0 mb-4">{t("price")}</h2>
      <div
        className="flex-center relative"
      >
        <input
          type="range"
          min={initialMin}
          max={initialMax}
          value={minVal}
          step={step}
          onChange={(e) => {
            const value = Math.min(
              Number(e.target.value),
              Number(maxVal) - step
            ).toString();
            setMinVal(value);
            handleChangeFilters("price_from", value, true);
          }}
          className="thumb thumbLeft"
          style={{
            zIndex: Number(minVal) > initialMax - 100 ? "5" : undefined,
          }}
        />

        <input
          type="range"
          min={initialMin}
          max={initialMax}
          value={maxVal}
          step={step}
          onChange={(e) => {
            const value = Math.max(
              Number(e.target.value),
              Number(minVal) + step
            ).toString();
            setMaxVal(value);
            handleChangeFilters("price_to", value, true);
          }}
          className="thumb thumbRight"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={rangeRef} className="slider__range" />
        </div>
      </div>

      <div
        className="flex items-center justify-between text-[#202e3b] mt-4"
      >
        <div className="flex items-center gap-2">
          <p>
            {minVal} {t("currency")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p>
            {maxVal} {t("currency")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
