"use client";
import * as THREE from 'three';
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

const vertexShader = /* glsl */`
  uniform float uTime;
  uniform float uSpeed;
  attribute float aScale;
  attribute vec3 initialPosition;
  varying float vAlpha;

  void main() {
    vec3 newPosition = initialPosition;

    float timeOffset = (initialPosition.x + initialPosition.y + initialPosition.z) * 0.1;
    float localTime = mod(uTime + timeOffset, 5.0);

    float speed = localTime * 0.1;
    speed *= uSpeed;

    vec2 dir = normalize(newPosition.xy);
    newPosition.xy += dir * speed;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = aScale * (30.0 / -viewPosition.z);
    vAlpha = 1.0 - (localTime / 5.0);
  }
`;

const fragmentShader = /* glsl */`
  precision mediump float;
  varying float vAlpha;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;

    // gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * 0.3);
    gl_FragColor = vec4(0.584, 0.525, 0.404, vAlpha * 0.4);   // opacity : last #
  }
`;

// const Overlay = forwardRef(({ caption, scroll }, ref) => (
// export default function StarParticles({ count = 1000 }) {
const StarParticles = ({ count = 1000 }) => {
  const points = useRef();
  const scroll = useScroll();

  const { positions, scales, initialPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const initialPositions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;

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

  useEffect(() => {
    if (points.current) {
      points.current.material.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.material.uniforms.uTime.value = state.clock.elapsedTime;

      const scrollSpeed = 1 + scroll.offset * 15;
      points.current.material.uniforms.uSpeed.value = scrollSpeed;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-initialPosition"
          count={initialPositions.length / 3}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        key={Math.random()} // force remount on hot reload
        transparent
        depthWrite={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uSpeed: { value: 1 },
        }}
      />
    </points>
  );
}
export default StarParticles;