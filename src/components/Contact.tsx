import { EnvelopeSimple, GithubLogo, LinkedinLogo, ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { FinaleScene } from "./scene/FinaleScene";
import { profile } from "../lib/content";

const LINKS = [
  { label: "email", value: profile.email, href: `mailto:${profile.email}`, icon: EnvelopeSimple },
  { label: "github", value: profile.github.label, href: profile.github.url, icon: GithubLogo },
  {
    label: "linkedin",
    value: profile.linkedin.label,
    href: profile.linkedin.url,
    icon: LinkedinLogo,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <FinaleScene />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-40">
        <Reveal>
          <p className="font-mono text-sm text-accent mb-6">// contact</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-fg max-w-[16ch] mb-6">
            Let's build something that has to work.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-base md:text-lg text-fg-muted max-w-[52ch] mb-12">
            Open to full-stack roles where reliability, security, and clean data
            actually matter. Reach me directly, no form in between.
          </p>
        </Reveal>

        <ul className="divide-y divide-border border-t border-b border-border max-w-2xl">
          {LINKS.map((link, i) => {
            const Icon = link.icon;
            return (
              <Reveal key={link.label} delay={0.05 * i} blur={false}>
                <li>
                  <Magnetic strength={0.15} className="block w-full">
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex items-center justify-between gap-4 py-5 hover:text-accent transition-colors"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <Icon size={20} weight="regular" className="shrink-0" />
                        <span className="font-mono text-sm text-fg-faint w-16 sm:w-20 shrink-0">
                          {link.label}
                        </span>
                        <span className="text-fg group-hover:text-accent transition-colors truncate">
                          {link.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-fg-faint group-hover:text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </Magnetic>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
