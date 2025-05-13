"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import { usePathname } from 'next/navigation';
import ExpoxFormModal from '@/components/Modals/ExpoX/ExpoxFormModal';
import ItExpoxFormModal from '@/components/Modals/ExpoX/ItExpoxFormModal';
import Accordion from './Accordian/Accordion';
import { IGlobalAssetsProps } from '@/types/pageContent.types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { GsapAnimateElement } from '@/utils/GsapAnimateElement';
import './expox-view.scss';
// import CustomPaging from './ReactSlick/CustomPaging/CustomPaging';
// import MultipleItemsSlider from './ReactSlick/MultipleItemsSlider/MultipleItemsSlider';
// import { VideoPlayer } from 'react-datocms';

export interface IExpoxProps {
  globalAsset: {
    images: {
      alt: string;
      url: string;
    }[];
  }
  closeIcons: IGlobalAssetsProps[];
  narrowArrows: IGlobalAssetsProps[];

  expoxS1HeadingBodyButtonsGallery: {
    heading: string;
    body: string;
    button1: string;
    button2: string;
    gallery: {
      alt: string;
      url: string;
    }[];
  };
  expoxS2HeadingBody: {
    heading: string;
    body: string;
  };
  expoxS3Heading: {
    heading: string;
  };
  expoxS3SubheadingBodyImage: {
    subheading: string;
    body: string;
    image: {
      alt: string;
      url: string;
    }
  }[];
  expoxS4Image: {
    image: {
      alt: string;
      url: string;
    }
  }
  expoxS4Heading: {
    heading: string;
  };
  expoxS4SubheadingBodyGallery: {
    subheading: string;
    body: string;
    gallery: {
      alt: string;
      url: string;
    }[];
  }[];
  expoxS5HeadingImage: {
    heading: string;
    image: {
      alt: string;
      url: string;
    };
  };
  expoxS5SubheadingBody: {
    subheading: string;
    body: string;
  }[];
  expoxS6Heading: {
    heading: string;
  };
  expoxS6SubheadingBodyImage: {
    subheading: string;
    body: string;
    image: {
      alt: string;
      url: string;
    };
  }[];
  expoxS7HeadingSubheadingButtonImage: {
    heading: string;
    body: string;
    body2: string;
    button: string;
    button2: string;
    image: {
      alt: string;
      url: string;
    };
  };
}

