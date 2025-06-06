// SketchScene.jsx
import { useLoader, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function SketchScene() {
  const meshRef = useRef()
  const { progress } = useControls({ progress: { value: 0, min: 0, max: 1, step: 0.01 } })

  const tex1 = useLoader(THREE.TextureLoader, '/1.jpg')
  const tex2 = useLoader(THREE.TextureLoader, '/2.jpg')

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uProgress;
      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      uniform vec2 uResolution;
      varying vec2 vUv;

      vec2 scaleUV(vec2 uv, vec2 scale) {
        return (uv - 0.5) * scale + 0.5;
      }

      float hexDistance(vec2 uv) {
        vec2 s = vec2(1.0, 1.7320508);
        vec2 p = abs(uv);
        return max(dot(p, s * 0.5), p.x);
      }

      vec4 sround(vec4 s) {
        return floor(s + 0.5);
      }

      vec4 hexCoordinates(vec2 uv) {
        vec2 s = vec2(1.0, 1.7320508);
        vec4 hexCenter = sround(vec4(uv, uv - vec2(0.5, 1.0)) / vec4(s, s));
        vec4 offset = vec4(
          uv - hexCenter.xy * s,
          uv - (hexCenter.zw + vec2(0.5)) * s
        );
        float d1 = dot(offset.xy, offset.xy);
        float d2 = dot(offset.zw, offset.zw);
        vec4 final1 = vec4(offset.xy, hexCenter.xy);
        vec4 final2 = vec4(offset.zw, hexCenter.zw);
        return mix(final1, final2, step(0.0, d1 - d2));
      }

      float remap(float value, float inMin, float inMax, float outMin, float outMax) {
        return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
      }

      void main() {
        vec2 aspect = vec2(1.0, uResolution.y / uResolution.x);
        vec2 corUV = scaleUV(vUv, aspect);
        vec2 distUV = scaleUV(corUV, vec2(1.0 + length((vUv - 0.5))));

        vec2 hexUv = distUV * 20.0;
        vec4 hexCoords = hexCoordinates(hexUv);
        float hexDist = hexDistance(hexCoords.xy);

        float y = pow(max(0.0, 0.5 - hexDist), 10.0) * 1.5;
        float z = fract(sin(dot(hexCoords.zw, vec2(12.9898, 78.233))) * 43758.5453);
        float offset = 0.2;
        float bounceTransition = 1.0 - smoothstep(0.0, 0.5, abs(uProgress - 0.5));

        float blendCut = smoothstep(
          vUv.y - offset,
          vUv.y + offset,
          remap(uProgress + z * 0.8 * bounceTransition, 0.0, 1.0, -offset, 1.0 + offset)
        );

        float merge = 1.0 - smoothstep(0.0, 0.5, abs(blendCut - 0.5));
        float center = uProgress + (y + z) * 0.15 * bounceTransition;
        float easedCut = smoothstep(center - 0.05, center + 0.05, vUv.y);

        vec2 textureUV = corUV + y * sin(vUv.y * 15.0 - uTime) * merge * 0.025;

        // ✅ Proper UVs without double aspect correction
        vec2 fromUV = textureUV;
        vec2 toUV = scaleUV(textureUV, vec2(1.0 + z * 0.2 * merge + uProgress));

        vec4 sample1 = texture2D(uTexture1, toUV);
        vec4 sample2 = texture2D(uTexture2, fromUV);
        vec4 final = mix(sample1, sample2, easedCut);

        float hexEdge = smoothstep(0.45, 0.50, hexDist) * (1.0 - smoothstep(0.50, 0.55, hexDist));
        float transitionBand = smoothstep(center - 0.05, center, vUv.y) * (1.0 - smoothstep(center, center + 0.05, vUv.y));
        hexEdge *= transitionBand;

        float easing = pow(merge, 1.5);
        vec3 glow = vec3(1.0, 0.4, 0.0) * easing * hexEdge * 2.0;
        final.rgb += glow;

        gl_FragColor = final;
      }
    `,
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: progress },
      uTexture1: { value: tex1 },
      uTexture2: { value: tex2 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }
  }), [tex1, tex2])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.uTime.value = clock.getElapsedTime()
      shaderMaterial.uniforms.uProgress.value = progress
    }
  })

  return (
    <>
      <OrbitControls />
      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1]} />
        <primitive attach="material" object={shaderMaterial} />
      </mesh>
    </>
  )
}
