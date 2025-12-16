'use client';

import { useForm } from "react-hook-form";
import rateSchema, { RatePayload } from "../_schemas/rateSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const useRating = () => {
    const methods = useForm<RatePayload>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(rateSchema),
        defaultValues: {
            rate: 0,
            text: ""
        }
    });

    function handleSubmit(payload: RatePayload) {

    }

    return {
        methods,
        submit: methods.handleSubmit(handleSubmit)
    }
}

export default useRating;