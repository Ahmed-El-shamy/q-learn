import z from "zod";

const rateSchema = z.object({
    text: z.string({error: "validation.required"}),
    rate: z.number().min(1, {error: "validation.rate-minimum"}).max(5, {error: "validation.rate-maximum"})
})

export type RatePayload = z.infer<typeof rateSchema>;

export default rateSchema;