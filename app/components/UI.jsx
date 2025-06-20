"use client";
import { useEffect, useReducer } from "react";
import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import './ui.scss'

export const UI = ({ targetSceneRef, triggerRef }) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  // Allow parent to trigger UI updates
  useEffect(() => {
    if (triggerRef) {
      triggerRef.current = () => forceUpdate();
    }
  }, [triggerRef]);

  const current = targetSceneRef.current;

  // Initial animation for the first section
  useEffect(() => {
    // const tl = gsap.timeline();

    gsap.fromTo(
      ".section_one",
      { opacity: 0, top: current === "Scene1" ? "150px" : "0px" },
      {
        delay: 2,
        opacity: current === "Scene1" ? 1 : 0,
        top: "0px",
        ease: "power1.out",
        duration: 1,
      }
    );
    gsap.fromTo(
      ".section_two",
      { opacity: 0, top: current === "Scene2" ? "150px" : "0px" },
      {
        delay: 0,
        opacity: current === "Scene2" ? 1 : 0,
        top: "0px",
        ease: "power1.out",
        duration: 1,
      }
    );
  }, [current]);

  // useGSAP(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   // S2
  //   GsapAnimateElement(
  //     ".section_two",
  //     { opacity: 0, y: 75 },
  //     { opacity: 1, y: 0 },
  //     [
  //       { start: "top 80%", end: "top 80%", 
  //         // markers: true 
  //       },
  //     ]
  //   );

  //   // S2
  //   GsapAnimateElement(
  //     ".section_three",
  //     { opacity: 0, y: 75 },
  //     { opacity: 1, y: 0 },
  //     [
  //       { start: "top 80%", end: "top 80%", 
  //         // markers: true 
  //       },
  //     ]
  //   );
  // }, [])


  // useEffect(() => {
  //   const pc = particlesCursor({
  //     el: document.getElementById('body'),
  //     gpgpuSize: 512,
  //     colors: [0x00ff00, 0x0000ff],
  //     color: 0xff0000,
  //     coordScale: 0.5,
  //     noiseIntensity: 0.001,
  //     noiseTimeCoef: 0.0001,
  //     pointSize: 5,
  //     pointDecay: 0.0025,
  //     sleepRadiusX: 250,
  //     sleepRadiusY: 250,
  //     sleepTimeCoefX: 0.001,
  //     sleepTimeCoefY: 0.002
  //   })

  //   document.body.addEventListener('click', () => {
  //     pc.uniforms.uColor.value.set(Math.random() * 0xffffff)
  //     pc.uniforms.uCoordScale.value = 0.001 + Math.random() * 2
  //     pc.uniforms.uNoiseIntensity.value = 0.0001 + Math.random() * 0.001
  //     pc.uniforms.uPointSize.value = 1 + Math.random() * 10
  //   })    
  // }, []);

  return (
    <>
      <div className={`
        section_one
        ui__sections 
        ${current === "Scene1" ? "" : "ui__hidden"}`}
      >
        Section 1
      </div>


      <div className={`
        section_two
        ui__sections 
        ${current === "Scene2" ? "" : "ui__hidden"}`}
      >
        Section 2
      </div>


      <div className={`
        section_three
        ui__sections 
        ${current === "Scene3" ? "" : "ui__hidden"}`}
      >
        Section 3
      </div>
    </>
  );
}