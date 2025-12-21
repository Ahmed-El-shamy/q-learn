import z from "zod";

const roles = {
  user: "user",
  instructor: "instructor" 
} as const;

export const userTypeSchema = z.enum(roles, {error: "validation.user-type"});