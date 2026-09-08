import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Props = {
  children: ReactNode;
  className?: string;
};

export function TiltCard({ children, className }: Props) {
  const tilt = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = tilt.current;
    if (!el || reduced) return;

    const rotX = gsap.quickTo(el, "rotateX", { duration: 0.4, ease: "power3.out" });
    const rotY = gsap.quickTo(el, "rotateY", { duration: 0.4, ease: "power3.out" });
    const scale = gsap.quickTo(el, "scale", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotY((px - 0.5) * 12);
      rotX(-(py - 0.5) * 12);
      scale(1.015);
      if (spot.current) {
        spot.current.style.opacity = "1";
        spot.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 62%)`;
      }
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
      scale(1);
      if (spot.current) spot.current.style.opacity = "0";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div className={className} style={{ perspective: "1100px" }}>
      <div ref={tilt} className="tilt-card relative h-full">
        <div
          ref={spot}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
          aria-hidden="true"
        />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
}
