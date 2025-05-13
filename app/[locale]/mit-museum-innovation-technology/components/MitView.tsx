"use client";
import React, { MouseEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import { usePathname } from 'next/navigation';
import Accordion from './Accordian/Accordion';
import MultipleItemsSlider from './ReactSlick/MultipleItemsSlider/MultipleItemsSlider';
import MitFormModal from '@/components/Modals/Mit/MitFormModal';
import ItMitFormModal from '@/components/Modals/Mit/ItMitFormModal';
import { IGlobalAssetsProps } from '@/types/pageContent.types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { GsapAnimateElement } from '@/utils/GsapAnimateElement';
import { VideoPlayer } from 'react-datocms';
import './mit-view.scss';

export interface IMitProps {
  globalAsset: {
    images: {
      alt: string;
      url: string;
    }[];
  }
  closeIcons: IGlobalAssetsProps[];
  mitS1HeadingBodyButtonsGallery: {
    heading: string;
    body: string;
    button1: string;
    button2: string;
    gallery: {
      alt: string;
      url: string;

      video: {
        muxPlaybackId: string;
        title: string;
        width: string;
        height: string;
        blurUpThumb: string;
      };
    }[];
  }
  mitS2HeadingBody: {
    heading: string;
    body: string;
  }
  mitS2Gallery: {
    gallery: {
      alt: string;
      url: string;
    }[];
  }
  mitS3HeadingImage: {
    heading: string;
    image: {
      alt: string;
      url: string;
    }
  }
  mitS3SubheadingBody: {
    subheading: string;
    body: string;
  }[];
  mitS4HeadingImage: {
    heading: string;
    image: {
      alt: string;
      url: string;
    }
  }
  mitS4SubheadingBody: {
    subheading: string;
    body: string;
  }[];
  mitS5HeadingBodyImage: {
    heading: string;
    body: string;
    image: {
      alt: string;
      url: string;
    };
  }
  mitS5SubheadingBody: {
    subheading: string;
    body: string;
  }[];
  mitS6Heading: {
    heading: string;
  }
  mitS6SubheadingBodyImage:{
    image: {
      alt: string;
      url: string;
    }
    subheading: string;
    body: string;
  }[];
  mitS7Image: {
    image: {
      alt: string;
      url: string;
    }
  }[];
  mitS7Icon: {
    image: {
      alt: string;
      url: string;
    }
  }
  mitS7Start: {
    image: {
      alt: string;
      url: string;
    }
  }
  mitS7BodyGallery: {
    blockTitle: string;
    body: string;
    gallery: {
      alt: string;
      url: string;
      customData: {
        id: string;
      };
    }[];
  }[];
  mitS8HeadingBodyImages: {
    heading: string;
    body: string;
    images: {
      alt: string;
      url: string;
    }[];
  }
  mitS9HeadingSubheadingButtonImage: {
    image: {
      alt: string;
      url: string;
    }
    subheading: string;
    heading: string;
    button: string;
  }
  mitS10HeadingGallery: {
    heading: string;
    gallery: {
      alt: string;
      url: string;
    }[];
  }
  mitS11HeadingGallery: {
    heading: string;
    gallery: {
      alt: string;
      url: string;
    }[];
  }
}

interface IIndoorOutdoorNavProps {
  blockTitle: string;
  body: string;
  gallery: {
    alt: string;
    url: string;
  }[];
}

const MitView = (
  { 
    globalAsset,
    closeIcons,
    mitS1HeadingBodyButtonsGallery,
    mitS2HeadingBody,
    mitS2Gallery,
    mitS3HeadingImage,
    mitS3SubheadingBody,
    mitS4HeadingImage,
    mitS4SubheadingBody,
    mitS5HeadingBodyImage,
    mitS5SubheadingBody,
    mitS6Heading,
    mitS6SubheadingBodyImage,
    mitS7Image,
    mitS7Icon,
    mitS7Start,
    mitS7BodyGallery,
    mitS8HeadingBodyImages,
    mitS9HeadingSubheadingButtonImage,
    mitS10HeadingGallery,
    mitS11HeadingGallery
  }: IMitProps
) => {
  useEffect(() => {
    const tl = gsap.timeline();
  
    tl.fromTo(
      ".mit__section1 .heading", 
      { opacity: 0, top: "75px" },
      { 
        delay: 0,
        opacity: 1, 
        top: "0px", 
        ease: "power1.out", 
        duration: 1,
      })
      .fromTo(
        ".mit__section1 .body", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.8")
      .fromTo(
        ".mit__section1 .button", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.6")
      .fromTo(
        ".mit__section2 .heading", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.6")
      .fromTo(
        ".mit__section2 .body", 
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

    // S2 - One software to replace them all.
    GsapAnimateElement(
      ".mit__section2 .image__container",
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

    // S3 - Content Management System
    GsapAnimateElement(
      [
        ".mit__section3 .imac",
        ".mit__section3 .heading",
        ".mit__section3 .subheading_body"
      ],
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0 },
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
      ]
    );

    // S4 - Advantages for your museum
    GsapAnimateElement(
      [
        ".mit__section4 .heading",
        ".mit__section4 .advantages_slider"
      ],
      { opacity: 0 },
      { opacity: 1 },
      [
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 90%", end: "0% 90%", 
          // markers: true 
        }
      ]
    );

    // S5 - Visitor Mobile App
    GsapAnimateElement(
      [
        ".mit__section5 .iphone",
        ".mit__section5 .heading",
        ".mit__section5 .body",
        ".mit__section5 .subheading_body"
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
        ".mit__section6 .heading",
        ".mit__section6 .img_subheading_body",
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
        ".mit__section8 h2",
        ".mit__section8 .heading_body p",
        ".mit__section8 .image__container img"
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
        ".mit__section9 .copy p:first-of-type",
        ".mit__section9 .copy h2",
        ".mit__section9 .copy p:last-of-type",
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
        ".mit__section10 .heading",
        ".mit__section10 .images"
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
        ".mit__section11 .heading",
        ".mit__section11 .images"
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

  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [visibleStates, setVisibleStates] = useState<Record<string, boolean>>({
    collection: false,
    ecommerce: false,
    visitorsFlow: false,
    analytics: false,
    inclusive: false,
    augmented: false,
    brand: false,
    indoor: false,
  });

  const handleGalleryClick = (event: MouseEvent<HTMLDivElement>, key: string, index: number) => {
    event.stopPropagation();
    setVisibleStates(prev => {
      const updated = Object.keys(prev).reduce((acc, curr) => {
        acc[curr] = curr === key ? !prev[key] : false;
        return acc;
      }, {} as Record<string, boolean>);
      return updated;
    });
    setActiveGalleryIndex(index);
  };

  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setVisibleStates(prev =>
      Object.fromEntries(Object.keys(prev).map(key => [key, false]))
    );
  };

  const indoorOutdoorNav: IIndoorOutdoorNavProps[] = [];
  mitS7BodyGallery.map((imageAsset) => {
    if (imageAsset.blockTitle.includes("Indoor Outdoor Navigation")) {
      indoorOutdoorNav.push(imageAsset);
    }
  });

  const galleryKeys = [
    'collection', 'ecommerce', 'visitorsFlow',
    'analytics', 'inclusive', 'augmented',
    'brand', 'indoor'
  ];

  return (
    <div id={`mit__id`}>

      {/* ---------- S1 - MIT - Museum Innovation Technology ---------- */}
      <section className={`mit__section1`}>
        <div className={`overlay`}></div>
        {/* <Image 
          className={`hero`}
          src={mitS1HeadingBodyButtonsGallery.gallery[0].url} 
          alt={mitS1HeadingBodyButtonsGallery.gallery[0].alt} 
          fill
          priority
        /> */}

        <div className={`hero`}>
          <VideoPlayer 
            // data={mitS1HeadingBodyButtonsGallery.gallery[1].video} 
            data={{ 
              muxPlaybackId: mitS1HeadingBodyButtonsGallery.gallery[1].video.muxPlaybackId,
              thumbnailUrl: mitS1HeadingBodyButtonsGallery.gallery[1].video.blurUpThumb
            }}
            // style={{ aspectRatio: '1 / 1' }}
            style={{
              // width: '100%',
              // height: '100%',
              objectFit: 'cover', // important!
            }}
            autoPlay
            muted
            loop={true}
            disableCookies={false}
          />
        </div>

        <div className={`copy_gif__container`}>
          <div className={`copy`}>
            <div className={`heading`}>
              {parse(mitS1HeadingBodyButtonsGallery.heading)}
            </div>
            <div className={`body`}>
              {parse(mitS1HeadingBodyButtonsGallery.body)}
            </div>

            <div className={`buttons`}>
              {/* <div className={`button`}>
                {parse(mitS1HeadingBodyButtonsGallery.button1)}
              </div> */}
              <button 
                className={`button`}
                onClick={() => setIsModalOpen(true)}
              >
                {parse(mitS1HeadingBodyButtonsGallery.button1)}
              </button>

              <div className={`button`}>
                {parse(mitS1HeadingBodyButtonsGallery.button2)}
              </div>               
            </div>
          </div>

          <Image 
            className={`hero_gif`}
            src={mitS1HeadingBodyButtonsGallery.gallery[0].url} 
            alt={mitS1HeadingBodyButtonsGallery.gallery[0].alt} 
            width={500}
            height={500}
            priority
          />
        </div>

        {
          pathname.substring(1, 3) === 'en' 
          ? isModalOpen && <MitFormModal 
              onClose={() => setIsModalOpen(false)} 
              closeIcons={ closeIcons }
            />
          : isModalOpen && <ItMitFormModal 
              onClose={() => setIsModalOpen(false)} 
              closeIcons={ closeIcons }
            />
        }
      </section>


      {/* ---------- S2 - One software to replace them all. ---------- */}
      <section className={`mit__section2`}>
        <div className={`copy`}>
          <div className={`heading`}>
            {parse(mitS2HeadingBody.heading)}
          </div>
          <div className={`body`}>
            {parse(mitS2HeadingBody.body)}
          </div>
        </div>
        <div className={`images`}>
          {mitS2Gallery.gallery.map((img, index) => {
            return (
              <div className={`image__container`} key={`mit-s2-img-` + index}>
                <Image 
                  key={img.url}  // Make sure to add a key for each image
                  src={img.url} 
                  alt={img.alt} 
                  width={200}
                  height={200}
                />
                <p>{img.alt}</p>
              </div>
            );
          })}
        </div>
      </section>


      {/* ---------- S3 - Content Management System ---------- */}
      <section className={`mit__section3`}>
        <div className={`image_accordian__container`}>
          <div className={`image__container`}>
            <Image 
              className={`imac`}
              src={mitS3HeadingImage.image.url} 
              alt={mitS3HeadingImage.image.alt} 
              width={500}
              height={500}

              // priority
            />
          </div>
          <div className={`heading_subheading_body`}>
            <div className={`heading`}>
              {parse(mitS3HeadingImage.heading)}
            </div>
            <div className={`subheading_body`}>
              {/* {mitS3SubheadingBody.map((item, index) => {
                return (
                  <div className={`accordian-item`} key={`mit-s3-copy-` + index}>
                    {parse(item.subheading)}
                    {parse(item.body)}
                  </div>
                )
              })} */}
              <Accordion 
                items={mitS3SubheadingBody} 
                globalAsset={globalAsset.images}
              />
            </div>
          </div>          
        </div>
      </section>


      {/* ---------- S4 - Advantages for your museum ---------- */}
      <section className={`mit__section4`}>
        <div className={`image__container`}>
          <div className={`overlay`}></div>
          <Image 
            src={mitS4HeadingImage.image.url} 
            alt={mitS4HeadingImage.image.alt} 
            width={500}
            height={500}
            // priority
            quality={100}
          />
        </div>
        <div className={`heading_subheading_body`}>
          <div className={`heading`}>
            {parse(mitS4HeadingImage.heading)}
          </div>

          <MultipleItemsSlider 
            mitS4SubheadingBody={mitS4SubheadingBody} 
            globalAsset={globalAsset.images}
          />
        </div>

      </section>


      {/* ---------- S5 - Visitor Mobile App ---------- */}
      <section className={`mit__section5`}>
        <div className={`image_accordian__container`}>
          <div className={`image__container`}>
            <Image 
              className={`iphone`}
              src={mitS5HeadingBodyImage.image.url} 
              alt={mitS5HeadingBodyImage.image.alt} 
              width={500}
              height={500}
              // priority
            />
          </div>
          <div className={`heading_subheading_body`}>
            <div className={`heading`}>
              {parse(mitS5HeadingBodyImage.heading)}
            </div>
            <div className={`body`}>
              {parse(mitS5HeadingBodyImage.body)}
            </div>
            <div className={`subheading_body`}>
              <Accordion 
                items={mitS5SubheadingBody} 
                globalAsset={globalAsset.images}
              />
            </div>
          </div>          
        </div>
      </section>


      {/* ---------- S6 - Optimize your processes ---------- */}
      <section className={`mit__section6`}>
        <div className={`heading`}>
          {parse(mitS6Heading.heading)}
        </div>
        <div className={`image_subheading_body`}>
          {mitS6SubheadingBodyImage.map((item, index) => {
            return (
              <div className={`img_subheading_body`} key={`mit-s6-img-` + index}>
                <div className={`image__container`}>
                  <Image 
                    src={item.image.url} 
                    alt={item.image.alt} 
                    width={50}
                    height={50}
                    quality={100}
                    // priority
                  />
                </div>
                {parse(item.subheading)}
                {parse(item.body)}
              </div>
            )
          })}
        </div>
      </section>


      {/* ---------- S7 - Museum plotted dots ---------- */}
      <section className="mit__section7">
        <div className="bkgd"></div>
        <div className="images__container">
          <Image
            className="bkgd_museum_img"
            src={mitS7Image[0].image.url}
            alt={mitS7Image[0].image.alt}
            fill
          />
          <div className="image__container">
            <div className="overlay" onClick={handleOutsideClick}></div>
            {mitS7BodyGallery.map((galleryItem, index) => {
              const key = galleryKeys[index];
              const iconSrc = key === 'indoor' ? mitS7Start.image.url : mitS7Icon.image.url;
              const iconAlt = key === 'indoor' ? mitS7Start.image.alt : mitS7Icon.image.alt;
              const isVisible = visibleStates[key];

              return (
                <div className="image" key={`dot-${key}`}>
                  <Image
                    className={`icon ${galleryItem.gallery[0].customData.id} ${isVisible ? 'visible' : ''}`}
                    src={iconSrc}
                    alt={iconAlt}
                    width={key === 'indoor' ? 300 : 30}
                    height={key === 'indoor' ? 300 : 30}
                    onClick={(e) => handleGalleryClick(e, key, index)}
                    style={{ cursor: 'pointer' }}
                  />
                  <Image
                    className={`label ${galleryItem.gallery[0].customData.id} ${isVisible ? 'visible' : ''}`}
                    src={galleryItem.gallery[0].url}
                    alt={galleryItem.gallery[0].alt}
                    width={600}
                    height={600}
                    quality={key === 'indoor' ? 50 : 100}
                    unoptimized={key === 'indoor'}
                  />
                </div>
              );
            })}
          </div>

          {!(activeGalleryIndex === 7 && visibleStates['indoor']) && (
            <div className={`label__message ${Object.values(visibleStates).some(Boolean) ? 'visible' : ''}`}>
              {parse(mitS7BodyGallery[activeGalleryIndex].body)}
            </div>
          )}
        </div>
      </section>


      {/* ---------- S8 - Hardware ---------- */}
      <section className={`mit__section8`}>
        <div className={`heading_body_images`}>
          <div className={`heading_body`}>
            <hr/>
            {parse(mitS8HeadingBodyImages.heading)}
            {parse(mitS8HeadingBodyImages.body)}
          </div>
          <div className={`images`}>
            {mitS8HeadingBodyImages.images.map((item, index) => {
              return (
                <div className={`image__container`} key={`mit-s8-img-` + index}>
                  <Image 
                    src={item.url} 
                    alt={item.alt} 
                    width={500}
                    height={500}
                    // priority
                  />
                  <p>{item.alt}</p>
                </div>
              )
            })}
          </div>          
        </div>
      </section>


      {/* ---------- S9 - The benefits don't end there. ---------- */}
      <section className={`mit__section9`}>
        <div className={`image__container`}>
          <Image 
            src={mitS9HeadingSubheadingButtonImage.image.url} 
            alt={mitS9HeadingSubheadingButtonImage.image.alt} 
            quality={100}
            fill
          />
        </div>
        <div className={`copy`}>
          {parse(mitS9HeadingSubheadingButtonImage.subheading)}
          {parse(mitS9HeadingSubheadingButtonImage.heading)}
          {parse(mitS9HeadingSubheadingButtonImage.button)}
        </div>
      </section>


      {/* ---------- S10 - Museums and cultural institutions ---------- */}
      <section className={`mit__section10`}>
        <div className={`heading`}>
          {parse(mitS10HeadingGallery.heading)}
        </div>
        <div className={`images ${pathname.substring(1, 3)}`}>
          {mitS10HeadingGallery.gallery.map((img, index) => {
            return (
              <div className={`image`} key={`mit-s10-img-` + index}>
                <Image 
                  src={img.url} 
                  alt={img.alt} 
                  width={200}
                  height={200}
                />
              </div>
            )
          })}
        </div>
      </section>


      <hr className={`mit_hr`}/>


      {/* ---------- S11 - Industry members of ---------- */}
      {
        mitS11HeadingGallery.heading === ''
          ? <></>
          : <>
              <section className={`mit__section11`}>
                <div className={`heading`}>
                  {parse(mitS11HeadingGallery.heading)}
                </div>
                <div className={`images`}>
                  {mitS11HeadingGallery.gallery.map((img, index) => {
                    return (
                      <div className={`image`} key={`mit-s10-img-` + index}>
                        <Image 
                          src={img.url} 
                          alt={img.alt} 
                          width={300}
                          height={300}
                        />
                      </div>
                    )
                  })}
                </div>
              </section>
            </>
      }

        {/* <div className={`heading`}>
          {parse(mitS11HeadingGallery.heading)}
        </div>
        <div className={`images`}>
          {mitS11HeadingGallery.gallery.map((img, index) => {
            return (
              <div className={`image`} key={`mit-s10-img-` + index}>
                <Image 
                  src={img.url} 
                  alt={img.alt} 
                  width={300}
                  height={300}
                />
              </div>
            )
          })}
        </div> */}

    </div>
  )
}

export default MitView;