"use client";

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import '../footer.scss';
import { IFooterProps, IGlobalAssetsProps } from '@/types/pageContent.types';
// import EmailForm from '@/components/EmailForm';
// import IubendaLinks from "@/components/IubendaLinks";
import { usePathname } from 'next/navigation';
import parse from 'html-react-parser';
import { SubscribeSection } from '@/components/MailChimp/SubscribeSection';

// const quickLinks = [
//   { path: "https://www.hidonix.com/mit-museum-innovation-technology", label: "Museum Innocation Technology", prefetching: false },
//   { path: "https://www.hidonix.com/ion-indoor-outdoor-navigation", label: "Indoor Outdoor Navigation", prefetching: false },
//   { path: "/about-us", label: "About Us", prefetching: false },
//   { path: "/en/careers", label: "Careers", prefetching: false },
// ];


interface FooterProps {
  socialIcons: IGlobalAssetsProps[];
  allFooterModels: IFooterProps;
}

const FooterView = (
	{ socialIcons, allFooterModels }: FooterProps
) => {
  const darkSocialIcons = socialIcons.filter((icons) => {
    return icons.customData.mode === "dark"
  })

  const pathname = usePathname();
  const locale = pathname?.substring(1, 3).toLowerCase();

  const aboutUsLocale = allFooterModels._allAboutUsLocales.find(
    item => item.locale === locale
  );
  const quickLinksLocale = allFooterModels._allQuickLinksLocales.find(
    item => item.locale === locale
  );
  const subscribeNewsletterLocale = allFooterModels._allSubscribeToOurNewsletterLocales.find(
    item => item.locale === locale
  );
  const madeWithLocale = allFooterModels._allMadeWithLocales.find(
    item => item.locale === locale
  );
  const privacyCookiePolicyLocale = allFooterModels._allPrivaryCookiePolicyLocales.find(
    item => item.locale === locale
  );


  return (
    <footer id={`footer`}>
      {/* <IubendaLinks /> */}
      <div className={`footer__navform_container`}>
        <div className={`footer__nav_form`}>
          {aboutUsLocale?.value && parse(aboutUsLocale.value)}
          {quickLinksLocale?.value && parse(quickLinksLocale.value)}

          <div className={`footer__subscribe`}>
            {subscribeNewsletterLocale?.value && parse(subscribeNewsletterLocale.value)}

            {/* <EmailForm></EmailForm> */}
            <SubscribeSection />
          </div>
        </div>
      </div>


      <div className={`footer__bar_container`}>
        <div className={`footer__bar`}>
          {/* <p className={`footer__heading`}> */}
            {/* © Made with 🧠 and ❤️ by Hidonix {new Date().getFullYear()} */}
            {madeWithLocale?.value && parse(madeWithLocale.value)} 
          {/* </p> */}

          {privacyCookiePolicyLocale?.value && parse(privacyCookiePolicyLocale.value)} 

          <div className={`footer__bar_sociallinks`}>
            {darkSocialIcons.map((img, index) => (
              <Link href={img.customData.link} key={`social`+index}>
                <Image 
                  src={img.url} 
                  alt={img.alt} 
                  width={15}
                  height={15}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterView;