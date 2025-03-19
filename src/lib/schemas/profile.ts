import { z } from 'zod';

export const profileFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  about: z.string().optional(),
  image: z.string().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  taxId: z.string().optional(),
  socialMedia: z.record(z.string()).optional(),
});

export const settingsFormSchema = z.object({
  emailEnabled: z.boolean(),
  emailFrequency: z.enum(['daily', 'weekly', 'monthly']),
  emailAccountUpdates: z.boolean(),
  emailSecurityAlerts: z.boolean(),
  emailMarketing: z.boolean(),
  pushEnabled: z.boolean(),
  pushAccountUpdates: z.boolean(),
  pushSecurityAlerts: z.boolean(),
  pushMarketing: z.boolean(),
  locale: z.string(),
  language: z.string(),
});
