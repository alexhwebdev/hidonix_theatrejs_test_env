"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import "./project-view.scss";
import { IProjectProps } from '../page';
import CustomPaging from './ReactSlick/CustomPaging/CustomPaging';
import ThemeSwitchAssetsNoLink from '@/utils/ThemeSwitchAssetsNoLink';
import { IGlobalAssetsProps } from '@/types/pageContent.types';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { YouTubeEmbed } from '@next/third-parties/google';
import { VideoPlayer } from 'react-datocms';

interface IProjectViewArray {
  slug: string;
  narrowArrows: IGlobalAssetsProps[];
  filteredProjectArray: IProjectProps[];
}
interface IImageProps {
    alt: string;
    url: string;
}

const ProjectView = (
  { 
    slug,
    narrowArrows,
    filteredProjectArray 
  }: IProjectViewArray
) => {
  useEffect(() => {
    // Create a GSAP timeline
    const tl = gsap.timeline();
  
    // Hero animation on page load
    tl.fromTo(
      ".heading_subheading .heading", 
      { opacity: 0, top: "75px" },
      { 
        delay: 0.5,
        opacity: 1, 
        top: "0px", 
        ease: "power1.out", 
        duration: 1,
      })
      .fromTo(
        ".heading_subheading .subheading", 
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
            // duration: 1,
            scrollTrigger: {
              trigger: element,
              scrub: 1,
              ...scrollProps, // Merge the respective scrollTriggerProps
            },
          }
        );
      });
    };
    animateElement(
      [
        ".project__section2 .heading", 
        ".project__section2 .body",
        ".project__section2 img"
      ], 
      { opacity: 0, top: "75px" }, 
      { opacity: 1, top: "0px" }, 
      [
        { start: "70% 100%", end: "70% 100%", 
          // markers: true 
        },
        { start: "50% 100%", end: "50% 100%", 
          // markers: true 
        },
        { start: "70% 100%", end: "70% 100%", 
          // markers: true 
        }
      ]
    );
    animateElement(
      [ ".progetto-genesi .project__section2 ul li" ], 
      { opacity: 0 }, 
      { opacity: 1 }, 
      [
        { start: "25% 80%", end: "25% 80%", 
          // markers: true 
        },
      ]
    );
    animateElement(
      [
        ".project__section3 .heading", 
        ".project__section3 .body"
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
    animateElement(
      [
        ".project__section4 .heading", 
        ".project__section4 .body",
        ".project__section4 .img_slider_img_desc .img_desc"
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
        { start: "50% 80%", end: "50% 80%", 
          // markers: true 
        }
      ]
    );
    animateElement(
      [
        ".project__section5 .heading", 
        ".project__section5 .body"
      ], 
      { opacity: 0, top: "75px" }, 
      { opacity: 1, top: "0px" }, 
      [
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        },
        { start: "0% 80%", end: "0% 80%", 
          // markers: true 
        }
      ]
    );
    // PAD - Padiglione Venezia
    animateElement(
      [ ".pad-padiglione-venezia .project__section5 .imgs_container .first_img" ], 
      { y: "-100px" }, 
      { y: "100px" }, 
      [
        { start: "0% 80%", end: "80% 10%", 
          // markers: true 
        },
        // { start: "0% 80%", end: "0% 80%", 
        //   markers: true 
        // }
      ]
    );
    animateElement(
      [
        ".project__section6 .heading", 
        ".project__section6 .body p span"
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
    animateElement(
      [".project__section6 .body p.subheading"], 
      { width: "0%" }, 
      { width: "100%" },
      [
        // start: start (element height), scroller-start, 
        // end: end (element height), scroller-end
        { 
          start: "0% 80%", 
          end: "100% 60%",
          // markers: true 
        },
      ]
    );
    
  }, [])

  const projectData = filteredProjectArray[0];


  // ---------- SECTION 5 IMAGES
  const secFiveBkgd: IImageProps[] = [];
  const secFiveBadge: IImageProps[] = [];
  projectData.projectS5HeadingImagesBody[0].gallery.map((asset) => {
    if (asset.alt.includes("Bkgd")) {
      secFiveBkgd.push(asset);
    } else {
      secFiveBadge.push(asset);
    }
  });

  // ---------- PREV & NEXT ARROWS. 
  // Remove PrevArrow on first project, Remove NextArrow on last project
  // Show both arrows for projects in between
  const { prevArrow, nextArrow, prevArticle, nextArticle } = projectData.prevNextArticle;
  const renderArrow = (type: 'prev' | 'next', articleContent: string) => (
    <div className={`article_${type}_arrow`}>
      <div className={`${type}_article`}>
        {parse(articleContent)}
      </div>
      <ThemeSwitchAssetsNoLink receivedAssets={narrowArrows} />
    </div>
  );
  const renderArrows = () => {
    if (
      (!prevArrow || Object.keys(prevArrow).length === 0) && 
      (!nextArrow || Object.keys(nextArrow).length === 0)
    ) {
      return null;
    }
  
    const prevArrowContent = prevArrow && Object.keys(prevArrow).length > 0 ? renderArrow('prev', prevArticle) : null;
    const nextArrowContent = nextArrow && Object.keys(nextArrow).length > 0 ? renderArrow('next', nextArticle) : null;
  
    return (
      <>
        {prevArrowContent}
        {nextArrowContent}
      </>
    );
  };

  
  return (
    <div id={`project_view__id`} className={slug}>
      {/* ---------- HERO ---------- */}
      <section className={`project__hero`}>
        <div className={`heading_subheading`}>
          <span className={`heading`}>{parse(projectData.projectS1HeadingSubheadingImage.heading)}</span>
          <span className={`subheading`}>{parse(projectData.projectS1HeadingSubheadingImage.subheading)}</span>
        </div>
        <Image 
          src={projectData.projectS1HeadingSubheadingImage.gallery[0].url} 
          alt={projectData.projectS1HeadingSubheadingImage.gallery[0].alt} 
          fill
          priority
        />
        <div className={`overlay`}></div>
      </section>

      {/* ---------- INTRODUCTION ---------- */}
      <section className={`project__section2`}>
        <div className={`heading`}>
          {parse(projectData.projectS2HeadingBodyImageVideoListitems[0].heading)}
        </div>

        <div className={`body_img_video`}>
          <span className={`body`}>
            {parse(projectData.projectS2HeadingBodyImageVideoListitems[0].body)}
          </span>

          {
            projectData.projectS2HeadingBodyImageVideoListitems[0].videoUrl === ""
              ? <></>
              : 
                <div className={`youtube_video`}>
                  {/*
                  <iframe
                    src={projectData.projectS2HeadingBodyImageVideoListitems[0].videoUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  */}
                  <YouTubeEmbed videoid="MorZsewjq5k" height={400} params="controls=0" />
                </div>

          }

          {
            projectData.projectS2HeadingBodyImageVideoListitems[0].images.length === 0 
              ? <></>
              : <Image 
                src={projectData.projectS2HeadingBodyImageVideoListitems[0].images[0].url} 
                alt={projectData.projectS2HeadingBodyImageVideoListitems[0].images[0].alt} 
                width={500}
                height={500}
              />
          }
        </div>

        <div className={`list_items`}>
          {
            projectData.projectS2HeadingBodyImageVideoListitems[0].listItems === '' 
              ? <></>
              : <div>
                  {parse(projectData.projectS2HeadingBodyImageVideoListitems[0].listItems)}
                </div>

          }
        </div>
      </section>

      {/* ---------- PROJECT OBJECTIVES ---------- */}
      <section className={`project__section3`}>
        <div className={`heading`}>
          {parse(projectData.projectS3Heading.heading)}
        </div>

        <ul>
          {projectData.projectS3BodyImage.map((obj, index) => (
            <li key={`project-s3-` + index} className={`body`}>
              {parse(obj.body)}
            </li>
          ))}
        </ul>
      </section>
      
      {/* ---------- THE EXPERIENCE ---------- */}
      <section className={`project__section4`}>
        <div className={`heading_body`}>
          <span className={`heading`}>
            {parse(projectData.projectS4ImageDescImagesHeadingBody.heading)}
          </span>
          <span className={`body`}>
            {parse(projectData.projectS4ImageDescImagesHeadingBody.body)}
          </span>
        </div>

        <div className={`img_slider_img_desc`}>
          {
            projectData.projectS4ImageDescImagesHeadingBody.imagesDesc.length === 0
              ? <></>
              : <div className={`img_desc`}>
                  {parse(projectData.projectS4ImageDescImagesHeadingBody.imagesDesc)}
                </div>              
          }
          <CustomPaging 
            narrowArrows={narrowArrows}
            gallery={projectData.projectS4ImageDescImagesHeadingBody.images}
          />
        </div>
      </section>

      {/* ---------- TWO UNIQUE EXHIBITIONS ---------- */}
      <section className={`project__section5`}>
        <div className={`heading`}>
          {parse(projectData.projectS5HeadingImagesBody[0].heading)}
        </div>
        
        {
          projectData.projectS5HeadingImagesBody[0].image !== null && 
          <div className={`bodies`}>
            <div className={`body`}>
              <div className={`video`}>
                <VideoPlayer 
                  data={projectData.projectS5HeadingImagesBody[0].image.video} 
                  // style={{ aspectRatio: '1 / 1' }}
                  // autoPlay="muted"
                  loop={true}
                  disableCookies={false}
                />                
              </div>

              {parse(projectData.projectS5HeadingImagesBody[0].body)}
            </div>

            <div className={`body2`}>
              <div className={`video`}>
                <VideoPlayer 
                  data={projectData.projectS5HeadingImagesBody[0].image2.video} 
                  // style={{ aspectRatio: '1 / 1' }}
                  // autoPlay="muted"
                  loop={true}
                  disableCookies={false}
                />
              </div>
              {parse(projectData.projectS5HeadingImagesBody[0].body)}
            </div>
          </div>
        }


        {/* PAD- Padiglione Venezia */}
        {projectData.projectS5HeadingImagesBody[0].gallery?.length > 0 && (
          <div className={`imgs_container`}>
            <Image
              className={`first_img`}
              src={secFiveBkgd[0].url}
              alt={secFiveBkgd[0].alt}
              fill
            />

            {
              secFiveBadge[0] === undefined
                ? <></>
                : <Image
                  src={secFiveBadge[0].url}
                  alt={secFiveBadge[0].alt}
                  width={300}
                  height={300}
                />
            }
          </div>
        )}
      </section>

      {/* ---------- PROJECT OUTCOMES ---------- */}
      <section className={`project__section6`}>
        <div className={`heading`}>
          {parse(projectData.projectS6Heading.heading)}
        </div>

        <ul>
          {projectData.projectS6Body.map((obj, index) => (
            <li key={`project-s6-` + index} className={`body`}>
              {parse(obj.body)}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- PREV/NEXT ARROWS ---------- */}
      <div className={`btn__prev_next`}>
        {renderArrows()}

        {
          // projectData.prevNextArticle.prevArrow.length === 0 ?
          // <div className={`article_next_arrow`}>
          //   <div className={`next_article`}>
          //     {parse(projectData.prevNextArticle.nextArticle)}
          //   </div>
          //   <ThemeSwitchAssetsNoLink 
          //     receivedAssets={narrowArrows}
          //   />
          // </div> :
          // projectData.prevNextArticle.nextArrow.length === 0 ?
          // <div className={`article_prev_arrow`}>
          //   <div className={`prev_article`}>
          //     {parse(projectData.prevNextArticle.prevArticle)}
          //   </div>
          //   <ThemeSwitchAssetsNoLink 
          //     receivedAssets={narrowArrows}
          //   />
          // </div> :
          // <>
          //   <div className={`article_prev_arrow`}>
          //     <div className={`prev_article`}>
          //       {parse(projectData.prevNextArticle.prevArticle)}
          //     </div>
          //     <ThemeSwitchAssetsNoLink 
          //       receivedAssets={narrowArrows}
          //     />
          //   </div>
          //   <div className={`article_next_arrow`}>
          //     <div className={`next_article`}>
          //       {parse(projectData.prevNextArticle.nextArticle)}
          //     </div>
          //     <ThemeSwitchAssetsNoLink 
          //       receivedAssets={narrowArrows}
          //     />
          //   </div>          
          // </>
        }
      </div>
    </div>
  )
}

export default ProjectView;
