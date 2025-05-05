import React from 'react';
import { performRequest } from '@/lib/datocms';
import ContactView from './components/ContactView';
import { IPageContent } from '@/types/pageContent.types';

// DOC : Metadata - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// NextJS looks for export of 'const metadata'.
export const metadata = {
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  title: 'Contact | Hidonix',
  description: 'We love people who ask questions and push us to look at things from different perspectives. Think you need more information about one of our solutions or that we might be the right partners for your next project?',
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // manifest: '/manifest.json',
}


export default async function ContactServer(
  {params} : {params: Promise<{locale: string}>;}
) {
  const {locale} = await params;

  const CONTACT_PAGE_CONTENT_QUERY = `
    query Careers {
      contactsPageModel(locale: ${locale}) {
        contactPage {
          heading
          body
        }
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

  const { contactsPageModel, globalAsset }: IPageContent = await performRequest(CONTACT_PAGE_CONTENT_QUERY);
  const socialIcons = globalAsset.images.filter(
    image => image.customData?.dataType === "social-icon"
  );

  return (
    <ContactView 
      contactsPageModel={contactsPageModel} 
      socialIcons={socialIcons} 
    />
  )
}
