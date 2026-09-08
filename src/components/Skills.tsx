import { ChapterFrame } from "./ChapterFrame";
import { skills } from "../lib/content";
import { CHAPTERS } from "../lib/story";

const chapter = CHAPTERS[5];

export function Skills() {
  return (
    <ChapterFrame chapter={chapter} align="center" size="lg">
      <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-fg mb-6">
        What's on the machine
      </h2>

      <p className="font-mono text-sm text-fg-muted mb-6">
        <span className="text-accent">$</span> ls -la skills/
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {skills.map((group) => (
          <div key={group.dir}>
            <p className="font-mono text-sm text-accent mb-2.5">{group.dir}</p>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="font-mono text-sm text-fg-muted flex items-baseline gap-2"
                >
                  <span className="text-fg-faint">├─</span>
                  <span className="text-fg">{item.name}</span>
                  {item.note && <span className="text-fg-faint text-xs">({item.note})</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ChapterFrame>
  );
}
