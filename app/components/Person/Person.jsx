"use client"

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Person(props) {
  const { nodes, materials } = useGLTF('/models/man.glb')
  return (
    <>
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[10, 30, 10]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <group {...props} dispose={null}>
        <group scale={1.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Man001__0.geometry}
            material={materials['Scene_-_Root']}
            // rotation={[-Math.PI / 2, 0, 0]}
            scale={1.3}
          />
        </group>
      </group>
    </>
  )
}

useGLTF.preload('/models/man.glb')