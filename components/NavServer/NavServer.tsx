import React from 'react';
import NavView from "./components/NavView";
import { IPageContent, IGlobalAssetsProps } from '@/types/pageContent.types';
import { performRequest } from '@/lib/datocms';

const NavBar = async () => {
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

  // ------------------------ PAGE IMGS : DatoCMS
  const hidonixLogo: IGlobalAssetsProps[] = [];
  const socialIcons: IGlobalAssetsProps[] = [];

  globalAsset.images.map((img: IGlobalAssetsProps) => {
    if (img.customData.dataType === "hidonix-logo") {
      hidonixLogo.push(img)
    } 
    else if (img.customData.dataType === "social-icon") {
      socialIcons.push(img)
    } 
  });

  return (
    <NavView 
      hidonixLogo={hidonixLogo} 
      socialIcons={socialIcons}
    />
  )
}

export default NavBar;