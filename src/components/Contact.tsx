import { EnvelopeSimple, GithubLogo, LinkedinLogo, ArrowUpRight } from "@phosphor-icons/react";
import { ChapterFrame } from "./ChapterFrame";
import { profile } from "../lib/content";
import { CHAPTERS } from "../lib/story";

const chapter = CHAPTERS[8];

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
    <ChapterFrame chapter={chapter} align="center" wide>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-fg max-w-[16ch] mb-5">
        Let's build something that has to work.
      </h2>

      <p className="text-base text-fg-muted max-w-[48ch] mb-10">
        Open to full-stack roles where reliability, security, and clean data
        actually matter. Reach me directly, no form in between.
      </p>

      <ul className="divide-y divide-border border-t border-b border-border">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 py-4 hover:text-accent transition-colors"
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
            </li>
          );
        })}
      </ul>
    </ChapterFrame>
  );
}
