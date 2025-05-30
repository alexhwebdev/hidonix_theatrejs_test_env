"use client"

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF, OrbitControls } from '@react-three/drei';
import OrbTubes from './OrbTubes';

export default function OrbComputing({ position = [0, 0, 0] }) {
  // const { scene } = useGLTF('/blueyard/computing2.glb');
  const { scene } = useGLTF('/blueyard/team-ball.glb');

  const orbCurves = useMemo(() => {
    const geometry = scene.children[0].geometry;
    const positionAttr = geometry.attributes.position;
    const positions = positionAttr.array;
    const curves = [];

    const tempPoints = [];

    // Step over positions in triplets (x, y, z)
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      tempPoints.push(new THREE.Vector3(x, y, z));

      // Every N points, create a curve and reset
      if (tempPoints.length === 10) {
        const curve = new THREE.CatmullRomCurve3([...tempPoints]);
        curves.push(curve);
        tempPoints.length = 0; // reset
      }
    }

    // Catch any leftover points
    if (tempPoints.length > 2) {
      const curve = new THREE.CatmullRomCurve3([...tempPoints]);
      curves.push(curve);
    }

    return curves;
  }, [scene]);

  return (
    <group position={position}>
      <OrbitControls />
      <mesh geometry={scene.children[0].geometry}>
        <meshBasicMaterial
          color="white"
          opacity={0.3}
          depthWrite={false}
          transparent
        />
      </mesh>

      {/* Render tube paths from curves */}
      <OrbTubes allTheCurves={orbCurves} />
    </group>
  );
}


