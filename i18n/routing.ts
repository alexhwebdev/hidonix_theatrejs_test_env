import {
  defineRouting, 
  // LocalePrefix,
  // Pathnames
} from 'next-intl/routing';
// import {createNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'it'] as const;

export type Locale = typeof locales[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en'
});

/* ORIGINAL
import {
  defineRouting, 
  // LocalePrefix,
  // Pathnames
} from 'next-intl/routing';
// import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'it'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});

export type Locale = (typeof routing.locales)[number];

// // ---------- For Navigation
// export const locales = ["en", "de"] as const;
// export type Locales = typeof locales;
// export const pathnames: Pathnames<Locales> = {
//   '/': '/',
//   '/pathnames': '/pathnames'
// };

// export const localePrefix: LocalePrefix<Locales> = "always";
*/