import z, {email} from "zod";
import { passwordSchema } from "../../_schema/passwordSchema";

export const loginSchema = z.object({
    email: email("validation.email"),
    password: passwordSchema,
});

export type LoginPayload = z.infer<typeof loginSchema>;