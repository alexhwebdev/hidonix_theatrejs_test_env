import { performRequest } from '@/lib/datocms';
import { IPageContent } from '@/types/pageContent.types';
import React from 'react'
import MitView from './components/MitView';

// DOC : Metadata - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// NextJS looks for export of 'const metadata'.
export const metadata = {
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  title: 'MIT - All-encompassing Collection Management Software — Hidonix',
  description: 'All-encompassing Collection Management Software',
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // manifest: '/manifest.json',
}


export default async function MitServer(
  {params} : {params: Promise<{locale: string}>;}
) {
  const {locale} = await params;

  const MIT_PAGE_QUERY = `
    query ProductMit {
      globalAsset {
        images {
          alt
          url
          customData
        }
      }

      mitPageModel(locale: ${locale}) {
        mitPage {
          mitS1HeadingBodyButtonsGallery {
            heading
            body
            button1
            button2
            gallery {
              alt
              url

              video {
                muxPlaybackId
                title
                width
                height
                blurUpThumb
              }
            }
          }
          mitS2HeadingBody {
            heading
            body
          }
          mitS2Gallery {
            gallery {
              alt
              url
            }
          }
          mitS3HeadingImage {
            heading
            image {
              alt
              url
            }
          }
          mitS3SubheadingBody {
            subheading
            body
          }
          mitS4HeadingImage {
            heading
            image {
              alt
              url
            }
          }
          mitS4SubheadingBody {
            subheading
            body
          }
          mitS5HeadingBodyImage {
            heading
            body
            image {
              alt
              url
            }
          }
          mitS5SubheadingBody {
            subheading
            body
          }
          mitS6Heading {
            heading
          }
          mitS6SubheadingBodyImage {
            image {
              alt
              url
            }
            subheading
            body
          }
          mitS7Image {
            image {
              alt
              url
            }
          }
          mitS7Icon {
            image {
              alt
              url
            }
          }
          mitS7Start {
            image {
              alt
              url
            }
          }
          mitS7BodyGallery {
            blockTitle
            body
            gallery {
              alt
              url
              customData
            }
          }
          mitS8HeadingBodyImages {
            heading
            body
            images {
              alt
              url
            }
          }
          mitS9HeadingSubheadingButtonImage {
            image {
              alt
              url
            }
            subheading
            heading
            button
          }
          mitS10HeadingGallery {
            heading
            gallery {
              alt
              url
            }
          }
          mitS11HeadingGallery {
            heading
            gallery {
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
    mitPageModel 
  }: IPageContent = await performRequest(MIT_PAGE_QUERY);
  
  const mitPageData = mitPageModel.mitPage;
  const closeIcons = globalAsset.images.filter(
    image => image.customData?.dataType === "close-icon"
  );

  return (
    <MitView 
      globalAsset={globalAsset}
      closeIcons={closeIcons}
      mitS1HeadingBodyButtonsGallery={mitPageData.mitS1HeadingBodyButtonsGallery}
      mitS2HeadingBody={mitPageData.mitS2HeadingBody}
      mitS2Gallery={mitPageData.mitS2Gallery}
      mitS3HeadingImage={mitPageData.mitS3HeadingImage}
      mitS3SubheadingBody={mitPageData.mitS3SubheadingBody}
      mitS4HeadingImage={mitPageData.mitS4HeadingImage}
      mitS4SubheadingBody={mitPageData.mitS4SubheadingBody}
      mitS5HeadingBodyImage={mitPageData.mitS5HeadingBodyImage}
      mitS5SubheadingBody={mitPageData.mitS5SubheadingBody}
      mitS6Heading={mitPageData.mitS6Heading}
      mitS6SubheadingBodyImage={mitPageData.mitS6SubheadingBodyImage}
      mitS7Image={mitPageData.mitS7Image}
      mitS7Icon={mitPageData.mitS7Icon}
      mitS7Start={mitPageData.mitS7Start}
      mitS7BodyGallery={mitPageData.mitS7BodyGallery}
      mitS8HeadingBodyImages={mitPageData.mitS8HeadingBodyImages}
      mitS9HeadingSubheadingButtonImage={mitPageData.mitS9HeadingSubheadingButtonImage}
      mitS10HeadingGallery={mitPageData.mitS10HeadingGallery}
      mitS11HeadingGallery={mitPageData.mitS11HeadingGallery}
    />
  )
}

