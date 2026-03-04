import z from "zod";

const rateSchema = z.object({
    review: z.string({error: "validation.required"}).min(1, {error: "validation.required"}),
    rating: z.number().min(1, {error: "validation.rate-minimum"}).max(5, {error: "validation.rate-maximum"})
})

export type RatePayload = z.infer<typeof rateSchema>;

export default rateSchema;