const ExpoxView = (
  { 
    globalAsset,
    closeIcons,
    // narrowArrows,
    expoxS1HeadingBodyButtonsGallery,
    expoxS2HeadingBody,
    expoxS3Heading,
    expoxS3SubheadingBodyImage,
    expoxS4Image,
    expoxS4Heading,
    expoxS4SubheadingBodyGallery,
    expoxS5HeadingImage,
    expoxS5SubheadingBody,
    expoxS6Heading,
    expoxS6SubheadingBodyImage,
    expoxS7HeadingSubheadingButtonImage
  }: IExpoxProps
) => {
  useEffect(() => {
    const tl = gsap.timeline();
  
    tl.fromTo(
      ".expox__section1 .heading", 
      { opacity: 0, top: "75px" },
      { 
        delay: 0,
        opacity: 1, 
        top: "0px", 
        ease: "power1.out", 
        duration: 1,
      })
      .fromTo(
        ".expox__section1 .body", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.8")
      .fromTo(
        ".expox__section1 .button", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.6")
      .fromTo(
        ".expox__section1 .hero_gif", 
        { opacity: 0},
        { 
          opacity: 1, 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.6")
      .fromTo(
        ".expox__section2 .heading", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.6")
      .fromTo(
        ".expox__section2 .body", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.8");
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // S2 - ExpoX unites space, flow, people, and data into one seamless experience
    GsapAnimateElement(
      ".expox__section2 .image__container",
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0 },
      [
        { start: "top 80%", end: "top 80%", 
          // markers: true 
        },
        { start: "top 70%", end: "top 70%", 
          // markers: true 
        },
        { start: "top 60%", end: "top 60%", 
          // markers: true 
        },
      ]
    );

    // S3 - The Toolkit
    GsapAnimateElement(
      [
        ".expox__section3 .heading",
        ".expox__section3 .img_subheading_body"
      ],
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0 },
      [
        { start: "0% 70%", end: "0% 70%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 75%", end: "0% 75%", 
          // markers: true 
        },
        { start: "0% 70%", end: "0% 70%", 
          // markers: true 
        },
      ]
    );

    // S4 - Designed for every stakeholder
    GsapAnimateElement(
      [
        ".expox__section4_2 .heading",
        ".expox__section4_2 .copy"
      ],
      { opacity: 0 },
      { opacity: 1 },
      [
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 75%", end: "0% 75%", 
          // markers: true 
        },
        { start: "0% 70%", end: "0% 70%", 
          // markers: true 
        },
      ]
    );

    // S5 - Visitor Mobile App
    GsapAnimateElement(
      [
        ".expox__section5 .iphone",
        ".expox__section5 .heading",
        ".expox__section5 .body",
        ".expox__section5 .subheading_body"
      ],
      { opacity: 0 },
      { opacity: 1 },
      [
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 70%", end: "0% 70%", 
          // markers: true 
        },
        { start: "0% 70%", end: "0% 70%", 
          // markers: true 
        },
        { start: "0% 70%", end: "0% 70%", 
          // markers: true 
        },
      ]
    );

    // S6 - Optimize your processes
    GsapAnimateElement(
      [
        ".expox__section6 .heading",
        ".expox__section6 .img_subheading_body",
      ],
      { opacity: 0 },
      { opacity: 1 },
      [
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 75%", end: "0% 75%", 
          // markers: true 
        },
        { start: "0% 70%", end: "0% 70%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 75%", end: "0% 75%", 
          // markers: true 
        },
        { start: "0% 70%", end: "0% 70%", 
          // markers: true 
        },
      ]
    );

    // S8 - Hardware
    GsapAnimateElement(
      [
        ".expox__section8 h2",
        ".expox__section8 .heading_body p",
        ".expox__section8 .image__container img"
      ],
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0 },
      [
        { start: "0% 100%", end: "0% 100%", 
          // markers: true 
        },
        { start: "0% 90%", end: "0% 90%", 
          // markers: true 
        },
        { start: "0% 85%", end: "0% 85%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 75%", end: "0% 75%", 
          // markers: true 
        },
      ]
    );

    // S9 - The benefits don't end there.
    GsapAnimateElement(
      [
        ".expox__section9 .copy p:first-of-type",
        ".expox__section9 .copy h2",
        ".expox__section9 .copy p:last-of-type",
      ],
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0 },
      [
        { start: "0% 95%", end: "0% 95%", 
          // markers: true 
        },
        { start: "0% 90%", end: "0% 90%", 
          // markers: true 
        },
        { start: "0% 85%", end: "0% 85%", 
          // markers: true 
        }
      ]
    );

    // S10 -  Museums and cultural institutions
    GsapAnimateElement(
      [
        ".expox__section10 .heading",
        ".expox__section10 .images"
      ],
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0 },
      [
        { start: "0% 95%", end: "0% 95%", 
          // markers: true 
        },
        { start: "0% 90%", end: "0% 90%", 
          // markers: true 
        }
      ]
    );

    // S11 - Industry members of
    GsapAnimateElement(
      [
        ".expox__section11 .heading",
        ".expox__section11 .images"
      ],
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0 },
      [
        { start: "0% 95%", end: "0% 95%", 
          // markers: true 
        },
        { start: "0% 90%", end: "0% 90%", 
          // markers: true 
        }
      ]
    );
  }, [])


  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll"); // Cleanup when component unmounts
    };
  }, [isModalOpen]);

  const pathname = usePathname();

  return (
    <div id={`expox__id`}>

      {/* ---------- S1 - One Platform to Power Your Entire Event Experience ---------- */}
      <section className={`expox__section1`}>
        <div className={`overlay`}></div>
        <Image 
          className={`hero`}
          src={expoxS1HeadingBodyButtonsGallery.gallery[0].url} 
          alt={expoxS1HeadingBodyButtonsGallery.gallery[0].alt} 
          fill
          priority
        />

        <div className={`copy_gif__container`}>
          <div className={`copy`}>
            <div className={`heading`}>
              {parse(expoxS1HeadingBodyButtonsGallery.heading)}
            </div>
            <div className={`body`}>
              {parse(expoxS1HeadingBodyButtonsGallery.body)}
            </div>

            <div className={`buttons`}>
              {/* Request a demo */}
              <button 
                className={`button`}
                onClick={() => setIsModalOpen(true)}
              >
                {parse(expoxS1HeadingBodyButtonsGallery.button1)}
              </button>
              
              {/* Download a brochure */}
              {/* <div className={`button`}>
                {parse(expoxS1HeadingBodyButtonsGallery.button2)}
              </div> */}
            </div>
          </div>

          <Image 
            className={`hero_gif`}
            src={expoxS1HeadingBodyButtonsGallery.gallery[1].url} 
            alt={expoxS1HeadingBodyButtonsGallery.gallery[1].alt} 
            width={400}
            height={400}
            priority
          />
        </div>

        {
          pathname.substring(1, 3) === 'en' 
          ? isModalOpen && <ExpoxFormModal 
              onClose={() => setIsModalOpen(false)} 
              closeIcons={ closeIcons }
            />
          : isModalOpen && <ItExpoxFormModal 
              onClose={() => setIsModalOpen(false)} 
              closeIcons={ closeIcons }
            />
        }
      </section>


      {/* ---------- S2 - ExpoX unites space, flow, people, and data into one seamless experience. ---------- */}
      <section className={`expox__section2`}>
        <div className={`copy`}>
          <div className={`heading`}>
            {parse(expoxS2HeadingBody.heading)}
          </div>
          <div className={`body`}>
            {parse(expoxS2HeadingBody.body)}
          </div>
        </div>
      </section>


      {/* ---------- S3 - The toolkit ---------- */}
      <section className={`expox__section3`}>
        <div className={`heading`}>
          {parse(expoxS3Heading.heading)}
        </div>
        <div className={`image_subheading_body`}>
          {expoxS3SubheadingBodyImage.map((content, index) => {
            return (
              <div className={`img_subheading_body`} key={`mit-s6-img-` + index}>
                <div className={`image__container`}>
                  <Image 
                    src={content.image.url} 
                    alt={content.image.alt} 
                    width={400}
                    height={300}
                    quality={75}
                  />
                </div>
                {parse(content.subheading)}
                {parse(content.body)}
              </div>
            )
          })}
        </div>
      </section>


      {/* ---------- S4 - IMAGE ---------- */}
      <section className={`expox__section4`}>
        <div className={`bkgd`}></div>
        <div className={`image__container`}>
          <Image 
            className={`bkgd_outdoor_img`}
            src={expoxS4Image.image.url} 
            alt={expoxS4Image.image.alt} 
            fill
            quality={100}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </section>

      {/* ---------- S4 - Designed for every stakeholder ---------- */}
      <section className={`expox__section4_2`}>
        <div className={`heading`}>
          {parse(expoxS4Heading.heading)}
        </div>

        <div className={`subheading_body_gallery`}>
          {expoxS4SubheadingBodyGallery.map((content, index) => {

            return (
              <div className={`copy_gallery`} key={`expox-s4-content` + index}>
                <div className={`copy`}>
                  {parse(content.subheading)}
                  {parse(content.body)}                  
                </div>

                <div className={`gallery`}>
                  <Image 
                    src={content.gallery[0].url} 
                    alt={content.gallery[0].alt} 
                    width={400}
                    height={275}
                    quality={75}
                  />
                  {/* <CustomPaging 
                    narrowArrows={narrowArrows}
                    gallery={content.gallery}
                  />        */}
                </div>
              </div>
            )
          })}
        </div>
      </section>


      {/* ---------- S5 - Why choose ExpoX? ---------- */}
      <section className={`expox__section5`}>
        <div className={`image_accordian__container`}>
          <div className={`image__container`}>
            <Image 
              className={`imac`}
              src={expoxS5HeadingImage.image.url} 
              alt={expoxS5HeadingImage.image.alt} 
              width={500}
              height={500}

              // priority
            />
          </div>
          <div className={`heading_subheading_body`}>
            <div className={`heading`}>
              {parse(expoxS5HeadingImage.heading)}
            </div>
            <div className={`subheading_body`}>
              {
              // mitS3SubheadingBody.map((item, index) => {
              //   return (
              //     <div className={`accordian-item`} key={`mit-s3-copy-` + index}>
              //       {parse(item.subheading)}
              //       {parse(item.body)}
              //     </div>
              //   )
              // })
              }
              <Accordion 
                items={expoxS5SubheadingBody} 
                globalAsset={globalAsset.images}
              />
            </div>
          </div>          
        </div>
      </section>


      {/* ---------- S6 - Experience-first features ---------- */}
      <section className={`expox__section6`}>
        <div className={`heading`}>
          {parse(expoxS6Heading.heading)}
        </div>
        <div className={`image_subheading_body`}>
          {expoxS6SubheadingBodyImage.map((item, index) => {
            return (
              <div className={`img_subheading_body`} key={`expox-s6-img-` + index}>
                <div className={`image__container`}>
                  <Image 
                    src={item.image.url} 
                    alt={item.image.alt} 
                    width={75}
                    height={75}
                    quality={100}
                    // priority
                  />
                </div>
                <div className={`subheading`}>
                  {parse(item.subheading)}
                </div>
                <div className={`body`}>
                  {parse(item.body)}
                </div>
              </div>
            )
          })}
        </div>
      </section>


      {/* ---------- S7 - There's a lot more to ExpoX. ---------- */}
      <section className={`expox__section7`}>
        <div className={`image__container`}>
          <Image 
            src={expoxS7HeadingSubheadingButtonImage.image.url} 
            alt={expoxS7HeadingSubheadingButtonImage.image.alt} 
            // quality={100}
            fill
          />
        </div>
        <div className={`copy`}>
          <h2>{parse(expoxS7HeadingSubheadingButtonImage.heading)}</h2>
          
          <div className={`body_button__container`}>
            {/* Download a brochure */}
            {/* <div className={`body_button`}>
              <p>{parse(expoxS7HeadingSubheadingButtonImage.body)}</p>
              <button className={`button`}>
                <a href="https://docsend.com/view/9gyitzzzy4dz9kva">
                  {parse(expoxS7HeadingSubheadingButtonImage.button)}
                </a>
              </button>
            </div> */}

            {/* Request a demo */}
            <div className={`body_button`}>
              <p>{parse(expoxS7HeadingSubheadingButtonImage.body2)}</p>
              <button 
                className={`button`}
                onClick={() => setIsModalOpen(true)}
              >
                {parse(expoxS7HeadingSubheadingButtonImage.button2)}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ExpoxView;