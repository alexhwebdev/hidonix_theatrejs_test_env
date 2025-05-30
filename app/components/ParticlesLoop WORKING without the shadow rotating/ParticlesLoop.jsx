"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import simVertex from "./shaders/simVertex.glsl.js";
import simFragment from "./shaders/simFragment.glsl.js";
import vertexParticles from "./shaders/vertexParticles.glsl.js";
import fragment from "./shaders/fragment.glsl.js";

function FBO({ size = 256, mouse, setPositionsTexture }) {
  const { gl } = useThree();
  const fboRef = useRef();
  const fbo1Ref = useRef();
  const fboSceneRef = useRef();
  const fboCameraRef = useRef();
  const fboMaterialRef = useRef();

  useEffect(() => {
    if (!gl) return;

    const rtParams = {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    };

    const createRenderTarget = () =>
      new THREE.WebGLRenderTarget(size, size, rtParams);

    fboRef.current = createRenderTarget();
    fbo1Ref.current = createRenderTarget();

    const data = new Float32Array(size * size * 4);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const index = (i + j * size) * 4;
        const theta = Math.random() * Math.PI * 2;
        const r = Math.random() * 1.5 + 0.5; // Radius range: 0.5 to 2.0

        data[index] = r * Math.cos(theta);
        data[index + 1] = r * Math.sin(theta);
        data[index + 2] = 0;
        data[index + 3] = 1;
      }
    }
    const positions = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    positions.magFilter = THREE.NearestFilter;
    positions.minFilter = THREE.NearestFilter;
    positions.needsUpdate = true;

    // const infoData = new Float32Array(size * size * 4);
    // for (let i = 0; i < size * size * 4; i++) {
    //   infoData[i] = 1;
    // }

    const infoData = new Float32Array(size * size * 4);
    for (let i = 0; i < size * size; i++) {
      const index = i * 4;
      infoData[index] = Math.random() * 0.7 + 0.9; // radius offset
      infoData[index + 1] = Math.random() * 0.7 + 0.9; // angular speed
      infoData[index + 2] = 0;
      infoData[index + 3] = 1;
    }
    const infoTexture = new THREE.DataTexture(
      infoData,
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    infoTexture.magFilter = THREE.NearestFilter;
    infoTexture.minFilter = THREE.NearestFilter;
    infoTexture.needsUpdate = true;

    const fboScene = new THREE.Scene();
    fboSceneRef.current = fboScene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    fboCameraRef.current = camera;

    const fboMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPositions: { value: positions },
        uInfo: { value: infoTexture },
        uMouse: { value: new THREE.Vector2(0, 0) },
        time: { value: 0 },
      },
      vertexShader: simVertex,
      fragmentShader: simFragment,
    });
    fboMaterialRef.current = fboMaterial;

    const plane = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(plane, fboMaterial);
    fboScene.add(mesh);

    gl.setRenderTarget(fboRef.current);
    gl.render(fboScene, camera);
    gl.setRenderTarget(fbo1Ref.current);
    gl.render(fboScene, camera);
    gl.setRenderTarget(null);

    setPositionsTexture(fboRef.current.texture);
  }, [gl, size, setPositionsTexture, simFragment, simVertex]);

  useFrame(({ clock }) => {
    if (
      !fboRef.current ||
      !fbo1Ref.current ||
      !fboSceneRef.current ||
      !fboCameraRef.current ||
      !fboMaterialRef.current
    )
      return;

    const time = clock.elapsedTime;
    fboMaterialRef.current.uniforms.time.value = time;
    fboMaterialRef.current.uniforms.uMouse.value = mouse;

    fboMaterialRef.current.uniforms.uPositions.value = fbo1Ref.current.texture;

    gl.setRenderTarget(fboRef.current);
    gl.render(fboSceneRef.current, fboCameraRef.current);
    gl.setRenderTarget(null);

    const temp = fboRef.current;
    fboRef.current = fbo1Ref.current;
    fbo1Ref.current = temp;

    setPositionsTexture(fboRef.current.texture);
  });

  return null;
}

function Particles({ size = 256, positionsTexture }) {
  const pointsRef = useRef();
  const materialRef = useRef();

  const geometry = useMemo(() => {
    const count = size * size;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);
    const uvs = new Float32Array(count * 2);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const index = i + j * size;
        positions[index * 3] = 0;
        positions[index * 3 + 1] = 0;
        positions[index * 3 + 2] = 0;

        uvs[index * 2] = i / (size - 1);
        uvs[index * 2 + 1] = j / (size - 1);
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

    return geometry;
  }, [size]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
      materialRef.current.uniforms.uPositions.value = positionsTexture;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          time: { value: 0 },
          uPositions: { value: null },
        }}
        vertexShader={vertexParticles}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticlesLoopPage() {
  const [mouse, setMouse] = useState(new THREE.Vector2(0, 0));
  const [positionsTexture, setPositionsTexture] = useState(null);

  const handlePointerMove = (e) => {
    setMouse(
      new THREE.Vector2(
        // (e.clientX / window.innerWidth) * 2 - 1,
        // -(e.clientY / window.innerHeight) * 2 + 1
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      )
    );
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 70 }}>
        <ambientLight />
        <OrbitControls />
        <FBO size={256} mouse={mouse} setPositionsTexture={setPositionsTexture} />
        {positionsTexture && <Particles size={256} positionsTexture={positionsTexture} />}
      </Canvas>
    </div>
  );
}
