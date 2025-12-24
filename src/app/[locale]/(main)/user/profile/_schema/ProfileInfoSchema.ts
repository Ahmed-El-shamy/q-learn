import z from "zod";

export const ProfileInfoSchema = z.object({
  firstName: z.string().regex(/^[A-Za-z\s]+$/, "validation.firstName"),
  lastName: z.string().regex(/^[A-Za-z\s]+$/, "validation.lastName"),
  email: z.email("validation.email"),
  phone: z
    .string()
    .regex(/^[0-9]+$/, "validation.phoneNumber.numbers")
    .min(11, "validation.phoneNumber.minLength")
    .max(11, "validation.phoneNumber.maxLength"),
});

export type ChangeUserInfo = z.infer<typeof ProfileInfoSchema>;
