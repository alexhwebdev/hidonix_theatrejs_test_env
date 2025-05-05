"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from '@/i18n/navigation';
import { IGlobalAssetsProps } from "@/types/pageContent.types";


interface IHomeGlobalAssets {
  alt: string;
  url: string;
}
interface IReceivedAssetProps {
  receivedAsset: IGlobalAssetsProps[];
}

const ThemeSwitchAsset: React.FC<IReceivedAssetProps> = (
  { receivedAsset }
) => {
  const [themeColor, setThemeColor] = useState("light");

  const [currentAsset, setColorOfAsset] = useState<IHomeGlobalAssets[]>(() => {
    return receivedAsset.filter((asset) => {
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
    const colorOfAsset = receivedAsset.filter((asset) => 
      themeColor === "light"
        ? asset.customData.mode === "dark"
        : asset.customData.mode === "light"
    );
    setColorOfAsset(colorOfAsset);
  }, [themeColor, receivedAsset]);

  return (
    <div className={`somethign`}>
      <Link href="/" className={`somethign`} prefetch={true}>
        <Image
          src={currentAsset[0]?.url}
          alt={currentAsset[0]?.alt}
          width={50}
          height={50}
          className={`arrow__down`}
        />
      </Link>
    </div>
  );
};

export default ThemeSwitchAsset;
