import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useCssVar } from "../../hooks/useCssVar";
import { hasWebGL } from "../../lib/webgl";
import { pointerStore } from "../../lib/pointerStore";

const SceneCanvas = lazy(() => import("./SceneCanvas"));

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

export function SceneBackdrop() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const webglOk = useMemo(() => hasWebGL(), []);
  const accent = useCssVar("--color-accent", "#f2a93b");
  const bg = useCssVar("--color-bg", "#0a0b0d");

  useEffect(() => pointerStore.attach(), []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {webglOk ? (
        <Suspense fallback={null}>
          <SceneCanvas
            accent={accent}
            bg={bg}
            reducedMotion={reducedMotion}
            mobile={isMobile}
            bloomEnabled={!isMobile}
          />
        </Suspense>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 55%), radial-gradient(circle at 75% 70%, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 50%)",
          }}
        />
      )}
    </div>
  );
}
