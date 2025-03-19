'use server';

import { auth } from '@/lib/actions/auth/auth';
import { dbAccess } from '@/lib/db/access';
import { handleError, logError } from '@/lib/security/error-handling';

export async function getUserData() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    const [user] = await dbAccess.users.getById(session.user.id);
    const [settings] = await dbAccess.settings.getByUserId(session.user.id);

    // Log the access
    await dbAccess.logAuditEvent(session.user.id, 'get_user_data', {
      userId: session.user.id,
    });

    return { user, settings };
  } catch (error) {
    logError(error, 'Failed to get user data');
    throw handleError(error);
  }
}

export async function updateUserProfile(values: {
  name: string;
  email: string;
  username: string;
  about?: string;
  image?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  taxId?: string;
  socialMedia?: Record<string, string>;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // Log the update attempt
    await dbAccess.logAuditEvent(session.user.id, 'update_profile', {
      userId: session.user.id,
      fields: Object.keys(values),
    });

    await dbAccess.users.update(session.user.id, {
      name: values.name,
      email: values.email,
      username: values.username,
      about: values.about,
      image: values.image,
      streetAddress: values.streetAddress,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      country: values.country,
      taxId: values.taxId,
      socialMedia: values.socialMedia,
    });

    return { success: true };
  } catch (error) {
    logError(error, 'Failed to update user profile');
    throw handleError(error);
  }
}

export async function updateUserSettings(values: {
  emailEnabled: boolean;
  emailFrequency: 'daily' | 'weekly' | 'monthly';
  emailAccountUpdates: boolean;
  emailSecurityAlerts: boolean;
  emailMarketing: boolean;
  pushEnabled: boolean;
  pushAccountUpdates: boolean;
  pushSecurityAlerts: boolean;
  pushMarketing: boolean;
  locale: string;
  language: string;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // Log the settings update
    await dbAccess.logAuditEvent(session.user.id, 'update_settings', {
      userId: session.user.id,
      settings: Object.keys(values),
    });

    await dbAccess.settings.update(session.user.id, values);

    return { success: true };
  } catch (error) {
    logError(error, 'Failed to update user settings');
    throw handleError(error);
  }
}
