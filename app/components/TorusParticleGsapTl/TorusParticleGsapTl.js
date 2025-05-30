"use client"

import React, { useRef, useMemo, useEffect, useState, useLayoutEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import vertexShader from './shaders/particles/vertex.glsl.js'
import fragmentShader from './shaders/particles/fragment.glsl.js'


export default function TorusParticleGsapTl(
  { 
    scale
    // position = [3, 0, 0] 
  }
) {
  const { gl, size } = useThree()
  const { scene } = useGLTF('./assets/models.glb')
  const [geometry, setGeometry] = useState(null)
  const [responsiveScale, setResponsiveScale] = useState(scale);
  const pointsRef = useRef()

  const scroll = useScroll()
  const tl = useRef()

  // Update scale based on screen width
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;

      // Example: scale between 0.3 and 1 based on width
      const newScale = THREE.MathUtils.clamp(width / 1920, 0.3, 0.5);
      setResponsiveScale(newScale);
    };

    updateScale(); // Initial scale
    window.addEventListener('resize', updateScale);

    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    const children = scene.children
    const positions = children.map(child => child.geometry.attributes.position)
    const maxCount = Math.max(...positions.map(pos => pos.count))

    const scaleOfModel = scale;

    const mergedArray = positions.map((position) => {
      const originalArray = position.array
      const newArray = new Float32Array(maxCount * 3)

      for (let i = 0; i < maxCount; i++) {
        const i3 = i * 3
        if (i3 < originalArray.length) {
          newArray[i3 + 0] = originalArray[i3 + 0] * scaleOfModel;
          newArray[i3 + 1] = originalArray[i3 + 1] * scaleOfModel;
          newArray[i3 + 2] = originalArray[i3 + 2] * scaleOfModel;
        } else {
          const rand = Math.floor(Math.random() * position.count) * 3
          newArray[i3 + 0] = originalArray[rand + 0] * scaleOfModel;
          newArray[i3 + 1] = originalArray[rand + 1] * scaleOfModel;
          newArray[i3 + 2] = originalArray[rand + 2] * scaleOfModel;
        }
      }
      return newArray
    })

    const sizeArray = new Float32Array(maxCount).map(() => Math.random())

    // Generate random color IDs for each particle (0, 1, or 2)
    const colorArray = new Float32Array(maxCount).map(() => Math.floor(Math.random() * 3));

    const bufferGeometry = new THREE.BufferGeometry()
    bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(mergedArray[0], 3));
    bufferGeometry.setAttribute('aPositionTarget', new THREE.Float32BufferAttribute(mergedArray[3], 3));
    bufferGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizeArray, 1));
    bufferGeometry.setAttribute('aColor', new THREE.Float32BufferAttribute(colorArray, 1)); // Random color ID for each particle

    setGeometry(bufferGeometry)
  }, [scene])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uSize: { value: 15 },
        uResolution: { value: new THREE.Vector2(size.width * size.dpr, size.height * size.dpr) },
        color1: { value: new THREE.Color('#fc0303') }, // Red
        color2: { value: new THREE.Color('#ffffff') }, // 
        color3: { value: new THREE.Color('#2b04d9') }  // Blue
      },
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    })
  }, [size])

  useFrame(() => {
    if (pointsRef.current) {
      material.uniforms.uResolution.value.set(
        size.width * size.dpr,
        size.height * size.dpr
      )
    }
    // Only seek if scrolling is active or offset has changed
    const offset = scroll.offset;
    // console.log('scroll offset:', offset);
    // Clamp it just in case
    const clampedOffset = Math.max(0, Math.min(1, offset));
    tl.current?.seek(clampedOffset * tl.current.duration());
  })

  useLayoutEffect(() => {
    if (!geometry || !pointsRef.current) return;

    tl.current = gsap.timeline({ defaults: { duration: 2, ease: 'power1.inOut' } });

    tl.current
      .to(pointsRef.current.position, {x: 3, y: 0, z: 0}, 0)
      .to(pointsRef.current.rotation, {x: 0, y: 5, z: 1}, 0)

      .to(pointsRef.current.position, {x: 0, y: 0, z: -10}, 2)
      .to(pointsRef.current.rotation, {x: 0, y: 0, z: 0}, 2)

      .to(pointsRef.current.position, {x: 0, y: 1, z: 10}, 4)
      .to(pointsRef.current.rotation, {x: 0, y: 1, z: 0}, 4)

      .pause(0);
  }, [geometry]);

  return (
    geometry && 
    <points 
      ref={pointsRef}
      geometry={geometry}
      material={material}
      // scale={scale}
      // position={position}
      scale={responsiveScale}
    />
  )
}
