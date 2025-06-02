import { Trail, useScroll } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, Vector3 } from "three";
import {
  lerp,
  randFloat,
  randFloatSpread,
  randInt,
} from "three/src/math/MathUtils.js";

export const Comets = ({ nbTrails = 42 }) => {
  const comets = useMemo(
    () =>
      new Array(nbTrails).fill(0).map(() => {
        const size = randFloat(1, 3);

        return {
          size,
          length: randInt(2, 4),
          color: [
            "#fc7de7", "#b485ee", "#618fff", "#61ffdb", "#61ff93", "#faff61", "#ff6161", "#ffffff", "#ec824d", "#eff0b1",
          ][randInt(0, 9)],  // If randInt(0, 9) returns 2, you get: 618fff
          startPosition: [randFloatSpread(20), 0, 0],
          orbitSpeed: (2 / size) * (randInt(0, 1) || -1),
          coinSpeed: (5 / size) * (randInt(0, 1) || -1),
          planetOrbitSpeed: (4 / size) * (randInt(0, 1) || -1),
          radius: randFloat(4, 6),
          rotation: [
            randFloatSpread(Math.PI), 
            randFloatSpread(Math.PI), 
            0
          ],
        };
      }),
    []
  );
  // console.log('comets ', comets)

  return (
    <>
      {comets.map((props, i) => (
        <Comet key={i} {...props} />
      ))}
    </>
  );
};

const tmpVector = new Vector3();
const LERP_SPEED = 10;

const Comet = ({
  length, size, color, startPosition, orbitSpeed, coinSpeed,
  planetOrbitSpeed, radius, rotation,
}) => {
  const triangleTime = useRef(0);
  const trianglePoints = useMemo(() => [
    new Vector3(0, radius, 0),                                // Top
    new Vector3(-radius * 0.87, -radius / 2, 0),              // Bottom left
    new Vector3(radius * 0.87, -radius / 2, 0),               // Bottom right
  ], [radius]);

  // const group = useRef();
  const ref = useRef();
  const container = useRef();

  const emissiveColor = useMemo(() => {
    const newColor = new Color(color);
    newColor.multiplyScalar(5);
    return newColor;
  }, [color]);

  const data = useScroll();
  const viewport = useThree((state) => state.viewport);

  useFrame(({ clock }, delta) => { // delta time in secs since last frame
    if (!ref.current) {
      return;
    }

    // SWITCH TABS AND COME BACK LERP
    // So we are only using 0.1 or delta. Not go above 0.1
    const smoothDelta = Math.min(0.1, delta);


    let containerTarget = 0;
    const coinMode = data.visible(1 / 6, 1 / 6);
    const planetOrbitMode = data.visible(2 / 6, 1 / 6);
    const cardMode = data.visible(3 / 6, 1 / 6);

    if (planetOrbitMode) {
      containerTarget = -viewport.height * 2;
      tmpVector.x = Math.cos(clock.elapsedTime * planetOrbitSpeed) * radius;
      tmpVector.y = Math.sin(clock.elapsedTime * planetOrbitSpeed) * radius;
      tmpVector.z = 0;
    } 
    // else if (coinMode) {
    //   containerTarget = -viewport.height;
    //   tmpVector.x = Math.cos(clock.elapsedTime * coinSpeed) * radius;
    //   tmpVector.y = Math.sin(clock.elapsedTime * coinSpeed) * radius;
    //   tmpVector.z = 0;
    // }
    else if (coinMode) {
      containerTarget = -viewport.height;

      triangleTime.current += smoothDelta * Math.abs(coinSpeed); // keep ticking
    
      const t = triangleTime.current % 3; // range [0, 3)
      const i = Math.floor(t);            // which edge: 0, 1, 2
      const f = t - i;                    // fractional step along the edge
    
      const a = trianglePoints[i];
      const b = trianglePoints[(i + 1) % 3];
    
      // Use a smootherstep easing (f^3 * (f * (6f - 15) + 10)) if needed
      const easedF = f * f * (3 - 2 * f); // simple smoothstep easing
    
      tmpVector.lerpVectors(a, b, easedF);
    }
    else if (cardMode) {
      containerTarget = -viewport.height * 3;
      tmpVector.x = Math.sin(clock.elapsedTime * orbitSpeed) * viewport.width;
      tmpVector.y = Math.cos(clock.elapsedTime * orbitSpeed * 8) * 2;
      tmpVector.z = -2 + Math.cos(clock.elapsedTime * orbitSpeed) * 1;
    } 
    else {
      // default orbit
      tmpVector.x = startPosition[0];
      tmpVector.y = Math.sin(clock.elapsedTime * orbitSpeed) * 20;  // range of -20 to 20
      tmpVector.z = -5 + Math.cos(clock.elapsedTime * orbitSpeed) * 80;
    }

    // COMET MOVEMENT SMOOTHING BETWEEN SECTION CHANGE
    const distance = ref.current.position.distanceTo(tmpVector);
    const lerpFactor = Math.min(1, Math.max(0.0005, 10 / distance));

    // COMET LOOPING / SMOOTHING
    // smoothDelta : handles tab switch issue. 
    // When switching to another browser tab and coming back to the site, useFrame does not run.
    // So when you come back to the site, the delta time has huge value whilst useFrame is not running. So it looks like the comet is jumping.
    // ref.current.position.lerp(tmpVector, delta * LERP_SPEED);
    ref.current.position.lerp(tmpVector, lerpFactor * LERP_SPEED * smoothDelta);

    // COIN SECTION
    container.current.position.y = lerp(
      container.current.position.y,
      containerTarget,
      // LERP_SPEED * delta
      LERP_SPEED * smoothDelta
    );
    // PLANET SECTION
    container.current.rotation.x = lerp(
      container.current.rotation.x,
      planetOrbitMode ? rotation[0] : 0,
      smoothDelta
    );
    // CARD SECTION
    container.current.rotation.y = lerp(
      container.current.rotation.y,
      planetOrbitMode ? rotation[1] : 0,
      smoothDelta
    );
  });

  return (
    <group ref={container}>
      <Trail
        position={startPosition}
        width={size} // Width of the line
        // color={white} // Color of the line
        length={length} // Length of the line
        decay={1} // How fast the line fades away
        local={false} // Wether to use the target's world or local positions
        stride={0} // Min distance between previous and current point
        interval={1} // Number of frames to wait before next calculationtrail.
        attenuation={(width) => { return width; }} // A function to define the width in each point along it.
      >
        {/* If `target` is not defined, Trail will use the first `Object3D` child as the target. */}
        <mesh ref={ref} position={startPosition} rotation-x={2}>
          <sphereGeometry args={[size / 50]} />
          <meshStandardMaterial
            color={color} emissive={color} emissiveIntensity={1}
          />
        </mesh>

        {/* You can optionally define a custom meshLineMaterial to use. */}
        <meshLineMaterial
          color={emissiveColor}
          transparent
          toneMapped={false}
          opacity={0.5}
          blending={AdditiveBlending}
        />
      </Trail>
    </group>
  );
};

extend({ MeshLineMaterial, MeshLineGeometry });
