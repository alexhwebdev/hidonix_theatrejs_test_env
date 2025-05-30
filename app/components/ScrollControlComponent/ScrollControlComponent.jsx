"use client"
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField, Bloom, Vignette} from '@react-three/postprocessing'
import Butterfly from './components/Butterfly'
import { 
  Backdrop,
  Environment, 
  Float,
  Html,
  OrbitControls,
  PositionalAudio, 
  Ring,
  Sparkles, 
  Stars,
  ScrollControls, 
  Scroll, 
  useScroll
} from '@react-three/drei';
import './scroll-control.scss';

import PointCloudSphere from '../PointCloudSphere/PointCloudSphere'
import TorusParticle from '../TorusParticle/TorusParticle'
import TorusParticleGsapTl from '../TorusParticleGsapTl/TorusParticleGsapTl'
import TorusPlainParticleGsapTl from '../TorusPlainParticleGsapTl/TorusPlainParticleGsapTl'
import ModelsTransition from '../ModelsTransition/ModelsTransition'
import PngComponentGsapTl from '../PngComponentGsapTl/PngComponentGsapTl'
import StarParticles from '../StarParticles/StarParticles'
import CameraMovement from '../CameraMovement/CameraMovement'
import BakedTexture from '../BakedTexture/BakedTexture'

import RingLinesFacingCenter from '../RingLinesFacingCenter/RingLinesFacingCenter'
import RingLinesOuter from '../RingLinesOuter/RingLinesOuter'
import RingLinesInner from '../RingLinesInner/RingLinesInner'
import RedOrb from '../RedOrb/RedOrb'

import ParticleRings from '../ParticleRings/ParticleRings'
import BrainAnimation from '../BrainAnimation/BrainAnimation'

import ParticlePathAnimation from '../ParticlePathAnimation/ParticlePathAnimation'
import S1ParticlePathAnimation from '../S1ParticlePathAnimation/S1ParticlePathAnimation'

import ParticlesLoop from '../ParticlesLoop/ParticlesLoop'

// import OrbComputing from '../OrbComputing/OrbComputing'
// import { AxesHelper } from 'three';

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react';
import GsapAnimateElement from "@/utils/GsapAnimateElement";
gsap.registerPlugin(ScrollTrigger);

const ScrollContent = (
  { externalScrollRef }
) => {
  const scroll = useScroll();

  useFrame(() => {
    if (!externalScrollRef?.current) return
    const el = externalScrollRef.current
    const scrollTop = el.scrollTop
    const maxScroll = el.scrollHeight - el.clientHeight
    const offset = scrollTop / maxScroll
    scroll.offset = offset // forces R3F scroll context to match external scroll
  })




  return (
    <>
      {/* Your 3D components */}
      <RingLinesOuter count={100} 
        radius={3} 
        spinSpeed={0.04} 
        delay={0.0} 
        scrollStart={0} 
        scrollDuration={1.3} 
      />
      <RingLinesFacingCenter count={100} 
        radius={2.5} 
        spinSpeed={0.05} 
        // delay={0.5} 
        scrollStart={0.02} 
        scrollDuration={1.0}
      />
      <RingLinesInner count={100} 
        radius={2} 
        spinSpeed={0.1} 
        // delay={0.0} 
        scrollStart={0.3} 
        scrollDuration={1.0} 

        // radius={2} 
        // spinSpeed={0.1} 
        // delay={0.5} 
        // scrollStart={-0.2} 
        // scrollDuration={1.1} 
      />
      <RedOrb />

      {/* NEED SVG CLASS : .cls-1 */}
      {/* <ParticlePathAnimation 
        position={[-1.39, 1.2, 0]} 
      /> */}
      <StarParticles count={1000} />
    </>
  );
};



