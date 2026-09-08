import { Reveal } from "./Reveal";
import { credentials } from "../lib/content";

export function Credentials() {
  return (
    <section id="credentials" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-20">
        <Reveal>
          <p className="font-mono text-sm text-accent mb-6">// credentials</p>
        </Reveal>

        <ul className="divide-y divide-border border-t border-border max-w-2xl">
          {credentials.map((credential, i) => (
            <Reveal key={credential.title} delay={i * 0.05} blur={false}>
              <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
                <div>
                  <p className="text-fg">{credential.title}</p>
                  <p className="font-mono text-xs text-fg-faint mt-0.5">{credential.issuer}</p>
                </div>
                <p className="font-mono text-xs text-fg-muted">{credential.date}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
