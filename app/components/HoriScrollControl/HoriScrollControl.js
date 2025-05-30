"use client";
import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll, Stars, Float, Html, useScroll } from "@react-three/drei";
import TorusParticle from "../TorusParticle/TorusParticle";
import "./hori-scroll-control.scss";

const SceneContent = () => {
  const group = useRef();
  const horizontalGroup = useRef();
  const scroll = useScroll();
  const { viewport } = useThree();

  useFrame(() => {
    const scrollY = scroll.offset;

    // Vertical movement (first half of the scroll range)
    if (group.current) {
      const verticalRange = Math.min(scrollY, 0.5) / 0.5;
      group.current.position.y = -verticalRange * 10;
    }

    // Horizontal movement (second half of the scroll range)
    if (horizontalGroup.current) {
      const horizontalRange = Math.max(scrollY - 0.5, 0) / 0.5;
      horizontalGroup.current.position.x = -horizontalRange * viewport.width * 6;
    }
  });

  return (
    <>
      <group ref={group}>
        <Float speed={1} rotationIntensity={2} floatIntensity={0.2} floatingRange={[1, 1]}>
          <TorusParticle scale={0.5} position={[0, 0, 0]} />
        </Float>
        <Float speed={1} rotationIntensity={2} floatIntensity={0.2} floatingRange={[1, 1]}>
          <TorusParticle scale={0.5} position={[0, -3, 0]} />
        </Float>
        <Float speed={1} rotationIntensity={2} floatIntensity={0.2} floatingRange={[1, 1]}>
          <TorusParticle scale={0.5} position={[0, -6, 0]} />
        </Float>
      </group>

      <group ref={horizontalGroup} position={[0, -10, 0]}>
        <Html className="html_container2">
          <div className="sections_container horizontal">
            <section className="section section__one">Section 1</section>
            <section className="section section__two">Section 2</section>
            <section className="section section__three">Section 3</section>
            <section className="section section__four">Section 4</section>
            <section className="section section__five">Section 5</section>
            <section className="section section__six">Section 6</section>
          </div>
        </Html>
      </group>
    </>
  );
};

const HoriScrollControl = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={2} />
      <Environment preset="warehouse" />
      <ScrollControls pages={6} damping={0.25}>
        <Scroll>
          <SceneContent />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
};

export default HoriScrollControl;
