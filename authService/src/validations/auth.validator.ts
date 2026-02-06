import {email, z} from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})


export {
  registerSchema
}