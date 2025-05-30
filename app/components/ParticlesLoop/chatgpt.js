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
  const manualTime = useRef(0);

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
      infoData[index] = Math.random() * 1.0 + 0.5; // radius offset
      infoData[index + 1] = Math.random() * 1.0 + 0.9; // angular speed
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

    // const time = clock.elapsedTime;
    manualTime.current += 0.2;  // Higher the number, more waves
    const time = manualTime.current;

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
  const timeRef = useRef(0);

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

  timeRef.current += 0.02;  // Higher the number, more waves
  const time = timeRef.current;

  useFrame(({ 
    clock,
  }) => {
    timeRef.current += 0.02;
    if (materialRef.current) {
      // materialRef.current.uniforms.time.value = clock.elapsedTime;
      materialRef.current.uniforms.time.value = timeRef.current;
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
      <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
        <ambientLight />
        <OrbitControls />
        <FBO size={256} mouse={mouse} setPositionsTexture={setPositionsTexture} />
        {positionsTexture && <Particles size={256} positionsTexture={positionsTexture} />}
      </Canvas>
    </div>
  );
}
export default `
varying vec4 vColor;

void main() {
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);    // red
    gl_FragColor = vColor;
}
`;

export default `
uniform float time;
uniform sampler2D uPositions;
varying vec2 vUv;
varying vec4 vColor;

void main() {
    vUv = uv;
    vec4 pos = texture2D(uPositions, uv);

    float angle = atan(pos.y, pos.x);    // <— use reconstructed angle
    float radius = length(pos.xy);       // <— use radius for potential effects

    // Controls dark shadow follwing the particles. 
    // Gives dissapearing effect.
    // vColor passed to fragment.glsl
    // vColor = 0.8 * vec4(0.5 + 0.45 * sin(angle + time * 0.4));
    vColor = 0.8 * vec4(vec3(0.5 + 0.45 * sin(angle + time * 0.4)), 1.0);

    vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
    gl_PointSize = 1.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

export default `

precision highp float;

// attribute vec3 position;
varying vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position, 1.0);
}
`;
export default `
uniform float time;
uniform sampler2D uPositions;
uniform sampler2D uInfo;
uniform vec2 uMouse;
varying vec2 vUv;

// CURL NOISE function (kept as is from your original)
// ---------- CURL NOISE
#define PI 3.1415926538

