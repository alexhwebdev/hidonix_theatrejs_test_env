"use client";

import { 
  Environment,
  Float,
  Html
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Autofocus, EffectComposer } from "@react-three/postprocessing";
import { editable as e } from "@theatre/r3f";
import { useRef, Suspense } from "react";
import { Vector3 } from "three";
import { isProd } from "../page";
// import { MedievalFantasyBook } from "./MedievalFantasyBook";
import Stadium from "./Stadium";
import StadiumTwo from "./StadiumTwo";
import Drone from "./Drone";
import ParticlePathAnimation from "./ParticlePathAnimation/ParticlePathAnimation";



export const Experience = () => {
  const focusTargetRef = useRef(new Vector3(0, 0, 0));
  const focusTargetVisualizerRef = useRef();

  useFrame(() => {
    if (focusTargetVisualizerRef.current) {
      focusTargetRef.current.copy(focusTargetVisualizerRef.current.position);
    }
  });

  return (
    <>
      <Environment 
        preset="city" 
        // background 
        blur={4} 
      />


      <group 
        theatreKey={"Stadium"}
        position={[0, 0, 0]}
        scale={[1.0, 1.0, 1.0]}
      >
        <Stadium scale={0.2} envMapIntensity={0.3} />
      </group>


      <group 
        theatreKey="StadiumTwo" 
        position={[10, 0, 0]}
        scale={[1.0, 1.0, 1.0]}
      >
        <StadiumTwo scale={0.2} envMapIntensity={0.3} />

        <Drone 
          position={[0.2, -1.5, 0]}
          rotation={[5, 5, 5]}
          scale={[0, 0, 0]}
        />
      </group>


      {/* <e.mesh
        theatreKey="FocusTarget"
        ref={focusTargetVisualizerRef}
        visible="editor"
      >
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshBasicMaterial color="red" wireframe />
      </e.mesh> */}

      {/* <EffectComposer>
        <Autofocus
          target={focusTargetRef.current}
          smoothTime={0.1}
          // debug={0.04}
          debug={isProd ? undefined : 0.04}
          focusRange={0.002}
          bokehScale={8}
        />
      </EffectComposer> */}

    </>
  );
};
