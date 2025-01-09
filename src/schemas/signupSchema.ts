import { z } from 'zod';
import { emailPattern, passwordPattern } from './shared/patterns';

export const signupSchema = z.object({
  email: emailPattern,
  password: passwordPattern,
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

export type SignupData = z.infer<typeof signupSchema>;