const float EPS = 0.001;
vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
float mod289(float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}
float permute(float x) {
    return mod289(((x*34.0)+1.0)*x);
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
float taylorInvSqrt(float r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec4 grad4(float j, vec4 ip) {
    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 p, s;
    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
    s = vec4(lessThan(p, vec4(0.0)));
    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;
    return p;
}
#define F4 0.309016994374947451

vec4 simplexNoiseDerivatives (vec4 v) {
    const vec4  C = vec4( 0.138196601125011, 0.276393202250021, 0.414589803375032, -0.447213595499958);
    vec4 i = floor(v + dot(v, vec4(F4)) );
    vec4 x0 = v -   i + dot(i, C.xxxx);
    vec4 i0;
    vec3 isX = step( x0.yzw, x0.xxx );
    vec3 isYZ = step( x0.zww, x0.yyz );
    i0.x = isX.x + isX.y + isX.z;
    i0.yzw = 1.0 - isX;
    i0.y += isYZ.x + isYZ.y;
    i0.zw += 1.0 - isYZ.xy;
    i0.z += isYZ.z;
    i0.w += 1.0 - isYZ.z;
    vec4 i3 = clamp( i0, 0.0, 1.0 );
    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );
    vec4 x1 = x0 - i1 + C.xxxx;
    vec4 x2 = x0 - i2 + C.yyyy;
    vec4 x3 = x0 - i3 + C.zzzz;
    vec4 x4 = x0 + C.wwww;
    i = mod289(i);
    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
    vec4 j1 = permute( permute( permute( permute (
    i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
    + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
    + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
    + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;
    vec4 p0 = grad4(j0, ip);
    vec4 p1 = grad4(j1.x, ip);
    vec4 p2 = grad4(j1.y, ip);
    vec4 p3 = grad4(j1.z, ip);
    vec4 p4 = grad4(j1.w, ip);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    p4 *= taylorInvSqrt(dot(p4, p4));
    vec3 values0 = vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)); //value of contributions from each corner at point
    
    vec2 values1 = vec2(dot(p3, x3), dot(p4, x4));
    vec3 m0 = max(0.5 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0); //(0.5 - x^2) where x is the distance
    
    vec2 m1 = max(0.5 - vec2(dot(x3, x3), dot(x4, x4)), 0.0);
    vec3 temp0 = -6.0 * m0 * m0 * values0;
    vec2 temp1 = -6.0 * m1 * m1 * values1;
    vec3 mmm0 = m0 * m0 * m0;
    vec2 mmm1 = m1 * m1 * m1;
    float dx = temp0[0] * x0.x + temp0[1] * x1.x + temp0[2] * x2.x + temp1[0] * x3.x + temp1[1] * x4.x + mmm0[0] * p0.x + mmm0[1] * p1.x + mmm0[2] * p2.x + mmm1[0] * p3.x + mmm1[1] * p4.x;
    float dy = temp0[0] * x0.y + temp0[1] * x1.y + temp0[2] * x2.y + temp1[0] * x3.y + temp1[1] * x4.y + mmm0[0] * p0.y + mmm0[1] * p1.y + mmm0[2] * p2.y + mmm1[0] * p3.y + mmm1[1] * p4.y;
    float dz = temp0[0] * x0.z + temp0[1] * x1.z + temp0[2] * x2.z + temp1[0] * x3.z + temp1[1] * x4.z + mmm0[0] * p0.z + mmm0[1] * p1.z + mmm0[2] * p2.z + mmm1[0] * p3.z + mmm1[1] * p4.z;
    // float dw = temp0[0] * x0.w + temp0[1] * x1.w + temp0[2] * x2.w + temp1[0] * x3.w + temp1[1] * x4.w + mmm0[0] * p0.w + mmm0[1] * p1.w + mmm0[2] * p2.w + mmm1[0] * p3.w + mmm1[1] * p4.w;
    
    
    // return vec4(dx, dy, dz, dw) * 49.0;
    return vec4(dx, dy, dz, 0.0) * 49.0;
}
vec3 curl( in vec3 p, in float noiseTime, in float persistence ) {
    vec4 xNoisePotentialDerivatives = vec4(0.0);
    vec4 yNoisePotentialDerivatives = vec4(0.0);
    // vec4 zNoisePotentialDerivatives = vec4(0.0);
    
    
    for (int i = 0; i < 2; ++i) {
        float twoPowI = pow(2.0, float(i));
        float scale = 0.5 * twoPowI * pow(persistence, float(i));
        xNoisePotentialDerivatives += simplexNoiseDerivatives(vec4(p * twoPowI, noiseTime)) * scale;
        yNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(123.4, 129845.6, -1239.1)) * twoPowI, noiseTime)) * scale;
        // zNoisePotentialDerivatives += snoise4(vec4((p + vec3(-9519.0, 9051.0, -123.0)) * twoPowI, noiseTime)) * scale;
    }
    return vec3(
    yNoisePotentialDerivatives[1] - xNoisePotentialDerivatives[1], yNoisePotentialDerivatives[2] - xNoisePotentialDerivatives[2], yNoisePotentialDerivatives[0] - xNoisePotentialDerivatives[0]
    );
}
// ---------- /CURL NOISE

void main() {
    vec4 pos = texture2D(uPositions, vUv);
    vec4 info = texture2D(uInfo, vUv);

    // vec2 mouse = vec2(sin(time), cos(time));  // Show position of mouse
    vec2 mouse = uMouse;
    
    float radius = length(pos.xy);

    float circularForce = 1. - smoothstep(0.3, 1.4, abs(pos.x - radius));
    float angle = atan(pos.y, pos.x) - info.y * 0.3 * mix(0.5, 1.0, circularForce);

    // Controls shape of particles. Ex: flower shape "angle * 5.0"
    float targetRadius = mix(
        info.x, 
        1.8, 
        0.5 + 0.45 * sin(angle * 2.0 + time * 0.0002)
    );

    radius += (targetRadius - radius) * mix(0.2, 0.5, circularForce);
    vec3 targetPos = vec3(cos(angle), sin(angle), 0.0) * radius;

    // Smoothly interpolate position towards the target position
    pos.xy += (targetPos.xy - pos.xy) * 0.1;

    // Add curl noise for organic swirling motion
    pos.xy += curl(pos.xyz * 4.0, time * 0.1, 0.1).xy * 0.006;

    float dist = length(pos.xy - mouse);
    vec2 dir = normalize(pos.xy - mouse);
    pos.xy += dir * 0.1 * smoothstep(0.3, 0.0, dist);

    gl_FragColor = vec4(pos.xy, 1.0, 1.0);
}
`;

