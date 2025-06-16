"use client"

import { useEffect, useRef, useState, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import { PerspectiveCamera, SheetProvider, editable as e } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";
import { UI } from "./components/UI";
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

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);




export const isProd = process.env.NODE_ENV === "development";
console.log(" process.env.NODE_ENV:",  process.env.NODE_ENV);

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
  const [currentScreen, setCurrentScreen] = useState("Intro");
  const [targetScreen, setTargetScreen] = useState("Scene1");
  const scrollLock = useRef(false);

useEffect(() => {
  project.ready.then(() => {
    console.log("Sequence duration:", mainSheet.sequence.pointer.length);
  });
}, []);

  // Prevent scroll position from jumping on initial load
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        })
        .then(() => {
          setCurrentScreen(targetScreen);
        });
    });
  }, [targetScreen]);

  // Handle scroll position and snap
  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollLock.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentIdx = sceneOrder.indexOf(targetScreen);
      const newIdx = Math.max(0, Math.min(sceneOrder.length - 1, currentIdx + direction));
      if (newIdx === currentIdx) return;

      const nextScene = sceneOrder[newIdx];
      setTargetScreen(nextScene);

      scrollLock.current = true;
      window.scrollTo({
        top: newIdx * window.innerHeight,
        behavior: "smooth",
      });

      setTimeout(() => {
        scrollLock.current = false;
      }, 1200); // Match transition time
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [targetScreen]);

  // Sync scene index on manual scroll (e.g. user dragging scrollbar)
  useEffect(() => {
    const handleScroll = () => {
      const index = Math.round(window.scrollY / window.innerHeight);
      const nextScene = sceneOrder[Math.max(0, Math.min(sceneOrder.length - 1, index))];
      if (nextScene !== targetScreen) {
        setTargetScreen(nextScene);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetScreen]);

  return (
    <>
      {/* Scrollable page: 1 full-height div per scene */}
      <div style={{ height: "600vh", position: "absolute", top: 0, left: 0, width: "100%", zIndex: -1 }} />

      {/* <UI
        currentScreen={currentScreen}
        onScreenChange={(scene) => {
          const idx = sceneOrder.indexOf(scene);
          setTargetScreen(scene);
          window.scrollTo({ top: idx * window.innerHeight, behavior: "smooth" });
        }}
        isAnimating={currentScreen !== targetScreen}
      /> */}

      <UI
        currentScreen={currentScreen}
        onScreenChange={setTargetScreen}
        isAnimating={currentScreen !== targetScreen}
      />

      <Canvas
        camera={{ position: [5, 5, 20], fov: 30, near: 1 }}
        shadows
        gl={{ preserveDrawingBuffer: true }}
      >
        <CameraMovement cameraGroupRef={cameraOffsetGroupRef} intensity={0.4} />

        {/* <SoftShadows /> */}
        {/* <OrbitControls /> */}
        {/* <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}

        <fog attach="fog" args={['black', 15, 22.5]} />
        <Grid 
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
        />

        
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
          {/* <PerspectiveCamera
            position={[5, 5, 20]}
            fov={30}
            near={1}
            makeDefault
            theatreKey="Camera"
            lookAt={cameraTargetRef}
          /> */}

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