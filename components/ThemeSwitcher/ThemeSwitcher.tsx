"use client";
import Image from "next/image";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IGlobalAssetsProps } from "@/types/pageContent.types";
import './theme-switcher.scss';


interface ILogoIconProps {
  lightDarkModeIcons: IGlobalAssetsProps[];
}

export default function ThemeSwitcher(
  { lightDarkModeIcons }: ILogoIconProps
) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lightIcon, setLightIcon] = useState<IGlobalAssetsProps | null>(null);
  const [darkIcon, setDarkIcon] = useState<IGlobalAssetsProps | null>(null);

  // Ensures theme is loaded before rendering button.
  useEffect(() => {
    setMounted(true)
    setLightIcon(lightDarkModeIcons[0]);
    setDarkIcon(lightDarkModeIcons[1]);
  }, [lightDarkModeIcons]);

  if (!mounted) return null;

  return (
    <button
      className={`themeSwitcher__container`}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#000',
        color: theme === 'light' ? '#fff' : '#333',
      }}
    >
      {theme === 'light' && lightIcon ? (
        <Image 
          src={lightIcon.url}
          width={20}
          height={20}
          alt={lightIcon.alt}
        />
      ) : darkIcon ? (
        <Image 
          src={darkIcon.url}
          width={20}
          height={20}
          alt={darkIcon.alt}
        />
      ) : null}
        
    </button>
  );
}
