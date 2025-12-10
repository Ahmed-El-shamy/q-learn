import z, { email } from "zod";

export const forgetPasswordSchema = z.object({
  email: email("validation.email").nonempty("validation.required"),
});

export type ForgetPasswordPayload = z.infer<typeof forgetPasswordSchema>;
