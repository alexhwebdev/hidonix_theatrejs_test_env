"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'
import gsap from 'gsap'

import vertexShader from './shaders/particles/vertex.glsl.js'
import fragmentShader from './shaders/particles/fragment.glsl.js'

function Particles({ scale = [1, 1, 1], position = [0, 0, 0] }) {
  const { size } = useThree()
  const pointsRef = useRef()
  const materialRef = useRef()
  const geometryRef = useRef()
  const progressRef = useRef({ value: 0 })
  const { nodes } = useGLTF('/models.glb')
  const [index, setIndex] = useState(0)

  const maxCount = useMemo(() => {
    let max = 0
    Object.values(nodes).forEach((node) => {
      if (node.geometry?.attributes?.position?.count > max) {
        max = node.geometry.attributes.position.count
      }
    })
    return max
  }, [nodes])

  const positions = useMemo(() => {
    const list = []

    Object.values(nodes).forEach((node) => {
      if (!node.geometry?.attributes?.position) return

      const posAttr = node.geometry.attributes.position
      const originalArray = posAttr.array
      const newArray = new Float32Array(maxCount * 3)

      for (let i = 0; i < maxCount; i++) {
        const i3 = i * 3
        if (i3 < originalArray.length) {
          newArray[i3 + 0] = originalArray[i3 + 0]
          newArray[i3 + 1] = originalArray[i3 + 1]
          newArray[i3 + 2] = originalArray[i3 + 2]
        } else {
          const randomIndex = Math.floor(posAttr.count * Math.random()) * 3
          newArray[i3 + 0] = originalArray[randomIndex + 0]
          newArray[i3 + 1] = originalArray[randomIndex + 1]
          newArray[i3 + 2] = originalArray[randomIndex + 2]
        }
      }

      list.push(new THREE.Float32BufferAttribute(newArray, 3))
    })

    return list
  }, [nodes, maxCount])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()

    const sizes = new Float32Array(maxCount)
    for (let i = 0; i < maxCount; i++) sizes[i] = Math.random()

    geo.setAttribute('position', positions[0])
    geo.setAttribute('aPositionTarget', positions[0])
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

    return geo
  }, [positions, maxCount])

  const triggerMorph = (targetIndex) => {
    if (!geometryRef.current) return;
  
    geometryRef.current.setAttribute(
      'aPositionTarget',
      positions[targetIndex]
    );
  
    gsap.fromTo(
      uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: 3,
        ease: 'linear',
        onUpdate: () => {
          if (materialRef.current) {
            materialRef.current.uniforms.uProgress.value = uniforms.uProgress.value
          }
        },
        onComplete: () => {
          setIndex(targetIndex)
  
          // ⚡️ after morph is done, set 'position' to match 'aPositionTarget'
          geometryRef.current.setAttribute(
            'position',
            positions[targetIndex]
          );
  
          // Reset progress to 0 for next morph
          if (materialRef.current) {
            materialRef.current.uniforms.uProgress.value = 0;
          }
        }
      }
    )
  }
  

  const { colorA, colorB, morphIndex } = useControls({
    colorA: '#ff7300',
    colorB: '#0091ff',
    morphIndex: {
      value: 0,
      min: 0,
      max: positions.length - 1,
      step: 1,
      onChange: (val) => triggerMorph(val),
    },
  })

  const uniforms = useMemo(() => ({
    uSize: { value: 0.05 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uProgress: { value: 0 },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
  }), [colorA, colorB, size])

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
      materialRef.current.uniforms.uColorA.value.set(colorA)
      materialRef.current.uniforms.uColorB.value.set(colorB)
    }
  })

  return (
    <points 
      ref={pointsRef}
      scale={scale}
      position={position}
      frustumCulled={false}
    >
      <bufferGeometry ref={geometryRef} {...geometry} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
      />
    </points>
  )
}

export default function ModelsTransition() {
  return (
    <>
      {/* <Canvas camera={{ position: [0, 0, 16], fov: 35 }}> */}
        {/* <color attach="background" args={['#160920']} /> */}
        {/* <OrbitControls enableDamping /> */}
        <Particles 
          scale={[0.5, 0.5, 0.5]} 
        />
      {/* </Canvas> */}
    </>
  )
}
