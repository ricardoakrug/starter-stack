import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "es"] as const;
export const defaultLocale = "en" as const;

type Locale = (typeof locales)[number];
type ComponentMessages = Record<Locale, Record<string, unknown>>;

// Function to load component-specific translations
export async function loadComponentTranslations(componentPath: string): Promise<ComponentMessages> {
  const messages: ComponentMessages = {
    en: {},
    es: {},
  };

  for (const locale of locales) {
    try {
      const componentMessages = (
        await import(`@/components/${componentPath}/translations/${locale}.json`)
      ).default;
      messages[locale] = componentMessages;
    } catch {
      console.warn(`No translations found for ${componentPath} in ${locale}`);
    }
  }

  return messages;
}

// Main configuration for next-intl
export default getRequestConfig(async ({ locale = defaultLocale }) => {
  // Load common translations
  const commonMessages = (await import(`@/messages/${locale}.json`)).default;

  // Load component-specific translations
  const heroMessages = await loadComponentTranslations("landing/hero");
  const featuresMessages = await loadComponentTranslations("landing/features");
  const blogMessages = await loadComponentTranslations("landing/blog");
  const footerMessages = await loadComponentTranslations("landing/footer");

  // Merge all translations
  const messages = {
    common: commonMessages.common,
    hero: heroMessages[locale as Locale] || {},
    features: featuresMessages[locale as Locale] || {},
    blog: blogMessages[locale as Locale] || {},
    footer: footerMessages[locale as Locale] || {},
  };

  return { messages, locale };
});
