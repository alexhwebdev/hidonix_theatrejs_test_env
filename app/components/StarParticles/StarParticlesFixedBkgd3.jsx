"use client"
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

const vertexShader = /* glsl */`
uniform float uTime;
uniform float uScroll;
attribute float aScale;
attribute vec3 initialPosition;
varying float vAlpha;

void main() {
  vec3 newPosition = initialPosition;

  // calculate time offset per particle based on position
  float timeOffset = (initialPosition.x + initialPosition.y + initialPosition.z) * 0.1;
  float localTime = mod(uTime + timeOffset, 5.0); // 5.0 seconds cycle

  // Move outward based on time, not scroll
  vec2 dir = normalize(newPosition.xy);
  float speed = localTime * 0.1; // speed control, based only on time, not scroll
  newPosition.xy += dir * speed;

  // Apply model matrix to the new position
  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = aScale * (30.0 / -viewPosition.z);

  // Fade based on distance
  vAlpha = 1.0 - (localTime / 5.0);
}
`;

const fragmentShader = /* glsl */`
  precision mediump float;
  varying float vAlpha;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;

    gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * 1.0);  // opacity
  }
`;

export default function StarParticles({ count = 1000 }) {
  const points = useRef();
  const scroll = useScroll(); // Remove scroll offset influence from particles

  const spread = 50;
  const maxDistance = 100;

  // Static star positions (not influenced by scroll)
  const { positions, scales, initialPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const initialPositions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;
  
      positions[i3 + 0] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
  
      initialPositions[i3 + 0] = x;
      initialPositions[i3 + 1] = y;
      initialPositions[i3 + 2] = z;
  
      scales[i] = Math.random() * 3 + 1;
    }
    return { positions, scales, initialPositions };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      // No need to use scroll offset here, making the particles fixed
      points.current.material.uniforms.uScroll.value = 0;  // Keep this fixed to 0
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={count}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-initialPosition"
          count={count}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },  // Disable scroll effect
        }}
      />
    </points>
  );
}
