import { z } from "zod";

export const wishSchema = z.object({
  name: z.string().min(3, "That name feels a bit too short 😜"),
  text: z.string().min(6, "Let your wish grow a little longer 🌱"),
});

export type wishInput = z.infer<typeof wishSchema>;
