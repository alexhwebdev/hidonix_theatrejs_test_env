'use client';
import { ChangeEvent, ReactNode, useTransition, useEffect, useState } from 'react';
import { Locale } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';
import './localeswitcher.scss';
import { pageSlugMap } from '@/i18n/SlugMap';
import { useLocale } from 'next-intl';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({ children, defaultValue, label }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevents hydration mismatch by rendering nothing until client mount
  }

  function resolveLocalizedRoute(currentPath: string, currentLocale: Locale, nextLocale: Locale): string {
    const pathWithoutLocale = currentPath.replace(`/${currentLocale}`, '');
  
    // BLOG: Always switch to /blog in the selected locale
    if (pathWithoutLocale.startsWith('/blog')) {
      return '/blog';
    }
    
    // PROJECTS fallback routing
    if (pathWithoutLocale.startsWith('/projects/')) {
      return '/progetti';
    }
    if (pathWithoutLocale.startsWith('/progetti/')) {
      return '/projects';
    }
  
    // Slug map match
    const matchedRoute = Object.entries(pageSlugMap.routes).find(
      ([, locales]) => (locales as Record<Locale, string>)[currentLocale] === pathWithoutLocale
    );
  
    if (matchedRoute) {
      const nextLocalePath = (matchedRoute[1] as Record<Locale, string>)[nextLocale];
      if (nextLocalePath) {
        return nextLocalePath;
      }
    }
  
    // Generic fallback
    return pathWithoutLocale;
  }
  

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    const nextPath = resolveLocalizedRoute(pathname, locale as Locale, nextLocale);

    startTransition(() => {
      router.replace({ pathname: nextPath }, { locale: nextLocale });
    });
  }

  return (
    <label className="localeswitcherselect__container">
      <p className="globe">🌐</p>
      <p>{label}</p>
      <select defaultValue={defaultValue} disabled={isPending} onChange={onSelectChange}>
        {children}
      </select>
    </label>
  );
}
