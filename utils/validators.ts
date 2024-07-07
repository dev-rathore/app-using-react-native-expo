import * as z from 'zod';

export const emailSchema = z.string().email('Invalid email format');
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters long');
export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password must contain at least one alphabet, one character, and one number');
