"use client"

// components/OrbitPath.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';

interface OrbitPathProps {
  radius: number;
  segments: number;
  angle: number;  // Use the angle prop to rotate the orbit path
}

const OrbitPath: React.FC<OrbitPathProps> = ({ radius, segments, angle }) => {
  const { scene } = useThree();  // Get the scene from React Three Fiber
  const pathRef = useRef<THREE.Line>(null);

  useEffect(() => {
    // Radian Geometry Formula
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
    }

    // Create geometry and set the positions
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Create line material
    const material = new THREE.LineDashedMaterial({
      color: 0xffffff,
      dashSize: 1,
      gapSize: 0.5,
      scale: 1,
    });

    // Create the Line object and add to the scene
    const line = new THREE.Line(geometry, material);
    line.computeLineDistances(); // Necessary for dashed lines to work
    scene.add(line);

    // Save the line in the reference
    pathRef.current = line;

    // Clean up the line when the component unmounts
    return () => {
      if (pathRef.current) {
        scene.remove(line);
      }
    };
  }, [radius, segments, scene]);

  useFrame(() => {
    // Rotate the orbit path with the passed angle
    if (pathRef.current) {
      pathRef.current.rotation.z = - angle;
    }
  });

  return null;  // No JSX rendering here, it's managed by Three.js
};

export default OrbitPath;

