"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import parse from 'html-react-parser';
import "./accordion.scss";

interface IGlobalAssets {
  // images: {
    alt: string;
    url: string;    
  // }[];
}
interface IAccordionItem {
  heading: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
  arrowColors: IGlobalAssets[];
}
interface IAccordionProps {
  items: {
    subheading: string;
    body: string;
  }[];
  globalAsset: IGlobalAssets[];
}

const AccordionItem: React.FC<IAccordionItem> = ({
  heading,
  content,
  isOpen,
  onClick,
  arrowColors,
}) => {
  const [contentEl, setContentEl] = useState<HTMLDivElement | null>(null);
  
  return (
    <div className={`accordion__item`}>
      <button className={`accordion__header`} onClick={onClick}>
        {parse(heading)}
        {isOpen ? (
          <Image
            src={arrowColors[1].url}
            alt={arrowColors[1].alt}
            width={50}
            height={50}
            className={`arrow__up`}
          />
        ) : (
          <Image
            src={arrowColors[0].url}
            alt={arrowColors[0].alt}
            width={50}
            height={50}
            className={`arrow__down`}
          />
        )}
      </button>
      <div
        ref={setContentEl}
        className={`accordion__content`}
        style={{
          maxHeight: isOpen ? `${contentEl?.scrollHeight || 0}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        {parse(content)}
      </div>
    </div>
  );
};


const Accordion: React.FC<IAccordionProps> = ({ items, globalAsset }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [themeColor, setThemeColor] = useState("light");
  const htmlClassNameRef = useRef<DOMTokenList | null>(null);

  useEffect(() => {
    htmlClassNameRef.current = document.querySelector("html")?.classList ?? null;
  }, []);
  const [arrowColors, setArrowColors] = useState<IGlobalAssets[]>(() => {
    const classList = htmlClassNameRef.current;
    return globalAsset.filter((arrow) =>
      classList?.contains("dark")
        ? arrow.alt.includes("Chevron Arrow White")
        : arrow.alt.includes("Chevron Arrow Black")
    );
  });

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

  useEffect(() => {
    const filteredArrows = globalAsset.filter((arrow) =>
      themeColor === "light"
        ? arrow.alt.includes("Chevron Arrow Black")
        : arrow.alt.includes("Chevron Arrow White")
    );

    if (filteredArrows.length === 2) {
      setArrowColors(filteredArrows);
    } else {
      console.warn("⚠️ Expected 2 arrows but found:", filteredArrows.length);
    }
  }, [themeColor, globalAsset]);


  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`accordion`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          heading={item.subheading}
          content={item.body}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
          arrowColors={arrowColors}
        />
      ))}
    </div>
  );
};

export default Accordion;
