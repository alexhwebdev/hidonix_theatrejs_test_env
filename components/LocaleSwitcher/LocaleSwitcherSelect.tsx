'use client';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import {Locale} from '@/i18n/routing';
import {usePathname, useRouter} from '@/i18n/navigation';
import "./localeswitcher.scss";
import { pageSlugMap } from '@/i18n/SlugMap';
import {useLocale} from 'next-intl';


type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
  
    // Get the current path (excluding the locale segment)
    const currentPath = pathname.replace(`/${locale}`, '');
  
    // Find the localized path for the current route
    const matchedRoute = Object.entries(pageSlugMap.routes).find(
      ([, locales]) => {
        return (locales as Record<Locale, string>)[locale as Locale] === currentPath;
      }
    );
  
    let localizedRoute: string;

    // If the matched route exists, try to get the localized version
    if (matchedRoute) {
      const nextLocalePath = (matchedRoute[1] as Record<Locale, string>)[nextLocale];
      localizedRoute = nextLocalePath ?? `/blog`;  // fallback to /blog if undefined
    } else if (currentPath.includes('/blog/')) {
      // Fallback for blog detail pages with no match in slug map
      localizedRoute = `/blog`;
    } else if (!matchedRoute && currentPath.includes('/expox')) {
      // Fallback for expox pages with no match
      localizedRoute = `/`;
    } 
    else {
      // Generic fallback
      localizedRoute = currentPath;
    }
  
    startTransition(() => {
      router.replace(
        {
          pathname: localizedRoute,
        },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label
      className="localeswitcherselect__container"
      // className={clsx(
      //   'relative text-gray-400',
      //   isPending && 'transition-opacity [&:disabled]:opacity-30'
      // )}
    >
      <p className="globe">🌐</p>
      <p>{label}</p>
      <select
        className=""
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span 
        // className=""
      >
        {/* ⌄ */}
      </span>
    </label>
  );
}