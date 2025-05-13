import { performRequest } from '@/lib/datocms';
import { IGlobalAssetsProps, IPageContent } from '@/types/pageContent.types';
import React from 'react'
import ExpoxView from './components/ExpoxView';
import { 
  // notFound, 
  redirect 
} from 'next/navigation';
// import { redirect } from '@/i18n/navigation';

// DOC : Metadata - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// NextJS looks for export of 'const metadata'.
export const metadata = {
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  title: 'ExpoX - One Platform to Power Your Entire Event Experience',
  description: 'ExpoX is an all-encompassing event management platform that maps your venue, elevates visitor and exhibitor experience and gives you real-time analytics.',
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // manifest: '/manifest.json',
}


export default async function ExpoxServer(
  {params} : {params: Promise<{locale: string}>;}
) {
  const {locale} = await params;

  const EXPOX_PAGE_QUERY = `
    query ProductExpoX {
      globalAsset {
        images {
          alt
          url
          customData
        }
      }

      expoxPageModel(locale: ${locale}) {
        expoxPage {
          expoxS1HeadingBodyButtonsGallery {
            heading
            body
            button1
            button2
            gallery {
              alt
              url
            }
          }
          expoxS2HeadingBody {
            heading
            body
          }
          expoxS3Heading {
            heading
          }
          expoxS3SubheadingBodyImage {
            subheading
            body
            image {
              alt
              url
            }
          }
          expoxS4Image {
            image {
              alt
              url
            }
          }
          expoxS4Heading {
            heading
          }
          expoxS4SubheadingBodyGallery {
            subheading
            body
            gallery {
              alt
              url
            }
          }
          expoxS5HeadingImage {
            heading
            image {
              alt
              url
            }
          }
          expoxS5SubheadingBody {
            subheading
            body
          }
          expoxS6Heading {
            heading
          }
          expoxS6SubheadingBodyImage {
            subheading
            body
            image {
              alt
              url
            }
          }
          expoxS7HeadingSubheadingButtonImage {
            heading
            body
            body2
            button
            button2
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
    expoxPageModel 
  }: IPageContent = await performRequest(EXPOX_PAGE_QUERY);


  // ----- TO HIDE PAGE OR IF PAGE NOT READY
  // if (locale === 'it') {
  //   // Option 1: Show 404
  //   notFound();
  //   // Option 2: Redirect to home
  //   return redirect(`/${locale}`);
  // }

  // Defensive check: content might be missing
  const expoxPageData = expoxPageModel?.expoxPage;
  if (!expoxPageData) {
    // Could also log a warning here
    return redirect(`/${locale}`); // Or notFound();
  }

  const closeIcons = globalAsset.images.filter(
    image => image.customData?.dataType === "close-icon"
  );

  const narrowArrows: IGlobalAssetsProps[] = [];
  globalAsset.images.map((img) => {
    if (img.alt.includes("Chevron Narrow")) {
      narrowArrows.push(img)
    }
  });

  return (
    <ExpoxView 
      globalAsset={globalAsset}
      closeIcons={closeIcons}
      narrowArrows={narrowArrows}

      expoxS1HeadingBodyButtonsGallery={expoxPageData.expoxS1HeadingBodyButtonsGallery}
      expoxS2HeadingBody={expoxPageData.expoxS2HeadingBody}
      expoxS3Heading={expoxPageData.expoxS3Heading}
      expoxS3SubheadingBodyImage={expoxPageData.expoxS3SubheadingBodyImage}
      expoxS4Heading={expoxPageData.expoxS4Heading}
      expoxS4Image={expoxPageData.expoxS4Image}
      expoxS4SubheadingBodyGallery={expoxPageData.expoxS4SubheadingBodyGallery}
      expoxS5HeadingImage={expoxPageData.expoxS5HeadingImage}
      expoxS5SubheadingBody={expoxPageData.expoxS5SubheadingBody}
      expoxS6Heading={expoxPageData.expoxS6Heading}
      expoxS6SubheadingBodyImage={expoxPageData.expoxS6SubheadingBodyImage}
      expoxS7HeadingSubheadingButtonImage={expoxPageData.expoxS7HeadingSubheadingButtonImage}
    />
  )
}

