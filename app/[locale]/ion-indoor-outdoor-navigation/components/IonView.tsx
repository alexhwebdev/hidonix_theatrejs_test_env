"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import { usePathname } from 'next/navigation';
import './ion-view.scss';
import { IGlobalAssetsProps } from '@/types/pageContent.types';
import CustomPaging from './ReactSlick/CustomPaging/CustomPaging';
import MultipleItemsSlider from './ReactSlick/MultipleItemsSlider/MultipleItemsSlider';
import Accordion from './Accordian/Accordion';
import IonFormModal from '@/components/Modals/Ion/IonFormModal';
import ItIonFormModal from '@/components/Modals/Ion/ItIonFormModal';
import { GsapAnimateElement } from '@/utils/GsapAnimateElement';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { VideoPlayer } from 'react-datocms';



export interface IIonProps {
  globalAsset: {
    images: {
      alt: string;
      url: string;
    }[];
  }
  closeIcons: IGlobalAssetsProps[];
  narrowArrows: IGlobalAssetsProps[];
  ionS1HeadingBodyButtonsVideo: {
    heading: string;
    body: string;
    button1: string;
    gallery: {
      alt: string;
      url: string;

      video: {
        muxPlaybackId: string;
        blurUpThumb: string;
        title: string;
        width: number;
        height: number;
      };
    }[];
  }
  ionS2HeadingBody: {
    heading: string;
    body: string;
  }
  ionS3Heading: {
    heading: string;
  }
  ionS3SubheadingBodyImage: {
    subheading: string;
    body: string;
    image: {
      alt: string;
      url: string;
    }
  }[];
  ionS4Image: {
    alt: string;
    url: string;
  }[];
  ionS4Video: {
    video: {
      muxPlaybackId: string;
      title: string;
      width: number;
      height: number;
    };
  };
  ionS5HeadingBody: {
    heading: string;
    body: string;
  }
  ionS5HeadingBodyGallery: {
    heading: string;
    body: string;
    images: {
      alt: string;
      url: string;
    }[];
  }[];
  ionS6Heading: {
    heading: string;
  }
  ionS6SubheadingBodyImage: {
    subheading: string;
    body: string;
    image: {
      alt: string;
      url: string;
    }
  }[];
  ionS7Heading: {
    heading: string;
  }
  ionS7Gallery: {
    gallery: {
      alt: string;
      url: string;
    }[];
  }[];
  ionS8Heading: {
    heading: string;
  }
  ionS8SubheadingBody: {
    subheading: string;
    body: string;
  }[];
  ionS9HeadingButtonImage: {
    heading: string;
    button: string;
    image: {
      alt: string;
      url: string;
    }
  }
}


