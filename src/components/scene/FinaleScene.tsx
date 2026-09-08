import { Suspense, lazy, useEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useCssVar } from "../../hooks/useCssVar";
import { hasWebGL } from "../../lib/webgl";

const ParticleBurstCanvas = lazy(() => import("./ParticleBurstCanvas"));

export function FinaleScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const reducedMotion = useReducedMotion();
  const webglOk = useMemo(() => hasWebGL(), []);
  const accent = useCssVar("--color-accent", "#5b77ff");

  useEffect(() => {
    if (reducedMotion) {
      progress.current = 1;
      return;
    }
    const el = wrapRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(progress, { current: 1, duration: 2.4, ease: "power3.out" });
      },
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
      {webglOk && (
        <Suspense fallback={null}>
          <ParticleBurstCanvas accent={accent} progress={progress} count={220} bloomEnabled />
        </Suspense>
      )}
    </div>
  );
}
