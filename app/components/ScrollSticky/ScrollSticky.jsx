// https://stackoverflow.com/questions/78949082/threejs-phone-vertical-sticky-carousel-react-three-fiber?newreg=563c2c60ca3744e597b664f6236fd410
// https://codesandbox.io/p/sandbox/r3f-scroll-rig-sticky-box-forked-hsq9xh?file=%2Fsrc%2FApp.js%3A13%2C1

"use client"
import React, { useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './scroll-control.scss'

gsap.registerPlugin(ScrollTrigger)

const IphoneModel = ({ image, modelIndex }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Iphone15.glb')

  useEffect(() => {
    // const imageTexture = new THREE.TextureLoader().load(
    //  'https://images.unsplash.com/photo-1726661025464-818c9abd6da9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // )

    const imageTexture = new THREE.TextureLoader().load(image)

    imageTexture.wrapS = imageTexture.wrapT = THREE.RepeatWrapping
    imageTexture.anisotropy = 16
    imageTexture.repeat = new THREE.Vector2(1, -1)

    materials.Screen.map = imageTexture
    materials.Screen.needsUpdate = true

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#section-${modelIndex}`,
        scrub: 4,
        pin: true,
        start: 'top top',
        end: 'bottom top',
        // markers: true
      }
    })

    tl.to(group.current.rotation, { z: Math.PI / 8, duration: 6 })
  }, [image, materials.Screen, modelIndex])

  return (
    <group ref={group} dispose={null} scale={0.2} rotation={[Math.PI / 2, 0, -Math.PI / 8]}>
      <mesh geometry={nodes.M_Cameras.geometry} material={materials.cam} />
      <mesh geometry={nodes.M_Glass.geometry} material={materials['glass.001']} />
      <mesh geometry={nodes.M_Metal_Rough.geometry} material={materials.metal_rough} />
      <mesh geometry={nodes.M_Metal_Shiny.geometry} material={materials.metal_Shiny} />
      <mesh geometry={nodes.M_Plastic.geometry} material={materials.metal_rough} />
      <mesh geometry={nodes.M_Portal.geometry} material={materials['M_Base.001']} />
      <mesh geometry={nodes.M_Screen.geometry} material={materials.Screen} />
      <mesh geometry={nodes.M_Speakers.geometry} material={materials.metal_rough} />
      <mesh geometry={nodes.M_USB.geometry} material={materials.metal_rough} />
    </group>
  )
}

const Background = () => {
  const { scene } = useThree()
  useEffect(() => {
    scene.background = new THREE.Color('#555555')
  }, [scene])

  return null
}

const ThreeScene = ({ image, modelIndex }) => (
  <div id={`three-canvas-container-${modelIndex}`} style={{ position: 'absolute', top: 0, right: 0, width: '50vw', height: '100vh' }}>
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: false }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <IphoneModel image={image} modelIndex={modelIndex} />
      <OrbitControls enableZoom={false} />
      <Background />
    </Canvas>
  </div>
)

const Section = ({ 
  image, 
  title, content, modelIndex }) => (
  <div id={`section-${modelIndex}`} style={{ display: 'flex', alignItems: 'center', height: '100vh', position: 'relative' }}>
    <div style={{ width: '50vw', padding: '0 2rem' }}>
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
    <ThreeScene 
      image={image} 
      modelIndex={modelIndex} 
    />
  </div>
)

const json = [
  {
    id: 1,
    title: '1',
    content: 'Lorem Ipsum is simply dummy text of<br />the printing and typesetting industry.',
    image: 'https://images.unsplash.com/photo-1726661025464-818c9abd6da9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    title: '2',
    content: 'Lorem Ipsum is simply dummy text of<br />the printing and typesetting industry.',
    image: 'https://images.unsplash.com/photo-1726661025464-818c9abd6da9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    title: '3',
    content: 'Lorem Ipsum is simply dummy text of<br />the printing and typesetting industry.',
    image: 'https://images.unsplash.com/photo-1726661025464-818c9abd6da9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 4,
    title: '4',
    content: 'Lorem Ipsum is simply dummy text of<br />the printing and typesetting industry.',
    image: 'https://images.unsplash.com/photo-1726661025464-818c9abd6da9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]

const ScrollSticky = () => (
  <div style={{ height: '300vh' }}>
    {json.map((item, index) => (
      <Section key={index} 
        image={item.image} 
        modelIndex={item.id} 
        title={item.title} 
        content={item.content} 
      />
    ))}
  </div>
)

export default ScrollSticky
