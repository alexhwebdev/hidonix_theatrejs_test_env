import React from 'react';
import { performRequest } from '@/lib/datocms';
import AboutView from './components/AboutView';
import { IPageContent } from '@/types/pageContent.types';


// DOC : Metadata - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// NextJS looks for export of 'const metadata'.
export const metadata = {
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  title: 'About Us | Hidonix',
  description: 'We are not your typical software company—we are a deep tech pioneer at the forefront of innovation.',
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // manifest: '/manifest.json',
}

export default async function AboutServer(
  {params} : {params: Promise<{locale: string}>;}
) {
  const {locale} = await params;

  const ABOUT_PAGE_CONTENT_QUERY = `
    query About {
      aboutPageModel(locale: ${locale}) {
        aboutPage {
          aboutS1HeadingBodyImage {
            heading
            body
            image {
              alt
              url
            }
          }
          aboutS2BodyVideo {
            body
            videoUrl
          }
          aboutS3HeadingBody {
            heading
            body
          }
          aboutS4HeadingGallery {
            heading
            gallery {
              alt
              url
              customData
            }
          }
        }
      }
    }`;

  const { aboutPageModel }: IPageContent = await performRequest(ABOUT_PAGE_CONTENT_QUERY);

  const aboutS1HeadingBodyImage = aboutPageModel.aboutPage.aboutS1HeadingBodyImage;
  const aboutS2BodyVideo = aboutPageModel.aboutPage.aboutS2BodyVideo;
  const aboutS3HeadingBody = aboutPageModel.aboutPage.aboutS3HeadingBody;
  const aboutS4HeadingGallery = aboutPageModel.aboutPage.aboutS4HeadingGallery;

  return (
    <>
      <AboutView
        aboutS1HeadingBodyImage={aboutS1HeadingBodyImage}
        aboutS2BodyVideo={aboutS2BodyVideo}
        aboutS3HeadingBody={aboutS3HeadingBody}
        aboutS4HeadingGallery={aboutS4HeadingGallery}
      />

      {/* <SolarSystem></SolarSystem> */}

    </>
  )
}

// export default AboutPage