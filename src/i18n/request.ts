import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
export const locales = ["en", "id"] as const;
export const defaultLocale = "en" as const;

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
