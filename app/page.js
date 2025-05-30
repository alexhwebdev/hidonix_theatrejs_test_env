"use client"

import React, { useEffect, useState, useRef } from 'react';
// import HoriScrollControl from "./components/HoriScrollControl/HoriScrollControl";
import "./page.scss";
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { 
  ScrollControls, Scroll
} from '@react-three/drei';
import ScrollControlComponent from "./components/ScrollControlComponent/ScrollControlComponent";
// import ScrollContent from "./components/ScrollControlComponent/ScrollContent";
import Experience from "./components/Experience/Experience";
import ParticlesLoopPage from "./components/ParticlesLoop/ParticlesLoop";

import Overlay from './components/Overlay/Overlay'

import StarParticles from "./components/StarParticles/StarParticles";

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger the fade-in after a slight delay (optional)
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 100); // 100ms delay just to make it smooth

    return () => clearTimeout(timeout);
  }, []);
  
  
  const overlay = useRef()
  const caption = useRef()
  const scroll = useRef(0)

  const svgRef = useRef();

  useEffect(() => {
    const svg = svgRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svg.classList.add('animate');
        }
      },
      { threshold: 0.1 }
    );

    if (svg) observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-wrapper">
      {/* <div className={`white-overlay ${fadeIn ? 'fade-out' : ''}`} /> */}

      {/* <div className={`canvas-wrapper ${fadeIn ? 'fade-in' : ''}`}>
        <ScrollControlComponent externalScrollRef={overlay} />
        <div className={`main_page`}>
          <ScrollControlComponent />
        </div>
      </div> */}

      {/* <Overlay ref={overlay} caption={caption} scroll={scroll} /> */}
      
      {/* <ScrollControlComponent externalScrollRef={overlay} /> */}

      <ParticlesLoopPage />

      <div className={`plotted_triangle__container`}>
        {/* <svg style={{display: ''}} width="909" height="814" viewBox="0 0 909 814" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M489.232 13.2676H428.268V74.2319H489.232V13.2676Z" fill="#010101" stroke="white" strokeWidth="2"/>
          <path d="M501.5 1H416V86.5H501.5V1Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5"/>
          <path d="M489.232 13.2676H428.268V74.2319H489.232V13.2676Z" fill="#010101" stroke="white" strokeWidth="2"/>
          <path d="M501.5 1H416V86.5H501.5V1Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5"/>
          <path d="M465.41 36.3203H451.321V50.4096H465.41V36.3203Z" fill="white" stroke="white" strokeWidth="0.5"/>
          <path d="M896.232 740.268H835.268V801.232H896.232V740.268Z" fill="#010101" stroke="white" strokeWidth="2"/>
          <path d="M908.5 728H823V813.5H908.5V728Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5"/>
          <path d="M896.232 740.268H835.268V801.232H896.232V740.268Z" fill="#010101" stroke="white" strokeWidth="2"/>
          <path d="M908.5 728H823V813.5H908.5V728Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5"/>
          <path d="M872.41 763.32H858.321V777.41H872.41V763.32Z" fill="white" stroke="white" strokeWidth="0.5"/>
          <path d="M896.232 740.268H835.268V801.232H896.232V740.268Z" fill="#010101" stroke="white" strokeWidth="2"/>
          <path d="M908.5 728H823V813.5H908.5V728Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5"/>
          <path d="M896.232 740.268H835.268V801.232H896.232V740.268Z" fill="#010101" stroke="white" strokeWidth="2"/>
          <path d="M908.5 728H823V813.5H908.5V728Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5"/>
          <path d="M872.41 763.32H858.321V777.41H872.41V763.32Z" fill="white" stroke="white" strokeWidth="0.5"/>
          <path d="M74.2324 740.268H13.2681V801.232H74.2324V740.268Z" fill="#010101" stroke="white" strokeWidth="2"/>
          <path d="M86.5 728H1V813.5H86.5V728Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5"/>
          <path d="M74.2324 740.268H13.2681V801.232H74.2324V740.268Z" fill="#010101" stroke="white" strokeWidth="2"/>
          <path d="M86.5 728H1V813.5H86.5V728Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5"/>
          <path d="M50.4101 763.32H36.3208V777.41H50.4101V763.32Z" fill="white" stroke="white" strokeWidth="0.5"/>
          <path d="M74.2324 740.268H13.2681V801.232H74.2324V740.268Z" fill="#010101" stroke="white" strokeWidth="2"/>
          <path d="M86.5 728H1V813.5H86.5V728Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5"/>
          <path d="M74.2324 740.268H13.2681V801.232H74.2324V740.268Z" fill="#010101" stroke="white" strokeWidth="2"/>
          <path d="M86.5 728H1V813.5H86.5V728Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5"/>
          <path d="M50.4101 763.32H36.3208V777.41H50.4101V763.32Z" fill="white" stroke="white" strokeWidth="0.5"/>
          <path 
            className="cls-1" 
            d="M855.5 752H55.5L457.946 60L855.5 752Z" stroke="black"/>
        </svg> */}
      </div>

    </div>
  );
}
