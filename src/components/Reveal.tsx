import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  blur?: boolean;
};

export function Reveal({ children, className, y = 28, delay = 0, blur = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const from: gsap.TweenVars = { opacity: 0, y };
    const to: gsap.TweenVars = { opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out" };
    if (blur) {
      from.filter = "blur(10px)";
      to.filter = "blur(0px)";
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced, y, delay, blur]);

  return (
    <div ref={ref} className={className} style={reduced ? undefined : { opacity: 0 }}>
      {children}
    </div>
  );
}
