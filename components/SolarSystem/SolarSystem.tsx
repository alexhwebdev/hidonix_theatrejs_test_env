"use client"

// components/SolarSystem.tsx
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Planet from './components/Planets';
import OrbitPath from './components/OrbitPath';

const SolarSystem: React.FC = () => {
  const planets = [
    { size: 1.5, radius: 17, color: 'blue', rotationSpeed: 0.010, label: 'Ball5' },
    { size: 1.5, radius: 11, color: 'blue', rotationSpeed: 0.006, label: 'Ball3' },
    { size: 1, radius: 5, color: 'red', rotationSpeed: 0.002, label: 'Ball1' },
    
    { size: 3, radius: 0, color: 'yellow', rotationSpeed: 0, label: 'DT' },
    
    { size: 1, radius: 8, color: 'green', rotationSpeed: 0.004, label: 'Ball2' },
    { size: 1.5, radius: 14, color: 'gray', rotationSpeed: 0.008, label: 'Ball4' },
    { size: 1.5, radius: 20, color: 'gray', rotationSpeed: 0.012, label: 'Ball6' },
  ];

  // Track angles for all planets
  const [angles, setAngles] = useState(
    planets.map(() => 0) // initial angles for each planet
  );

  useEffect(() => {
    // Update angles every frame based on rotation speeds
    const interval = setInterval(() => {
      setAngles((prevAngles) =>
        prevAngles.map((angle, idx) => angle + planets[idx].rotationSpeed)
      );
    }, 16); // roughly 60 FPS (16ms per frame)
    return () => clearInterval(interval);
  });

  return (
    <div style={{ height: '100vh', backgroundColor: 'black' }}>
      <Canvas camera={{ position: [0, 0, 40], fov: 75 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {/* Controls */}
        <OrbitControls enableZoom enableRotate />

        {/* Stars */}
        <Stars />

        {/* OrbitPaths */}
        {planets.map((planet, index) => (
          planet.radius > 0 && (
            <OrbitPath
              key={index}
              radius={planet.radius}
              segments={100}
              angle={angles[2]} // 2 : speed of orbit
            />
          )
        ))}

        {/* Planets */}
        {planets.map((planet, index) => (
          <Planet key={index} {...planet} angle={angles[index]} />
        ))}
      </Canvas>
    </div>
  );
};

export default SolarSystem;

