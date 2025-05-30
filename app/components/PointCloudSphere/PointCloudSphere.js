"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import vertexShader from './shaders/vertex.glsl.js';
import fragmentShader from './shaders/fragment.glsl.js';

export default function PointCloudSphere() {
  const ref = useRef();

  // Load model
  const { nodes } = useGLTF('/assets/models.glb'); // adjust path if needed
  const mesh = useMemo(() => Object.values(nodes).find(n => n.isMesh), [nodes]);
  const geometry = mesh?.geometry;

  // Extract geometry attributes
  const { positions, colors } = useMemo(() => {
    if (!geometry) return { positions: null, colors: null };

    const posAttr = geometry.getAttribute('position');
    const colAttr = geometry.getAttribute('color');

    const positions = new Float32Array(posAttr.array);
    const colors = colAttr
      ? new Float32Array(colAttr.array)
      : new Float32Array(posAttr.count * 3).map((_, i) => {
          const val = (positions[i % positions.length] + 1) / 2;
          return val; // fallback color from position
        });

    return { positions, colors };
  }, [geometry]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  if (!positions) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        vertexColors
        depthWrite={false}
        transparent={true}
      />
    </points>
  );
}
