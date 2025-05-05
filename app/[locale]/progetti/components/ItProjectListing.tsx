"use client"
import { useState, useRef, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import Image from 'next/image';
import parse from 'html-react-parser';


export interface IItProjectListingProps {
  globalAsset: {
    images: {
      alt: string;
      url: string;
    }[];
  }
  itProjectListingModel: {
    heading: string;
    subheading: string;
    body: string;
    accordianTitleAccordianBody: {
      subheading: string;
      body: string;
    };
    image: {
      alt: string;
      url: string;
    }
  }[];
}

interface AccordionItemProps {
  title: React.ReactNode;
  content: React.ReactNode;
}

const AccordionItem = (
  { title, content }: AccordionItemProps
) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(`${scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isOpen]);

  return (
    <div 
      className={`accordian__title`} 
      style={{ borderBottom: '1px solid #ccc' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          border: 'none',
          textAlign: 'left',
          fontSize: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <span>{title}</span>
        <span>{isOpen ? <FaChevronUp /> : <FaChevronDown/>}</span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: height,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div style={{ paddingBottom: '25px' }}>{content}</div>
      </div>
    </div>
  );
};

export default function ItProjectsListingComponenet(
  { itProjectListingModel }: IItProjectListingProps
) {
  return (
    <div className={`masonry-layout`}>
      {
        itProjectListingModel.map((project, index) => {
          return (
            <div className={`it__project`} key={`it__project-`+ index}>
              <Image 
                src={project.image.url} 
                alt={project.image.alt} 
                width={500}
                height={500}
              />
              { parse(project.heading) }
              { parse(project.subheading) }
              { parse(project.body) }

              <AccordionItem 
                title={parse(project.accordianTitleAccordianBody.subheading)}
                content={parse(project.accordianTitleAccordianBody.body)}
              />
            </div>
          )
        })
      }
    </div>
  )
}


// masonry
// https://github.com/HemantDutta/Components/tree/main/Vanilla%20JS/Animated%20Masonry%20Grid
// https://www.youtube.com/watch?v=_1UJ8It5SIU