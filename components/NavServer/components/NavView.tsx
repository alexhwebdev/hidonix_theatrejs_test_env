"use client";
import React from 'react';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { IGlobalAssetsProps } from '@/types/pageContent.types';
import { open_sans } from '@/utils/fonts';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
import ThemeSwitchAssets from '@/utils/ThemeSwitchAssets';
import { useTranslations } from 'next-intl';
import {useLocale} from 'next-intl';
import "./nav-view.scss"


interface ILogoIconProps {
  hidonixLogo: IGlobalAssetsProps[];
  socialIcons: IGlobalAssetsProps[];
  // lightDarkModeIcons: IGlobalAssetsProps[];
}

const NavView = (
  { 
    hidonixLogo, 
    socialIcons, 
    // lightDarkModeIcons 
  }: ILogoIconProps
) => {
  const pathname = usePathname();
  const locale = useLocale();
  const tNav = useTranslations('NavComponent');
  const productsPageLinks = [
    { path: tNav("routes.mit"), label: "MIT - Museum Innovation Technology", prefetching: false },
    { path: tNav("routes.ion"), label: "ION - Indoor Outdoor Navigation", prefetching: false },
    { path: tNav("routes.expox"), label: "ExpoX"},
    // { path: "/", label: "ShowShopper (Coming Soon!)", prefetching: false },
    // { path: "/", label: "SafeSchool (Coming Soon!)", prefetching: false },
  ];
console.log("locale ", locale)
  return (
    <header id="nav__header">
      <nav className={`nav ${open_sans.className}`}>
        {/* ---------- HIDONIX LOGO ---------- */}
        <div className={`hidonix__logo`}>
          <ThemeSwitchAssets receivedAssets={hidonixLogo} />
        </div>

        <div className={`nav__links_container`}>
          <ul className={`nav__page_links`}>
            <li className={`home__btn`}>
              <Link 
                className={`${pathname === tNav("routes.home") + locale ? 'activeLink' : ''}`}
                href={tNav("routes.home")} 
              >{tNav("home")}</Link>
            </li>
            <li className={`products__btn`}>
              <Link 
                href={tNav("routes.products")} 
              >{tNav("products")}</Link>
              <div className={`nav__products_page_links`}>
                <ul>
                  {
                    // productsPageLinks.map((item, index) => (
                    //   <li key={`products-nav-`+ index}>
                    //     <Link href={item.path}>
                    //       {item.label}
                    //     </Link>
                    //   </li>
                    // ))

                    productsPageLinks.map((item, index) => (
                      <li key={`products-nav-${index}`} className={locale === "it" ? "it-class" : ""}>
                        <Link href={item.path}>
                          {item.label}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </li>
            <li className={`projects__btn`}>
              <Link 
                className={`${pathname.substring(3) === tNav("routes.projects") ? 'activeLink' : ''}`}
                href={tNav("routes.projects")} 
              >{tNav("projects")}</Link>
            </li>
            <li className={`about__btn`}>
              <Link 
                className={`${pathname.substring(3) === tNav("routes.about") ? 'activeLink' : ''}`}
                href={tNav("routes.about")} 
              >{tNav("about")}</Link>
            </li>
            <li className={`blog__btn`}>
              <Link 
                className={`${pathname.substring(3) === tNav("routes.blog") ? 'activeLink' : ''}`}
                href={tNav("routes.blog")} 
              >{tNav("blog")}</Link>
            </li>
            <LocaleSwitcher />
          </ul>
          {/* <div 
            className={`nav__products_page_links`}
            // style={{ opacity: isProductsHovered ? 1 : 0, zIndex: isProductsHovered ? 10 : -10 }}  
          >
            <ul>
              {
                productsPageLinks.map((item, index) => (
                  <li key={`products-nav-`+ index}>
                    <Link href={item.path}>
                      {item.label}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div> */}


          {/* <LocaleSwitcher /> */}

          <div className={`nav__social_links`}>
            {/* SOCIAL MEDIA ICONS */}
            <ThemeSwitchAssets receivedAssets={socialIcons} />
            
            {/* <ThemeSwitcher lightDarkModeIcons={lightDarkModeIcons} /> */}
          </div>

          {/* <Link 
            href="/contact" 
            className={`nav__contact_us`}
          >
            Contact Us
          </Link>*/}
          <Link 
            href={tNav("routes.contact")} 
            className={`nav__contact_us`}
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default NavView;