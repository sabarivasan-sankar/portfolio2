import { ChapterFrame } from "./ChapterFrame";
import { about, profile } from "../lib/content";
import { CHAPTERS } from "../lib/story";

const chapter = CHAPTERS[1];

export function About() {
  return (
    <ChapterFrame chapter={chapter} align="left" wide>
      <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-fg mb-6">
        Where this started
      </h2>

      <div className="space-y-4 mb-6">
        {about.paragraphs.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-fg-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-fg-faint border-t border-border pt-4">
        <span>{profile.location}</span>
        <span>access control &middot; payments &middot; data pipelines</span>
      </div>
    </ChapterFrame>
  );
}
