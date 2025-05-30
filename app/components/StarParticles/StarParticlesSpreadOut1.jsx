"use client"
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

const vertexShader = /* glsl */`
  uniform float uTime;
  uniform float uScroll;
  attribute float aScale;
  varying float vAlpha;

  void main() {
    vec3 newPosition = position;

    // Move outward with scroll + keep moving over time
    float moveFactor = uScroll * 20.0 + uTime * 2.0; // 🎯 Add time-based movement
    newPosition += normalize(position) * moveFactor;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = aScale * (20.0 / -viewPosition.z);

    vAlpha = 1.0 - uScroll;
  }
`;

const fragmentShader = /* glsl */`
  precision mediump float;
  varying float vAlpha;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;

    gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha);
  }
`;

export default function StarParticles({ count = 1000 }) {
  const points = useRef();
  const scroll = useScroll();

  const spread = 50;
  const maxDistance = 100;

  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
      scales[i] = Math.random() * 3 + 1;
    }
    return { positions, scales };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      points.current.material.uniforms.uScroll.value = scroll.offset;

      const positionsAttr = points.current.geometry.attributes.position;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positionsAttr.array[i3];
        const y = positionsAttr.array[i3 + 1];
        const z = positionsAttr.array[i3 + 2];

        const distance = Math.sqrt(x * x + y * y + z * z);

        if (distance > maxDistance) {
          // Respawn far behind
          positionsAttr.array[i3 + 0] = (Math.random() - 0.5) * spread;
          positionsAttr.array[i3 + 1] = (Math.random() - 0.5) * spread;
          positionsAttr.array[i3 + 2] = -spread * 2.0;
        }
      }

      positionsAttr.needsUpdate = true;
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
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },
        }}
      />
    </points>
  );
}
