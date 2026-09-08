import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "../../lib/scrollStore";
import { pointerStore } from "../../lib/pointerStore";

type Props = {
  curve: THREE.CatmullRomCurve3;
  reducedMotion: boolean;
  interactive: boolean;
};

const lookTarget = new THREE.Vector3();
const camPoint = new THREE.Vector3();
const pointerOffset = new THREE.Vector3();

export function CameraRig({ curve, reducedMotion, interactive }: Props) {
  const { camera } = useThree();
  const eased = useRef(0);

  useFrame((_state, delta) => {
    const target = scrollStore.progress;
    // Critically damped follow so the camera doesn't snap on fast scroll jumps.
    const lerpAmount = reducedMotion ? 1 : 1 - Math.pow(0.001, delta);
    eased.current += (target - eased.current) * lerpAmount;
    const t = THREE.MathUtils.clamp(eased.current, 0, 1);

    curve.getPointAt(t, camPoint);
    curve.getPointAt(Math.min(t + 0.025, 1), lookTarget);

    camera.position.set(camPoint.x, camPoint.y + 0.55, camPoint.z);

    if (interactive && !reducedMotion) {
      pointerOffset.set(pointerStore.x * 0.35, pointerStore.y * 0.2, 0);
      camera.position.x += pointerOffset.x;
      camera.position.y += pointerOffset.y;
    }

    camera.lookAt(lookTarget);
  });

  return null;
}
