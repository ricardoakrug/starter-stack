"use server";

import { auth } from "@/lib/actions/auth/auth";
import { db } from "@/lib/db";
import { users, userSettings } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";

export async function getUserData() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id));

    const settings = await db
      .select()
      .from(userSettings)
      .where(eq(userSettings.userId, session.user.id));

    return { user, settings };
  } catch (error) {
    console.error("[USER_GET]", error);
    throw error;
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
      throw new Error("Unauthorized");
    }

    console.log("Updating user profile:", {
      userId: session.user.id,
      profile: values,
    });

    await db
      .update(users)
      .set({
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
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id));

    console.log("User profile updated successfully");
    return { success: true };
  } catch (error) {
    console.error("[USER_PROFILE_UPDATE]", error);
    throw error;
  }
}

export async function updateUserSettings(values: {
  emailEnabled: boolean;
  emailFrequency: "daily" | "weekly" | "monthly";
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
      throw new Error("Unauthorized");
    }

    console.log("Updating user settings:", {
      userId: session.user.id,
      settings: values,
    });

    await db
      .update(userSettings)
      .set({
        emailEnabled: values.emailEnabled,
        emailFrequency: values.emailFrequency,
        emailAccountUpdates: values.emailAccountUpdates,
        emailSecurityAlerts: values.emailSecurityAlerts,
        emailMarketing: values.emailMarketing,
        pushEnabled: values.pushEnabled,
        pushAccountUpdates: values.pushAccountUpdates,
        pushSecurityAlerts: values.pushSecurityAlerts,
        pushMarketing: values.pushMarketing,
        locale: values.locale,
        language: values.language,
      })
      .where(eq(userSettings.userId, session.user.id));

    console.log("User settings updated successfully");
    return { success: true };
  } catch (error) {
    console.error("[USER_SETTINGS_UPDATE]", error);
    throw error;
  }
}
