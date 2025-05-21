"use client";
import React, { useRef, useEffect, useState, useTransition } from 'react';
import { Link } from '@/i18n/navigation';
import Image from "next/image";
import { usePathname, useParams } from 'next/navigation';
import {useRouter} from '@/i18n/navigation';
import ThemeSwitchAssetsNoLink from '@/utils/ThemeSwitchAssetsNoLink';
import { IGlobalAssetsProps } from '@/types/pageContent.types';
import ThemeSwitchAssets from '@/utils/ThemeSwitchAssets';
// import ThemeSwitchLogo from '@/utils/ThemeSwitchLogo';
import {useLocale} from 'next-intl';
import "./mobile-menu.scss";


const navLinks = [
  { path: "/en", label: "Home", prefetching: false },
  { path: "/en/products", label: "Products", icon: "icon", click: "handlestedNavToggle", prefetching: false },
  { path: "/en/projects", label: "Projects", prefetching: false },
  { path: "/en/about-us", label: "About Us", prefetching: false },
  { path: "/en/blog", label: "Blog", prefetching: false },
  { path: "/en", label: "Select Language", icon: "icon", emoji: "🌐", click: "handleLocaleNavToggle", prefetching: false },
];
const navLinksIT = [
  { path: "/it", label: "Home", prefetching: false },
  { path: "/it/products", label: "Prodotti", icon: "icon", prefetching: false },
  { path: "/it/projects", label: "Progetti", prefetching: false },
  { path: "/it/about-us", label: "Chi siamo", prefetching: false },
  { path: "/it/blog", label: "Blog", prefetching: false },
  { path: "/it", label: "Seleziona Lingua", icon: "icon", emoji: "🌐", prefetching: false },
];

const nestedNavLinks = [
  { path: "", label: "Back", icon: "icon" },
  { path: "/mit-museum-innovation-technology", label: "MIT - Museum Innocation Technology"},
  { path: "/ion-indoor-outdoor-navigation", label: "ION - Indoor Outdoor Navigation"},
  { path: "/expox", label: "ExpoX"},
  // { path: "/", label: "ShowShopper (Coming Soon!)"},
  // { path: "/", label: "SafeSchool (Coming Soon!)"},
];


interface IHamburgerProps {
  hidonixLogo: IGlobalAssetsProps[];
  mobileMenuArrows: IGlobalAssetsProps[];
  socialIcons: IGlobalAssetsProps[];
}

