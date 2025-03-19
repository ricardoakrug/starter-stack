import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .transform(email => email.toLowerCase().trim())
    .refine(
      email => {
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      {
        message: 'Invalid email format',
      }
    ),
});

// Additional validation for user profile updates
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .transform(name => name.trim()),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens'
    )
    .transform(username => username.toLowerCase().trim()),
  about: z
    .string()
    .max(500, 'About must be less than 500 characters')
    .optional()
    .transform(about => about?.trim()),
  image: z.string().url('Please enter a valid URL').optional(),
  streetAddress: z
    .string()
    .max(100, 'Street address must be less than 100 characters')
    .optional()
    .transform(address => address?.trim()),
  city: z
    .string()
    .max(50, 'City must be less than 50 characters')
    .optional()
    .transform(city => city?.trim()),
  state: z
    .string()
    .max(50, 'State must be less than 50 characters')
    .optional()
    .transform(state => state?.trim()),
  postalCode: z
    .string()
    .max(20, 'Postal code must be less than 20 characters')
    .optional()
    .transform(code => code?.trim()),
  country: z
    .string()
    .max(50, 'Country must be less than 50 characters')
    .optional()
    .transform(country => country?.trim()),
  taxId: z
    .string()
    .max(50, 'Tax ID must be less than 50 characters')
    .optional()
    .transform(id => id?.trim()),
  socialMedia: z.record(z.string().url('Please enter a valid URL')).optional(),
});
