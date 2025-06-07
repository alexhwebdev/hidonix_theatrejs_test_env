"use client"

import React, { useEffect, useMemo } from 'react'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export default function BakedTextureStadium({ position = [0, 0, 0] }) {
  // const { scene } = useGLTF('/etihad_stadium.glb')
  // const { scene } = useGLTF('/old_trafford.glb')
  // const { scene } = useGLTF('/old_office_building.glb')
  // const { scene } = useGLTF('/commercial_office_entertainment_complex_building.glb')
  const { scene } = useGLTF('/vallourec_stadium.glb')

  console.log('Scene:', scene)


  // Collect all meshes from the deeply nested scene
  // const meshes = useMemo(() => {
  //   const found = []
  //   scene.traverse((child) => {
  //     if (child.isMesh) {
  //       found.push(child)
  //     }
  //   })
  //   return found
  // }, [scene])
  const meshes = useMemo(() => {
    const found = []
    scene.traverse((child) => {
      if (
        child.isMesh &&
        ![
          // "Object_4", 
          // "Object_5", 
          // "Object_6", 
          // "Object_7", 
          // "Object_8", 
          // "Object_9", 
          // "Object_10",
          // "Object_11",
        ].includes(child.name) // 👈 skip these
      ) {
        found.push(child)
      }
    })
    return found
  }, [scene])

  // Debug bounding box
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
  }, [scene])

  return (
    <>
      {/* <OrbitControls /> */}
      <ambientLight intensity={1} />
      
      <group position={position} scale={[1, 1, 1]}>
        {meshes.map((mesh, i) => (
          <mesh
            key={i}
            geometry={mesh.geometry}
            position={mesh.position}
            rotation={mesh.rotation}
            scale={mesh.scale}
          >
            <meshBasicMaterial
              wireframe
              color="red"
              opacity={0.9}
              transparent
            />
          </mesh>
        ))}
      </group>
    </>
  )
}
