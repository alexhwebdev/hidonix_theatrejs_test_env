"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ParticlesHoverPlane = ({
  width = 1,
  height = 1,
  segments = 100,
  liftRadius = 1,
  liftStrength = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const meshRef = useRef();
  const { size, viewport, camera, gl } = useThree();

  const count = segments * segments;

  // Generate positions grid
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (i % segments) / (segments - 1) * width - width / 2;
      const y = Math.floor(i / segments) / (segments - 1) * height - height / 2;
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = 0;
    }
    return arr;
  }, [count, segments, width, height]);

  // Mouse position in plane coords (x,y)
  const mousePos = useRef(new THREE.Vector2(10000, 10000)); // far away by default

  // Update mouse position normalized to plane local space
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert mouse screen coords to NDC (-1 to 1)
      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;

      // Create a raycaster from camera through mouse
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      // Intersect with the plane at position, rotation:
      // Plane is in XY plane at Z=0 after applying position and rotation
      // We'll intersect with plane at mesh's world matrix

      // Define a plane in world space matching the plane orientation
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // XY plane at Z=0

      // Apply plane transform from mesh's world matrix
      if (meshRef.current) {
        const worldMatrix = meshRef.current.matrixWorld;
        // Transform plane to mesh world space
        plane.applyMatrix4(worldMatrix);
      }

      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectPoint);

      if (intersectPoint) {
        // Convert intersectPoint to local coords of mesh (plane)
        if (meshRef.current) {
          meshRef.current.worldToLocal(intersectPoint);
          mousePos.current.set(intersectPoint.x, intersectPoint.y);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [camera, size]);

  // Uniforms including mousePos, liftRadius, liftStrength
  const uniforms = useMemo(() => ({
    uMousePos: { value: new THREE.Vector2(10000, 10000) },
    uLiftRadius: { value: liftRadius },
    uLiftStrength: { value: liftStrength },
  }), [liftRadius, liftStrength]);

  // Update mousePos uniform every frame
  useFrame(() => {
    uniforms.uMousePos.value.copy(mousePos.current);
  });

  const vertexShader = `
    uniform vec2 uMousePos;
    uniform float uLiftRadius;
    uniform float uLiftStrength;

    void main() {
      float dist = distance(position.xy, uMousePos);
      float lift = 0.0;
      if(dist < uLiftRadius){
        // smooth falloff: lift strongest at center, zero at radius edge
        lift = (1.0 - dist / uLiftRadius) * uLiftStrength;
      }

      vec3 pos = position;
      pos.z += lift;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = 4.0;
    }
  `;

  const fragmentShader = `
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      gl_FragColor = vec4(1.0);
    }
  `;

  return (
    <points ref={meshRef} position={position} rotation={rotation}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticlesHoverPlane;
