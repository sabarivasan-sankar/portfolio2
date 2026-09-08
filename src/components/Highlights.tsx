import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { highlights } from "../lib/content";

export function Highlights() {
  const [featured, ...rest] = highlights;

  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-36">
        <Reveal>
          <p className="font-mono text-sm text-accent mb-3">// highlights</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg mb-14 max-w-[20ch]">
            What I've built
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-6">
          <Reveal>
            <TiltCard className="h-full">
              <article className="h-full border border-border p-7 md:p-9 flex flex-col justify-between bg-bg-raised">
                <div>
                  <p className="font-mono text-xs text-fg-faint mb-3">01</p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-fg mb-4 max-w-[24ch]">
                    {featured.title}
                  </h3>
                  <p className="text-base text-fg-muted leading-relaxed max-w-[52ch] mb-6">
                    {featured.summary}
                  </p>
                  <p className="font-mono text-sm text-accent border-l-2 border-accent-dim pl-3 leading-relaxed max-w-[48ch]">
                    {featured.detail}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2 mt-8">
                  {featured.stack.map((tech) => (
                    <li
                      key={tech}
                      className="font-mono text-xs text-fg-muted border border-border px-2 py-1"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </TiltCard>
          </Reveal>

          <div className="flex flex-col gap-6">
            {rest.map((highlight, i) => (
              <Reveal key={highlight.id} delay={0.08 * (i + 1)} className="flex-1">
                <TiltCard className="h-full">
                  <article className="h-full border border-border p-6 md:p-7 flex flex-col justify-between">
                    <div>
                      <p className="font-mono text-xs text-fg-faint mb-3">
                        {String(i + 2).padStart(2, "0")}
                      </p>
                      <h3 className="text-xl font-semibold text-fg mb-3 max-w-[26ch]">
                        {highlight.title}
                      </h3>
                      <p className="text-sm text-fg-muted leading-relaxed mb-4">
                        {highlight.summary}
                      </p>
                      <p className="font-mono text-xs text-accent border-l-2 border-accent-dim pl-3 leading-relaxed">
                        {highlight.detail}
                      </p>
                    </div>
                    <ul className="flex flex-wrap gap-2 mt-6">
                      {highlight.stack.map((tech) => (
                        <li
                          key={tech}
                          className="font-mono text-xs text-fg-muted border border-border px-2 py-1"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
