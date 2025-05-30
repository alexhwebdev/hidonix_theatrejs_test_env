import React, {useEffect, useRef} from 'react';
import * as THREE from "three";
import { OrbitControls, shaderMaterial } from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';



function Tube({curve}) {
  const brainMatRef = useRef()
  const { viewport } = useThree()

  useFrame(({clock}) => {
    brainMatRef.current.uniforms.time.value = clock.getElapsedTime()

  })

  const BrainMaterial = shaderMaterial(
    { // UNIFORMS
      time: 0, 
      color: new THREE.Color(0.1, 0.3, 0.6),
      // mouse: new THREE.Vector3(0, 0, 0)
    },
    // vertex shader
    `
      uniform float time;
      varying vec2 vUv;
      varying float vProgress;
      void main() {
        vUv = uv;
        vProgress = smoothstep(-1.0, 1.0, sin(vUv.x * 8. + time * 3.));
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    // fragment shader
    `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying float vProgress;
      void main() {        
        vec3 finalColor = mix(color, color * 0.25, vProgress);  // mix(a, b, t) linearly interpolates between two values a and b using t (0 = a, 1 = b).
        float hideCorners = smoothstep(1., 0.1, vUv.x);  // Hide corners from each end
        float hideCorners1 = smoothstep(0., 0.1, vUv.x);  // Hide corners from each end
        // gl_FragColor.rgba = vec4(vec3(vProgress), 1.);
        gl_FragColor.rgba = vec4(finalColor, hideCorners * hideCorners1);
        
        // gl_FragColor.rgba = vec4(vec3(vProgress), 1.);  // Oscilation test
      }
    `
  )
  
  // declaratively
  extend({ BrainMaterial })

  return (
    <mesh>
      {/* 
      TubeGeometry(
        path,             path tube follows
        tubularSegments,  Higher = smoother tube.
        radius,           thickness of tube.
        radialSegments,   Number of segments around circumference of the tube. 2 = low detail.
        closed
      ); 
      */}
      <tubeGeometry args={[ curve, 364, 0.009, 2, true ]} />
      {/* <meshStandardMaterial 
        color="hotpink" 
        // wireframe
      /> */}
      <brainMaterial 
        ref={brainMatRef}
        side={THREE.DoubleSide}
        depthWrite={false}  // Prevents the material from writing to the depth buffer, which can help avoid visual issues when layering transparent objects
        depthTest={false}   // Disables depth testing, meaning this material won't be occluded by other objects based on depth. This is often used for glowing or volumetric effects.

        blending={THREE.AdditiveBlending}
        transparent
        wireframe={true}
      />
    </mesh>
  )
}

export default function OrbTubes({ allTheCurves }) {
  return (
    <>
      {allTheCurves.map((brainCurves, i) => {
        return <Tube key={i} curve={brainCurves} />
      })}
    </>
  )
}