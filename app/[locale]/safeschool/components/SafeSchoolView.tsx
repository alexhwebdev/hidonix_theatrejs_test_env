"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import { usePathname } from 'next/navigation';
import ExpoxFormModal from '@/components/Modals/ExpoX/ExpoxFormModal';
import ItExpoxFormModal from '@/components/Modals/ExpoX/ItExpoxFormModal';
import { IGlobalAssetsProps } from '@/types/pageContent.types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { GsapAnimateElement } from '@/utils/GsapAnimateElement';
import MultipleItemsSlider from './ReactSlick/MultipleItemsSlider/MultipleItemsSlider';
import './safeschool-view.scss';
// import CustomPaging from './ReactSlick/CustomPaging/CustomPaging';
// import MultipleItemsSlider from './ReactSlick/MultipleItemsSlider/MultipleItemsSlider';
// import { VideoPlayer } from 'react-datocms';
// 
export interface ISafeSchoolProps {
  globalAsset: {
    images: {
      alt: string;
      url: string;
    }[];
  }
  closeIcons: IGlobalAssetsProps[];
  narrowArrows: IGlobalAssetsProps[];

  safeschoolS1HeadingBodyButtonsGallery: {
    heading: string;
    body: string;
    button1: string;
    button2: string;
    gallery: {
      alt: string;
      url: string;
    }[];
  }
  safeschoolS2HeadingBody: {
    heading: string;
    body: string;
  }
  safeschoolS3ImageHeading: {
    heading: string;
    image: {
      alt: string;
      url: string;
    }
  }
  safeschoolS3ImageHeadingBody: {
    image: {
      alt: string;
      url: string;
    }
    heading: string;
    body: string;
  }[];
  safeschoolS4ImageHeading: {
    image: {
      alt: string;
      url: string;
    }
    heading: string;
  }
  safeschoolS4ImageHeadingBody: {
    image: {
      alt: string;
      url: string;
    }
    heading: string;
    body: string;
  }[];
  safeschoolS5GalleryHeadingBody: {
    images: {
      alt: string;
      url: string;
    }[];
    heading: string;
    body: string;
  }
  safeschoolS5ImageHeading: {
    image: {
      alt: string;
      url: string;
    }
    heading: string;
  }[];
  safeschoolS6Image: {
    image: {
      alt: string;
      url: string;
    }
  }
  safeschoolS7HeadingSubheadingButtonImage: {
    heading: string;
    body: string;
    button: string;
    body2: string;
    button2: string;
    image: {
      alt: string;
      url: string;
    }
  }
}

