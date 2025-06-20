"use client"

import { useEffect, useRef, useState, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import { PerspectiveCamera, SheetProvider, editable as e } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";
import { Experience } from "./components/Experience";
import projectState from "../assets/MedievalTown.theatre-project-state.json";
import { OrbitControls } from '@react-three/drei'

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
  console.log('HIT')
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

const sceneOrder = [
  "Scene1", "Scene2", "Scene3", 
  // "Scene4", "Scene5", "Scene6"
];
const transitions = {
  Scene1: [0, 4],
  Scene2: [4, 8],
  Scene3: [8, 12],

  // Scene4: [12, 15],
  // Scene5: [15, 18],
  // Scene6: [18, 21],
};




function App() {
  const cameraOffsetGroupRef = useRef()
  const cameraTargetRef = useRef();
  const [currentScreen, setCurrentScreen] = useState("Intro");
  const [targetScreen, setTargetScreen] = useState("Scene1");


  // // Prevent scroll position from jumping on initial load
  // useLayoutEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // Run Theatre.js transition when targetScreen changes
  useEffect(() => {
    project.ready.then(() => {
      if (currentScreen === targetScreen) return;

      const reverse = sceneOrder.indexOf(targetScreen) < sceneOrder.indexOf(currentScreen);
      const transition = transitions[reverse ? currentScreen : targetScreen];
      if (!transition) return;

      mainSheet.sequence
        .play({
          range: transition,
          direction: reverse ? "reverse" : "normal",
          rate: reverse ? 1 : 1,
          loop: false,
        })
        .then(() => {
          setCurrentScreen(targetScreen);
        });
    });
  }, [targetScreen]);


  // // Handle scroll position and snap
  // useEffect(() => {
  //   const handleWheel = (e) => {
  //     if (scrollLock.current) return;

  //     const direction = e.deltaY > 0 ? 1 : -1;
  //     const currentIdx = sceneOrder.indexOf(targetScreen);
  //     const newIdx = Math.max(0, Math.min(sceneOrder.length - 1, currentIdx + direction));
  //     if (newIdx === currentIdx) return;

  //     const nextScene = sceneOrder[newIdx];
  //     setTargetScreen(nextScene);

  //     scrollLock.current = true;
  //     window.scrollTo({
  //       top: newIdx * window.innerHeight,
  //       behavior: "smooth",
  //     });

  //     setTimeout(() => {
  //       scrollLock.current = false;
  //     }, 1200); // Match transition time
  //   };

  //   window.addEventListener("wheel", handleWheel, { passive: true });
  //   return () => window.removeEventListener("wheel", handleWheel);
  // }, [targetScreen]);

  // // Sync scene index on manual scroll (e.g. user dragging scrollbar)
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const index = Math.round(window.scrollY / window.innerHeight);
  //     const nextScene = sceneOrder[Math.max(0, Math.min(sceneOrder.length - 1, index))];
  //     if (nextScene !== targetScreen) {
  //       setTargetScreen(nextScene);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [targetScreen]);



  
  return (
    <>
      {/* Scrollable page: 1 full-height div per scene */}
      <div style={{ height: "600vh", position: "absolute", top: 0, left: 0, width: "100%", zIndex: -1 }} />

      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        frameloop="always"
        camera={{ position: [5, 5, 20], fov: 30, near: 1 }}
        shadows
        gl={{ preserveDrawingBuffer: true }}
      >

        {/* <SoftShadows /> */}
        <OrbitControls />

        <SheetProvider sheet={mainSheet}>
          <group ref={cameraOffsetGroupRef}>
            <PerspectiveCamera
              position={[5, 5, 20]}
              fov={30}
              near={1}
              makeDefault
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

        <CustomGrid
          position={[0, -1.85, 0]}
          cellSize={3.0}
          cellThickness={0.005}       // thinner grid lines
          dotRadius={0.02}            // larger dots
          sectionColor={[0.5, 0.5, 0.5]}    // grid line color
          dotColor={[0.6, 0.1, 0.1]} 
          fadeDistance={15}
          planeSize={50}
        />
      </Canvas>


      {/* <svg width="76" height="90" viewBox="0 0 76 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="cls-1" d="M32 89C32 87.4 11.3333 39 1 15L25.5 12L64.5 83" stroke="black"/>
        <path className="cls-1" d="M39.5 87.5L1.5 4.5L25.5 1L75 81" stroke="black"/>
        <path className="cls-1" d="M1.5 4.5V15.5L26 12V1L1.5 4.5Z" stroke="black"/>
      </svg> */}

    </>
  );
}

export default App;

// useGLTF.setDRACOLoader(...) should only be called once, not inside the React component.

// vallourec_stadium.glb must be exported with Draco compression for this to be effective.