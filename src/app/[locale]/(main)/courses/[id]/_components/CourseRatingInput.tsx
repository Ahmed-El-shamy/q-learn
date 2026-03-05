"use client";

import { useCallback } from "react";
import DialogComponent from "@/_components/common/dialog/Dialog";
import useRating from "../_hooks/useRating";
import { Controller } from "react-hook-form";
import MainTextArea from "@/_components/common/inputs/mainInput/MainTextArea";
import RateInput from "@/_components/common/inputs/rateInput/RateInput";
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
            trigger,
        },
        submit,
    } = useRating();

    const handleCancel = useCallback(() => {
        setValue("review", "");
    }, [setValue]);

    return (
        <DialogComponent
            title="courses.rate-dialog-title"
            description="courses.rate-dialog-description"
            content={(
                <form onSubmit={submit}>
                    <div className="space-y-4">
                        <Controller
                            name="rating"
                            control={control}
                            render={({ field }) => (
                                <RateInput
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <MainTextArea
                            {...register("review")}
                            label="review"
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
                action: async () => {
                    const manualValidation = await trigger();
                    if (Object.values(errors).length || !manualValidation) throw new Error("validation.fields");
                    return submit();
                }
            }}
            onSuccess={() => {
                handleCancel();
                setValue("rating", 0);
            }}
        >
            <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                    <RateInput
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
        </DialogComponent>
    );
}

export default CourseRatingInput;