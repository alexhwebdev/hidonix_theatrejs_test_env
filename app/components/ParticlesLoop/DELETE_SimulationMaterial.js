"use client"

import { useRef, forwardRef } from 'react'
import * as THREE from 'three'
import simVertex from './shaders/simVertex.glsl.js'
import simFragment from './shaders/simFragment.glsl.js'

const SimulationMaterial = forwardRef(({ texture }, ref) => {
  const matRef = useRef()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const scene = new THREE.Scene()

  const uniforms = {
    time: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uPositions: { value: texture },
    uInfo: { value: null },
  }

  const material = new THREE.ShaderMaterial({
    vertexShader: simVertex,
    fragmentShader: simFragment,
    uniforms,
  })

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  scene.add(mesh)

  if (ref) {
    ref.current = { material, uniforms, scene, camera }
  }

  return null
})

export default SimulationMaterial
