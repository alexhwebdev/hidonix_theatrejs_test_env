"use client";
import { useEffect, useState, useMemo, useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import vertexShader from "./shaders/vertex.glsl.js";
import fragmentShader from "./shaders/fragment.glsl.js";
import * as THREE from "three";
import gsap from "gsap";

export function generateRingLineSegments(count, radius) {
  const positions = new Float32Array(count * 2 * 3);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = radius;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = 0;
    const lineLength = 0.05;
    const dx = x * (1.0 - lineLength);
    const dz = z * (1.0 - lineLength);
    positions.set([x, y, z, dx, y, dz], i * 6);
  }
  return positions;
}

const RingLinesFacingCenter = ({
  count,
  radius = 1,
  spinSpeed = 0.1,
  scrollStart = 0,
  scrollDuration = 1,
  scale = 1,
  delay = 0,
}) => {
  const [responsiveScale, setResponsiveScale] = useState(scale);
  const ref = useRef();
  const tl = useRef();
  const scroll = useScroll();

  const positions = useMemo(() => generateRingLineSegments(count, radius), [count, radius]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uRadius: { value: radius },
    uOpacity: { value: 0.2 },
  }), [radius]);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      setResponsiveScale(THREE.MathUtils.clamp(width / 1400, 0.5, 1));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) return;

    // Initial load animation
    gsap.fromTo(
      ref.current.position,
      { z: 5 },
      { z: 0, duration: 4, delay, ease: "power2.out" }
    );

    tl.current = gsap.timeline({ defaults: { duration: 2, ease: "power1.inOut" } });
    tl.current
      .to(ref.current.position, { z: 0 }, 0)
      .to(ref.current.position, { z: 3 }, 2)
      // .to(uniforms.uOpacity, { value: 0 }, 2)
      .to(ref.current.position, { z: 0 }, 4)
      .to(ref.current.position, { z: 0 }, 6)
      // .to(uniforms.uOpacity, { value: 0.2 }, 6)
      .to(ref.current.position, { z: 0 }, 8)
      .to(ref.current.position, { z: 3 }, 10)
      .to(ref.current.position, { z: 0 }, 12)
      .pause(0);
  }, [delay]);

  const smoothedProgress = useRef(0);

  useFrame(({ clock }) => {
    if (!ref.current || !tl.current) return;
  
    uniforms.uTime.value = clock.getElapsedTime();
    ref.current.rotation.y = clock.getElapsedTime() * spinSpeed;
  
    const targetProgress = THREE.MathUtils.clamp((scroll.offset - scrollStart) / scrollDuration, 0, 1);
    smoothedProgress.current = THREE.MathUtils.lerp(smoothedProgress.current, targetProgress, 0.1);
  
    tl.current.seek(smoothedProgress.current * tl.current.duration());
  });

  return (
    <lineSegments
      ref={ref}
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
      <rawShaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </lineSegments>
  );
};

export default RingLinesFacingCenter;
