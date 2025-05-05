import React from 'react';
import FooterView from './components/FooterView';
import { 
  //  IImgProps, 
   IGlobalAssetsProps,
   IPageContent 
} from '@/types/pageContent.types';
import { performRequest } from '@/lib/datocms';


export default async function FooterServer() {
  const FOOTER_CONTENT_QUERY = `
    query Footer {
      globalAsset {
        title
        images {
          url
          customData
          alt
        }
      }
      allFooterModels {
        _allAboutUsLocales {
          locale
          value
        }
        _allQuickLinksLocales {
          locale
          value
        }
        _allSubscribeToOurNewsletterLocales {
          locale
          value
        }
        _allMadeWithLocales {
          locale
          value
        }
        _allPrivaryCookiePolicyLocales {
          locale
          value
        }
      }
    }`
  // ------------------------ PAGE IMGS : DatoCMS
  const { globalAsset, allFooterModels }: IPageContent = await performRequest(FOOTER_CONTENT_QUERY);
  const socialIcons: IGlobalAssetsProps[] = [];

  globalAsset.images.map((img: IGlobalAssetsProps) => {
    if (img.customData.dataType === "social-icon") {
      socialIcons.push(img)
    }
  });

  return (
    <FooterView 
      socialIcons={socialIcons} 
      allFooterModels={allFooterModels[0]}
    />
  )
}


