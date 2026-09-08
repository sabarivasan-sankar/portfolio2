import { Reveal } from "./Reveal";
import { Marquee } from "./Marquee";
import { skills } from "../lib/content";

const ROW_1 = [...skills[0].items, ...skills[1].items].map((i) => i.name);
const ROW_2 = [...skills[2].items, ...skills[3].items].map((i) => i.name);
const ROW_3 = skills[4].items.map((i) => i.name);

export function Skills() {
  return (
    <section id="skills" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 pt-24 md:pt-32 pb-16">
        <Reveal>
          <p className="font-mono text-sm text-accent mb-3">// skills</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg max-w-[20ch]">
            What's on the machine
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.05} className="space-y-3 border-y border-border py-3">
        <Marquee items={ROW_1} />
        <Marquee items={ROW_2} reverse />
        <Marquee items={ROW_3} />
      </Reveal>
    </section>
  );
}
