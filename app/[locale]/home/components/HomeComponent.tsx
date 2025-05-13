"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MarkdownComponent from '@/utils/ReactMarkdown';
import techPartner from "../../../../public/home-imgs/tech-partner.png"
import Accordion from '@/app/[locale]/home/components/Accordian/Accordion';
import CenterModeSlider from '@/app/[locale]/home/components/ReactSlick/CenterModeSlider/CenterModeSlider';
import FadeSlider from '@/app/[locale]/home/components/ReactSlick/FadeSlider/FadeSlider';
import {useLocale} from 'next-intl';
import '../home.scss';
import Cookies from 'js-cookie';


interface HomeProps {
  homeGlobalAssets: {
    alt: string;
    url: string;
  }[];

  secOneData: {
    heading: string;
    body: string;
    button: string;
    image: { 
      url: string;
      alt: string;
    };
    link: string;
  }[];

  secTwoData: { 
    images: {
      url: string; 
      alt: string;       
    }[];
  }[];

  sectionThreeData: {
    headingBody: {
      heading: string;
      body: string;
    }[];
    subheadingBody: {
      subheading: string;
      body: string;
    }[];
  };

  sectionFourData: {
    headings: {
      heading: string;
    }[];
    images: {
      image: {
        url: string;
      };
      subheading: string;
      body: string;
    }[]
  };

  secFiveData: {
    image: {
      url: string;
    }[];
    heading: string;
    button: string;
  }[];

  sectionSixData: {
    headings: {
      heading: string;
      subheading: string;
    }[];
    images: {
      image: {
        url: string;
      };
      body: string;
      date: string;
      link: string;
    }[]
  }

  sectionSevenData: {
    heading: string;
    images: {
      url: string;
      alt: string;
      customData: {
        link: string;
      };
    }[];
  }[];
};