const SafeSchoolView = (
  { 
    globalAsset,
    closeIcons,
    // narrowArrows,
    safeschoolS1HeadingBodyButtonsGallery,
    safeschoolS2HeadingBody,
    safeschoolS3ImageHeading,
    safeschoolS3ImageHeadingBody,
    safeschoolS4ImageHeading,
    safeschoolS4ImageHeadingBody,
    safeschoolS5GalleryHeadingBody,
    safeschoolS5ImageHeading,
    safeschoolS6Image,
    safeschoolS7HeadingSubheadingButtonImage
  }: ISafeSchoolProps
) => {
  // console.log("globalAsset", globalAsset);
  // console.log("safeschoolS5GalleryHeadingBody", safeschoolS5GalleryHeadingBody);


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
    <div id={`safeschool__id`}>

      {/* ---------- S1 - The Smartest Way to Keep Schools Safe. ---------- */}
      <section className={`safeschool__section1`}>
        <div className={`overlay`}></div>
        <Image 
          className={`hero`}
          src={safeschoolS1HeadingBodyButtonsGallery.gallery[0].url} 
          alt={safeschoolS1HeadingBodyButtonsGallery.gallery[0].alt} 
          fill
          priority
        />

        <div className={`copy_gif__container`}>
          <div className={`copy`}>
            <div className={`heading`}>
              {parse(safeschoolS1HeadingBodyButtonsGallery.heading)}
            </div>
            <div className={`body`}>
              {parse(safeschoolS1HeadingBodyButtonsGallery.body)}
            </div>

            <div className={`buttons`}>
              {/* Request a demo */}
              {/* <button 
                className={`button`}
                onClick={() => setIsModalOpen(true)}
              >
                {parse(safeschoolS1HeadingBodyButtonsGallery.button1)}
              </button> */}
              <button className={`button`}>
                {/* <a href="https://hidonix.com/en/contact">
                  {parse(safeschoolS1HeadingBodyButtonsGallery.button1)}
                </a> */}

                {
                  pathname.substring(1, 3) === 'en' 
                  ? <a href="https://hidonix.com/en/contact">
                      {parse(safeschoolS1HeadingBodyButtonsGallery.button1)}
                    </a>
                  : <a href="https://hidonix.com/it/contact">
                      {parse(safeschoolS1HeadingBodyButtonsGallery.button1)}
                    </a>
                }
              </button>

              {/* Download a brochure */}
              {/* <div className={`button`}>
                {parse(safeschoolS1HeadingBodyButtonsGallery.button2)}
              </div> */}
            </div>
          </div>

          <Image 
            className={`hero__graphic`}
            src={safeschoolS1HeadingBodyButtonsGallery.gallery[1].url} 
            alt={safeschoolS1HeadingBodyButtonsGallery.gallery[1].alt} 
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

      {/* ---------- S2 - When every second matters, SafeSchool... ---------- */}
      <section className={`safeschool__section2`}>
        <div className={`copy`}>
          <div className={`heading`}>
            {parse(safeschoolS2HeadingBody.heading)}
          </div>
          <div className={`body`}>
            {parse(safeschoolS2HeadingBody.body)}
          </div>
        </div>
      </section>

      {/* ---------- S3 - Prevention starts with visibility: cloud-based CMS ---------- */}
      <section className={`safeschool__section3`}>
        <div className={`bkgd`}></div>

        {/* <div className={`image__container`}> */}
          <Image 
            className={`s3__graphic`}
            src={safeschoolS3ImageHeading.image.url} 
            alt={safeschoolS3ImageHeading.image.alt} 
            fill
            quality={100}
            // style={{ cursor: 'pointer' }}
          />
        {/* </div> */}
        <div className={`heading`}>
          {parse(safeschoolS3ImageHeading.heading)}
        </div>

        <div className={`cards__container`}>
          {
          safeschoolS3ImageHeadingBody.map((card, index) => {
            return (
              <div key={`safeschoolS3ImageHeadingBody-${index}`} className={`card`}>
                <Image 
                  // className={`bkgd_outdoor_img`}
                  src={safeschoolS3ImageHeadingBody[index].image.url} 
                  alt={safeschoolS3ImageHeadingBody[index].image.alt} 
                  width={100}
                  height={100}
                  quality={100}
                  // style={{ cursor: 'pointer' }}
                />

                {parse(card.heading)}

                {parse(card.body)}
              </div>
            )
          })
          }
        </div>
      </section>


      {/* ---------- S4 - Your Smart Control Room ---------- */}
      <section className={`safeschool__section4`}>
        {/* <div className={`image__container`}> */}
          <Image 
            className={`s4__graphic`}
            src={safeschoolS4ImageHeading.image.url} 
            alt={safeschoolS4ImageHeading.image.alt} 
            fill
            quality={100}
            // style={{ cursor: 'pointer' }}
          />
        {/* </div> */}
        <div className={`heading`}>
          {parse(safeschoolS4ImageHeading.heading)}
        </div>

        <div className={`cards__container`}>
          {
          safeschoolS4ImageHeadingBody.map((card, index) => {
            return (
              <div key={`safeschoolS4ImageHeadingBody-${index}`} className={`card`}>
                <Image 
                  // className={`bkgd_outdoor_img`}
                  src={safeschoolS4ImageHeadingBody[index].image.url} 
                  alt={safeschoolS4ImageHeadingBody[index].image.alt} 
                  width={100}
                  height={100}
                  quality={100}
                  // style={{ cursor: 'pointer' }}
                />

                {parse(card.heading)}

                {parse(card.body)}
              </div>
            )
          })
          }
        </div>

        <div className={`bkgd`}></div>
      </section>

      {/* ---------- S5 - An App your students will want to download ---------- */}
      <section className={`safeschool__section5`}>
        {/* <div className={`image__container`}> */}
          <Image 
            className={`s5__graphic`}
            src={safeschoolS5GalleryHeadingBody.images[0].url} 
            alt={safeschoolS5GalleryHeadingBody.images[0].alt} 
            fill
            quality={100}
            // style={{ cursor: 'pointer' }}
          />
        {/* </div> */}
        <div className={`heading`}>
          {parse(safeschoolS5GalleryHeadingBody.heading)}
        </div>
        <div className={`body`}>
          {parse(safeschoolS5GalleryHeadingBody.body)}
        </div>

        <div className={`cards__container`}>
          <div className={`heading_subheading_body`}>
            <MultipleItemsSlider 
              safeschoolS5ImageHeading={safeschoolS5ImageHeading} 
              globalAsset={globalAsset.images}
            />
          </div>
        </div>
      </section>

      {/* ---------- S6 - SafeSchool App ---------- */}
      <section className={`safeschool__section6`}>
        <Image 
          src={safeschoolS6Image.image.url} 
          alt={safeschoolS6Image.image.alt} 
          // quality={100}
          fill
          // objectFit='contain'
        />
      </section>


      {/* ---------- S7 - Safety doesn't have to be optional ---------- */}
      <section className={`safeschool__section7`}>
        <div className={`overlay`}></div>

        <div className={`image__container`}>
          <Image 
            src={safeschoolS7HeadingSubheadingButtonImage.image.url} 
            alt={safeschoolS7HeadingSubheadingButtonImage.image.alt} 
            // quality={100}
            fill
          />
        </div>
        <div className={`copy`}>
          <h2>{parse(safeschoolS7HeadingSubheadingButtonImage.heading)}</h2>
          
          <div className={`body_button__container`}>
            {/* Request a demo */}
            <div className={`body_button`}>
              <p>{parse(safeschoolS7HeadingSubheadingButtonImage.body)}</p>
              <button className={`button`}>
                {/* <a href="https://docsend.com/view/9gyitzzzy4dz9kva">
                  {parse(safeschoolS7HeadingSubheadingButtonImage.button)}
                </a> */}

                {/* Contact page for now */}
                {/* <a href="https://hidonix.com/en/contact">
                  {parse(safeschoolS7HeadingSubheadingButtonImage.button)}
                </a>
                 */}
                {
                  pathname.substring(1, 3) === 'en' 
                  ? <a href="https://hidonix.com/en/contact">
                      {parse(safeschoolS7HeadingSubheadingButtonImage.button)}
                    </a>
                  : <a href="https://hidonix.com/it/contact">
                      {parse(safeschoolS7HeadingSubheadingButtonImage.button)}
                    </a>
                }

              </button>
            </div>

            {/* Download a brochure */}
            {/* <div className={`body_button`}>
              <p>{parse(safeschoolS7HeadingSubheadingButtonImage.body2)}</p>
              <button 
                className={`button`}
                onClick={() => setIsModalOpen(true)}
              >
                {parse(safeschoolS7HeadingSubheadingButtonImage.button2)}
              </button>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SafeSchoolView;