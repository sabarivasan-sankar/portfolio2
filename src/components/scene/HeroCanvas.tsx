import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { pointerStore } from "../../lib/pointerStore";

type BlobProps = {
  accent: string;
  reducedMotion: boolean;
  interactive: boolean;
};

function Blob({ accent, reducedMotion, interactive }: BlobProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const tiltX = useRef(0);
  const tiltY = useRef(0);

  useFrame((_state, delta) => {
    const m = mesh.current;
    if (!m) return;

    if (!reducedMotion) {
      m.rotation.z += delta * 0.05;
    }

    if (interactive && !reducedMotion) {
      tiltX.current += (pointerStore.y * 0.3 - tiltX.current) * 0.04;
      tiltY.current += (pointerStore.x * 0.4 - tiltY.current) * 0.04;
    }
    m.rotation.x = tiltX.current + (reducedMotion ? 0 : _state.clock.elapsedTime * 0.08);
    m.rotation.y = tiltY.current + (reducedMotion ? 0 : _state.clock.elapsedTime * 0.11);
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.55, 16]} />
      <MeshDistortMaterial
        color={accent}
        distort={reducedMotion ? 0.22 : 0.4}
        speed={reducedMotion ? 0 : 1.8}
        roughness={0.2}
        metalness={0.75}
      />
    </mesh>
  );
}

type Props = {
  accent: string;
  reducedMotion: boolean;
  mobile: boolean;
  bloomEnabled: boolean;
};

export default function HeroCanvas({ accent, reducedMotion, mobile, bloomEnabled }: Props) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3.5, 2.5, 4]} color={accent} intensity={3.2} />
      <pointLight position={[-3, -2, -3]} color="#ffffff" intensity={1.1} />
      <directionalLight position={[0, 4, 2]} intensity={0.6} />
      <Blob accent={accent} reducedMotion={reducedMotion} interactive={!mobile} />
      {bloomEnabled && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.35}
            luminanceSmoothing={0.3}
            intensity={mobile ? 0.5 : 0.85}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
