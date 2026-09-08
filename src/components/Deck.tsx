import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { about, experience, skills, highlights, credentials, profile } from "../lib/content";

const CURRENT = experience[0];
const HISTORY = [experience[2], experience[1], experience[0]];

function CellLabel({ children }: { children: string }) {
  return <p className="font-mono text-xs text-accent mb-3 uppercase tracking-[0.08em]">{children}</p>;
}

export function Deck() {
  return (
    <section id="deck" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
        <div className="deck-grid">
          <Reveal className="area-about" y={20}>
            <TiltCard className="h-full">
              <div
                id="about"
                className="h-full border border-border p-6 md:p-8 relative overflow-hidden scroll-mt-24"
                style={{
                  background:
                    "radial-gradient(circle at 85% -10%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 55%)",
                }}
              >
                <CellLabel>about</CellLabel>
                <div className="space-y-4 max-w-[58ch]">
                  {about.paragraphs.slice(0, 2).map((p, i) => (
                    <p key={i} className="text-base md:text-lg leading-relaxed text-fg-muted">
                      {p}
                    </p>
                  ))}
                </div>
                <p className="font-mono text-xs text-fg-faint mt-6 pt-4 border-t border-border">
                  {profile.location}
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal className="area-now" y={20} delay={0.05}>
            <TiltCard className="h-full">
              <div
                className="h-full border border-accent-dim p-5 md:p-6 flex flex-col justify-between"
                style={{ background: "color-mix(in srgb, var(--color-accent) 8%, var(--color-bg-raised))" }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <CellLabel>currently</CellLabel>
                    <span className="font-mono text-[10px] text-accent border border-accent-dim px-1.5 py-0.5 uppercase">
                      head -&gt; main
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-fg mb-1">{CURRENT.role}</h3>
                  <p className="font-mono text-xs text-fg-faint mb-3">
                    {CURRENT.company} <span className="mx-1">/</span> {CURRENT.period}
                  </p>
                  <p className="text-sm text-fg-muted leading-relaxed">{CURRENT.commits[0]}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal className="area-hist" y={20} delay={0.1}>
            <TiltCard className="h-full">
              <div className="h-full border border-border p-5 md:p-6">
                <CellLabel>history</CellLabel>
                <ul className="space-y-3.5">
                  {HISTORY.map((entry) => (
                    <li key={entry.role} className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                          entry.current ? "bg-accent" : "bg-border-strong"
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-sm text-fg leading-tight">{entry.role}</p>
                        <p className="font-mono text-[11px] text-fg-faint mt-0.5">{entry.period}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal className="area-stack" y={20} delay={0.05}>
            <div id="skills" className="border border-border p-5 md:p-7 scroll-mt-24">
              <CellLabel>stack</CellLabel>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-5">
                {skills.map((group) => (
                  <div key={group.dir}>
                    <p className="font-mono text-[11px] text-fg-faint mb-2 uppercase tracking-wide">
                      {group.dir.replace("/", "")}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item.name}
                          className="font-mono text-xs text-fg-muted border border-border px-2 py-1 whitespace-nowrap"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="area-work" id="work" style={{ scrollMarginTop: "6rem" }}>
            <Reveal y={20}>
              <div className="grid lg:grid-cols-[3fr_2fr] gap-4">
                <TiltCard>
                  <div className="h-full border border-border p-6 md:p-8 flex flex-col justify-between bg-bg-raised">
                    <div>
                      <CellLabel>proof of work</CellLabel>
                      <h3 className="text-xl md:text-2xl font-semibold text-fg mb-3 max-w-[24ch]">
                        {highlights[0].title}
                      </h3>
                      <p className="text-sm text-fg-muted leading-relaxed max-w-[50ch] mb-4">
                        {highlights[0].summary}
                      </p>
                      <p className="font-mono text-xs text-accent border-l-2 border-accent-dim pl-3 leading-relaxed">
                        {highlights[0].detail}
                      </p>
                    </div>
                    <ul className="flex flex-wrap gap-2 mt-6">
                      {highlights[0].stack.map((tech) => (
                        <li
                          key={tech}
                          className="font-mono text-xs text-fg-muted border border-border px-2 py-1"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>

                <div className="grid gap-4">
                  {highlights.slice(1).map((h) => (
                    <TiltCard key={h.id}>
                      <div className="h-full border border-border p-5 md:p-6">
                        <h3 className="text-base font-semibold text-fg mb-2 max-w-[26ch]">{h.title}</h3>
                        <p className="text-sm text-fg-muted leading-relaxed mb-3">{h.summary}</p>
                        <p className="font-mono text-xs text-accent border-l-2 border-accent-dim pl-3 leading-relaxed">
                          {h.detail}
                        </p>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="area-cred" y={20} delay={0.05}>
            <div className="h-full border border-border p-5 md:p-6">
              <CellLabel>credentials</CellLabel>
              <ul className="space-y-3">
                {credentials.map((c) => (
                  <li key={c.title} className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-fg truncate">{c.title}</p>
                      <p className="font-mono text-[11px] text-fg-faint">{c.issuer}</p>
                    </div>
                    <p className="font-mono text-[11px] text-fg-muted shrink-0">{c.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="area-status" y={20} delay={0.1}>
            <div className="h-full border border-border p-5 md:p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="status-dot w-2 h-2 rounded-full bg-accent" />
                <p className="font-mono text-xs text-fg uppercase tracking-wide">
                  open to opportunities
                </p>
              </div>
              <p className="text-sm text-fg-muted">{profile.location}, remote-friendly.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
