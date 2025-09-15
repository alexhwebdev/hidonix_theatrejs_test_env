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
import FactoryOne from "./FactoryOne";
import FactoryTwo from "./FactoryTwo";
import Drone from "./Drone";
import ParticlePathAnimation from "./ParticlePathAnimation/ParticlePathAnimation";
import Soldier from "./Soldier/Soldier";
import VrHeadset from "./VrHeadset/VrHeadset";



export const ExperienceFactories = () => {
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
        theatreKey={"Soldier"}
        position={[0, 0, 0]}
        // rotation={[-Math.PI / 2, 0, 0]}
        rotation={[0, 0, 0]}
        // scale={[3, 3, 3]}
      >
        <Soldier scale={3} envMapIntensity={0.3} />
      </group>
      <group 
        theatreKey={"VrHeadset"}
        position={[0, 2.2, 1.3]}
        rotation={[-Math.PI / 2, 0, 0]}
        // scale={[1, 1, 1]}
      >
        <VrHeadset scale={0.04} />
      </group>
{/* 
      <group 
        theatreKey={"Factory"}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.01, 0.01, 0.01]}
      >
        <FactoryOne scale={0.2} envMapIntensity={0.3} />
      </group>

      <group 
        theatreKey="FactoryTwo" 
        position={[30, 0, -30]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.01, 0.01, 0.01]}
      >
        <FactoryTwo scale={0.2} envMapIntensity={0.3} />
      </group> */}


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
