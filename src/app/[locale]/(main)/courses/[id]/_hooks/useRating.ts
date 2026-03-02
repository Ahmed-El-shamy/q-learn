'use client';

import { useForm } from "react-hook-form";
import rateSchema, { RatePayload } from "../_schemas/rateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const useRating = () => {
    const { id } = useParams();
    const t = useTranslations("courses");

    const methods = useForm<RatePayload>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(rateSchema),
        defaultValues: {
            rating: 0,
            review: ""
        }
    });

    const ratingMutation = useMutation({
        mutationKey: [Api.routes.site.courseReview, id],
        mutationFn: async (body: RatePayload) => {
            const response = await api.post(Api.routes.site.courseReview, {
                ...body,
                course_id: id
            });
            return response;
        },
        onSuccess: () => {
            toast.success(t("reviewSubmissionSuccess"));
        },
        onError: () => {
            toast.error(t("reviewSubmissionError"));
        },
    });

    async function handleSubmit(payload: RatePayload) {
        await (ratingMutation.mutateAsync(payload));
    }

    return {
        methods,
        submit: methods.handleSubmit(handleSubmit),
    }
}

export default useRating;