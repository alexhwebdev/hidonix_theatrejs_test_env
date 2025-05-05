"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from '@/i18n/navigation';
import { IGlobalAssetsProps } from "@/types/pageContent.types";


interface IRecivedAssetProps {
  receivedAssets: IGlobalAssetsProps[];
}

export default function ThemeSwitchAssets(
  { receivedAssets }: IRecivedAssetProps
) {
  const [themeColor, setThemeColor] = useState("light");
  const [currentAssets, setColorOfAsset] = useState<IGlobalAssetsProps[]>(() => {
    return receivedAssets.filter((asset) => {
      return themeColor === "light"
        ? asset.customData.mode === "dark"
        : asset.customData.mode === "light"
    });
  });

  // On page load, check theme color (html tag class)
  useEffect(() => {
    const updateTheme = () => {
      const htmlClassList = document.querySelector("html")?.classList;
      setThemeColor(htmlClassList?.contains("dark") ? "dark" : "light");
    };
    const observer = new MutationObserver(updateTheme);
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      observer.observe(htmlElement, { attributes: true, attributeFilter: ["class"] });
    }
    updateTheme();
    return () => observer.disconnect();
  }, []);

  // Light/Dark mode button clicked
  useEffect(() => {
    const colorOfAsset = receivedAssets.filter((asset) => 
      themeColor === "light"
        ? asset.customData.mode === "dark"
        : asset.customData.mode === "light"
    );
    setColorOfAsset(colorOfAsset);
  }, [themeColor, receivedAssets]);

  return (
    <>
      {currentAssets.map((asset, index) => {
        return (
          <Link 
            href={asset.customData.link} 
            className={`theme-switch-asset`}
            prefetch={false} 
            key={`asset-` + index}
          >
            <Image
              src={asset?.url}
              alt={asset?.alt}
              width={25}
              height={25}
            />
          </Link>            
        )
      })}
    </>
  );
};