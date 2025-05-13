import { performRequest } from '@/lib/datocms';
import { IGlobalAssetsProps, IPageContent } from '@/types/pageContent.types';
import React from 'react'
import IonView from './components/IonView';

// DOC : Metadata - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// NextJS looks for export of 'const metadata'.
export const metadata = {
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  title: 'ION - Indoor Outdoor Navigation — Hidonix',
  description: 'ION is an outdoor & indoor positioning system that allows you to monitor the flow of people in and around your buildings and provide accurate turn-by-turn navigation without hardware.',
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // manifest: '/manifest.json',
}

export default async function IonServer(
  {params} : {params: Promise<{locale: string}>;}
) {
  const {locale} = await params;
  
  const ION_PAGE_QUERY = `
    query ProductIon {
      globalAsset {
        images {
          alt
          url
          customData
        }
      }
      ionPageModel(locale: ${locale}) {
        ionPage {
          ionS1HeadingBodyButtonsVideo {
            heading
            body
            button1
            gallery {
              alt
              url

              video {
                muxPlaybackId
                blurUpThumb
                title
                width
                height
              }
            }
          }
          ionS2HeadingBody {
            heading
            body
          }
          ionS3Heading {
            heading
          }
          ionS3SubheadingBodyImage {
            subheading
            body
            image {
              alt
              url
            }
          }
          ionS4Image {
            alt
            url
          }
          ionS4Video {
            video {
              muxPlaybackId
              title
              width
              height
            }
          }
          ionS5HeadingBody {
            heading
            body
          }
          ionS5HeadingBodyGallery {
            heading
            body
            images {
              alt
              url
            }
          }
          ionS6Heading {
            heading
          }
          ionS6SubheadingBodyImage {
            subheading
            body
            image {
              alt
              url
            }
          }
          ionS7Heading {
            heading
          }
          ionS7Gallery {
            gallery {
              alt
              url
            }
          }
          ionS8Heading {
            heading
          }
          ionS8SubheadingBody {
            subheading
            body
          }
          ionS9HeadingButtonImage {
            heading
            button
            image {
              alt
              url
            }
          }
        }
      }
    }
  `;
  const { 
    globalAsset,
    ionPageModel 
  }: IPageContent = await performRequest(ION_PAGE_QUERY);

  const ionPageData = ionPageModel.ionPage;
  
  const narrowArrows: IGlobalAssetsProps[] = [];
  globalAsset.images.map((img) => {
    if (img.alt.includes("Chevron Narrow")) {
      narrowArrows.push(img)
    }
  });

  const closeIcons = globalAsset.images.filter(
    image => image.customData?.dataType === "close-icon"
  );

  return (
    <IonView 
      globalAsset={globalAsset}
      closeIcons={closeIcons}
      narrowArrows={narrowArrows}
      ionS1HeadingBodyButtonsVideo={ionPageData.ionS1HeadingBodyButtonsVideo}
      ionS2HeadingBody={ionPageData.ionS2HeadingBody}
      ionS3Heading={ionPageData.ionS3Heading}
      ionS3SubheadingBodyImage={ionPageData.ionS3SubheadingBodyImage}
      ionS4Image={ionPageData.ionS4Image}
      ionS4Video={ionPageData.ionS4Video}
      ionS5HeadingBody={ionPageData.ionS5HeadingBody}
      ionS5HeadingBodyGallery={ionPageData.ionS5HeadingBodyGallery}
      ionS6Heading={ionPageData.ionS6Heading}
      ionS6SubheadingBodyImage={ionPageData.ionS6SubheadingBodyImage}
      ionS7Heading={ionPageData.ionS7Heading}
      ionS7Gallery={ionPageData.ionS7Gallery}
      ionS8Heading={ionPageData.ionS8Heading}
      ionS8SubheadingBody={ionPageData.ionS8SubheadingBody}
      ionS9HeadingButtonImage={ionPageData.ionS9HeadingButtonImage}
    />
  )
}
