"use client"

import React, { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

export default function PngComponentGsapTl({ scale = 1, position = [0, 0, 0] }) {
  const { size } = useThree()
  const scroll = useScroll()
  const meshRef = useRef()
  const tl = useRef()
  const [texture, setTexture] = useState(null)

  // Load the PNG texture
  useEffect(() => {
    new THREE.TextureLoader().load('./assets/ring.png', (tex) => {
      tex.encoding = THREE.sRGBEncoding
      tex.anisotropy = 16
      setTexture(tex)
    })
  }, [])

  // GSAP Timeline animation
  useLayoutEffect(() => {
    if (!meshRef.current) return

    tl.current = gsap.timeline({ defaults: { duration: 2, ease: 'power1.inOut' } })

    tl.current
      .to(meshRef.current.position, { x: 3, y: 3, z: 0 }, 0)
      // .to(meshRef.current.rotation, { x: 0, y: 5, z: 1 }, 0)
      .to(meshRef.current.position, { x: 0, y: 2, z: -10 }, 2)
      // .to(meshRef.current.rotation, { x: 0, y: 0, z: 0 }, 2)
      .to(meshRef.current.position, { x: 0, y: 0, z: 10 }, 4)
      // .to(meshRef.current.rotation, { x: 0, y: 0, z: 0 }, 4)
      .pause(0)
  }, [texture])

  useFrame(() => {
    const offset = scroll.offset
    const clampedOffset = Math.max(0, Math.min(1, offset))
    tl.current?.seek(clampedOffset * tl.current.duration())
  })

  return (
    texture && (
      <mesh ref={meshRef} scale={scale} position={position}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.5}
          depthWrite={false}
        />
      </mesh>
    )
  )
}
