import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async (params) => {
  const { requestLocale } = params;
  let locale = await requestLocale;

  // Validate locale - if invalid, return default
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return {
      locale,
      messages,
    };
  } catch (error) {
    // If messages file doesn't exist, return default
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default,
    };
  }
});
