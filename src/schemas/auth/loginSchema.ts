import { z } from 'zod'
import { emailPattern, passwordPattern } from '../shared/patterns'

export const loginSchema = z.object({
  email: emailPattern,
  password: passwordPattern,
  rememberMe: z.boolean().optional(),
})

export type LoginData = z.infer<typeof loginSchema>
