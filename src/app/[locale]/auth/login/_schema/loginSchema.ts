import z, { email } from "zod";
import { passwordSchema } from "../../_schema/passwordSchema";

const roles = {
  user: 1,
  instructor: 2
} as const;

export const loginSchema = z.object({
  email: email("validation.email"),
  password: passwordSchema,
  role: z.enum(roles, {
    error: "validation.role",
  }).refine(arg => Boolean(arg)),
});

export type LoginPayload = z.infer<typeof loginSchema>;
