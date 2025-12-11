import z from "zod";
import { passwordSchema } from "../../_schema/passwordSchema";

export const ResetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.password.notMatch",
    path: ["confirmPassword"],
  });

export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;
