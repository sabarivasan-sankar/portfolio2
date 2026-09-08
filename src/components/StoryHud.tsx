import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useActiveChapter } from "../hooks/useActiveChapter";
import { CHAPTERS } from "../lib/story";

export function StoryHud() {
  const dotRef = useRef<HTMLDivElement>(null);
  const active = useActiveChapter();
  const chapter = CHAPTERS[active];

  useEffect(() => {
    const el = dotRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(el, { top: `${self.progress * 100}%` });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 h-[46vh] flex-col items-center"
    >
      <div className="mb-4 font-mono text-[11px] text-fg-faint text-right leading-tight">
        <div className="text-accent">{chapter.tag}</div>
        <div>{chapter.label}</div>
      </div>

      <div className="relative flex-1 w-px bg-border">
        {CHAPTERS.map((c) => (
          <span
            key={c.id}
            className={`absolute -left-[3px] w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
              c.index === active ? "bg-accent" : "bg-border-strong"
            }`}
            style={{ top: `${(c.index / (CHAPTERS.length - 1)) * 100}%` }}
          />
        ))}
        <div
          ref={dotRef}
          className="absolute -left-[2.5px] w-[6px] h-[6px] rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"
          style={{ top: 0 }}
        />
      </div>
    </div>
  );
}
