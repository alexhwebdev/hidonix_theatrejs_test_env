"use client"

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import vertexShader from './shaders/particles/vertex.glsl.js'
import fragmentShader from './shaders/particles/fragment.glsl.js'

export default function TorusParticle(
  { scale = 1, position = [0, 0, 0] }
) {
  const { gl, size } = useThree()
  const { scene } = useGLTF('./assets/models.glb')
  // const { scene } = useGLTF('./assets/capsulee.glb')
  const [geometry, setGeometry] = useState(null)
  const pointsRef = useRef()

  useEffect(() => {
    const children = scene.children
    console.log('children ', children)
    // models.glb
    const positions = children.map(child => child.geometry.attributes.position)

    // capsule.glb
    // const positions = children[0].children[0].children.map(child => child.geometry.attributes.position)
    const maxCount = Math.max(...positions.map(pos => pos.count))

    const scale = 1;

    const mergedArray = positions.map((position) => {
      const originalArray = position.array
      const newArray = new Float32Array(maxCount * 3)

      for (let i = 0; i < maxCount; i++) {
        const i3 = i * 3
        if (i3 < originalArray.length) {
          newArray[i3 + 0] = originalArray[i3 + 0] * scale;
          newArray[i3 + 1] = originalArray[i3 + 1] * scale;
          newArray[i3 + 2] = originalArray[i3 + 2] * scale;
        } else {
          const rand = Math.floor(Math.random() * position.count) * 3
          newArray[i3 + 0] = originalArray[rand + 0] * scale;
          newArray[i3 + 1] = originalArray[rand + 1] * scale;
          newArray[i3 + 2] = originalArray[rand + 2] * scale;
        }
      }
      return newArray
    })

    const sizeArray = new Float32Array(maxCount).map(() => Math.random())

    const bufferGeometry = new THREE.BufferGeometry()
    bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(mergedArray[0], 3))
    bufferGeometry.setAttribute('aPositionTarget', new THREE.Float32BufferAttribute(mergedArray[3], 3))
    bufferGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizeArray, 1))

    setGeometry(bufferGeometry)
  }, [scene])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uSize: { value: 20 },
        uResolution: { value: new THREE.Vector2(size.width * size.dpr, size.height * size.dpr) }
      },
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true
    })
  }, [size])

  useFrame(() => {
    if (pointsRef.current) {
      material.uniforms.uResolution.value.set(
        size.width * size.dpr,
        size.height * size.dpr
      )
    }
  })

  return (
    geometry && 
    <points 
      ref={pointsRef}
      geometry={geometry}
      material={material}
      scale={scale}
      position={position}
    />
  )
}
