import React from 'react';
// import Image from 'next/image';
// import parse from 'html-react-parser';
import { performRequest } from '@/lib/datocms';
import { IPageContent } from '@/types/pageContent.types';
// import "./careers.scss";
import CareersComponent from './components/CareersComponent';


// DOC : Metadata - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// NextJS looks for export of 'const metadata'.
export const metadata = {
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  title: 'Careers | Hidonix',
  description: 'At Hidonix, we believe in fostering a culture of innovation, collaboration, and growth. Joining our team means stepping into an environment that values creativity, encourages initiative, and provides opportunities for professional development.',
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // manifest: '/manifest.json',
}

export default async function Careers() {
  const CAREERS_PAGE_CONTENT_QUERY = `
    query Careers {
      careersPage {
        heroImage {
          alt
          url
        }
        heading
        body
        unsolicitedApplication
        unsolicitedApplicationSentence
      }
      globalAsset {
        images {
          alt
          url
          customData 
        }
      }
    }
  `;
  
  const { careersPage, globalAsset }: IPageContent = await performRequest(CAREERS_PAGE_CONTENT_QUERY);
  const closeIcons = globalAsset.images.filter(
    image => image.customData?.dataType === "close-icon"
  );

  return (
    <CareersComponent 
      careersPage={careersPage} 
      closeIcons={closeIcons}
    />
  )
}
