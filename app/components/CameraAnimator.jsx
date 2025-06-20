"use client";

import { useThree, invalidate } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const cameraTargets = {
  Scene1: { x: 0, y: 5, z: 7 },
  Scene2: { x: 5, y: 8, z: 15 },
  Scene3: { x: -5, y: 6, z: 10 },
};

export default function CameraAnimator({ targetScreen, onTransitionComplete }) {
  const { camera } = useThree();
  const lastScreen = useRef(null);

  useEffect(() => {
    const target = cameraTargets[targetScreen];
    if (!camera || !target || lastScreen.current === targetScreen) return;

    lastScreen.current = targetScreen;

    gsap.to(camera.position, {
      ...target,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => invalidate(),
      onComplete: () => {
        // ✅ Safely update React state outside the render frame
        requestAnimationFrame(() => {
          onTransitionComplete?.();
        });
      },
    });
  }, [targetScreen, camera]);

  return null;
}
