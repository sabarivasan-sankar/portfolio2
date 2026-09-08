import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function randomOnSphere(radius: number): [number, number, number] {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = radius * (0.55 + Math.random() * 0.45);
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
}

type PointsProps = {
  accent: string;
  progress: { current: number };
  count: number;
};

function BurstPoints({ accent, progress, count }: PointsProps) {
  const targets = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const [x, y, z] = randomOnSphere(3.4);
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const attrRef = useRef<THREE.BufferAttribute>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  useFrame(() => {
    const attr = attrRef.current;
    if (!attr) return;
    const t = progress.current;
    for (let i = 0; i < count; i++) {
      attr.setXYZ(i, targets[i * 3] * t, targets[i * 3 + 1] * t, targets[i * 3 + 2] * t);
    }
    attr.needsUpdate = true;
    if (matRef.current) matRef.current.opacity = Math.min(1, t * 1.4) * 0.9;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute ref={attrRef} attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color={accent}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0}
      />
    </points>
  );
}

type Props = {
  accent: string;
  progress: { current: number };
  count: number;
  bloomEnabled: boolean;
};

export default function ParticleBurstCanvas({ accent, progress, count, bloomEnabled }: Props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <BurstPoints accent={accent} progress={progress} count={count} />
      {bloomEnabled && (
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.4} intensity={0.9} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  );
}
