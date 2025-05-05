import React from 'react';
import Image from 'next/image';
import { performRequest } from '@/lib/datocms';
import { IPageContent } from '@/types/pageContent.types';
// import { notFound } from "next/navigation";
import {useLocale} from 'next-intl';
import EnNotFound from '@/components/NotFoundPages/EnNotFound';
import ItNotFound from '@/components/NotFoundPages/ItNotFound';

interface INotFoundAsset {
  url: string;
  customData: {
    dataType: string;
  };
  alt: string;
}

const GLOBAL_ASSETS_CONTENT_QUERY = `
  query GlobalAssets {
    globalAsset {
      images {
        url
        customData
        alt
      }
    }
  }`

const { globalAsset }: IPageContent = await performRequest(GLOBAL_ASSETS_CONTENT_QUERY);
const notFoundAssets: INotFoundAsset[] = [];

globalAsset.images.map((img) => {
  // If customData is a string, parse it
  const data = typeof img.customData === 'string'
    ? JSON.parse(img.customData)
    : img.customData;

  if (data.dataType === "not-found") {
    notFoundAssets.push({
      url: img.url,
      alt: img.alt,
      customData: data
    });
  }
});

export default function NotFound() {
  const locale = useLocale();

  return (
    <div className={`not_found`}>
      <Image
        className={`bkgd_img`}
        src={notFoundAssets[0]?.url}
        alt={notFoundAssets[0]?.alt}
        fill
        priority
      />
      <div className={`img_copy__wrapper`}>
        <div className={`img_copy__container`}>
          <Image
            className={`icon`}
            src={notFoundAssets[1]?.url}
            alt={notFoundAssets[1]?.alt}
            width={200}
            height={200}
          />
          {
            locale === "en"
              ? <EnNotFound />
              : <ItNotFound />
          }
        </div>
      </div>
    </div>
  )
}
