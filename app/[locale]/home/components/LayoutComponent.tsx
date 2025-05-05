import React, { ReactNode } from 'react';
import { performRequest } from '@/lib/datocms';
import { IGlobalAssetsProps, IPageContent } from '@/types/pageContent.types';
import MobileMenu from '@/components/MobileMenu/MobileMenu';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Locale, routing } from '@/i18n/routing';
import NavServer from '@/components/NavServer/NavServer';
import Footer from '@/components/Footer/Footer';
import { PostHogProvider } from '@/providers/ph-providers';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';


type TLayoutProps = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

const LayoutComponent = async (
  { children, params }: TLayoutProps
) => {
  const GLOBAL_ASSETS_CONTENT_QUERY = `
    query GlobalAssets {
      globalAsset {
        images {
          url
          customData
          alt
        }
      }
    }`
    
  const { globalAsset }: IPageContent = await performRequest(GLOBAL_ASSETS_CONTENT_QUERY);
  const hidonixLogo: IGlobalAssetsProps[] = [];
  const lightDarkModeIcons: IGlobalAssetsProps[] = [];
  const mobileMenuArrows: IGlobalAssetsProps[] = [];
  const socialIcons: IGlobalAssetsProps[] = [];

  globalAsset.images.map((img: IGlobalAssetsProps) => {
    if (img.customData.dataType === "light-dark-mode") {
      lightDarkModeIcons.push(img)
    }
    else if (img.customData.dataType === "nav-arrow") {
      mobileMenuArrows.push(img)
    }
    else if (img.customData.dataType === "social-icon") {
      socialIcons.push(img)
    }
    else if (img.customData.dataType === "hidonix-logo") {
      hidonixLogo.push(img)
    } 
  });


  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  // ensures correct locale is applied during (SSR)
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <PostHogProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              // disableTransitionOnChange
            > 
              <NavServer />
              <MobileMenu 
                // lightDarkModeIcons={lightDarkModeIcons} 
                hidonixLogo={hidonixLogo}
                mobileMenuArrows={mobileMenuArrows} 
                socialIcons={socialIcons}
              />
                {children}
              <Footer />

              <ThemeSwitcher lightDarkModeIcons={lightDarkModeIcons} />
            </ThemeProvider>
          </NextIntlClientProvider>
        </PostHogProvider>
        
      </body>
      
    </html>
  )
}

export default LayoutComponent