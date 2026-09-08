import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useCssVar } from "../../hooks/useCssVar";
import { hasWebGL } from "../../lib/webgl";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return mobile;
}

function Fallback() {
  return (
    <div
      className="w-full h-full rounded-full"
      style={{
        background:
          "radial-gradient(circle at 45% 40%, color-mix(in srgb, var(--color-accent) 35%, transparent), transparent 70%)",
        filter: "blur(2px)",
      }}
    />
  );
}

export function HeroScene() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const webglOk = useMemo(() => hasWebGL(), []);
  const accent = useCssVar("--color-accent", "#5b77ff");

  return webglOk ? (
    <Suspense fallback={<Fallback />}>
      <HeroCanvas
        accent={accent}
        reducedMotion={reducedMotion}
        mobile={isMobile}
        bloomEnabled={!isMobile}
      />
    </Suspense>
  ) : (
    <Fallback />
  );
}
