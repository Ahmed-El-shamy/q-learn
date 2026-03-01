import z from "zod";

export const otpSchema = z.object({
  code: z
    .string()
    .min(4, "auth.otp.validation.codeLength")
    .max(6, "auth.otp.validation.codeLength")
    .regex(/^\d+$/, "auth.otp.validation.digitsOnly"),
});

export type OtpPayload = z.infer<typeof otpSchema>;
