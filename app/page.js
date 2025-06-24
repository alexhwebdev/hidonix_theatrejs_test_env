"use client"

import { useEffect, useRef, useState, useLayoutEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import { PerspectiveCamera, SheetProvider, editable as e } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";
import { Experience } from "./components/Experience";
import projectState from "../assets/MedievalTown.theatre-project-state.json";
import { 
  useGLTF, 
  Stage, 
  Grid, 
  OrbitControls, 
  Environment, 
  SoftShadows 
} from '@react-three/drei'
import CameraMovement from "./components/CameraMovement";
import CustomGrid from "./components/CustomGrid";


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);




export const isProd = process.env.NODE_ENV === "production";
// console.log(" process.env.NODE_ENV:",  process.env.NODE_ENV);

if (!isProd) {
  studio.initialize();
  studio.extend(extension);
}

const project = getProject(
  "MedievalTown",
  isProd
    ? {
        state: projectState,
      }
    : undefined
);
const mainSheet = project.sheet("Main");

const sceneOrder = ["Scene1", "Scene2", "Scene3", "Scene4", "Scene5", "Scene6"];
const transitions = {
  Scene1: [0, 5],
  Scene2: [5, 8],
  Scene3: [8, 12],

  Scene4: [12, 15],
  Scene5: [15, 18],
  Scene6: [18, 21],
};

function App() {
  const cameraOffsetGroupRef = useRef()
  const cameraTargetRef = useRef();


  
  return (
    <>
      {/* Scrollable page: 1 full-height div per scene */}
      <div style={{ height: "600vh", position: "absolute", top: 0, left: 0, width: "100%", zIndex: -1 }} />

      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        frameloop="always"
        // camera={{ position: [5, 5, 20], fov: 30, near: 1 }}
        shadows
        gl={{ preserveDrawingBuffer: true }}
      >

        {/* <SoftShadows /> */}
        <OrbitControls />
        {/* <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}

        {/* <fog attach="fog" args={['black', 15, 22.5]} /> */}

        <CustomGrid
          position={[0, -1.85, 0]}
          cellSize={3.0}
          cellThickness={0.005}
          dotRadius={0.02}
          sectionColor={[1.0, 1.0, 1.0]}
          // sectionColor={[0.0, 0.0, 0.0]}
          // sectionColor={[0.5, 0.5, 0.5]}
          dotColor={[0.6, 0.1, 0.1]}
          fadeDistance={15}
          planeSize={50}
        />

        {/* <Grid 
          renderOrder={-1} 
          position={[0, -1.85, 0]} 
          infiniteGrid 
          cellSize={0.6} 
          cellThickness={0.6} 
          sectionSize={2.3} 
          sectionThickness={1.5} 
          // sectionColor={[0.5, 0.5, 10]} 
          sectionColor={[1, 1, 1]} // Dark red
          fadeDistance={30} 
        /> */}

        <SheetProvider sheet={mainSheet}>
          <group ref={cameraOffsetGroupRef}>
            <PerspectiveCamera
              makeDefault
              fov={30}
              far={2000} 
              near={1}
              zoom={1}
              position={[0, 10, 20]}
              theatreKey="Camera"
              lookAt={cameraTargetRef}
            />
          </group>

          <e.mesh
            theatreKey="Camera Target"
            visible="editor"
            ref={cameraTargetRef}
          >
            <octahedronGeometry args={[0.1, 0]} />
            <meshPhongMaterial color="yellow" />
          </e.mesh>

          <Experience />
        </SheetProvider>
        
      </Canvas>

    </>
  );
}

export default App;

// useGLTF.setDRACOLoader(...) should only be called once, not inside the React component.
// vallourec_stadium.glb must be exported with Draco compression for this to be effective.