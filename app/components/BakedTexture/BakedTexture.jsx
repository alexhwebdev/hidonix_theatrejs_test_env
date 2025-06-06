"use client"

import React, { useRef, useEffect, useMemo } from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useHelper } from '@react-three/drei'
import * as THREE from 'three'
import { GPUComputationRenderer } from 'three-stdlib'
import { 
  OrbitControls,
  } from '@react-three/drei';


// import particlesVertexShader from './shaders/particles/vertex.glsl.js'
// import particlesFragmentShader from './shaders/particles/fragment.glsl.js'
import gpgpuParticlesShader from './shaders/gpgpu/particles.glsl.js'
import { shaderMaterial } from '@react-three/drei'

import vertex from './shaders/particles/vertex.glsl.js'
import fragment from './shaders/particles/fragment.glsl.js'


const ParticlesMaterial = shaderMaterial(
  {
    uSize: 0.1,
    uResolution: new THREE.Vector2(),
    uParticlesTexture: null,
  },
  vertex,
  fragment
)
extend({ ParticlesMaterial })

const Particles = ({ baseMesh, baseGeometry, count, gpgpuSize, particlesTextureRef, resolution }) => {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const uvArray = new Float32Array(count * 2)
    const sizeArray = new Float32Array(count)

    for (let y = 0; y < gpgpuSize; y++) {
      for (let x = 0; x < gpgpuSize; x++) {
        const i = y * gpgpuSize + x
        const i2 = i * 2

        uvArray[i2 + 0] = (x + 0.5) / gpgpuSize
        uvArray[i2 + 1] = (y + 0.5) / gpgpuSize
        sizeArray[i] = Math.random()
      }
    }

    geo.setDrawRange(0, count)
    geo.setAttribute('aParticlesUv', new THREE.BufferAttribute(uvArray, 2))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizeArray, 1))
    geo.setAttribute('aColor', baseGeometry.attributes.color) // BOAT
    // geo.setAttribute('aColor', baseMesh.attributes.color) // OTHERS

    return geo
  }, [baseGeometry, count, gpgpuSize])

  useFrame(() => {
    if (particlesTextureRef.current && materialRef.current) {
      materialRef.current.uParticlesTexture = particlesTextureRef.current
    }
  })

  const materialRef = React.useRef()

  return (
    <points geometry={geometry}>
      <particlesMaterial
        ref={materialRef}
        uResolution={new THREE.Vector2(...resolution)}
        transparent
        depthWrite={false}
      />
    </points>
  )
}


export default function BakedTexture({ position = [0, 0, 0] }) {
  const { gl, size } = useThree()
  const model = useGLTF('/boat.glb')
  // console.log('model ', model)

  // const model = useGLTF('/blueyard/computing.glb')
  // console.log('model ', model)

  const baseMesh = model.scene.children[0]  // Boat
  // const baseMesh = model.scene.children[0].children[0].children[0].children[0].children[0].geometry  // Drone
  // const baseMesh = model.scene.children[0].children[0].children[0].children[0].children[0].geometry   // SPACESHIP
  const baseGeometry = baseMesh.geometry
  // console.log('baseMesh ', baseMesh)

  const count = baseGeometry.attributes.position.count  // Boat
  // const count = baseMesh.attributes.position.count  // OTHERS
  const sizeGPU = Math.ceil(Math.sqrt(count))

  const particlesTextureRef = useRef()
  const gpgpu = useRef()

  const gpgpuInit = () => {
    const computation = new GPUComputationRenderer(sizeGPU, sizeGPU, gl)

    const texture = computation.createTexture()
    // ---------------------------------------- BOAT
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const i4 = i * 4
      texture.image.data[i4 + 0] = baseGeometry.attributes.position.array[i3 + 0]
      texture.image.data[i4 + 1] = baseGeometry.attributes.position.array[i3 + 1]
      texture.image.data[i4 + 2] = baseGeometry.attributes.position.array[i3 + 2]
      texture.image.data[i4 + 3] = Math.random()
    }

    // // ---------------------------------------- DRONE / SPACESHIP
    // for (let i = 0; i < count; i++) {
    //   const i3 = i * 3
    //   const i4 = i * 4
    //   texture.image.data[i4 + 0] = baseMesh.attributes.position.array[i3 + 0]
    //   texture.image.data[i4 + 1] = baseMesh.attributes.position.array[i3 + 1]
    //   texture.image.data[i4 + 2] = baseMesh.attributes.position.array[i3 + 2]
    //   texture.image.data[i4 + 3] = Math.random()
    // }

    const variable = computation.addVariable('uParticles', gpgpuParticlesShader, texture)
    computation.setVariableDependencies(variable, [variable])
    computation.init()

    gpgpu.current = { computation, variable }
  }

  useEffect(() => {
    gpgpuInit()
  }, [])

  useFrame(() => {
    if (gpgpu.current) {
      gpgpu.current.computation.compute()
      const texture = gpgpu.current.computation.getCurrentRenderTarget(gpgpu.current.variable).texture
      particlesTextureRef.current = texture
    }
  })

  return (
    <group position={position}>
      <OrbitControls />
      <Particles
        baseMesh={baseMesh}
        baseGeometry={baseGeometry}
        count={count}
        gpgpuSize={sizeGPU}
        particlesTextureRef={particlesTextureRef}
        resolution={[size.width, size.height]}
      />

      {/* Wireframe Mesh */}
      <mesh 
        geometry={baseGeometry}
        // geometry={baseMesh}
      >
        <meshBasicMaterial
          // wireframe
          color="gray"
          // transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

