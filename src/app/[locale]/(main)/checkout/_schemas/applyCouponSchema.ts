import z from "zod";

const applyCouponSchema = z.object({
  coupon_code: z
    .string({ error: "validation.required" })
    .min(1, { error: "validation.required" }),
});

export type ApplyCouponPayload = z.infer<typeof applyCouponSchema>;

export default applyCouponSchema;
