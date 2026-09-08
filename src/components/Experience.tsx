import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { experience, type ExperienceEntry } from "../lib/content";
import { Reveal } from "./Reveal";

const ORDER = [2, 1, 0]; // intern -> associate -> mid-level

function useIsDesktop() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024,
  );
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return desktop;
}

function RoleSlide({ entry, index }: { entry: ExperienceEntry; index: number }) {
  return (
    <div className="w-screen shrink-0 h-full flex items-center px-5 md:px-16 lg:px-24">
      <div className="max-w-2xl">
        <p className="font-mono text-xs text-fg-faint mb-4 uppercase tracking-[0.1em]">
          {String(index + 1).padStart(2, "0")} / 03
        </p>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-fg">
            {entry.role}
          </h3>
          {entry.current && (
            <span className="font-mono text-xs text-accent border border-accent-dim px-1.5 py-0.5">
              current
            </span>
          )}
        </div>
        <p className="font-mono text-sm text-fg-faint mb-8">
          {entry.company} <span className="mx-1.5">/</span> {entry.period}
        </p>
        <ul className="space-y-3">
          {entry.commits.map((commit) => (
            <li
              key={commit}
              className="text-base md:text-lg text-fg-muted leading-relaxed flex gap-3"
            >
              <span className="text-accent select-none">&rarr;</span>
              <span>{commit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HorizontalExperience() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slides = ORDER.map((i) => experience[i]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => window.innerWidth * (slides.length - 1) * 1.15;

      const tween = gsap.to(track, {
        xPercent: -(slides.length - 1) * 100,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          pin: wrap,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (slides.length - 1),
            duration: 0.35,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            setActive(Math.round(self.progress * (slides.length - 1)));
          },
        },
      });

      return () => tween.scrollTrigger?.kill();
    }, wrap);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} className="relative overflow-hidden border-b border-border">
      <div ref={trackRef} className="flex h-[100dvh]">
        {slides.map((entry, i) => (
          <RoleSlide key={entry.role} entry={entry} index={i} />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((entry, i) => (
          <span
            key={entry.role}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-accent" : "w-1.5 bg-border-strong"
            }`}
          />
        ))}
      </div>

      <p className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-xs text-fg-faint uppercase tracking-[0.1em]">
        scroll to progress
      </p>
    </div>
  );
}

function StackedExperience() {
  const slides = ORDER.map((i) => experience[i]);
  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-24 space-y-16">
        {slides.map((entry, i) => (
          <Reveal key={entry.role} delay={i * 0.05}>
            <p className="font-mono text-xs text-fg-faint mb-3 uppercase tracking-[0.1em]">
              {String(i + 1).padStart(2, "0")} / 03
            </p>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">
                {entry.role}
              </h3>
              {entry.current && (
                <span className="font-mono text-xs text-accent border border-accent-dim px-1.5 py-0.5">
                  current
                </span>
              )}
            </div>
            <p className="font-mono text-sm text-fg-faint mb-5">
              {entry.company} <span className="mx-1.5">/</span> {entry.period}
            </p>
            <ul className="space-y-2.5">
              {entry.commits.map((commit) => (
                <li
                  key={commit}
                  className="text-sm md:text-base text-fg-muted leading-relaxed flex gap-3"
                >
                  <span className="text-accent select-none">&rarr;</span>
                  <span>{commit}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  const reducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const useHorizontal = isDesktop && !reducedMotion;

  return (
    <section id="experience">
      <div className="mx-auto max-w-6xl px-5 md:px-8 pt-24 md:pt-32">
        <Reveal>
          <p className="font-mono text-sm text-accent mb-3">// experience</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg mb-10 max-w-[20ch]">
            Three years, three roles
          </h2>
        </Reveal>
      </div>
      {useHorizontal ? <HorizontalExperience /> : <StackedExperience />}
    </section>
  );
}
