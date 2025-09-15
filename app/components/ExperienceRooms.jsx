"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
// import { MedievalFantasyBook } from "./MedievalFantasyBook";
import FactoryOne from "./FactoryOne";
import FactoryTwo from "./FactoryTwo";
import Drone from "./Drone";
import ParticlePathAnimation from "./ParticlePathAnimation/ParticlePathAnimation";
import Soldier from "./Soldier/Soldier";
import VrHeadset from "./VrHeadset/VrHeadset";
// import { Autofocus, EffectComposer } from "@react-three/postprocessing";
import { isProd } from "../page";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export const ExperienceRooms = ({
  position = [0, -2, 0],
  scale = [1.0, 1.0, 1.0],
}) => {
  // Load GLB with DRACO; DO NOT replace materials so textures stay intact
  const gltf = useLoader(GLTFLoader, "/models/rooms.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/"); // put decoder files in /public/draco/
    loader.setDRACOLoader(dracoLoader);
  });

  // Clone so we can safely add edge overlays without mutating the cached scene
  const root = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Add outline edges on top of each mesh (no material replacement)
  useEffect(() => {
    const overlays = [];
    root.traverse((obj) => {
      if (obj.isMesh && obj.geometry) {
        // const edges = new THREE.LineSegments(
        //   new THREE.EdgesGeometry(obj.geometry),
        //   new THREE.LineBasicMaterial({ color: new THREE.Color("#4b6a7d") })
        // );
        // edges.name = "edgesOverlay";
        // obj.add(edges);
        // overlays.push(edges);
      }
    });
    return () => {
      overlays.forEach((o) => o.parent && o.parent.remove(o));
    };
  }, [root]);

  return (
    <>
      <Environment preset="city" /* background */ blur={4} />

      <group position={position} scale={scale}>
        {/* Render the original glTF hierarchy so all textures/materials show */}
        <primitive object={root} />
      </group>

      {/* <group 
        theatreKey={"Soldier"}
        position={[0, 0, 0]}
        // rotation={[-Math.PI / 2, 0, 0]}
        rotation={[0, 0, 0]}
        // scale={[3, 3, 3]}
      >
        <Soldier scale={3} envMapIntensity={0.3} />
      </group> */}

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

// If you want to warm the loader cache:
// (Preload still works fine in JS—no TS types involved)
// useGLTF.preload("/models/rooms.glb");
