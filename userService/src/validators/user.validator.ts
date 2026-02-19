import {z} from "zod";

export const createProfileSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  phone: z.string().optional(),
  avatra: z.string().url().optional()
})

