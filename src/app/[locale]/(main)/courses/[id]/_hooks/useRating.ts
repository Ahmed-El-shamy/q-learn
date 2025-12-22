'use client';

import { useForm } from "react-hook-form";
import rateSchema, { RatePayload } from "../_schemas/rateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import toastErrorMessage from "@/_lib/api/toastErrorMessage";

const useRating = () => {
    const {id} = useParams();
    
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
            return response
        },
        onSuccess: async (response) => {
            // Do not revalidate the course, because the rating has to be approved in the first place to have an effect.
            toast.success(response?.message || "");
        },
        onError: (err: unknown) => toastErrorMessage(err),
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