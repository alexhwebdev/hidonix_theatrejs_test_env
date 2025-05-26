import { performRequest } from '@/lib/datocms';
import { IGlobalAssetsProps, IPageContent } from '@/types/pageContent.types';
import React from 'react'
import SafeSchoolView from './components/SafeSchoolView';
import { 
  // notFound, 
  redirect 
} from 'next/navigation';
// import { redirect } from '@/i18n/navigation';

// DOC : Metadata - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// NextJS looks for export of 'const metadata'.
export const metadata = {
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  title: 'SafeSchool - The Smartest Way to Keep Schools Safe',
  description: 'SafeSchool is a real-time safety platform that gives schools full visibility of students, staff, and visitors—indoors and out.',
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // manifest: '/manifest.json',
}


export default async function SafeSchoolServer(
  {params} : {params: Promise<{locale: string}>;}
) {
  const {locale} = await params;

  const SAFESCHOOL_PAGE_QUERY = `
    query ProductSafeSchool {
      globalAsset {
        images {
          alt
          url
          customData
        }
      }

      safeschoolPageModel(locale: ${locale}) {
        _allSlugLocales {
          locale
          value
        }
        safeschoolPage {
          safeschoolS1HeadingBodyButtonsGallery {
            heading
            body
            button1
            button2
            gallery {
              alt
              url
            }
          }
          safeschoolS2HeadingBody {
            heading
            body
          }
          safeschoolS3ImageHeading {
            heading
            image {
              alt
              url
            }
          }
          safeschoolS3ImageHeadingBody {
            image {
              alt
              url
            }
            heading
            body
          }
          safeschoolS4ImageHeading {
            image {
              alt
              url
            }
            heading
          }
          safeschoolS4ImageHeadingBody {
            image {
              alt
              url
            }
            heading
            body
          }
          safeschoolS5GalleryHeadingBody {
            images {
              alt
              url
            }
            heading
            body
          }
          safeschoolS5ImageHeading {
            image {
              alt
              url
            }
            heading
          }
          safeschoolS6Image {
            image {
              alt
              url
            }
          }
          safeschoolS7HeadingSubheadingButtonImage {
            heading
            body
            button
            body2
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
    safeschoolPageModel 
  }: IPageContent = await performRequest(SAFESCHOOL_PAGE_QUERY);


  // ----- TO HIDE PAGE OR IF PAGE NOT READY
  // if (locale === 'it') {
  //   // Option 1: Show 404
  //   notFound();
  //   // Option 2: Redirect to home
  //   return redirect(`/${locale}`);
  // }

  // Defensive check: content might be missing
  const safeSchoolPageData = safeschoolPageModel?.safeschoolPage;
  if (!safeSchoolPageData) {
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
    <SafeSchoolView 
      globalAsset={globalAsset}
      closeIcons={closeIcons}
      narrowArrows={narrowArrows}

      safeschoolS1HeadingBodyButtonsGallery={safeSchoolPageData.safeschoolS1HeadingBodyButtonsGallery}
      safeschoolS2HeadingBody={safeSchoolPageData.safeschoolS2HeadingBody}
      safeschoolS3ImageHeading={safeSchoolPageData.safeschoolS3ImageHeading}
      safeschoolS3ImageHeadingBody={safeSchoolPageData.safeschoolS3ImageHeadingBody}
      safeschoolS4ImageHeading={safeSchoolPageData.safeschoolS4ImageHeading}
      safeschoolS4ImageHeadingBody={safeSchoolPageData.safeschoolS4ImageHeadingBody}
      safeschoolS5GalleryHeadingBody={safeSchoolPageData.safeschoolS5GalleryHeadingBody}
      safeschoolS5ImageHeading={safeSchoolPageData.safeschoolS5ImageHeading}
      safeschoolS6Image={safeSchoolPageData.safeschoolS6Image}
      safeschoolS7HeadingSubheadingButtonImage={safeSchoolPageData.safeschoolS7HeadingSubheadingButtonImage}
    />
  )
}

