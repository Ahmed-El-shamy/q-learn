import z from "zod";
import { passwordSchema } from "../../_schema/passwordSchema";

const roles = {
  user: 1,
  instructor: 2
} as const;

export const RegisterSchema = z
  .object({
    firstName: z.string().regex(/^[A-Za-z]+$/, "validation.firstName"),
    lastName: z.string().regex(/^[A-Za-z]+$/, "validation.lastName"),
    email: z.email("validation.email"),
    phoneNumber: z
      .string()
      .regex(/^[0-9]+$/, "validation.phoneNumber.numbers")
      .min(11, "validation.phoneNumber.minLength")
      .max(11, "validation.phoneNumber.maxLength"),
    password: passwordSchema,
    confirmPassword: z.string(),
    role: z.enum(roles).refine(arg => Boolean(arg), {
      message: "validation.role",
    }),
    birthDate: z.date({error: "validation.birthdate"})
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.password.notMatch",
    path: ["confirmPassword"],
  });

export type RegisterPayload = z.infer<typeof RegisterSchema>;
