import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "validation.password.minLength")
  .refine(
    (password) => /[a-z]/.test(password),
    {
      message: "validation.password.lowercase",
    }
  )
  .refine(
    (password) => /[A-Z]/.test(password),
    {
      message: "validation.password.uppercase",
    }
  )
  .refine(
    (password) => /[0-9]/.test(password),
    {
      message: "validation.password.digit",
    }
  )
  .refine(
    (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    {
      message: "validation.password.symbol",
    }
  );

