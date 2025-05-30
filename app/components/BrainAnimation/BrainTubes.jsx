import React, {useEffect, useRef} from 'react';
import * as THREE from "three";
import { OrbitControls, shaderMaterial } from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';



function Tube({curve}) {
  const brainMatRef = useRef()
  const { viewport } = useThree()

  // useFrame(({clock, mouse}) => {
  //   brainMatRef.current.uniforms.time.value = clock.getElapsedTime()

  //   // brainMatRef.current.uniforms.mouse.value = new THREE.Vector3(
  //   //   mouse.x * viewport.width / 2,
  //   //   mouse.y * viewport.height / 2,
  //   //   0
  //   // )

  //   brainMatRef.current.uniforms.mouse.value = new THREE.Vector3(
  //     (mouse.x + 1) / 2, // Convert from [-1,1] to [0,1]
  //     (mouse.y + 1) / 2,
  //     0
  //   )
  // })
  useFrame(({ clock, mouse, camera, scene }) => {
    brainMatRef.current.uniforms.time.value = clock.getElapsedTime()
  
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, camera)
  
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const intersectPoint = new THREE.Vector3()
    raycaster.ray.intersectPlane(planeZ, intersectPoint)
  
    brainMatRef.current.uniforms.mouse.value.copy(intersectPoint)
  })
  
  const BrainMaterial = shaderMaterial(
    { // UNIFORMS
      time: 0, 
      color: new THREE.Color(0.1, 0.3, 0.6),
      mouse: new THREE.Vector3(0, 0, 0)
    },
    // // vertex shader
    // // glsl ------ MOUSE HOVER AURORA EFFECT
    // `
    //   varying vec2 vUv;
    //   uniform float time;
    //   uniform vec3 mouse;
    //   varying float vProgress;
    //   void main() {
    //     vUv = uv;
    //     vProgress = smoothstep(-1.0, 1.0, sin(vUv.x * 8. + time * 3.));
        
    //     // MOUSE DIRECTION CODE
    //     vec3 p = position;
    //     float maxDist = 0.5;  // Makes Aurora bigger
    //     float dist = length(mouse.xy - vUv);
    //     if (dist < maxDist) {
    //       vec3 dir = 0.5 * normalize(mouse - p);
    //       dir *= 1.0 - dist / maxDist;
    //       p -= dir;
    //     }
    //     gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    //   }
    // `,



    // vertex shader
    `
      uniform float time;
      uniform vec3 mouse; // world-space mouse position
      varying vec2 vUv;
      varying float vProgress;

      void main() {
        vUv = uv;
        vProgress = smoothstep(-1.0, 1.0, sin(vUv.x * 8. + time * 3.));

        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vec3 p = position;

        float maxDist = 0.5; // Play with this
        float dist = distance(mouse, worldPos.xyz);
        
        if (dist < maxDist) {
          float strength = 1.0 - dist / maxDist;
          vec3 dir = normalize(worldPos.xyz - mouse);
          p += dir * strength * 0.05; // distort outward
        }

        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    // fragment shader
    `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying float vProgress;
      void main() {
        // vec3 color1 = vec3(1., 0., 0.);
        // vec3 color2 = vec3(1., 1., 0.);
        // vec3 finalColor = mix(color1, color2, vProgress);
        // gl_FragColor.rgba = vec4(finalColor, 1.);
        
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
      {/* TubeGeometry(
        path,             path tube follows
        tubularSegments,  Higher = smoother tube.
        radius,           thickness of tube.
        radialSegments,   Number of segments around circumference of the tube. 2 = low detail.
        closed); 
      */}
      <tubeGeometry args={[ curve, 64, 0.0009, 2, true ]} />
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
        // wireframe={true}
      />
    </mesh>
  )
}

export default function Tubes({ allTheCurves }) {
  return (
    <>
      {allTheCurves.map((brainCurves, i) => {
        return <Tube key={i} curve={brainCurves} />
      })}
    </>
  )
}