import { useEffect, useRef } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { gsap } from "../lib/gsap";
import { SplitText } from "gsap/SplitText";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { profile } from "../lib/content";
import { CHAPTERS } from "../lib/story";

gsap.registerPlugin(SplitText);

const chapter = CHAPTERS[0];

export function Hero() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    if (reducedMotion) {
      gsap.set(rootRef.current.querySelectorAll("[data-reveal]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const split = new SplitText(rootRef.current!.querySelector("h1"), {
        type: "chars,words",
      });

      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        rootRef.current!.querySelector("[data-eyebrow]"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      )
        .fromTo(
          split.chars,
          { opacity: 0, y: 26, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out", stagger: 0.017 },
          "-=0.2",
        )
        .fromTo(
          rootRef.current!.querySelectorAll("[data-reveal]"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.13 },
          "-=0.35",
        );

      return () => split.revert();
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id={chapter.id}
      className="relative min-h-[100dvh] pt-24 pb-16 flex items-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 30% 45%, color-mix(in srgb, var(--color-bg) 78%, transparent), var(--color-bg))",
        }}
      />

      <div ref={rootRef} className="relative mx-auto max-w-6xl w-full px-5 md:px-8">
        <p data-eyebrow className="font-mono text-sm text-fg-muted mb-6">
          <span className="text-accent">{chapter.tag}</span>
          <span className="mx-2 text-border-strong">/</span>
          sabari@rently:~$ trace --origin
        </p>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.03] text-fg max-w-[16ch]">
          {profile.name}
        </h1>

        <p data-reveal className="mt-4 font-mono text-lg md:text-xl text-accent">
          {profile.role}
        </p>

        <p
          data-reveal
          className="mt-6 text-base md:text-lg text-fg-muted max-w-[48ch] leading-relaxed"
        >
          Follow the signal from a first API endpoint to the systems that move
          real money today.
        </p>

        <div data-reveal className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-fg font-mono text-sm font-medium hover:bg-accent-dim transition-colors"
          >
            Follow the signal
          </a>
          <a
            href="#work"
            className="bracket-link font-mono text-sm text-fg-muted hover:text-fg transition-colors"
          >
            skip to work
          </a>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-fg-faint">
        <CaretDown size={18} className={reducedMotion ? "" : "animate-bounce"} />
      </div>
    </section>
  );
}
