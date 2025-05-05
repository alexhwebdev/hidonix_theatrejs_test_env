"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { VideoPlayer } from 'react-datocms';
import { YouTubeEmbed } from '@next/third-parties/google';
import parse from 'html-react-parser';
import './about-component.scss';

// import { Suspense } from "react";
// import dynamic from 'next/dynamic';
// import SolarSystem from '../../../components/SolarSystem/SolarSystem';
// const SolarSystem = dynamic(() => import('../../../components/SolarSystem/SolarSystem'), {
//   ssr: false,
// });


interface AboutPageProps {
  aboutS1HeadingBodyImage: {
    heading: string;
    body: string;
    image: {
      alt: string;
      url: string;
    }
  }
  aboutS2BodyVideo: {
    body: string;
    videoUrl: string;
  }
  aboutS3HeadingBody: {
    heading: string;
    body: string;
  }
  aboutS4HeadingGallery: {
    heading: string;
    gallery: {
      alt: string;
      url: string;
      customData: {
        link: string;
        dataType: string;
      }
    }[];
  }
}


const AboutView = (
  { 
    aboutS1HeadingBodyImage,
    aboutS2BodyVideo,
    aboutS3HeadingBody,
    aboutS4HeadingGallery,
  }: AboutPageProps
) => {

  return (
    <div id={`about__component`}>
      <section className={`about__hero_section`}>
        <div className={`about__hero_copy`}>
          {parse(aboutS1HeadingBodyImage.heading)}
          {parse(aboutS1HeadingBodyImage.body)}
        </div>
        <div className={`about__hero_img`}>
          <Image 
            src={aboutS1HeadingBodyImage.image.url}
            alt={aboutS1HeadingBodyImage.image.alt}
            width={500}
            height={500}
            priority
          />
        </div>
      </section>
      
      <section className={`about__video_section`}>
        <div className={`about__video_container`}>
          <div className={`about__video`}>
            {/* <VideoPlayer 
              data={aboutS2BodyVideo.image.url} 
              // style={{ aspectRatio: '1 / 1' }}
              // autoPlay="muted"
              loop={true}
              disableCookies={false}
            /> */}

            <div className={`youtube_video`}>
              {/*
              <iframe
                src={projectData.projectS2HeadingBodyImageVideoListitems[0].videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              */}
              <YouTubeEmbed videoid="FKIl_0ua2j0" height={400} params="controls=0" />
            </div>
          </div>
          <div className={`about__video_copy`}>
            {/* <div> */}
              {parse(aboutS2BodyVideo.body)}
            {/* </div> */}
          </div>
        </div>
      </section>

      <section className={`about__vision_section`}>
        {parse(aboutS3HeadingBody.heading)}
        {parse(aboutS3HeadingBody.body)}
      </section>

      <section className={`about__stayintouch_section`}>
        <div className={`about__stayintouch_container`}>
          {parse(aboutS4HeadingGallery.heading)}

          <div className={`about__stayintouch_links`}>
            {aboutS4HeadingGallery.gallery.map((img, index) => (
              <Link href={img.customData.link} key={`sit`+index}>
                <Image 
                  src={img.url} 
                  alt={img.alt} 
                  width={150}
                  height={150}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* <Suspense fallback={<div>Loading...</div>}>
        <SolarSystem></SolarSystem>
      </Suspense> */}
    </div>
  )
}

export default AboutView