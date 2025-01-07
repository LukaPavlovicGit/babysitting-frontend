import { z } from 'zod';

export const emailPattern = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .transform(email => email.toLowerCase())

export const passwordPattern = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
