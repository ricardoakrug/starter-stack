import { profileFormSchema, settingsFormSchema } from '@/lib/schemas/profile';
import { z } from 'zod';

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
