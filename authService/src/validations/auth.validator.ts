import { z } from "zod";


export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "Password must be at least 4 chars")
  })
})


export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid"),
    password: z.string().min(4, "Password must be at least 4 chars")
  })
})