"use client";
import * as THREE from "three";
import {
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";

const ParticlesHoverPlane = forwardRef(function ParticlesHoverPlane({
  width = 50,
  height = 50,
  segments = 100,
  liftRadius = 3,
  liftStrength = 2,
  position = [0, 0, 0],
  rotation = [-Math.PI / 2, 0, 0],
}, ref) {
  const pointsRef = useRef();
  const shaderRef = useRef();
  const mouse = useRef(new THREE.Vector2());
  const { camera, raycaster, size } = useThree();
  const mouseWorld = useRef(new THREE.Vector3());

  // 📤 Expose reset method
  useImperativeHandle(ref, () => ({
    resetMouse() {
      console.log("[ParticlesHoverPlane] resetMouse() triggered");

      // Reset mouse to center in NDC
      mouse.current.x = 0;
      mouse.current.y = 0;
    }
    
  }));

  // 🖱️ Track mouse in screen space
  useEffect(() => {
    const onMouse = (e) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1;
      mouse.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [size]);

  // 📐 Generate particle grid
  const { positions, count } = useMemo(() => {
    const pos = [];
    const dx = width / segments;
    const dy = height / segments;
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        pos.push(-width / 2 + i * dx, -height / 2 + j * dy, 0);
      }
    }
    return {
      positions: new Float32Array(pos),
      count: (segments + 1) * (segments + 1),
    };
  }, [width, height, segments]);

  // 🌀 Animate hover interaction
  useFrame(() => {
    if (!pointsRef.current || !shaderRef.current) return;

    pointsRef.current.updateMatrixWorld();

    const normal = new THREE.Vector3(0, 0, 1).applyMatrix3(
      new THREE.Matrix3().setFromMatrix4(pointsRef.current.matrixWorld)
    ).normalize();

    const origin = pointsRef.current.getWorldPosition(new THREE.Vector3());
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(normal, origin);

    raycaster.setFromCamera(mouse.current, camera);
    const hit = raycaster.ray.intersectPlane(plane, mouseWorld.current);

    if (hit) {
      const local = pointsRef.current.worldToLocal(mouseWorld.current.clone());
      shaderRef.current.uniforms.uMouse.value.copy(local);
    }
  });

  return (
    <points ref={pointsRef} position={position} rotation={rotation}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderRef}
        transparent
        depthWrite={false}
        uniforms={{
          uMouse: { value: new THREE.Vector3() },
          uRadius: { value: liftRadius },
          uStrength: { value: liftStrength },
          pointSize: { value: 2.5 },
        }}
        vertexShader={/* glsl */`
          uniform vec3 uMouse;
          uniform float uRadius;
          uniform float uStrength;
          uniform float pointSize;

          void main() {
            vec3 p = position;
            float dist = distance(p.xy, uMouse.xy);
            float influence = smoothstep(uRadius, 0.0, dist);
            p.z += influence * uStrength;

            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = pointSize * (30.0 / -mvPosition.z);
          }
        `}
        fragmentShader={/* glsl */`
          void main() {
            float r = length(gl_PointCoord - vec2(0.5));
            float circle = smoothstep(0.5, 0.48, r);
            gl_FragColor = vec4(vec3(1.0), circle);
          }
        `}
      />
    </points>
  );
});

export default ParticlesHoverPlane;