const HomeComponent: React.FC<HomeProps> = (
  {
    homeGlobalAssets,
    secOneData,
    secTwoData,
    sectionThreeData,
    sectionFourData,
    secFiveData,
    sectionSixData,
    sectionSevenData
  }
) => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animateElement = (
      elements: string | string[], 
      fromProps: gsap.TweenVars, 
      toProps: gsap.TweenVars, 
      scrollTriggerProps: gsap.plugins.ScrollTrigger | gsap.plugins.ScrollTrigger[] // Handle dynamic scrollTriggerProps type
    ) => {
      // If elements is a string, use it directly, otherwise iterate over an array of elements
      const targetElements = typeof elements === "string" ? [elements] : elements;
  
      // If scrollTriggerProps is an array, it should correspond to each element
      const isArrayOfProps = Array.isArray(scrollTriggerProps);
  
      targetElements.forEach((element, index) => {
        const scrollProps = isArrayOfProps ? scrollTriggerProps[index] : scrollTriggerProps;
  
        gsap.fromTo(
          element,
          fromProps,
          {
            ...toProps,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              scrub: 1,
              ...scrollProps, // Merge the respective scrollTriggerProps
            },
          }
        );
      });
    };
    // gsap.fromTo(
    //   ".home_tech_partner_img",
    //   { 
    //     // opacity: 1 
    //     scale: 1.5,
    //   },
    //   {
    //     // translateX: "-50vw",
    //     // opacity: 0.2,
    //     scale: 1.2,
    //     // scale: getScale(),
    //     ease: "none",
    //     scrollTrigger: {
    //       // trigger: triggerRef.current,
    //       trigger: ".home_tech_partner_img",
    //       // pin: true,
    //       scrub: 1,
    //       start: "30% 100%", // start, scroller-start
    //       end: "30% 0%",   // end, scroller-end
    //       // markers: true
    //     }
    //   }
    // );

  
    animateElement(
      [
        ".home__tech_solutions_container h2", 
        ".home__tech_solutions_container p"
      ], 
      { opacity: 0, top: "75px" }, 
      { opacity: 1, top: "0px" }, 
      [
        { start: "50% 100%", end: "50% 100%", 
          // markers: true 
        },
        { start: "50% 100%", end: "50% 100%", 
          // markers: true 
        }
      ]
    );

    animateElement(".home_tech_list", 
      { opacity: 0, top: "100px" }, 
      { opacity: 1, top: "0px" }, 
      { start: "75% 100%", end: "0% 100%", 
        // markers: true 
      }
    );

    animateElement(
      [
        ".home__limitles_app_container h2", 
        ".home__latest_news header",
        ".home__featured_in h2"
      ], 
      { opacity: 0, top: "25px" }, 
      { opacity: 1, top: "0px" }, 
      [
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        }
      ]
    );

    animateElement(
      [
        ".home__limitles_app_container ul", 
        ".home__latest_news ul",
        ".home__featured_companies"
      ], 
      { opacity: 0, top: "75px" }, 
      { opacity: 1, top: "0px" }, 
      [
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        }
      ]
    );

    animateElement(".home_tech_partner_img", 
      { scale: 1.5 }, 
      { scale: 1.2 }, 
      { start: "30% 100%", end: "30% 0%", 
        // markers: true 
      }
    );
  }, [])

  const locale = useLocale();

  return (
    <div id={`home`}>
      {/* ---------- S1 - HERO ---------- */}
      <section className={`home__hero`}>
        {/* <HeroImageSlider secOneData={secOneData} /> */}
        <FadeSlider 
          secOneData={secOneData} 
          homeGlobalAssets={homeGlobalAssets}
        />
      </section>


      {/* ---------- S2 - BRANDS ---------- */}
      <section className={`home__brand_collab`}>
        {/* <BrandImageSlider secTwoData={secTwoData} /> */}
        <CenterModeSlider 
          secTwoData={secTwoData} 
          homeGlobalAssets={homeGlobalAssets}
        />
      </section>


      {/* ---------- S3 - We are not your typical... ---------- */}
      <section className={`home__tech_solutions`}>
        <div className={`home__tech_solutions_container`}>
          <header>
            <h2>{sectionThreeData.headingBody[0].heading}</h2>
            <MarkdownComponent>
              <p>{sectionThreeData.headingBody[0].body}</p>
            </MarkdownComponent>
          </header>
          <div className={`home_tech_list`}>
            <Accordion 
              items={sectionThreeData.subheadingBody} 
              homeGlobalAssets={homeGlobalAssets}
            />
          </div>          
        </div>
      </section>


      {/* ---------- S4 - Limitless Applications... ---------- */}
      <section className={`home__limitles_app`}>
        <div className={`home__limitles_app_container`}>
          <header>
            <h2>{sectionFourData.headings[0].heading}</h2>
          </header>
          <ul>
            {sectionFourData.images.map((item, index) => {
              return (
                <li key={`limitless` + index}>
                  <Image 
                    src={item.image.url} 
                    alt={item.subheading || "Image"} 
                    width={300}
                    height={190}
                  />
                  <h4>{item.subheading}</h4>
                  <MarkdownComponent>
                    <p>{item.body}</p>
                  </MarkdownComponent>
                </li>
              );
            })}             
          </ul>          
        </div>
      </section>


      {/* ---------- S5 - Looking for a technology ... ---------- */}
      <section className={`home__tech_partner`}>
        <Image 
          className={`home_tech_partner_img`}
          src={techPartner} 
          alt="Looking for a technology partner to bring innovation to your project?"
          // width={300}
          // height={225}
          // fill={true}
        />
        <div>
          <h2>{secFiveData[0].heading}</h2>
            <Link href={
              locale === "en"
                ? `${locale}/contact`
                : `${locale}/contatti`
            }>
              {secFiveData[0].button}
            </Link>
        </div>
      </section>


      {/* ---------- S6 - Latest news ---------- */}
      <section className={`home__latest_news`}>
        <header>
          <h2>{sectionSixData.headings[0].heading}</h2>
          <MarkdownComponent>
            {sectionSixData.headings[0].subheading}
          </MarkdownComponent>
        </header>
        <ul>
          {sectionSixData.images.map((img, index) => (
            <li key={`latest-news` + index}>
              <Link href={img.link}>
                <Image 
                  src={img.image.url} 
                  alt={img.body} 
                  width={300}
                  height={225}
                  fill={false}
                />
              </Link>
              <MarkdownComponent>
                <p>{img.body}</p>
                <p>{img.date}</p>
              </MarkdownComponent>
            </li>
          ))}
        </ul>
      </section>


      {/* ---------- S6 - As Featured In ---------- */}
      <section className={`home__featured_in`}>
        <div className={`home__featured_container`}>
          <h2>{sectionSevenData[0].heading}</h2>

          <div className={`home__featured_companies`}>
            {sectionSevenData[0].images.map((img, index) => (
              <Link href={img.customData.link} key={`featured` + index}>
                <Image 
                  src={img.url} 
                  alt={img.alt} 
                  width={150}
                  height={150}
                  fill={false}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeComponent;