import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { about, profile } from "../lib/content";

export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-36">
        <Reveal>
          <p className="font-mono text-sm text-accent mb-3">// about</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg mb-14 max-w-[18ch]">
            A bit about how I work
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-start">
          <div className="md:col-span-7 space-y-5">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <p className="text-base md:text-lg leading-relaxed text-fg-muted max-w-[62ch]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="md:col-span-5 flex flex-col gap-4 md:block md:relative md:h-80">
            <Reveal
              delay={0.1}
              className="md:absolute md:left-0 md:top-0 md:w-56 md:rotate-[-4deg]"
            >
              <TiltCard>
                <div className="border border-border bg-bg-raised p-5">
                  <p className="font-mono text-xs text-fg-faint mb-2">location</p>
                  <p className="text-fg">{profile.location}</p>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal
              delay={0.22}
              className="md:absolute md:right-0 md:top-20 md:w-56 md:rotate-[3deg]"
            >
              <TiltCard>
                <div className="border border-border bg-bg-raised p-5">
                  <p className="font-mono text-xs text-fg-faint mb-2">focus</p>
                  <p className="text-fg">access control, payments, data pipelines</p>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal
              delay={0.34}
              className="md:absolute md:left-8 md:bottom-0 md:w-56 md:rotate-[-2deg]"
            >
              <TiltCard>
                <div className="border border-border bg-bg-raised p-5">
                  <p className="font-mono text-xs text-fg-faint mb-2">stack</p>
                  <p className="text-fg">TypeScript, React, Node.js, PostgreSQL</p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
