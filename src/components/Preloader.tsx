import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Props = { onComplete: () => void };

export function Preloader({ onComplete }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (reducedMotion) {
      document.body.style.overflow = previousOverflow;
      onComplete();
      return;
    }

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = previousOverflow;
        onComplete();
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.7,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counter.value));
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${counter.value / 100})`;
        }
      },
    })
      .to(overlayRef.current, { opacity: 0, duration: 0.55, ease: "power2.out" }, "+=0.2")
      .set(overlayRef.current, { visibility: "hidden" });

    return () => {
      document.body.style.overflow = previousOverflow;
      tl.kill();
    };
  }, [reducedMotion, onComplete]);

  if (reducedMotion) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      <span
        ref={counterRef}
        className="font-mono text-6xl md:text-8xl text-fg tabular-nums tracking-tight"
      >
        0
      </span>
      <div className="mt-7 w-40 h-px bg-border relative overflow-hidden">
        <div
          ref={barRef}
          className="absolute inset-0 bg-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
