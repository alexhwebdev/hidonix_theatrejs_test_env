import {ReactNode} from 'react';
import type { Metadata } from "next";
import Script from 'next/script'
import { ThemeProvider } from "next-themes";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import NavServer from "@/components/NavServer/NavServer";
import Footer from "@/components/Footer/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {
  Locale, 
  routing
} from '@/i18n/routing';
import {
  getMessages, 
  // getTranslations, 
  setRequestLocale
} from 'next-intl/server';
import MobileMenu from '@/components/MobileMenu/MobileMenu';
 
import "../globals.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IGlobalAssetsProps, IPageContent } from '@/types/pageContent.types';
import { performRequest } from '@/lib/datocms';
import { PostHogProvider } from '@/providers/ph-providers';
// import LayoutComponent from './home/components/LayoutComponent';

import IubendaConsent from '@/components/IubendaConsent/IubendaConsent';

// import Seo from '@/components/SEO/SEO';
// import Script from 'next/script';


type TLayoutProps = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

// [locale] is rendered as (ƒ (Dynamic)  server-rendered on demand) bc [].
// Render as : ● (SSG) prerendered as static HTML (uses generateStaticParams)
// Youtube - Next.js i18n: App Router + next-intl Tutorial - 8:21 Static rendering & page metadata
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

// ---------- TODO : DYNAMIC METADATA
// export async function generateMetadata(
//   props: Omit<TLayoutProps, 'children'>
// ) {
//   const {locale} = await props.params;
//   const t = await getTranslations({locale, namespace: 'LocaleLayout'});
//   return {
//     title: t('title')
//   };
// }

// DOC : Metadata - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// NextJS looks for export of 'const metadata'.
export const metadata: Metadata = {
  // title: "Hidonix",
  title: {
    default: "Hidonix - Innovating Tomorrow, Today",
    template: "%s | Hidonix"
  },
  description: "We are not your typical software company—we are a deep tech pioneer at the forefront of innovation.",
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // manifest: '/manifest.json',

  // ADD HIDONIX OpenGraph IMG PATH HERE
  // openGraph: {
  //   images:  "https://orcdev.com/images/orcdev.png"
  // }

  // // How OpenGraph Image will show in Twitter :
  // twitter: {
  //   card: "summary_large_image"
  // }
};


export default async function LocaleLayout({
  children,
  params
}: TLayoutProps
) {

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

  // Enable static rendering ensures correct locale is applied during (SSR)
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
    <head>

    </head>
      <body>
        <IubendaConsent />
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

        {/* HubSpot tracking script */}
        <Script
          id="hubspot-tracking"
          // id="hs-script-loader"
          strategy="afterInteractive"
          src={`//js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js`}
        />
      </body>
      
    </html>
  );
}


/*
next-intl :
https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing


Next.js i18n: App Router + next-intl Tutorial :
  + YouTube : https://www.youtube.com/watch?v=h3IA_Iax-dk&t=358s
  + Github  : https://github.com/amannn/next-intl

setRequestLocale :
  + helps manage and set the locale context for the request that is being processed on the server. It ensures that all translations and messages are properly loaded and available for the request, based on the chosen locale.
  + This function does not directly affect the client-side state but ensures that the server-side rendering (SSR) of the page happens in the right locale.
*/