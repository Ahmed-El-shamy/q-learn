"use client";

import { Star } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import DialogComponent from "@/_components/common/dialog/Dialog";
import useRating from "../_hooks/useRating";
import { Controller } from "react-hook-form";
import MainTextArea from "@/_components/common/inputs/mainInput/MainTextArea";
import { useTranslations } from "next-intl";

const CourseRatingInput = () => {
    const t = useTranslations();
    const {
        methods: {
            formState: {
                errors,
            },
            register,
            control,
            watch,
            setValue,
        },
        submit,
    } = useRating();
    const [hoveredRate, setHoveredRate] = useState(0);

    const rateStars = useMemo(() => {
        return Array(5).fill(1).map((num, index) => num + index);
    }, []);

    const handleCancel = useCallback(() => {
        setValue("review", "");
    }, []);

    return (
        <DialogComponent
            title="courses.rate-dialog-title"
            description="courses.rate-dialog-description"
            content={(
                <form onSubmit={submit}>
                    <div className="space-y-4">
                        <MainTextArea
                            {...register("review")}
                            label="Review"
                            placeholder={t("courses.rate-dialog-review-placeholder")}
                            error={errors.review?.message}
                            rows={6}
                            value={watch("review")}
                        />
                    </div>
                </form>
            )}
            asChild={false}
            cancel={{
                action: handleCancel 
            }}
            action={{
                action: submit 
            }}
            onSuccess={handleCancel}
        >
            <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                    <div
                        className="flex justify-center items-center"
                        onMouseLeave={() => setHoveredRate(0)}
                    >
                        {rateStars.map((star) => {
                            const isFilled = star <= field.value || star <= hoveredRate;
                            return (
                                <div
                                    className="px-1 cursor-pointer"
                                    onMouseEnter={() => setHoveredRate(star)}
                                    onClick={() => field.onChange(star)}
                                    key={star}
                                >
                                    <Star
                                        size={17}
                                        fill={isFilled ? "var(--color-purple-500)" : "var(--color-purple-100)"}
                                        className={clsx("duration-100 cursor-pointer", {
                                            "text-purple-500": isFilled,
                                            "text-purple-100": !isFilled,
                                            "opacity-60": star > hoveredRate && star <= field.value && hoveredRate != 0
                                        })}
                                    />
                                </div>

                            )
                        })}
                    </div>

                )}
            />
        </DialogComponent>
    );
}

export default CourseRatingInput;