const IonView = (
  {
    globalAsset,
    closeIcons,
    narrowArrows,
    ionS1HeadingBodyButtonsVideo,
    ionS2HeadingBody,
    ionS3Heading,
    ionS3SubheadingBodyImage,
    ionS4Image,
    ionS4Video,
    ionS5HeadingBody,
    ionS5HeadingBodyGallery,
    ionS6Heading,
    ionS6SubheadingBodyImage,
    ionS7Heading,
    ionS7Gallery,
    ionS8Heading,
    ionS8SubheadingBody,
    ionS9HeadingButtonImage,
  }: IIonProps
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playSection4Video, setPlaySection4Video] = useState(false);
  const pathname = usePathname();

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

  useEffect(() => {
    const tl = gsap.timeline();
  
    tl.fromTo(
      ".ion__section1 .heading", 
      { opacity: 0, top: "75px" },
      { 
        delay: 0,
        opacity: 1, 
        top: "0px", 
        ease: "power1.out", 
        duration: 1,
      })
      .fromTo(
        ".ion__section1 .body", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.8")
      .fromTo(
        ".ion__section1 .buttons", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.6")
      .fromTo(
        ".ion__section2 .heading", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.6")
        .fromTo(
          ".ion__section2 .body", 
          { opacity: 0, top: "75px" },
          { 
            opacity: 1, 
            top: "0px", 
            ease: "power1.out", 
            duration: 1,
          }, "-=0.8")
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    GsapAnimateElement(
      [
        ".ion__section3 .heading",
        ".ion__section3 .img_subheading_body",
      ],
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0 },
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

    // S5 - Much more than a navigation and positioning system.
    GsapAnimateElement(
      [
        ".ion__section5 .heading_body h2",
        ".ion__section5 .heading_body p",
        ".ion__section5 .subheading_body_gallery .copy",
      ],
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0 },
      [
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 90%", end: "0% 90%", 
          // markers: true 
        },
        // 4 X .ion__section5 .subheading_body_gallery .copy
        { start: "0% 90%", end: "0% 90%", 
          // markers: true 
        },
        { start: "0% 90%", end: "0% 90%", 
          // markers: true 
        },
        { start: "0% 90%", end: "0% 90%", 
          // markers: true 
        },
        { start: "0% 90%", end: "0% 90%", 
          // markers: true 
        }
      ]
    );

    // S6 - Implementation process
    GsapAnimateElement(
      [
        ".ion__section6 .heading",
        ".ion__section6 .img_subheading_body",
      ],
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0 },
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

    // S7 - Verticals that can benefit from the use of ION
    GsapAnimateElement(
      [
        ".ion__section7 .heading",
        ".ion__section7 .ion__section7_slider",
      ],
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0 },
      [
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        }
      ]
    );

    // S8 - Frequently Asked Questions
    GsapAnimateElement(
      [
        ".ion__section8 .heading",
        ".ion__section8 .ion-s8-accordion",
      ],
      { opacity: 0 },
      { opacity: 1 },
      [
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        }
      ]
    );

    // S9 - Get a free quote
    GsapAnimateElement(
      [
        ".ion__section9 .heading",
        ".ion__section9 .button",
      ],
      { opacity: 0 },
      { opacity: 1 },
      [
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        }
      ]
    );
  });

  return (
    <div id={`ion__id`}>
      {/* ---------- S1 - MAP. NAVIGATE. MONITOR ---------- */}
      <section className={`ion__section1`}>
        <div className={`overlay`}></div>
        {/* <Image 
          className={`hero`}
          src={ionS1HeadingBodyButtonsVideo.gallery[0].url} 
          alt={ionS1HeadingBodyButtonsVideo.gallery[0].alt} 
          fill
          priority
        /> */}

        <div className={`hero`}>
          <VideoPlayer 
            data={{ 
              muxPlaybackId: ionS1HeadingBodyButtonsVideo.gallery[0].video.muxPlaybackId,
              thumbnailUrl: ionS1HeadingBodyButtonsVideo.gallery[0].video.blurUpThumb
            }}
            // data={ionS1HeadingBodyButtonsVideo.gallery[0].video}
            // style={{ aspectRatio: '1 / 1' }}
            style={{
              width: 'auto',
              height: '100%',
              objectFit: 'cover', // important!
            }}
            autoPlay
            playsInline
            muted={true}
            loop={true}
            disableCookies={false}
            // poster={ionS1HeadingBodyButtonsVideo.gallery[0].video.blurUpThumb}
          />
        </div>

        <div className={`copy__container`}>
          <div className={`copy`}>
            <div className={`heading`}>
              {parse(ionS1HeadingBodyButtonsVideo.heading)}
            </div>
            <div className={`body`}>
              {parse(ionS1HeadingBodyButtonsVideo.body)}
            </div>
            <div className={`buttons`}>
              <button 
                className={`button`}
                onClick={() => setIsModalOpen(true)}
              >
                {parse(ionS1HeadingBodyButtonsVideo.button1)}
              </button>             
            </div>
          </div>          
        </div>
      </section>


      {/* ---------- S2 - THE POWER OF OUTDOOR & INDOOR... ---------- */}
      <section className={`ion__section2`}>
        <div className={`copy`}>
          <div className={`heading`}>
            {parse(ionS2HeadingBody.heading)}
          </div>
          <div className={`body`}>
            {parse(ionS2HeadingBody.body)}
          </div>
        </div>
      </section> 


      {/* ---------- S3 - ECONOMIC EFFICIENCY, SCALABILITY ... ---------- */}
      <section className={`ion__section3`}>
        <div className={`heading`}>
          {parse(ionS3Heading.heading)}
        </div>
        <div className={`image_subheading_body`}>
          {ionS3SubheadingBodyImage.map((item, index) => {
            return (
              <div className={`img_subheading_body`} key={`mit-s6-img-` + index}>
                <div className={`image__container`}>
                  <Image 
                    src={item.image.url} 
                    alt={item.image.alt} 
                    width={50}
                    height={50}
                    quality={100}
                  />
                </div>
                {parse(item.subheading)}
                {parse(item.body)}
              </div>
            )
          })}
        </div>
      </section>


      {/* ---------- S4 - VIDEO ---------- */}
      <section className={`ion__section4`}>
        <div className={`bkgd`}></div>
        <div className={`image__container`} onClick={() => setPlaySection4Video(true)}>
          {!playSection4Video ? (
            <Image 
              className={`bkgd_outdoor_img`}
              src={ionS4Image[0].url} 
              alt={ionS4Image[0].alt} 
              fill
              quality={100}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <div className={`ion__s4_video`}>
              {playSection4Video && ionS4Video?.video?.muxPlaybackId ? (
                <VideoPlayer 
                  // data={{ 
                  //   muxPlaybackId: ionS4Video[0].video.muxPlaybackId,
                  //   thumbnailUrl: ionS4Video[0].video.blurUpThumb
                  // }}
                  data={ionS4Video.video}
                  style={{
                    // width: '100%',
                    // height: '100%',
                    objectFit: 'cover',
                  }}
                  autoPlay
                  muted
                  loop={true}
                  disableCookies={false}
                />
              ) : (
                <p style={{ color: '#fff' }}>Video not available</p>
              )}
            </div>
          )}
        </div>
      </section>

    
      {/* ---------- S5 - MUCH MORE THAN A NAV... ---------- */}
      <section className={`ion__section5`}>
        <div className={`heading_body`}>
          {parse(ionS5HeadingBody.heading)}
          {parse(ionS5HeadingBody.body)}
        </div>

        <div className={`subheading_body_gallery`}>
          {ionS5HeadingBodyGallery.map((item, index) => {
            return (
              <div className={`copy_gallery`} key={`ion-s5-item` + index}>
                <div className={`copy`}>
                  {parse(item.heading)}
                  {parse(item.body)}                  
                </div>

                <div className={`gallery`}>
                  <CustomPaging 
                    narrowArrows={narrowArrows}
                    gallery={item.images}
                  />       
                </div>
              </div>
            )
          })}
        </div>
      </section>


      {/* ---------- S6 - IMPLEMENTATION PROCESS ---------- */}
      <section className={`ion__section6`}>
        <div className={`heading`}>
          {parse(ionS6Heading.heading)}
        </div>
        <div className={`image_subheading_body`}>
          {ionS6SubheadingBodyImage.map((item, index) => {
            return (
              <div className={`img_subheading_body`} key={`ion-s6-img-` + index}>
                <div className={`image__container`}>
                  <Image 
                    src={item.image.url} 
                    alt={item.image.alt} 
                    width={100}
                    height={100}
                    quality={100}
                  />
                </div>
                {parse(item.subheading)}
                {parse(item.body)}
              </div>
            )
          })}
        </div>
      </section>


      {/* ---------- S7 - VERTICALS THAT CAN BENEFIT... ---------- */}
      <section className={`ion__section7`}>
        <div className={`heading`}>
          {parse(ionS7Heading.heading)}
        </div>

        <MultipleItemsSlider 
          ionS7Gallery={ionS7Gallery[0].gallery} 
          globalAsset={globalAsset.images}
        />
      </section>


      {/* ---------- S8 - FAQs ---------- */}
      <section className={`ion__section8`}>
        <div className={`heading`}>
          {parse(ionS8Heading.heading)}
        </div>

        <Accordion 
          items={ionS8SubheadingBody} 
          globalAsset={globalAsset.images}
        />
      </section>


      {/* ---------- S9 - GET FREE QUOTE ---------- */}
      <section className={`ion__section9`}>
        <div className={`image__container`}>
          <div className={`overlay`}></div>
          <Image 
            src={ionS9HeadingButtonImage.image.url} 
            alt={ionS9HeadingButtonImage.image.alt} 
            fill
            quality={100}
          />
        </div>
        <div className={`heading_button`}>
          <div className={`heading`}>
            {parse(ionS9HeadingButtonImage.heading)}
          </div>
          {/* <div className={`button`}>
            {parse(ionS9HeadingButtonImage.button)}
          </div> */}
          <button 
            className={`button`}
            onClick={() => setIsModalOpen(true)}
          >
            {parse(ionS9HeadingButtonImage.button)}
          </button>
        </div>
      </section>

      {/* {
        isModalOpen && 
        <IonFormModal 
          onClose={() => setIsModalOpen(false)} 
          closeIcons={ closeIcons }
        />
      } */}
      {
        pathname.substring(1, 3) === 'en' 
        ? isModalOpen && <IonFormModal 
            onClose={() => setIsModalOpen(false)} 
            closeIcons={ closeIcons }
          />
        : isModalOpen && <ItIonFormModal 
            onClose={() => setIsModalOpen(false)} 
            closeIcons={ closeIcons }
          />
      }
    </div>
  )
}

export default IonView;