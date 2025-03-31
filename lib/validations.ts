import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
