import { ArrowUpRight, EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { experience, skills, credentials, profile } from "../lib/content";
import { showsFamiliarTier, type Resource, type Role } from "../lib/access";

const CONTACT = [
  { label: "email", value: profile.email, href: `mailto:${profile.email}`, icon: EnvelopeSimple },
  { label: "github", value: profile.github.label, href: profile.github.url, icon: GithubLogo },
  { label: "linkedin", value: profile.linkedin.label, href: profile.linkedin.url, icon: LinkedinLogo },
];

function Restricted({ reason }: { reason: string }) {
  return (
    <div>
      <div className="space-y-2.5 mb-6 max-w-[46ch]" aria-hidden="true">
        <span className="redaction-bar w-full" />
        <span className="redaction-bar w-[78%]" />
      </div>
      <p className="font-mono text-sm text-fg-faint leading-relaxed max-w-[52ch]">{reason}</p>
    </div>
  );
}

function Timeline() {
  return (
    <ol className="space-y-10">
      {[experience[2], experience[1], experience[0]].map((entry) => (
        <li key={entry.role}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
            <h3 className="text-xl md:text-2xl font-light text-fg tracking-tight">{entry.role}</h3>
            <span className="font-mono text-xs text-fg-faint">{entry.period}</span>
            {entry.current && (
              <span className="font-mono text-xs text-accent">current</span>
            )}
          </div>
          <ul className="space-y-2 max-w-[62ch]">
            {entry.commits.map((c) => (
              <li key={c} className="body-lg">
                {c}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

function Stack({ role }: { role: Role }) {
  const showFamiliar = showsFamiliarTier(role);
  return (
    <div className="space-y-7">
      {skills.map((group) => {
        const items = showFamiliar ? group.items : group.items.filter((i) => !i.note);
        if (items.length === 0) return null;
        return (
          <div key={group.dir}>
            <p className="micro mb-2.5">{group.dir.replace("/", "")}</p>
            <p className="body-lg text-fg">
              {items.map((item, i) => (
                <span key={item.name}>
                  {i > 0 && <span className="text-fg-faint">, </span>}
                  <span className={item.note ? "text-fg-faint" : undefined}>{item.name}</span>
                </span>
              ))}
            </p>
          </div>
        );
      })}
      {!showFamiliar && (
        <p className="font-mono text-xs text-fg-faint">
          secondary tooling hidden for this role
        </p>
      )}
    </div>
  );
}

function Credentials() {
  return (
    <ul className="space-y-5">
      {credentials.map((c) => (
        <li key={c.title}>
          <p className="body-lg text-fg">{c.title}</p>
          <p className="font-mono text-xs text-fg-faint mt-1">
            {c.issuer} <span className="mx-1.5">/</span> {c.date}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Links() {
  return (
    <ul className="space-y-1">
      {CONTACT.map((link) => {
        const Icon = link.icon;
        const external = link.href.startsWith("http");
        return (
          <li key={link.label}>
            <a
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group flex items-center gap-4 py-2.5 text-fg hover:text-accent transition-colors duration-300"
            >
              <Icon size={18} weight="light" className="shrink-0 text-fg-faint group-hover:text-accent transition-colors" />
              <span className="text-lg md:text-xl font-light tracking-tight truncate">{link.value}</span>
              <ArrowUpRight
                size={16}
                className="shrink-0 text-fg-faint opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all duration-300"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

type Props = { resource: Resource; role: Role };

export function ResourceBlock({ resource, role }: Props) {
  const restricted = Boolean(resource.restricted);

  return (
    <article>
      <div className="flex items-baseline gap-3 mb-5">
        <span className="micro">{resource.path}</span>
        <span className={`micro ${restricted ? "text-fg-faint" : "text-accent"}`}>
          {restricted ? "denied" : "granted"}
        </span>
      </div>

      {restricted ? (
        <Restricted reason={resource.restricted!} />
      ) : resource.kind === "timeline" ? (
        <Timeline />
      ) : resource.kind === "stack" ? (
        <Stack role={role} />
      ) : resource.kind === "credentials" ? (
        <Credentials />
      ) : resource.kind === "links" ? (
        <Links />
      ) : (
        <p className="body-lg max-w-[64ch]">{resource.body?.[role]}</p>
      )}
    </article>
  );
}