const ScrollControlComponent = (
  { externalScrollRef }
) => {
  // const scroll = useScroll(); // Get the scroll offset
  // const [sparklesPosition, setSparklesPosition] = useState([0, 0, 0]);

  // // Track the radius of the stars
  // const [starRadius, setStarRadius] = useState(100); // Default radius to start at
  // useEffect(() => {
  //   if (scroll && scroll.offset !== undefined) {
  //     // Calculate the radius based on scroll offset
  //     const maxScroll = 1; // Maximum scroll offset value
  //     const newRadius = 100 + scroll.offset * 200; // Increase radius as you scroll
  //     setStarRadius(newRadius); // Update the radius value
  //   }
  // }, [scroll]);


  return (
    <Canvas className="canvas__component" shadows gl={{ antialias: true }}>
      {/* <CameraMovement className="CameraMovement" /> */}
      {/* <OrbitControls /> */}

      {/* <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={0.1} height={100} />
        <Bloom intensity={2} luminanceThreshold={0.1} luminanceSmoothing={0.9} height={100} />
        <Vignette eskil={true} offset={.1} darkness={1.0} />
      </EffectComposer> */}

      {/* <ambientLight intensity={2} /> */}
      {/* <spotLight position={[0, 25, 0]} angle={1.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} /> */}

      {/* create a wall in the background */}
      {/* <Backdrop
        receiveShadow
        floor={20.5} // Stretches the floor segment, 0.25 by default
        segments={100} // Mesh-resolution, 20 by default
        scale={[50,30,10]}
        position={[4,-10,0]}
      >
        <meshStandardMaterial color="#000000" />
      </Backdrop> */}

      {/* <Ring scale={3.5} position-z={-4} position-y={0} args={[0, 0.95, 60]} receiveShadow>
        <meshStandardMaterial 
          // color="#0d1c36" 
          color="#ffffff"
        />
      </Ring> */}

      {/* <SectionOne fadeStart={0.1} fadeEnd={0.3} delay={2} /> */}


      <ScrollControls 
        pages={6}   // If 6 sections, divide by 2
        // damping={0.25}
        // html
      >
        <ScrollContent externalScrollRef={externalScrollRef} />

        {/* <S1ParticlePathAnimation /> */}

        {/* <SectionOne fadeStart={0.1} fadeEnd={0.3} delay={2} /> */}
        {/* <Scroll>
          <Html fullscreen>
          <SectionOne 
            fadeStart={0.1} fadeEnd={0.3} delay={2} 
          />
          </Html>
        </Scroll>

        <SectionTwo fadeStart={0.3} fadeEnd={0.6} /> */}


        {/* <TorusPlainParticleGsapTl scale={1} /> */}
        {/* <TorusParticleGsapTl scale={1} /> */}
        {/* <TorusParticle scale={1.5} /> */}

        {/* <BakedTexture position={[0, 0, -5]} /> */}

        {/* <OrbComputing position={[0, 0, 3]} /> */}

        {/* <BrainAnimation 
          scroll={scroll} 
          scale={[17, 17, 17]}
        /> */}

        {/* Section 1 (Out of view) */}
        {/* <ParticleRings 
          count={100} radius={3.4} spinSpeed={0.05} 
          scrollStart={-0.2} 
          // scrollDuration={1} 
          scrollDuration={1} 
          delay={0.7}
        />
        <ParticleRings 
          count={100} radius={2.9} spinSpeed={0.06} 
          scrollStart={-0.2} 
          // scrollDuration={1.08} 
          scrollDuration={1.05} 
          delay={0.4}
        />
        <ParticleRings 
          count={100} radius={2.5} spinSpeed={0.07} 
          scrollStart={-0.2} 
          // scrollDuration={1.16} 
          scrollDuration={1.1} 
          delay={0.1}
        /> */}

        {/* <Scroll
          distance={0.1}
        >
          <Float
            speed={1}
            rotationIntensity={2}
            floatIntensity={0.2}
            floatingRange={[1, 1]}
          >
            <TorusParticle scale={0.5} />
            <ModelsTransition />
            <BakedTexture position={[0, 0, 2]} />
          </Float>
          <TorusParticle scale={0.5} />
        </Scroll> */}
        
        <Scroll>
          <Html className={`html_container`}>
            {/* <div className={`sections_container`}>
              <section className={`section__zero section`}>Section 0</section>
              <section className={`section__one section`}>Section 1</section>
              <section className={`section__two section`}>Section 2</section>

              <section className={`section__three section`}>Section 3</section>
              <section className={`section__four section`}>Section 4</section>

              <section className={`section__five section`}>Section 5</section>
              <section className={`section__six section`}>Section 6</section>

              <section className={`section__seven section`}>Section 7</section>
              <section className={`section__eight section`}>Section 8</section>

              <section className={`section__eight section`}>Section 9</section>
              <section className={`section__ten section`}>Section 10</section>
            </div>  */}
            {/* <svg className={`triangle__svg`} width="500" height="435" viewBox="0 0 500 435" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className={`cls-1`} d="M501 1H1L255.007 434L501 1Z" stroke="black"/>
            </svg> */}

            {/* <svg width="346" height="420" viewBox="0 0 346 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="cls-1" d="M0.5 55.5H341C343.667 85.1667 347.4 144.5 341 144.5C334.6 144.5 111.333 144.5 0.5 144.5V235.5H341V332.5H0.5V419M0.5 419H93.5V0.5H261.5L266.5 415.5L0.5 419Z" stroke="black"/>
            </svg> */}

            {/* <svg width="282" height="268" viewBox="0 0 282 268" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="cls-1" d="M1 1C11.0493 1 139.262 1 281 1" stroke="black"/>
              <path className="cls-1" d="M141 267C140.966 257.453 140.532 135.651 140.052 1.00001" stroke="black"/>
              <path className="cls-1" d="M58.5166 267C58.4826 257.453 58.0484 135.651 57.5685 1.00001" stroke="black"/>
              <path className="cls-1" d="M213.054 267C213.02 257.453 212.586 135.651 212.106 1.00001" stroke="black"/>
              <path className="cls-1" d="M1 203.56C11.0493 203.56 139.262 203.56 281 203.56" stroke="black"/>
              <path className="cls-1" d="M1 69.9478C11.0493 69.9478 139.262 69.9478 281 69.9478" stroke="black"/>
              <path className="cls-1" d="M1 134C11.0493 134 139.262 134 281 134" stroke="black"/>
              <path className="cls-1" d="M1 1V267H281V1" stroke="black"/>
            </svg> */}

          </Html>
        </Scroll>

        {/* StarParticles need to be on this position */}
        {/* <StarParticles count={1000} /> */}

      </ScrollControls>
    </Canvas>
  )
}

export default ScrollControlComponent;
