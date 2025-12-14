import { passwordSchema } from "@/app/[locale]/auth/_schema/passwordSchema";
import z from "zod";

export const ProfilePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "validation.password.notMatch",
    path: ["confirmPassword"],
  });

export type ChangeUserPassword = z.infer<typeof ProfilePasswordSchema>;
