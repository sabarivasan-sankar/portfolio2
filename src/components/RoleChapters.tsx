import { ChapterFrame } from "./ChapterFrame";
import { experience, type ExperienceEntry } from "../lib/content";
import { CHAPTERS } from "../lib/story";

type RoleStop = {
  chapterIndex: number;
  entry: ExperienceEntry;
  narrative: string;
  align: "left" | "right";
};

const STOPS: RoleStop[] = [
  {
    chapterIndex: 2,
    entry: experience[2],
    narrative:
      "The first real codebase, and the first lessons in what \"production\" actually means.",
    align: "right",
  },
  {
    chapterIndex: 3,
    entry: experience[1],
    narrative: "More responsibility, bigger systems, and real money moving through code I owned.",
    align: "left",
  },
  {
    chapterIndex: 4,
    entry: experience[0],
    narrative: "Now the one architecting how the whole system decides who gets to do what.",
    align: "right",
  },
];

export function RoleChapters() {
  return (
    <>
      {STOPS.map((stop) => {
        const chapter = CHAPTERS[stop.chapterIndex];
        return (
          <ChapterFrame key={chapter.id} chapter={chapter} align={stop.align} wide>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-fg">
                {stop.entry.role}
              </h2>
              {stop.entry.current && (
                <span className="font-mono text-xs text-accent border border-accent-dim px-1.5 py-0.5">
                  HEAD -&gt; main
                </span>
              )}
            </div>
            <p className="font-mono text-sm text-fg-faint mb-4">
              {stop.entry.company} <span className="mx-1.5">/</span> {stop.entry.period}
            </p>

            <p className="text-sm text-fg-muted italic mb-5 max-w-[46ch]">{stop.narrative}</p>

            <ul className="space-y-2">
              {stop.entry.commits.map((commit) => (
                <li
                  key={commit}
                  className="font-mono text-sm text-fg-muted leading-relaxed flex gap-2.5"
                >
                  <span className="text-accent select-none">$</span>
                  <span>{commit}</span>
                </li>
              ))}
            </ul>
          </ChapterFrame>
        );
      })}
    </>
  );
}