const Hamburger = (
  {
    hidonixLogo, 
    mobileMenuArrows,
    socialIcons
  }: IHamburgerProps
) => {
  const [isToggled, setIsToggled] = useState(false);
  const [nestedMenuIsToggled, setNestedMenuIsToggled] = useState(false);
  const [localeNestedMenuIsToggled, setLocaleNestedMenuIsToggled] = useState(false);
  const localeNestedMenuRef = useRef(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  const handleToggleMenu = () => {
    setIsToggled(!isToggled);
  };
  const handleNestedNavToggle = () => {
    setNestedMenuIsToggled(!nestedMenuIsToggled);
  };
  const handleLocaleNavToggle = () => {
    setLocaleNestedMenuIsToggled(!localeNestedMenuIsToggled);
  };

  const selectedLanguage = [];
  if (pathname.slice(0, 3) === "/en" ) {
    selectedLanguage.push(...navLinks)
  } else {
    selectedLanguage.push(...navLinksIT)
  };

  const nextLocale = params.locale === "en" ? "it" : "en";
  // const hostDomain = "https://hidonix-nextjs-v1.vercel.app/";
  // const hostDomain = "http://localhost:3000/";
  const hostDomain = "https://hidonix.com/";


  const selectLanguage = () => {
    startTransition(() => {
      // router.replace(url, as, options);
      router.replace(
        hostDomain + nextLocale
      );
    });
  }

  
  // Mobile Menu close
  useEffect(() => {
    if (isToggled === false) {
    setNestedMenuIsToggled(false)
    setLocaleNestedMenuIsToggled(false)
    }
  }, [isToggled])

  return (
    <div className={`mobile_menu ${isToggled ? 'open' : ''}`}>
      {/* HAMBURGER */}
      <div 
        className={`hamburger__container ${isToggled ? 'open' : ''}`}
        data-menu="3" 
      >
        {/* HIDONIX LOGO */}
        <div className={`hidonix__logo`}>
          {/* <ThemeSwitchLogo receivedAssets={hidonixLogo} /> */}
          
          <Link href={"https://hidonix.com/"} className={`logo__link`} 
            rel="preload"
            // as="image"
            // type="image/svg+xml"
          >
            <Image
              className={`logo logo_black`}
              src={hidonixLogo[0]?.url}
              alt={'Hidonix Logo'}
              width={25}
              height={25}
              priority
              // loading="eager" // disables lazy loading
              // fetchPriority="high"
            />
            <Image
              className={`logo logo_white`}
              src={hidonixLogo[1]?.url}
              alt={'Hidonix Logo'}
              width={25}
              height={25}
              priority
              // loading="eager" // disables lazy loading
              // fetchPriority="high"
            />
          </Link>

          {/* {hidonixLogo.map((asset, index) => {
            return (
              <Link 
                href={asset.customData.link} 
                className={`theme-switch-asset`}
                prefetch={false} 
                key={`asset-` + index}
              >
                <Image
                  src={asset?.url}
                  alt={asset?.alt}
                  width={25}
                  height={25}
                  // loading="eager" // disables lazy loading
                  priority
                  // fetchPriority="high"
                />
              </Link>
            )
          })} */}
        </div>
        <div className="hamburger" onClick={handleToggleMenu}></div>
      </div>

      {/* MAIN MENU */}
      <nav className={`
        nav__menu 
        ${isToggled ? 'open' : ''} 
        ${nestedMenuIsToggled ? 'nested_open' : ''}
        ${localeNestedMenuIsToggled ? 'locale__nested_open' : ''}
      `}>
        <ul className={`nav__links`}>
          {selectedLanguage.map((link, index) => (
            <li key={`nav`+index}>
              {

                link.icon 
                  ? <>
                      {/* Products > || 🌐 Select Language > */}
                      {
                        link.label === "Products" || link.label === "Prodotti" 
                          ? <div className={`products__btn`} onClick={handleNestedNavToggle}>
                              {link.label}
                            </div> 
                          : <div className={`products__btn`} onClick={handleLocaleNavToggle}>
                              <span>{link.emoji}</span>
                              {link.label}
                            </div>
                      }
                      {/* <Image 
                        src={link.icon} 
                        alt={`Right arrow`} 
                        width={30}
                        height={30}
                      /> */}
                      <ThemeSwitchAssetsNoLink 
                        receivedAssets={mobileMenuArrows} 
                      />
                    </> 
                  : <Link className={`${pathname === link.path ? 'activeLink' : ''}`}
                      href={link.path.length > 3 ? link.path.slice(3) : "/"} 
                      onClick={handleToggleMenu}
                    >
                      {link.label}
                    </Link>
              }
            </li>
          )
          )}
          {/* <div 
            className={`local_switcher__container`}
            onClick={handleLocaleNavToggle}
          >
          </div> */}
        </ul>
      </nav>


      {/* NESTED PRODUCTS MENU */}
      <div className={`nav__nested_menu ${nestedMenuIsToggled ? 'nested_open' : ''}`}>
        <ul className={`nav__nested_links`}>
          {nestedNavLinks.map((link, index) => (
            <li key={`nested_nav` + index} 
              // className={locale === "it" ? "it-class" : ""}
            >
              {
                link.icon ? 
                <>
                  {/* <Image 
                    src={link.icon} 
                    alt={`Left arrow`} 
                    width={30}
                    height={30}
                  /> */}
                  <ThemeSwitchAssetsNoLink receivedAssets={mobileMenuArrows} />
                  <div 
                    className={`products__back_btn`}
                    onClick={handleNestedNavToggle}
                  >
                    {link.label}   {/* Back button */}
                  </div>
                </> : 
                <Link 
                  className={`${pathname.slice(0, -2) === link.path ? 'activeLink' : ''}`}
                  href={link.path} 
                  // onClick={handleNestedNavToggle}
                  onClick={handleToggleMenu}
                >
                  {link.label}
                </Link>
              }
            </li>
          ))}
        </ul>
      </div>


      {/* NESTED SELECT LANGUAGE MENU */}
      <div ref={localeNestedMenuRef} className={`
        locale__nested_menu 
        ${localeNestedMenuIsToggled ? 'locale__nested_open' : ''}
      `}>
        <ul className={`locale__nested_links`}>
          <li key={`locale__nested_1`}>
            {/* <Image 
              src={ChevronBlackLeft} 
              alt={`Left arrow`} 
              width={25}
              height={25}
            /> */}
            <ThemeSwitchAssetsNoLink receivedAssets={mobileMenuArrows} />
            
            <div className={`select_lang_back__btn`}
              onClick={handleLocaleNavToggle}
            >Back</div>
          </li>
          <li>
            <div className={`select_lang__btn ${isPending}`} onClick={selectLanguage}>
              {
                locale === "en" ?
                <span>Italiano</span> :
                <span>English</span>
              }
            </div>
          </li>
        </ul>
      </div>


      {/* SOCIAL LINKS */}
      <div className={`
        nav__social_links_contact_us
        ${isToggled ? 'open' : ''} 
      `}>
        <div className={`nav__social_links`}>
          {/* SOCIAL MEDIA ICONS */}
          <ThemeSwitchAssets receivedAssets={socialIcons} />
        </div>

        <Link 
          href="/contact" 
          className={`nav__contact_us`}
          onClick={handleToggleMenu}
        >
          Contact Us
        </Link>        
      </div>

    </div>
  )
}

export default Hamburger;
