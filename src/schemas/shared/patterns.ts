import { z } from 'zod';

export const emailPattern = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .transform(email => email.toLowerCase())