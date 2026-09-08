import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { CHAPTERS } from "../../lib/story";
import { scrollStore } from "../../lib/scrollStore";

type Props = {
  accent: string;
  bg: string;
  particleCount: number;
  reducedMotion: boolean;
};

const SATELLITE_OFFSETS: [number, number, number][] = [
  [-1.1, 0.55, 1.2],
  [1.2, 0.65, -0.4],
  [-0.3, -0.75, -1.6],
];

export function SignalPath({ accent, bg, particleCount, reducedMotion }: Props) {
  const curve = useMemo(() => {
    const points = CHAPTERS.map((c) => new THREE.Vector3(...c.point));
    return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.45);
  }, []);

  const tubeGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 320, 0.032, 8, false),
    [curve],
  );

  const nodeRefs = useRef<THREE.Mesh[]>([]);
  const accentColor = useMemo(() => new THREE.Color(accent), [accent]);
  const dimColor = useMemo(() => accentColor.clone().multiplyScalar(0.2), [accentColor]);
  const hotColor = useMemo(() => accentColor.clone().lerp(new THREE.Color("#ffffff"), 0.35), [accentColor]);

  useFrame((_state, delta) => {
    const active = scrollStore.activeChapter;
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      const isActive = i === active;
      const targetScale = isActive ? 1.9 : 1;
      mesh.scale.x += (targetScale - mesh.scale.x) * Math.min(1, delta * 6);
      mesh.scale.y = mesh.scale.z = mesh.scale.x;
      mat.color.lerp(isActive ? hotColor : dimColor, Math.min(1, delta * 6));
    });
  });

  // Ambient particles drifting along the whole path, independent of scroll.
  const phases = useMemo(() => {
    const arr = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) arr[i] = Math.random();
    return arr;
  }, [particleCount]);

  const particlePositions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  const particlesRef = useRef<THREE.BufferAttribute>(null);
  const tmpVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((_state, delta) => {
    if (reducedMotion) return;
    const attr = particlesRef.current;
    if (!attr) return;
    for (let i = 0; i < particleCount; i++) {
      phases[i] = (phases[i] + delta * 0.045) % 1;
      curve.getPointAt(phases[i], tmpVec);
      attr.setXYZ(i, tmpVec.x, tmpVec.y, tmpVec.z);
    }
    attr.needsUpdate = true;
  });

  const workChapter = CHAPTERS[6];

  return (
    <>
      <fog attach="fog" args={[bg, 6, 34]} />

      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial color={dimColor} transparent opacity={0.55} />
      </mesh>

      {CHAPTERS.map((chapter, i) => (
        <mesh
          key={chapter.id}
          position={chapter.point}
          ref={(el) => {
            if (el) nodeRefs.current[i] = el;
          }}
        >
          <icosahedronGeometry args={[0.11, 0]} />
          <meshBasicMaterial color={dimColor} />
        </mesh>
      ))}

      {SATELLITE_OFFSETS.map((offset, i) => {
        const base = workChapter.point;
        const end: [number, number, number] = [
          base[0] + offset[0],
          base[1] + offset[1],
          base[2] + offset[2],
        ];
        return (
          <group key={i}>
            <Line points={[base, end]} color={dimColor} transparent opacity={0.5} lineWidth={1} />
            <mesh position={end}>
              <icosahedronGeometry args={[0.065, 0]} />
              <meshBasicMaterial color={accentColor} />
            </mesh>
          </group>
        );
      })}

      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={particlesRef}
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color={accentColor} size={0.035} sizeAttenuation transparent opacity={0.85} />
      </points>
    </>
  );
}
