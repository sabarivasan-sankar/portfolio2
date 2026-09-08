import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { scrollStore } from "../lib/scrollStore";
import { CHAPTERS } from "../lib/story";

export function ScrollDriver() {
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    triggers.push(
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => scrollStore.setProgress(self.progress),
      }),
    );

    CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => scrollStore.setActiveChapter(chapter.index),
          onEnterBack: () => scrollStore.setActiveChapter(chapter.index),
        }),
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
