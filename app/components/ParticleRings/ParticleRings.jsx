"use client";
import { useEffect, useState, useMemo, useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useScroll } from '@react-three/drei'
import vertexShader from "./shaders/vertex.glsl.js";
import fragmentShader from "./shaders/fragment.glsl.js";
// import { generateRingParticles } from "@/utils/generateRingParticles";
import * as THREE from 'three'
import gsap from 'gsap'

export function generateRingParticles(count, radius) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = radius + Math.random() * 0.0; // slight randomness
    const x = Math.cos(angle) * r;
    const y = 0;
    const z = Math.sin(angle) * r;

    positions.set([x, y, z], i * 3);
  }

  return positions;
}


const RingsParticle = (
  { 
    count, 
    radius = 1, 
    spinSpeed = 0.1, 
    scrollStart = 0, 
    scrollDuration = 1,
    scale = 1, 
    delay
  }
) => {
  const [responsiveScale, setResponsiveScale] = useState(scale);
  const [geometry, setGeometry] = useState(null)
  const pointsRef = useRef();
  const tl = useRef()
  const scroll = useScroll()
  const positions = useMemo(() => generateRingParticles(count, radius), [count, radius]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uRadius: { value: radius },
    uOpacity: { value: 1 },  // Add opacity uniform
  }), [radius]);

  useEffect(() => {
    const bufferGeometry = new THREE.BufferGeometry()
    setGeometry(bufferGeometry)
    // gsap.to(pointsRef.current.rotation, { y: Math.PI * 2, duration: 2 });

    // Update scale based on screen width
    const updateScale = () => {
      const width = window.innerWidth;

      // Example: scale between 0.3 and 1 based on width
      const newScale = THREE.MathUtils.clamp(width / 1400, 0.5, 1);
      setResponsiveScale(newScale);
    };

    updateScale(); // Initial scale
    window.addEventListener('resize', updateScale);

    return () => window.removeEventListener('resize', updateScale);
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value = t;
      pointsRef.current.rotation.y = t * spinSpeed;
    }
    const offset = scroll.offset;
    const clampedOffset = Math.max(0, Math.min(1, offset));
    // console.log('clampedOffset ', clampedOffset)

    // Update the timeline based on scrollStart and scrollDuration
    const timelinePosition = (clampedOffset - scrollStart) / scrollDuration;
    // const timelinePosition = (clampedOffset - scrollStart) * 12;
    // console.log('timelinePosition ', timelinePosition)

    tl.current?.seek(timelinePosition * tl.current.duration());
  });

  useLayoutEffect(() => {
    if (!geometry || !pointsRef.current) return;

    // Animate position from z=3 to z=0 on load
    gsap.fromTo(
      pointsRef.current.position,
      { 
        opacity: 0,
        z: 5 
      },
      { 
        opacity: 1,
        z: 0,
        duration: 4, 
        delay: delay,
        ease: 'power2.out',
      }
    );

    tl.current = gsap.timeline({ defaults: { duration: 2, ease: 'power1.inOut' } });
    // console.log('tl.current ', tl.current) // _dur: 6
    tl.current
    .to(pointsRef.current.position, { x: 0, y: 0, z: 0 }, 0)  // last # = sections
    .to(pointsRef.current.position, { x: 0, y: 0, z: 3 }, 2)  
    .to(pointsRef.current.material.uniforms.uOpacity, { value: 0 }, 2)

    .to(pointsRef.current.position, { x: 0, y: 0, z: 0 }, 4)  
    .to(pointsRef.current.position, { x: 0, y: 0, z: 0 }, 6)  
    .to(pointsRef.current.material.uniforms.uOpacity, { value: 1 }, 6)

    .to(pointsRef.current.position, { x: 0, y: 0, z: 0 }, 8)  
    .to(pointsRef.current.position, { x: 0, y: 0, z: 3 }, 10)  
    .pause(0);  // pause at the end
  }, [geometry]);

  return (
    <points ref={pointsRef} 
      rotation={[Math.PI / 2, 0, 0]}
      scale={responsiveScale}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </points>    
  );
};

export default RingsParticle;
