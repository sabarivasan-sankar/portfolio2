import { ChapterFrame } from "./ChapterFrame";
import { credentials } from "../lib/content";
import { CHAPTERS } from "../lib/story";

const chapter = CHAPTERS[7];

export function Credentials() {
  return (
    <ChapterFrame chapter={chapter} align="right">
      <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-fg mb-6">
        Along the way
      </h2>

      <ul className="divide-y divide-border border-t border-border">
        {credentials.map((credential) => (
          <li key={credential.title} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
            <div>
              <p className="text-fg">{credential.title}</p>
              <p className="font-mono text-xs text-fg-faint mt-0.5">{credential.issuer}</p>
            </div>
            <p className="font-mono text-xs text-fg-muted">{credential.date}</p>
          </li>
        ))}
      </ul>
    </ChapterFrame>
  );
}
