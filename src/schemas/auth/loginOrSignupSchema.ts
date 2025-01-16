import { z } from 'zod'
import { emailPattern } from '../shared/patterns'

export const loginOrSignupSchema = z.object({
  email: emailPattern,
})

export type LoginOrSignupData = z.infer<typeof loginOrSignupSchema>
