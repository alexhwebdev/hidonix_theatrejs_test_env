"use client"
import React, { useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';


const CameraMovement = () => {
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const delay = 0.01;  // Delay factor (lower = slower response)

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;  // Map x position to -1 to 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1; // Map y position to -1 to 1
      setMousePosition([x, y]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const [mx, my] = mousePosition;

    // Calculate the desired camera position based on mouse position
    const targetX = mx * 0.9;
    const targetY = -my * 0.9;

    // Apply a delay using lerp (Linear Interpolation)
    camera.position.x += (targetX - camera.position.x) * delay;
    camera.position.y += (targetY - camera.position.y) * delay;

    camera.lookAt(0, 0, 0); // Camera focus at center
  });

  return null; // null : component wont render anything
};

export default CameraMovement;