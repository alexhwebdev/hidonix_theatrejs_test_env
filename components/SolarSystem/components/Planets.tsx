"use client"

// components/Planet.tsx
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetProps {
  size: number;
  radius: number;
  color: string;
  rotationSpeed: number;
  angle: number;
}

const Planet: React.FC<PlanetProps> = ({ size, radius, color, rotationSpeed }) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const [angle, setAngle] = useState(0);

  useFrame(() => {
    setAngle((prevAngle) => prevAngle - rotationSpeed);
    if (planetRef.current) {
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      planetRef.current.position.set(x, y, 0);
    }
  });

  return (
    <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};

export default Planet;
