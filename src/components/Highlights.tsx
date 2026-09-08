import { ChapterFrame } from "./ChapterFrame";
import { highlights } from "../lib/content";
import { CHAPTERS } from "../lib/story";

const chapter = CHAPTERS[6];

export function Highlights() {
  const [featured, ...rest] = highlights;

  return (
    <ChapterFrame chapter={chapter} align="left" size="lg">
      <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-fg mb-6">
        What I've built
      </h2>

      <div className="grid md:grid-cols-[3fr_2fr] gap-5">
        <article className="border border-border p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-medium text-fg mb-3 max-w-[24ch]">{featured.title}</h3>
            <p className="text-sm text-fg-muted leading-relaxed mb-4">{featured.summary}</p>
            <p className="font-mono text-xs text-accent border-l-2 border-accent-dim pl-3 leading-relaxed">
              {featured.detail}
            </p>
          </div>
          <ul className="flex flex-wrap gap-2 mt-6">
            {featured.stack.map((tech) => (
              <li key={tech} className="font-mono text-xs text-fg-muted border border-border px-2 py-1">
                {tech}
              </li>
            ))}
          </ul>
        </article>

        <div className="flex flex-col gap-5">
          {rest.map((highlight) => (
            <article key={highlight.id} className="border border-border p-5 flex-1">
              <h3 className="text-base font-medium text-fg mb-2 max-w-[26ch]">{highlight.title}</h3>
              <p className="text-sm text-fg-muted leading-relaxed mb-3">{highlight.summary}</p>
              <p className="font-mono text-xs text-accent border-l-2 border-accent-dim pl-3 leading-relaxed">
                {highlight.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </ChapterFrame>
  );
}
