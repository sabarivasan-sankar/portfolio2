import { useLayoutEffect, useRef } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { gsap } from "../lib/gsap";
import { SplitText } from "gsap/SplitText";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { profile } from "../lib/content";
import { HeroScene } from "./scene/HeroScene";
import { Magnetic } from "./Magnetic";

gsap.registerPlugin(SplitText);

type Props = { ready: boolean };

export function Hero({ ready }: Props) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const h1 = root.querySelector("h1");
    const eyebrow = root.querySelector("[data-eyebrow]");
    const revealEls = root.querySelectorAll("[data-reveal]");

    if (reducedMotion) {
      gsap.set([h1, eyebrow, ...Array.from(revealEls)], { opacity: 1, y: 0 });
      return;
    }

    if (!ready || !h1) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(h1, { type: "chars,words" });
      gsap.set(h1, { opacity: 1 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        eyebrow,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      )
        .fromTo(
          split.chars,
          { opacity: 0, y: 40, rotateX: -60 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.02,
          },
          "-=0.2",
        )
        .fromTo(
          revealEls,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 },
          "-=0.35",
        );

      return () => split.revert();
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, ready]);

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] pt-24 pb-16 flex items-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[70vw] max-w-[720px] aspect-square opacity-90"
      >
        <HeroScene />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--color-bg) 0%, color-mix(in srgb, var(--color-bg) 55%, transparent) 55%, transparent 85%)",
        }}
      />

      <div ref={rootRef} className="relative mx-auto max-w-6xl w-full px-5 md:px-8">
        <p data-eyebrow className="font-mono text-sm text-fg-muted mb-6" style={{ opacity: 0 }}>
          <span className="text-accent">$</span> whoami
        </p>

        <h1
          className="text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.98] text-fg max-w-[14ch]"
          style={{ perspective: "600px", opacity: 0 }}
        >
          {profile.name}
        </h1>

        <p
          data-reveal
          className="mt-5 font-mono text-lg md:text-xl text-accent"
          style={{ opacity: 0 }}
        >
          {profile.role}
        </p>

        <p
          data-reveal
          className="mt-6 text-base md:text-lg text-fg-muted max-w-[46ch] leading-relaxed"
          style={{ opacity: 0 }}
        >
          {profile.positioning}
        </p>

        <div
          data-reveal
          className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
          style={{ opacity: 0 }}
        >
          <Magnetic strength={0.35}>
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-accent-fg font-mono text-sm font-medium transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              View work
            </a>
          </Magnetic>
          <Magnetic strength={0.35}>
            <a
              href="#contact"
              className="bracket-link font-mono text-sm text-fg-muted hover:text-fg transition-colors"
            >
              get in touch
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-fg-faint">
        <CaretDown size={18} className={reducedMotion ? "" : "animate-bounce"} />
      </div>
    </section>
  );
}
