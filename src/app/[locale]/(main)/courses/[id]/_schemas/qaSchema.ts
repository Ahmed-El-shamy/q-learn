import z from "zod";

const qaSchema = z.object({
  text: z.string({ error: "validation.required" }).min(1, {
    error: "validation.required",
  }),
});

export type QAPayload = z.infer<typeof qaSchema>;

export default qaSchema;


