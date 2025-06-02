"use client";
import { useEffect, useState, useMemo, useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const RingLinesOuter = ({
  segments = 5,
  radius = 1,
  thickness = 0.02,
  spinSpeed = 0.1,
  scrollStart = 0,
  scrollDuration = 1,
  scale = 1,
  delay = 0,
}) => {
  const groupRef = useRef();
  const tl = useRef();
  const scroll = useScroll();
  const [responsiveScale, setResponsiveScale] = useState(scale);
  const smoothedProgress = useRef(0); // For scroll interpolation

  const tubes = useMemo(() => {
    const tubeMeshes = [];
    for (let i = 0; i < segments; i++) {
      const startAngle = (i / segments) * Math.PI * 2;
      const endAngle = ((i + 0.7) / segments) * Math.PI * 2;
      const arcCurve = new THREE.CatmullRomCurve3(
        Array.from({ length: 20 }, (_, j) => {
          const t = j / 19;
          const angle = THREE.MathUtils.lerp(startAngle, endAngle, t);
          return new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          );
        })
      );
      const tubeGeometry = new THREE.TubeGeometry(arcCurve, 64, thickness, 8, false);
      tubeMeshes.push(tubeGeometry);
    }
    return tubeMeshes;
  }, [radius, segments, thickness]);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      const newScale = THREE.MathUtils.clamp(width / 1400, 0.5, 1);
      setResponsiveScale(newScale);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || !tl.current) return;

    // Rotate tube
    groupRef.current.rotation.z = clock.getElapsedTime() * spinSpeed;

    // Smooth scroll progress with lerp
    const targetProgress = THREE.MathUtils.clamp((scroll.offset - scrollStart) / scrollDuration, 0, 1);
    smoothedProgress.current = THREE.MathUtils.lerp(smoothedProgress.current, targetProgress, 0.1);

    // Seek GSAP timeline with smoothed progress
    tl.current.seek(smoothedProgress.current * tl.current.duration());
  });

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    gsap.fromTo(
      groupRef.current.position,
      { z: 5 },
      { z: 0, duration: 4, delay, ease: "power2.out" }
    );

    tl.current = gsap.timeline({ defaults: { duration: 2, ease: "power1.inOut" } });
    tl.current
      .to(groupRef.current.position, { z: 0 }, 0)
      .to(groupRef.current.position, { z: 3 }, 2)
      .to(groupRef.current.position, { z: 0 }, 4)
      .to(groupRef.current.position, { z: 0 }, 6)
      .to(groupRef.current.position, { z: 0 }, 8)
      .to(groupRef.current.position, { z: 3 }, 10)
      .pause(0);
  }, [delay]);

  return (
    <group ref={groupRef} 
      scale={responsiveScale} 
      // position={[0, 0, 12.5]}
      rotation={[0, 0, 0]}
    >
      {tubes.map((tubeGeometry, i) => (
        <mesh key={i} 
          geometry={tubeGeometry}
        >
          <meshBasicMaterial 
            color="white" 
            transparent 
            opacity={0.1} 
          />
        </mesh>
      ))}
    </group>
  );
};

export default RingLinesOuter;
