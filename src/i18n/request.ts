import { getRequestConfig } from "next-intl/server";
import { GetRequestConfigParams } from "next-intl/server";

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
  if (!locale) throw new Error("Locale is required");

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
