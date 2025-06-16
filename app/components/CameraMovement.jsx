"use client";

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraMovement({ cameraGroupRef, intensity = 0.4, damping = 0.009 }) {
  const mouse = useRef([0, 0])
  const targetPosition = useRef(new THREE.Vector3())
  const currentPosition = useRef(new THREE.Vector3())

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ]
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (!cameraGroupRef.current) return

    const [mx, my] = mouse.current

    // Compute target position based on intensity
    targetPosition.current.set(mx * intensity, my * intensity, 0)

    // Smoothly interpolate current position toward target
    currentPosition.current.lerp(targetPosition.current, damping)

    // Apply to group
    cameraGroupRef.current.position.copy(currentPosition.current)
  })

  return null
}
