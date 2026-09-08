import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { CHAPTERS, type Chapter } from "../lib/story";

type ChapterFrameProps = {
  chapter: Chapter;
  children: ReactNode;
  align?: "left" | "right" | "center";
  wide?: boolean;
  size?: "md" | "lg";
};

export function ChapterFrame({
  chapter,
  children,
  align = "left",
  wide = false,
  size = "md",
}: ChapterFrameProps) {
  const justify =
    align === "right" ? "justify-end" : align === "center" ? "justify-center" : "justify-start";
  const maxWidth = size === "lg" ? "max-w-4xl" : wide ? "max-w-2xl" : "max-w-xl";

  return (
    <section
      id={chapter.id}
      className="relative min-h-[100dvh] flex items-center py-28 md:py-32"
    >
      <div className="mx-auto max-w-6xl w-full px-5 md:px-8">
        <div className={`flex ${justify}`}>
          <Reveal blur className={`w-full ${maxWidth}`}>
            <div className="bg-bg/85 backdrop-blur-md border border-border/70 p-7 md:p-10">
              <p className="font-mono text-xs text-fg-faint mb-5 tracking-wide">
                <span className="text-accent">{chapter.tag}</span>
                <span className="mx-2 text-border-strong">/</span>
                {String(chapter.index + 1).padStart(2, "0")} of {String(CHAPTERS.length).padStart(2, "0")}
                <span className="mx-2 text-border-strong">/</span>
                {chapter.label}
              </p>
              {children}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
