import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { CHAPTERS } from "../../lib/story";
import { CameraRig } from "./CameraRig";
import { SignalPath } from "./SignalPath";

type Props = {
  accent: string;
  bg: string;
  reducedMotion: boolean;
  mobile: boolean;
  bloomEnabled: boolean;
};

export default function SceneCanvas({ accent, bg, reducedMotion, mobile, bloomEnabled }: Props) {
  const curve = useMemo(() => {
    const points = CHAPTERS.map((c) => new THREE.Vector3(...c.point));
    return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.45);
  }, []);

  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      camera={{ position: CHAPTERS[0].point, fov: 52, near: 0.1, far: 60 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[bg]} />
      <SignalPath
        accent={accent}
        bg={bg}
        particleCount={mobile ? 70 : 180}
        reducedMotion={reducedMotion}
      />
      <CameraRig curve={curve} reducedMotion={reducedMotion} interactive={!mobile} />
      {bloomEnabled && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.24}
            luminanceSmoothing={0.35}
            intensity={mobile ? 0.7 : 1.15}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
