import z from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(1, "validation.required")
    .regex(/^[A-Za-z\s]+$/, "validation.name"),
  email: z.string().nonempty("validation.required").email("validation.email"),
  subject: z.string().min(1, "validation.required"),
  message: z.string().min(1, "validation.required"),
});

export type ContactPayload = z.infer<typeof ContactSchema>;
