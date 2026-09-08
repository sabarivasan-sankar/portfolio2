import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

const STEPS = ["opening session", "loading policy", "evaluating grants", "ready"];

export function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const state = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = previousOverflow;
      },
    });

    tl.to(state, {
      value: 100,
      duration: 1.3,
      ease: "power2.inOut",
      onUpdate: () => {
        const pct = state.value;
        if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`;
        if (stepRef.current) {
          const idx = Math.min(STEPS.length - 1, Math.floor((pct / 100) * STEPS.length));
          stepRef.current.textContent = STEPS[idx];
        }
      },
    })
      .to(overlayRef.current, { opacity: 0, duration: 0.45, ease: "power2.out" }, "+=0.15")
      .set(overlayRef.current, { visibility: "hidden", pointerEvents: "none" });

    return () => {
      document.body.style.overflow = previousOverflow;
      tl.kill();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      <div className="w-56">
        <p ref={stepRef} className="font-mono text-xs text-fg-muted mb-3">
          opening session
        </p>
        <div className="h-px bg-line relative overflow-hidden">
          <div
            ref={barRef}
            className="absolute inset-0 bg-accent origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
