// https://www.youtube.com/watch?v=OCjwL5QbiMg
"use client";

import React, {useState, useMemo, useEffect, useRef, useLayoutEffect} from 'react';
import * as THREE from "three";
import gsap from 'gsap'
import { OrbitControls, shaderMaterial, useScroll,
  useGLTF
} from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';
import Tubes from './BrainTubes';
import {data} from './data.js';

// console.log("data", data);
const PATHS = data.economics[0].paths;
// console.log("PATHS", PATHS);

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
}

// // ---------- setFromSphericalCoords paths
// let curves = [];
// for (let i = 0; i < 100; i++) {
//   let points = [];
//   let length = randomRange(0.5, 1);
//   for (let j = 0; j < 100; j++) {
//     points.push(
//       // setFromSphericalCoords(radius, phi, theta);
//       new THREE.Vector3().setFromSphericalCoords(
//         1,
//         Math.PI - (j / 100) * Math.PI * length,
//         (i / 100) * Math.PI * 2
//       )
//     )
//   }
//   let tempcurve = new THREE.CatmullRomCurve3(points)
//   curves.push(tempcurve)
// }


// ---------- brain vector paths
let brainCurves = [];
PATHS.forEach((path) => {
  let points = [];
  for (let i = 0; i < 100; i+=3) {
    points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]));
  }
  let tempcurve = new THREE.CatmullRomCurve3(points)
  brainCurves.push(tempcurve)
})
// console.log("brainCurves", brainCurves);


function BrainParticles({ allTheCurves }) {
  let density = 10;  // 10 points per curve in brain
  let numberOfPoints = allTheCurves.length * density;
  let myPoints = useRef([]);
  let brainPartGeoRef = useRef();
  // console.log("brainPartGeoRef", brainPartGeoRef);

  // useMemo ensures that arrays are only generated once (on the initial render), and not on every re-render.
  let positions = useMemo(() => {
    let positions = [];
    for (let i = 0; i < numberOfPoints; i++) {
      positions.push(
        randomRange(-1, 1), randomRange(-1, 1), randomRange(-1, 1)
      )
    }
    return new Float32Array(positions);
  }, []);  // [], these buffers stay constant throughout component's lifecycle.
  // console.log("positions", positions);

  let randoms = useMemo(() => {
    let randoms = [];
    for (let i = 0; i < numberOfPoints; i++) {
      randoms.push(
        randomRange(0.1, 1)
      )
    }
    return new Float32Array(randoms);
  }, []);

  // Initialize list of particles to use later with "useFrame"
  useEffect(() => {
    // console.log("myPoints", myPoints);
    // console.log("density", density);
    for(let i = 0; i < allTheCurves.length; i++) {
      for(let j = 0; j < density; j++) {
        myPoints.current.push({
          curpositions: Math.random(),
          // currentOffset: Math.random(),
          curve: allTheCurves[i],
          speed: Math.random() * 0.001
        })
      }
    }
  }, []);

  useFrame(({ clock }) => {
    let curpositions = brainPartGeoRef.current.attributes.position.array;
    // Update each particles position
    for (let i = 0; i < myPoints.current.length; i++) {
      myPoints.current[i].curpositions += myPoints.current[i].speed;
      myPoints.current[i].curpositions = myPoints.current[i].curpositions % 1;  // % 1 ensures looping behavior (once it reaches 1, it wraps back to 0).
      
      // Calculate new position on curve
      let curPoint = myPoints.current[i].curve.getPointAt(
        myPoints.current[i].curpositions
      );
      // Write the position into the buffer
      curpositions[i * 3] = curPoint.x;
      curpositions[i * 3 + 1] = curPoint.y;
      curpositions[i * 3 + 2] = curPoint.z;
    }
    // Tell Three.js to update GPU
    brainPartGeoRef.current.attributes.position.needsUpdate = true;
  })

  const BrainParticleMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.1, 0.3, 0.6) },
    // vertex shader
    `
      uniform float time;
      varying float vProgress;
      // varying vec2 vUv;
      attribute float randoms;
      void main() {
        // vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        // gl_PointSize = randoms * 20.;
        gl_PointSize = randoms * 20. * (1. / -mvPosition.z);  // Size attenuation
      }
    `,
    // fragment shader
    `
      uniform float time;
      void main() {
        float disc = length(gl_PointCoord.xy - vec2(0.5));  // gl_PointCoord gives you UV coordinates of the fragment inside the point
        float opacity = 0.3 * smoothstep(0.5, 0.4, disc);   // creates round particle
        // float st = length(gl_PointCoord.xy - vec2(0.5));
        gl_FragColor.rgba = vec4(vec3(opacity), 1.);
      }
    `
  )
  // declaratively
  extend({ BrainParticleMaterial })

  return (
    <>
      <points>
        <bufferGeometry attach="geometry" 
          ref={brainPartGeoRef}
        >
          <bufferAttribute
            // attachObject={['attributes', 'position']}
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-randoms"
            count={randoms.length}
            array={randoms}
            itemSize={1}
          />
        </bufferGeometry>
        <brainParticleMaterial 
          // ref={myPoints}
          attach="material"
          transparent={true} 
          depthTest={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          // wireframe={true}
        />
      </points>
    </>
  )
}


const BrainAnimation = (
  { position = [0, 0, 0],scale = [1, 1, 1]}
) => {
  const pointsRef = useRef()
  const tl = useRef();
  const scroll = useScroll();

  useLayoutEffect(() => {
    if (!pointsRef.current) return;

    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(pointsRef.current.position, { x: 0, y: 0, z: 1.0 }, 0)
      .to(pointsRef.current.rotation, { x: 0, y: 1, z: 0 }, 0)

      // .to(pointsRef.current.position, { x: 0, y: 0, z: 1.0 }, 0.5)
      // .to(pointsRef.current.rotation, { x: 0, y: 1.5, z: 0 }, 0.5)

      .to(pointsRef.current.position, { x: 0, y: 0, z: 1.0 }, 1)
      .to(pointsRef.current.rotation, { x: 0, y: 2, z: 0 }, 1)

      .to(pointsRef.current.position, { x: 0, y: 0, z: 1.0 }, 2)
      .to(pointsRef.current.rotation, { x: 0, y: 3, z: 0 }, 2)

      .to(pointsRef.current.position, { x: 0, y: 0, z: 1.0 }, 3)
      .to(pointsRef.current.rotation, { x: 0, y: 4, z: 0 }, 3)

      .to(pointsRef.current.position, { x: 0, y: 0, z: 1.0 }, 4)
      .to(pointsRef.current.rotation, { x: 0, y: 5, z: 0 }, 4)

      .to(pointsRef.current.position, { x: 0, y: 0, z: 1.0 }, 5)
      .to(pointsRef.current.rotation, { x: 0, y: 6, z: 0 }, 5)
  }, []);

  // First: The core of your GSAP setup seems correct:
  // You’re:
  // Using useLayoutEffect to set up a gsap.timeline.
  // Storing it in a ref.
  // Driving it using scroll.offset inside useFrame.

  useFrame(() => {
    // console.log("Scroll offset:", scroll);
    if (tl.current && scroll) {
      tl.current.progress(scroll.offset);
    }
  });

  return (
    <group 
      ref={pointsRef}
      position={position} 
      scale={scale}
    >
      {/* <pointLight position={[10, 10, 10]} /> */}
      <Tubes allTheCurves={brainCurves} />
      <BrainParticles allTheCurves={brainCurves} />

      {/* <OrbitControls /> */}
    </group>
  )
}

export default BrainAnimation